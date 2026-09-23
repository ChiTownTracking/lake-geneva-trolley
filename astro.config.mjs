// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://lakegenevatrolley.com',
	trailingSlash: 'ignore',
	integrations: [
		// The redirect stub is not a real page, so keep it out of the sitemap.
		sitemap({ filter: (page) => !page.includes('/fleet/christmas-trolley') }),
	],
	// The Christmas Trolley has its own page; send the old fleet URL there.
	redirects: {
		'/fleet/christmas-trolley': '/christmas-trolley/',
	},
	image: {
		// Placeholder photography lives in src/assets/photos and is processed by
		// astro:assets. Swapping in real photos needs no code change.
		responsiveStyles: true,
	},
});
