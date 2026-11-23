// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Retired fleet URLs and where they now lead. The Christmas Trolley has its own
// page; the original trolley listings were replaced by the ChiTown fleet
// (T3, T4, T5, T7, T8) on November 23, 2026. Mirrored in public/_redirects.
const redirects = {
	'/fleet/christmas-trolley': '/christmas-trolley/',
	'/fleet/classic-trolley': '/fleet/white-trolley-classic-t3/',
	'/fleet/limo-trolley': '/fleet/white-limo-trolley-t4/',
	'/fleet/festive-trolley': '/fleet/festive-trolley-t7/',
};

// https://astro.build/config
export default defineConfig({
	site: 'https://lakegenevatrolleys.com',
	trailingSlash: 'ignore',
	// These static pages have modest CSS bundles. Inlining avoids the stylesheet
	// round trips that delayed the homepage's first paint on mobile connections.
	build: { inlineStylesheets: 'always' },
	integrations: [
		// Redirect stubs are not real pages, so keep them out of the sitemap.
		sitemap({
			filter: (page) => !Object.keys(redirects).some((from) => new URL(page).pathname.replace(/\/$/, '') === from),
		}),
	],
	redirects,
	image: {
		// Placeholder photography lives in src/assets/photos and is processed by
		// astro:assets. Swapping in real photos needs no code change.
		responsiveStyles: true,
	},
});
