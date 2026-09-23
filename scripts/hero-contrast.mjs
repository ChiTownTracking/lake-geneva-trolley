/**
 * Measures white hero text against the photograph behind it.
 *
 *   node scripts/hero-contrast.mjs [baseUrl]
 *
 * Hides the hero copy, screenshots the scrimmed photograph, then reports the
 * contrast ratio over each text element's box — both the mean and the worst
 * case (the single brightest pixel behind the text). Worth re-running whenever
 * the hero photograph changes: a brighter image can quietly drop the headline
 * below a readable ratio even though the page looks fine at a glance.
 *
 * Targets: 3:1 for the large headline, 4.5:1 for the lead.
 */
import { chromium } from 'playwright-core';
import sharp from 'sharp';

const base = process.argv[2] ?? 'http://localhost:4323';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const viewports = [
	{ name: '1440', width: 1440, height: 900, mobile: false },
	{ name: '1920', width: 1920, height: 880, mobile: false },
	{ name: '820', width: 820, height: 900, mobile: false },
	{ name: '390', width: 390, height: 844, mobile: true },
];

/** Minimum acceptable worst-case ratio per element. */
const targets = { '.hero__title': 3, '.hero__lead': 4.5 };

const luminance = (r, g, b) => {
	const [rl, gl, bl] = [r, g, b]
		.map((v) => v / 255)
		.map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
	return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;
};
const ratio = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

const browser = await chromium.launch({ executablePath: CHROME });
let failures = 0;

for (const vp of viewports) {
	const context = await browser.newContext({
		viewport: { width: vp.width, height: vp.height },
		isMobile: vp.mobile,
		hasTouch: vp.mobile,
		deviceScaleFactor: 1,
	});
	const page = await context.newPage();
	await page.goto(base + '/', { waitUntil: 'networkidle' });
	await page.waitForTimeout(400);

	const boxes = await page.evaluate((selectors) => {
		return selectors
			.map((sel) => {
				const el = document.querySelector(sel);
				if (!el) return null;
				const r = el.getBoundingClientRect();
				return {
					sel,
					x: Math.round(r.x),
					y: Math.round(r.y),
					w: Math.round(r.width),
					h: Math.round(r.height),
				};
			})
			.filter(Boolean);
	}, Object.keys(targets));

	await page.evaluate(() => {
		document.querySelectorAll('.hero__content').forEach((el) => {
			el.style.visibility = 'hidden';
		});
	});
	await page.waitForTimeout(200);

	const image = sharp(await page.screenshot());
	console.log(`\n== ${vp.name}px ==`);

	for (const box of boxes) {
		const { data, info } = await image
			.clone()
			.extract({
				left: Math.max(0, box.x),
				top: Math.max(0, box.y),
				width: Math.max(1, box.w),
				height: Math.max(1, box.h),
			})
			.raw()
			.toBuffer({ resolveWithObject: true });

		let brightest = 0;
		let sum = 0;
		let count = 0;
		for (let i = 0; i < data.length; i += info.channels) {
			const l = luminance(data[i], data[i + 1], data[i + 2]);
			if (l > brightest) brightest = l;
			sum += l;
			count++;
		}

		const worst = ratio(1, brightest);
		const mean = ratio(1, sum / count);
		const target = targets[box.sel];
		const ok = worst >= target;
		if (!ok) failures++;
		console.log(
			`  ${ok ? 'ok  ' : 'LOW '} ${box.sel.padEnd(14)} worst ${worst.toFixed(2)}:1   mean ${mean.toFixed(2)}:1   (target ${target}:1)`,
		);
	}

	await context.close();
}

await browser.close();
console.log(failures === 0 ? '\nAll hero text meets its contrast target.' : `\n${failures} below target.`);
process.exit(failures > 0 ? 1 : 0);
