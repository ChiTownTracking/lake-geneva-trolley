# Homepage performance

Optimized October 4, 2026, following [Google's Core Web Vitals guidance](https://developers.google.com/search/docs/appearance/core-web-vitals), [LCP guidance](https://web.dev/articles/optimize-lcp) and [layout stability guidance](https://web.dev/articles/optimize-cls).

## Local production-build results

Lighthouse 13.5.0, Chrome, a local Astro production preview, cold-cache simulated mobile throttling. These are lab measurements from one baseline and one final run, not live PageSpeed Insights or Search Console field data. Lighthouse scores vary between runs.

| Metric | Before, mobile | After, mobile | After, desktop |
| --- | ---: | ---: | ---: |
| Performance score | 86 | 99 | 100 |
| First Contentful Paint | 1.96 s | 1.21 s | 0.34 s |
| Largest Contentful Paint | 3.23 s | 2.19 s | 0.66 s |
| Cumulative Layout Shift | 0.1352 | 0.0003 | 0 |
| Total Blocking Time | 0 ms | 0 ms | 0 ms |
| Transferred resources during audit | 780 KiB | 403 KiB | 534 KiB |

Accessibility, best practices and SEO remained 100 in both final audits. Total Blocking Time is a lab diagnostic; this does not measure real-user Interaction to Next Paint.

## Changes

- Responsive AVIF hero images with WebP fallbacks, eager loading and high fetch priority. Media-specific preloads use the same candidates as the picture, avoiding duplicate downloads.
- Inlined the site's modest CSS bundles to remove four render-blocking stylesheet requests from the homepage.
- Kept the existing brand fonts, limited their files to Latin WOFF2 subsets, preloaded the homepage's three critical fonts and added metric-adjusted local fallbacks to limit movement while fonts load.
- Optimized fleet photos and other homepage photography, with responsive sizes and crops matching their containers. Lazy loading remains on photographs below the hero.
- Kept fleet interior photos in inert templates until a desktop mouse or keyboard user requests a preview. Touch visitors no longer download these unused hover photos.
- Added one-year immutable caching for fingerprinted `/_astro/` assets in the Netlify configuration. This applies when deployed to Netlify; the preview audits do not measure this hosting change.
- Preserved heading text, SEO copy, navigation, vehicle facts and booking behavior.

## Verification

`npm run build` and `npm run check` pass. Existing interaction checks pass 31/31, including the mobile menu, keyboard navigation, FAQ, quote wizard and intercepted form success/failure responses. Hero contrast checks pass at 390, 820, 1440 and 1920 pixels. The new browser checks verify one responsive hero download, deferred fleet interiors, hover/keyboard previews and no page overflow at 320, 390, 820, 1440 and 1920 pixels, plus usable content and links without JavaScript. No customer inquiries were sent.

To repeat browser checks, build and run a production preview:

```powershell
npm run build
npm run preview -- --host 127.0.0.1 --port 4323
```

In another terminal:

```powershell
npm run test:performance
node scripts/interaction-test.mjs http://127.0.0.1:4323
node scripts/hero-contrast.mjs http://127.0.0.1:4323
```

After deployment, audit the public homepage in [PageSpeed Insights](https://pagespeed.web.dev/) and monitor Search Console's Core Web Vitals report. Google's good-experience targets are LCP within 2.5 seconds, INP below 200 milliseconds and CLS below 0.1. Meeting them supports page experience, but does not guarantee higher rankings.
