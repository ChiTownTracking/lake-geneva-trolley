/**
 * Behaviour checks for the interactive pieces: mobile drawer, nav dropdown,
 * FAQ accordion, quote wizard, keyboard access and form delivery.
 *
 *   node scripts/interaction-test.mjs [baseUrl]
 */
import { chromium } from 'playwright-core';

const base = process.argv[2] ?? 'http://localhost:4322';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

let pass = 0;
let fail = 0;
const check = (name, ok, detail = '') => {
	(ok ? pass++ : fail++, console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`));
};

const browser = await chromium.launch({ executablePath: CHROME });

// ---- Mobile drawer -------------------------------------------------------
{
	const ctx = await browser.newContext({
		viewport: { width: 390, height: 844 },
		isMobile: true,
		hasTouch: true,
	});
	const page = await ctx.newPage();
	await page.goto(base + '/', { waitUntil: 'networkidle' });

	const burger = page.locator('[data-burger]');
	check('burger is visible on mobile', await burger.isVisible());
	check('drawer links are inert while closed', await page.locator('.nav__link').first().isVisible() === false);

	await burger.click();
	await page.waitForTimeout(400);
	check('drawer opens', await page.locator('.hdr.is-menu-open').count() === 1);
	check('drawer link reachable when open', await page.locator('a.nav__link').first().isVisible());
	check('burger aria-expanded true', (await burger.getAttribute('aria-expanded')) === 'true');
	check('body scroll locked', await page.evaluate(() => document.documentElement.classList.contains('menu-open')));

	await page.keyboard.press('Escape');
	await page.waitForTimeout(400);
	check('Escape closes drawer', (await page.locator('.hdr.is-menu-open').count()) === 0);
	check('focus returns to burger', await page.evaluate(() => document.activeElement?.hasAttribute('data-burger') === true));

	// Submenu inside the drawer
	await burger.click();
	await page.waitForTimeout(350);
	const moreBtn = page.locator('[data-more-btn]').first();
	await moreBtn.click();
	check('submenu opens in drawer', await page.locator('.more.open .more__menu').first().isVisible());
	await ctx.close();
}

// ---- Desktop dropdown + keyboard ----------------------------------------
{
	const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
	const page = await ctx.newPage();
	await page.goto(base + '/', { waitUntil: 'networkidle' });

	// Tab order check must run before anything else takes focus.
	await page.keyboard.press('Tab');
	check(
		'skip link is first tab stop',
		await page.evaluate(() => document.activeElement?.classList.contains('skip-link') === true),
	);
	check(
		'skip link visible when focused',
		await page.evaluate(() => {
			const el = document.querySelector('.skip-link');
			return el ? el.getBoundingClientRect().top > -10 : false;
		}),
	);

	const moreBtn = page.locator('[data-more-btn]').first();
	check('dropdown closed initially', (await moreBtn.getAttribute('aria-expanded')) === 'false');
	await moreBtn.click();
	check('dropdown opens on click', (await moreBtn.getAttribute('aria-expanded')) === 'true');
	check('dropdown items visible', await page.locator('.more.open .more__item').first().isVisible());
	await page.keyboard.press('Escape');
	check('Escape closes dropdown', (await moreBtn.getAttribute('aria-expanded')) === 'false');

	// Focus ring present on a nav link
	const outline = await page.evaluate(() => {
		const el = document.querySelector('a.nav__link');
		el?.focus();
		return el ? getComputedStyle(el).outlineWidth : '';
	});
	check('nav link has a visible focus ring', outline !== '' && outline !== '0px', outline);

	await ctx.close();
}

// ---- FAQ accordion -------------------------------------------------------
{
	const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
	const page = await ctx.newPage();
	await page.goto(base + '/faq', { waitUntil: 'networkidle' });

	const first = page.locator('[data-faq-toggle]').first();
	check('faq closed initially', (await first.getAttribute('aria-expanded')) === 'false');
	await first.click();
	await page.waitForTimeout(450);
	check('faq opens', (await first.getAttribute('aria-expanded')) === 'true');
	const answerVisible = await page.locator('.faq__item.is-open .faq__a').first().isVisible();
	check('faq answer visible when open', answerVisible);

	// Keyboard: Enter on a focused header toggles it.
	await first.click(); // close
	await page.waitForTimeout(400);
	await first.focus();
	await page.keyboard.press('Enter');
	await page.waitForTimeout(400);
	check('faq toggles with Enter', (await first.getAttribute('aria-expanded')) === 'true');
	await ctx.close();
}

// ---- Quote wizard --------------------------------------------------------
{
	const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
	const page = await ctx.newPage();
	await page.goto(base + '/', { waitUntil: 'networkidle' });

	check('step 1 open by default', (await page.locator('.step[data-step="1"].is-open').count()) === 1);
	await page.locator('[data-step-next="2"]').click();
	await page.waitForTimeout(400);
	check('Next advances to step 2', (await page.locator('.step[data-step="2"].is-open').count()) === 1);
	check('step 1 marked done', (await page.locator('.step[data-step="1"].is-done').count()) === 1);
	await page.locator('[data-step-back="1"]').click();
	await page.waitForTimeout(400);
	check('Back returns to step 1', (await page.locator('.step[data-step="1"].is-open').count()) === 1);

	// Required validation blocks an empty submit.
	await page.locator('[data-step-next="2"]').click();
	await page.waitForTimeout(200);
	await page.locator('[data-step-next="3"]').click();
	await page.waitForTimeout(400);
	const submitted = await page.evaluate(() => {
		const form = document.querySelector('[data-quote-form]');
		return form instanceof HTMLFormElement ? form.checkValidity() : null;
	});
	check('empty form is invalid (required fields enforced)', submitted === false);

	// Deep link preselects a vehicle.
	await page.goto(base + '/#getquote?vehicle=Coach%20Bus', { waitUntil: 'networkidle' });
	await page.waitForTimeout(400);
	const selected = await page.locator('select[name="vehicle"]').inputValue();
	check('deep link preselects vehicle', selected === 'Coach Bus', selected);

	await ctx.close();
}

// ---- Form delivery: must never fake success ------------------------------
{
	const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
	const page = await ctx.newPage();
	await page.goto(base + '/contact', { waitUntil: 'networkidle' });

	// Simulate a host with no form backend.
	await page.route('**/*', (route) =>
		route.request().method() === 'POST' ? route.fulfill({ status: 405, body: '' }) : route.continue(),
	);

	await page.fill('#c-name', 'Test Person');
	await page.fill('#c-email', 'test@example.com');
	await page.fill('#c-message', 'Checking delivery behaviour.');
	await page.click('button[type="submit"]');
	await page.waitForTimeout(900);

	const status = page.locator('[data-form-status]').first();
	const state = await status.getAttribute('data-state');
	const text = (await status.textContent())?.trim() ?? '';
	check('failed POST reports an error, not success', state === 'error', `state=${state}`);
	check('no success dialog on failure', (await page.locator('dialog[open]').count()) === 0);
	check('error text is actionable', /could not be sent/i.test(text), text.slice(0, 60));

	// Now simulate a working backend.
	await page.unroute('**/*');
	await page.route('**/*', (route) =>
		route.request().method() === 'POST' ? route.fulfill({ status: 200, body: 'ok' }) : route.continue(),
	);
	await page.fill('#c-name', 'Test Person');
	await page.fill('#c-email', 'test@example.com');
	await page.fill('#c-message', 'Checking delivery behaviour.');
	await page.click('button[type="submit"]');
	await page.waitForTimeout(900);
	check('successful POST reports success', (await status.getAttribute('data-state')) === 'success');
	check('success dialog shown', (await page.locator('dialog[open]').count()) === 1);

	await ctx.close();
}

await browser.close();
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail > 0 ? 1 : 0);
