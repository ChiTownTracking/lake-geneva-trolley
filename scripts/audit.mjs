/**
 * Visual + layout audit. Drives the locally installed Chrome through
 * playwright-core (no browser download).
 *
 *   node scripts/audit.mjs [baseUrl] [outDir]
 *
 * Reports horizontal overflow, contrast-relevant colours, and writes full-page
 * screenshots at mobile / tablet / desktop widths.
 */
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright-core';

const base = process.argv[2] ?? 'http://localhost:4322';
const outDir = process.argv[3] ?? 'C:/Users/abs55/AppData/Local/Temp/claude/lgt-shots';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const routes = ['/', '/fleet', '/weddings', '/christmas-trolley', '/chicago-il', '/services', '/faq', '/contact', '/reservation'];
const viewports = [
	{ name: 'mobile', width: 390, height: 844, mobile: true },
	{ name: 'tablet', width: 820, height: 1180, mobile: false },
	{ name: 'desktop', width: 1440, height: 900, mobile: false },
];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ executablePath: CHROME });
let problems = 0;

for (const vp of viewports) {
	const context = await browser.newContext({
		viewport: { width: vp.width, height: vp.height },
		deviceScaleFactor: 1,
		isMobile: vp.mobile,
		hasTouch: vp.mobile,
	});
	const page = await context.newPage();

	for (const route of routes) {
		await page.goto(base + route, { waitUntil: 'networkidle' });
		// Walk the page so reveal-on-scroll sections are in their settled state.
		await page.evaluate(async () => {
			const step = Math.round(window.innerHeight * 0.8);
			for (let y = 0; y < document.body.scrollHeight; y += step) {
				window.scrollTo({ top: y, behavior: 'instant' });
				await new Promise((r) => setTimeout(r, 80));
			}
			window.scrollTo({ top: 0, behavior: 'instant' });
		});
		await page.waitForTimeout(400);

		const hidden = await page.evaluate(() =>
			Array.from(document.querySelectorAll('.rv')).filter(
				(el) => Number(getComputedStyle(el).opacity) < 0.95,
			).length,
		);

		const report = await page.evaluate(() => {
			const docWidth = document.documentElement.clientWidth;
			const offenders = [];
			// The mobile drawer parks off-screen at translateX(100%) by design.
			const drawer = document.querySelector('[data-menu-panel]');
			const drawerClosed = !document.querySelector('.hdr')?.classList.contains('is-menu-open');
			for (const el of document.querySelectorAll('body *')) {
				const style = getComputedStyle(el);
				if (style.position === 'fixed' || style.display === 'none') continue;
				if (drawerClosed && drawer && (el === drawer || drawer.contains(el))) continue;
				const rect = el.getBoundingClientRect();
				if (rect.width === 0) continue;
				if (rect.right > docWidth + 1 || rect.left < -1) {
					offenders.push({
						tag: el.tagName.toLowerCase(),
						cls: (el.className?.baseVal ?? el.className ?? '').toString().slice(0, 70),
						left: Math.round(rect.left),
						right: Math.round(rect.right),
						width: Math.round(rect.width),
					});
				}
			}
			return {
				docWidth,
				scrollWidth: document.documentElement.scrollWidth,
				bodyScrollWidth: document.body.scrollWidth,
				offenders: offenders.slice(0, 12),
				offenderCount: offenders.length,
			};
		});

		const slug = route === '/' ? 'home' : route.replace(/\//g, '');
		await page.screenshot({ path: `${outDir}/${vp.name}-${slug}.png`, fullPage: true });

		if (hidden > 0) {
			problems++;
			console.log(`\n[${vp.name} ${vp.width}px] ${route}: ${hidden} .rv section(s) still hidden`);
		}

		if (report.offenderCount > 0 || report.scrollWidth > report.docWidth + 1) {
			problems++;
			console.log(`\n[${vp.name} ${vp.width}px] ${route}`);
			console.log(
				`  doc ${report.docWidth}  scrollWidth ${report.scrollWidth}  offenders ${report.offenderCount}`,
			);
			for (const o of report.offenders) {
				console.log(`   - <${o.tag} class="${o.cls}"> L${o.left} R${o.right} W${o.width}`);
			}
		}
	}

	await context.close();
}

await browser.close();
console.log(problems === 0 ? '\nNo horizontal overflow found.' : `\n${problems} page/viewport combos with overflow.`);
console.log(`Screenshots: ${outDir}`);
