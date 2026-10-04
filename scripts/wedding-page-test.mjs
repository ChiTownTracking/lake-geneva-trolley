/** Run after npm run build. All POSTs are intercepted; no inquiries are sent. */
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { mkdir, readFile, stat } from 'node:fs/promises';
import { extname, join, resolve, sep } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const output = join(tmpdir(), 'lgt-wedding-check');
await mkdir(output, { recursive: true });
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
const server = createServer(async (request, response) => {
	try {
		if (request.method !== 'GET') { response.writeHead(405).end(); return; }
		const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
		let file = resolve(root, `.${pathname}`);
		if (file !== resolve(root) && !file.startsWith(resolve(root) + sep)) { response.writeHead(403).end(); return; }
		if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
		response.writeHead(200, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream' });
		response.end(await readFile(file));
	} catch { response.writeHead(404).end(); }
});
await new Promise((done) => server.listen(0, '127.0.0.1', done));
const base = `http://127.0.0.1:${server.address().port}`;
let browser;

try {
	browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
	for (const width of [1440, 820, 390, 320]) {
		const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
		const errors = [];
		page.on('pageerror', (error) => errors.push(error.message));
		assert.equal((await page.goto(base + '/weddings/', { waitUntil: 'networkidle' })).status(), 200);
		await page.locator('main img').evaluateAll((images) => Promise.all(images.map((image) => image.decode())));
		assert.equal(await page.locator('h1').count(), 1);
		assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width, 'page overflow');
		await page.screenshot({ path: join(output, `wedding-${width}.png`), fullPage: true });

		const dialog = page.locator('[data-wedding-dialog]');
		const triggers = page.locator('[data-wedding-quote]');
		for (let index = 0; index < await triggers.count(); index++) {
			await triggers.nth(index).click();
			await dialog.waitFor({ state: 'visible' });
			assert.equal(await dialog.evaluate((element) => element.scrollWidth <= element.clientWidth), true, 'dialog overflow');
			await page.keyboard.press('Escape');
			await dialog.waitFor({ state: 'hidden' });
			assert.equal(await triggers.nth(index).evaluate((element) => element === document.activeElement), true, 'focus restored');
		}
		await triggers.first().focus();
		await page.keyboard.press('Enter');
		await dialog.waitFor({ state: 'visible' });
		await page.screenshot({ path: join(output, `quote-${width}.png`) });
		for (let tab = 0; tab < 16; tab++) {
			await page.keyboard.press('Tab');
			assert.equal(await dialog.evaluate((element) => element.contains(document.activeElement) || document.activeElement === document.body), true, 'focus escaped modal');
		}
		await page.locator('[data-wedding-close]').click();
		await dialog.waitFor({ state: 'hidden' });
		await page.waitForFunction(() => !document.documentElement.classList.contains('wedding-dialog-open'));
		await triggers.first().click();
		await page.mouse.click(2, 2);
		await dialog.waitFor({ state: 'hidden' });
		const summaries = page.locator('.wfaq summary');
		await summaries.first().focus();
		await page.keyboard.press('Enter');
		assert.equal(await page.locator('.wfaq details[open]').count(), 1);
		await summaries.nth(1).click();
		assert.equal(await page.locator('.wfaq details[open]').count(), 1);
		assert.equal(await page.locator('.wfaq details').first().getAttribute('open'), null);
		assert.deepEqual(errors, []);
		await page.close();
		console.log(`PASS: ${width}px layout, images, all quote links, modal keyboard/focus/close and FAQs`);
	}

	const page = await browser.newPage();
	let posts = [];
	let responseStatus = 500;
	await page.route('**/*', async (route) => {
		if (route.request().method() !== 'POST') return route.continue();
		posts.push(new URLSearchParams(route.request().postData()));
		return route.fulfill({ status: responseStatus, body: responseStatus === 200 ? 'OK' : 'Test failure' });
	});
	await page.goto(base + '/weddings/', { waitUntil: 'networkidle' });
	await page.locator('[data-wedding-quote]').first().click();
	const submit = page.getByRole('button', { name: 'Request Wedding Quote', exact: true });
	await submit.click();
	assert.equal(posts.length, 0, 'empty required fields should prevent submission');
	assert.equal(await page.locator('#wedding-name').evaluate((element) => element === document.activeElement), true);
	await page.locator('#wedding-name').fill('Wedding Form Test');
	await page.locator('#wedding-email').fill('wedding-test@example.com');
	await page.locator('#wedding-phone').fill('6085550101');
	await page.locator('#wedding-date').fill('2027-06-12');
	await page.locator('#wedding-guests').fill('90');
	await page.locator('#wedding-time').fill('14:00');
	await page.locator('#wedding-pickup').fill('Test hotel');
	await page.locator('#wedding-dropoff').fill('Test venue');
	await page.locator('#wedding-message').fill('24 in the wedding party. Two hotel pickups and a 10 pm return.');
	await submit.click();
	await page.locator('[data-wedding-dialog] [data-form-status][data-state="error"]').waitFor();
	assert.equal(await page.locator('[data-success-dialog]').isVisible(), false);
	assert.equal(await page.locator('#wedding-name').inputValue(), 'Wedding Form Test');
	assert.equal(await submit.isEnabled(), true);
	responseStatus = 200;
	await submit.click();
	await page.locator('[data-success-dialog][open]').waitFor();
	assert.equal(await page.locator('[data-wedding-dialog]').isVisible(), false);
	assert.equal(await page.locator('dialog[open]').count(), 1);
	assert.match(await page.locator('[data-success-message]').textContent(), /wedding quote request has been submitted/);
	assert.equal(await page.locator('#wedding-name').inputValue(), '');
	assert.equal(posts.length, 2);
	assert.deepEqual(Object.fromEntries(posts[1]), {
		'form-name': 'wedding-quote-request', type: 'Wedding', vehicle: 'Wedding Package - Trolley & Coach Bus', 'bot-field': '',
		name: 'Wedding Form Test', email: 'wedding-test@example.com', phone: '6085550101', date: '2027-06-12',
		passengers: '90', time: '14:00', pickup: 'Test hotel', dropoff: 'Test venue',
		message: '24 in the wedding party. Two hotel pickups and a 10 pm return.',
	});
	await page.close();
	console.log('PASS: required fields, payload, failed submission recovery, success confirmation and modal handoff');

	const noJs = await browser.newPage({ javaScriptEnabled: false });
	await noJs.goto(base + '/weddings/');
	await noJs.locator('.wfaq summary').first().click();
	assert.equal(await noJs.locator('.wfaq details[open]').count(), 1);
	for (const href of await noJs.locator('main a[href^="/fleet/"]').evaluateAll((links) => links.map((link) => link.getAttribute('href')))) {
		assert.equal((await noJs.request.get(base + href)).status(), 200);
	}
	await noJs.getByRole('link', { name: 'Check Wedding Availability' }).click();
	assert.equal(new URL(noJs.url()).hash, '#getquote');
	assert.equal(await noJs.locator('#getquote').count(), 1);
	await noJs.close();
	console.log(`PASS: vehicle destinations and no-JavaScript FAQ / quote fallback. Screenshots: ${output}`);
} finally {
	await browser?.close();
	await new Promise((done) => server.close(done));
}
