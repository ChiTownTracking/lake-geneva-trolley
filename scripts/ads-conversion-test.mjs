/**
 * Google Ads "Quote request submitted" conversion checks.
 *
 * The conversion must fire exactly once per accepted quote-request or
 * wedding-quote-request submission, and never on page load, submit clicks
 * that fail validation, failed requests, or other forms.
 *
 * Run after `npm run build`. All POSTs are intercepted and every Google
 * request is blocked, so no inquiries or real conversions are sent.
 *
 *   node scripts/ads-conversion-test.mjs
 */
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const SEND_TO = 'AW-18528152709/cLiMCI6Dl74dEIXZ9IJF';
const root = fileURLToPath(new URL('../dist/', import.meta.url));
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

/** Conversion commands pushed to the dataLayer by gtag(). */
const conversions = (page) =>
	page.evaluate(() =>
		(window.dataLayer ?? [])
			.map((entry) => Array.from(entry))
			.filter(([command, name]) => command === 'event' && name === 'conversion')
			.map(([, , params]) => params?.send_to),
	);

/** A page whose POSTs answer with `state.status` and whose Google requests are blocked. */
const openPage = async (browser, path) => {
	const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
	const state = { status: 500, posts: 0 };
	const errors = [];
	page.on('pageerror', (error) => errors.push(error.message));
	await page.route('**/*', (route) => {
		const request = route.request();
		if (/google|doubleclick/.test(new URL(request.url()).hostname)) return route.abort();
		if (request.method() !== 'POST') return route.continue();
		state.posts++;
		return route.fulfill({ status: state.status, body: state.status === 200 ? 'OK' : 'Test failure' });
	});
	await page.goto(base + path, { waitUntil: 'networkidle' });
	return { page, state, errors };
};

let browser;
try {
	browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });

	// ---- Google tag present on every page -------------------------------------
	{
		const { page, errors } = await openPage(browser, '/');
		assert.equal(await page.locator('head script[src*="googletagmanager.com/gtm.js?id=AW-18528152709"]').count(), 1, 'Google tag missing');
		assert.equal(await page.evaluate(() => typeof window.gtag), 'function');
		assert.deepEqual(await conversions(page), [], 'conversion fired on page load');
		assert.deepEqual(errors, []);
		await page.close();
		console.log('PASS: Google tag loads once and page load sends no conversion');
	}

	// ---- Main quote form (home page) ------------------------------------------
	{
		const { page, state, errors } = await openPage(browser, '/');
		const form = page.locator('form[name="quote-request"]');
		const submit = form.getByRole('button', { name: 'Request My Quote' });
		await form.locator('[data-step-next="2"]').click();
		await form.locator('[data-step-next="3"]').click();

		await submit.click();
		await page.waitForTimeout(300);
		assert.equal(state.posts, 0, 'empty form should not submit');
		assert.deepEqual(await conversions(page), [], 'conversion fired on a submit click that failed validation');

		const fill = async () => {
			await page.fill('#q-name', 'Conversion Test');
			await page.fill('#q-phone', '2625550101');
			await page.fill('#q-email', 'conversion-test@example.com');
		};
		await fill();
		state.status = 500;
		await submit.click();
		await form.locator('[data-form-status][data-state="error"]').waitFor();
		assert.equal(state.posts, 1);
		assert.deepEqual(await conversions(page), [], 'conversion fired on a failed request');

		state.status = 200;
		await submit.click();
		await page.locator('[data-success-dialog][open]').waitFor();
		assert.equal(state.posts, 2);
		assert.deepEqual(await conversions(page), [SEND_TO], 'expected exactly one conversion after success');

		// A second accepted submission is a second lead and counts once more.
		await page.locator('[data-success-dialog] [data-success-close]').first().click();
		await form.locator('[data-step-next="2"]').click();
		await form.locator('[data-step-next="3"]').click();
		await fill();
		await submit.click();
		await page.waitForFunction(() => document.querySelector('[data-success-dialog]')?.open);
		assert.deepEqual(await conversions(page), [SEND_TO, SEND_TO]);
		assert.deepEqual(errors, []);
		await page.close();
		console.log('PASS: quote-request converts once per accepted submission, never on validation errors or failures');
	}

	// ---- Wedding quote form ---------------------------------------------------
	{
		const { page, state, errors } = await openPage(browser, '/weddings/');
		await page.locator('[data-wedding-quote]').first().click();
		const submit = page.getByRole('button', { name: 'Request Wedding Quote', exact: true });

		await submit.click();
		await page.waitForTimeout(300);
		assert.equal(state.posts, 0);
		assert.deepEqual(await conversions(page), [], 'wedding: conversion fired on a failed validation');

		await page.fill('#wedding-name', 'Wedding Conversion Test');
		await page.fill('#wedding-email', 'wedding-conversion@example.com');
		await page.fill('#wedding-phone', '6085550101');
		await page.fill('#wedding-date', '2027-06-12');
		await page.fill('#wedding-guests', '90');
		await page.fill('#wedding-time', '14:00');
		await page.fill('#wedding-pickup', 'Test hotel');
		await page.fill('#wedding-dropoff', 'Test venue');
		state.status = 500;
		await submit.click();
		await page.locator('[data-wedding-dialog] [data-form-status][data-state="error"]').waitFor();
		assert.deepEqual(await conversions(page), [], 'wedding: conversion fired on a failed request');

		state.status = 200;
		await submit.click();
		await page.locator('[data-success-dialog][open]').waitFor();
		assert.deepEqual(await conversions(page), [SEND_TO], 'wedding: expected exactly one conversion');
		assert.deepEqual(errors, []);
		await page.close();
		console.log('PASS: wedding-quote-request converts once after an accepted submission only');
	}

	// ---- Forms that are not quote requests never convert ----------------------
	{
		const { page, state, errors } = await openPage(browser, '/contact/');
		state.status = 200;
		await page.fill('#c-name', 'Contact Test');
		await page.fill('#c-email', 'contact-test@example.com');
		await page.fill('#c-message', 'Not a quote request.');
		await page.locator('form[name="contact-message"] button[type="submit"]').click();
		await page.locator('[data-success-dialog][open]').waitFor();
		assert.deepEqual(await conversions(page), [], 'contact form must not convert');
		assert.deepEqual(errors, []);
		await page.close();
		console.log('PASS: contact-message success sends no conversion');
	}

	console.log('\nAll Google Ads conversion checks passed.');
} finally {
	await browser?.close();
	await new Promise((done) => server.close(done));
}
