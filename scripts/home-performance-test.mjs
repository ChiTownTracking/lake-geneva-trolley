/** Run against an Astro production preview after npm run build. No forms are submitted. */
import assert from 'node:assert/strict';
import { chromium } from 'playwright-core';

const base = process.argv[2] ?? 'http://127.0.0.1:4323';
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });

try {
	for (const width of [320, 390, 820, 1440, 1920]) {
		const context = await browser.newContext({
			viewport: { width, height: 900 },
			isMobile: width < 600,
			hasTouch: width < 600,
		});
		const page = await context.newPage();
		const requests = [];
		const errors = [];
		page.on('request', (request) => requests.push(request.url()));
		page.on('pageerror', (error) => errors.push(error.message));
		await page.goto(base + '/', { waitUntil: 'networkidle' });
		const hero = page.locator('.hero__image');
		await hero.evaluate((image) => image.decode());
		const heroUrl = await hero.evaluate((image) => image.currentSrc);
		assert.match(heroUrl, /\.avif$/);
		assert.match(heroUrl, width <= 768 ? /hero-mobile/ : /hero-desktop/);
		assert.equal(requests.filter((url) => /hero-(mobile|desktop)/.test(url)).length, 1, 'preload must not download a second hero image');
		assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width, 'horizontal overflow');

		const interiors = await page.locator('template[data-fleet-interior]').evaluateAll((templates) => templates.flatMap((template) =>
			[...template.content.querySelectorAll('img, source')].flatMap((image) =>
				[image.getAttribute('src'), ...(image.getAttribute('srcset') ?? '').split(',').map((candidate) => candidate.trim().split(' ')[0])]
					.filter(Boolean).map((url) => new URL(url, location.href).href),
			),
		));
		const card = page.locator('[data-fleet-preview]').first();
		await card.scrollIntoViewIfNeeded();
		await page.locator('[data-fleet-preview] > .fcard__media img').first().evaluate((image) => image.decode());
		assert.equal(requests.filter((url) => interiors.includes(url)).length, 0, 'unused interior previews must not download');

		if (width >= 600) {
			await card.hover();
			await card.locator('.fcard__img--alt.is-ready').waitFor();
			assert.ok(requests.some((url) => interiors.includes(url)), 'hover must load the interior preview');
			await page.mouse.move(0, 0);
			await page.keyboard.press('Tab');
			const next = page.locator('[data-fleet-preview]').nth(1);
			await next.focus();
			await next.locator('.fcard__img--alt.is-ready').waitFor();
		}
		assert.deepEqual(errors, []);
		console.log(`PASS ${width}px: one responsive hero download, stable page width, deferred interiors and working previews`);
		await context.close();
	}

	const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
	const page = await context.newPage();
	await page.goto(base + '/', { waitUntil: 'networkidle' });
	await page.locator('.hero__image').evaluate((image) => image.decode());
	assert.ok(await page.locator('[data-fleet-preview]').first().getAttribute('href'));
	assert.ok(await page.locator('.rv').evaluateAll((sections) => sections.every((section) => getComputedStyle(section).opacity === '1')));
	console.log('PASS no JavaScript: hero, content and fleet links remain available');
	await context.close();
} finally {
	await browser.close();
}
