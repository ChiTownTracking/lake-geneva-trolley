/** Run after npm run build. Serves dist locally; all form POSTs are intercepted. */
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const root = resolve(fileURLToPath(new URL('../dist/', import.meta.url)));
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
const server = createServer(async (request, response) => {
	try {
		if (request.method !== 'GET') { response.writeHead(405).end(); return; }
		const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
		let file = resolve(root, `.${pathname}`);
		if (file !== root && !file.startsWith(root + sep)) { response.writeHead(403).end(); return; }
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
	const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
	const errors = [];
	page.on('pageerror', (error) => errors.push(error.message));
	const go = async (path) => {
		const response = await page.goto(base + path, { waitUntil: 'networkidle' });
		// Hash-only navigation keeps the current document and has no response.
		if (response) assert.equal(response.status(), 200, path);
	};
	const visibleIds = () => page.locator('[data-fleet-card]:visible').evaluateAll((cards) => cards.map((card) => card.id));
	const categories = {
		trolley: ['classic-trolley', 'limo-trolley', 'christmas-trolley', 'festive-trolley'],
		'coach-bus': ['super-coach-bus', 'coach-bus', 'small-coach-bus'],
		'party-bus': ['party-bus'],
		'limo-van': ['limo-van', 'executive-sprinter'],
	};
	const allIds = Object.values(categories).flat();
	const photoCounts = [3, 6, 1, 1, 10, 3, 3, 2, 3, 5];

	await go('/fleet/');
	assert.deepEqual(await visibleIds(), allIds);
	for (const [category, ids] of Object.entries({ ...categories, all: allIds })) {
		const button = page.locator(`[data-fleet-filter="${category}"]`);
		await button.focus();
		await page.keyboard.press('Enter');
		assert.equal(await button.getAttribute('aria-pressed'), 'true');
		assert.deepEqual(await visibleIds(), ids);
		assert.equal(await page.locator('[data-fleet-group]:visible').count(), category === 'all' ? 4 : 1);
		assert.equal(new URL(page.url()).hash, `#${category}`);
		assert.ok((await page.locator('[data-fleet-filter-status]').textContent()).includes(String(ids.length)));
	}
	for (const [index, id] of allIds.entries()) {
		await go(`/fleet/#${id}`);
		assert.ok(await page.locator(`[data-fleet-card][id="${id}"]`).isVisible());
		await page.locator(`[data-fleet-card][id="${id}"]`).click();
		// The Christmas Trolley links to its own page rather than a fleet listing page.
		if (id === 'christmas-trolley') {
			await page.waitForURL('**/christmas-trolley/');
			assert.equal(new URL(page.url()).pathname, '/christmas-trolley/');
			continue;
		}
		await page.waitForURL(`**/fleet/${id}/`);
		assert.equal(await page.locator('[data-gallery-photo]').count(), photoCounts[index]);
		assert.equal(await page.locator('[data-gallery-photo]:visible').count(), 1);
		if (photoCounts[index] > 1) {
			for (let photo = 0; photo < photoCounts[index]; photo++) {
				await page.locator(`[data-gallery-thumb="${photo}"]`).click();
				await page.locator('[data-gallery-photo]:visible img').evaluate((image) => image.decode());
				assert.equal(await page.locator('[data-gallery-photo]:visible').getAttribute('id'), `${id}-photo-${photo}`);
			}
			await page.getByRole('button', { name: 'Next photo', exact: true }).click();
			assert.equal(await page.locator('[data-gallery-photo]:visible').getAttribute('id'), `${id}-photo-0`);
			await page.getByRole('button', { name: 'Previous photo', exact: true }).click();
			assert.equal(await page.locator('[data-gallery-photo]:visible').getAttribute('id'), `${id}-photo-${photoCounts[index] - 1}`);
			await page.locator('[data-gallery-thumb="0"]').focus();
			await page.keyboard.press('ArrowRight');
			assert.equal(await page.locator('[data-gallery-thumb="1"]').getAttribute('aria-pressed'), 'true');
		} else {
			await page.locator('[data-gallery-photo] img').evaluate((image) => image.decode());
		}
		const reserve = page.getByRole('link', { name: 'Reserve This Vehicle' });
		const requested = new URL(await reserve.getAttribute('href'), base).searchParams.get('vehicle');
		await reserve.click();
		await page.waitForURL('**/reservation/?vehicle=*');
		assert.equal(await page.locator('#r-vehicle').inputValue(), requested);
	}
	console.log('PASS: all 10 listings, category filters, 36 gallery photos, Christmas page link, keyboard access, legacy hashes and booking preselection');

	await go('/reservation/?vehicle=unknown');
	assert.equal(await page.locator('#r-vehicle').inputValue(), '');
	// The flat ChiTown list: 16 vehicles plus the placeholder.
	assert.equal(await page.locator('#r-vehicle option').count(), 17);
	assert.equal(await page.locator('#r-vehicle option[value="Festive Trolley — Red & Green"]').count(), 1);
	// The retired "Coming Soon" value from older links is ignored.
	await go('/reservation/?vehicle=Festive%20Trolley%20(Coming%20Soon)');
	assert.equal(await page.locator('#r-vehicle').inputValue(), '');
	assert.equal(await page.locator('.rform__section').count(), 4);
	assert.equal(await page.locator('.rform').evaluate((form) => form.checkValidity()), false);
	// Card fields were added at the owner's request (October 4, 2026); they stay optional.
	assert.equal(await page.locator('input[name^="billing-card-"]').count(), 3);
	assert.equal(await page.locator('input[name^="billing-card-"][required]').count(), 0);
	await page.fill('#r-name', 'Test Person');
	await page.fill('#r-phone', '+1 608-555-0101');
	await page.fill('#r-email', 'test@example.com');
	await page.selectOption('#r-type', 'Wedding');
	await page.fill('#r-date', '2099-06-21');
	await page.fill('#r-time', '14:00');
	await page.fill('#r-pickup', 'Test pickup, Lake Geneva');
	await page.fill('#r-dropoff', 'Test venue, Lake Geneva');
	await page.selectOption('#r-hours', '4 hours');
	await page.selectOption('#r-vehicle', 'Coach Bus — 44 Passengers');
	await page.fill('#r-passengers', '0');
	assert.equal(await page.locator('#r-passengers').evaluate((field) => field.checkValidity()), false);
	await page.fill('#r-passengers', '24');
	assert.equal(await page.locator('.rform').evaluate((form) => form.checkValidity()), false, 'Acknowledgement is required');
	await page.check('[name="agreement"]');
	assert.equal(await page.locator('.rform').evaluate((form) => form.checkValidity()), true);

	let statusCode = 503;
	let posts = 0;
	let posted;
	await page.route('**/*', async (route) => {
		if (route.request().method() !== 'POST') { await route.continue(); return; }
		posts++;
		posted = new URLSearchParams(route.request().postData());
		await route.fulfill({ status: statusCode, body: '' });
	});
	await page.getByRole('button', { name: 'Submit Reservation Request' }).click();
	await page.locator('[data-form-status][data-state="error"]').waitFor();
	assert.equal(await page.locator('[data-success-dialog]').isVisible(), false);
	assert.equal(await page.locator('#r-name').inputValue(), 'Test Person');
	assert.equal(posts, 1);
	assert.equal(posted.get('form-name'), 'reservation-request');
	assert.equal(posted.get('vehicle'), 'Coach Bus — 44 Passengers');
	assert.equal(posted.get('passengers'), '24');
	statusCode = 200;
	await page.getByRole('button', { name: 'Submit Reservation Request' }).click();
	await page.locator('[data-success-dialog][open]').waitFor();
	assert.equal(posts, 2);
	assert.equal(await page.locator('#r-name').inputValue(), '');
	assert.ok((await page.locator('[data-success-message]').textContent()).includes('does not confirm'));
	await page.keyboard.press('Escape');
	console.log('PASS: required fields, acknowledgement, failed submission, retry, payload and confirmed receipt');

	for (const width of [1440, 820, 390, 320]) {
		await page.setViewportSize({ width, height: 900 });
		for (const path of ['/fleet/', '/reservation/', '/fleet/classic-trolley/', '/fleet/super-coach-bus/', '/']) {
			await go(path);
			assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${path} at ${width}px`);
		}
	}
	const noScript = await browser.newContext({ javaScriptEnabled: false });
	const fallback = await noScript.newPage();
	await fallback.goto(base + '/fleet/');
	assert.equal(await fallback.locator('[data-fleet-card]:visible').count(), 10);
	assert.equal(await fallback.locator('[data-fleet-filter-controls]').isVisible(), false);
	await fallback.goto(base + '/fleet/super-coach-bus/');
	assert.equal(await fallback.locator('[data-gallery-photo]:visible').count(), 10);
	assert.equal(await fallback.locator('[data-gallery-controls]').isVisible(), false);
	await noScript.close();
	assert.deepEqual(errors, []);
	console.log('PASS: responsive layouts, no-JavaScript fleet and no browser errors');
} finally {
	await browser?.close();
	await new Promise((done) => server.close(done));
}
