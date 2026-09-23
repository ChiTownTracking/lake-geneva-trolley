# Wedding page

The wedding page follows the visual structure of the owner's [ChiTown wedding page](https://chitowntrolley.com/weddings/): photographic banner, featured trolley/coach pairing, separate wedding-party and guest routes, FAQs and a wedding quote dialog. Lake Geneva copy and fleet capacities are used throughout.

## Assets

Downloaded September 23, 2026 from the reference page, stored locally and optimized by Astro:

- `src/assets/photos/wedding-venue.webp`: https://chitowntrolley.com/_astro/wedding-banner-bg.M-sYEe6u_Z2ksu5Y.webp
- `src/assets/photos/wedding-trolley-coach.webp`: https://chitowntrolley.com/_astro/trolley-coach-desktop.CgcaQvTg_1tCvdR.webp

The hero frames the venue entrance on the right; its image is not identified as a specific Lake Geneva property. These dedicated files are separate from the placeholder generator's assets.

## Content and inquiries

- Capacities and vehicle links come from `src/data/fleet.ts`.
- The pairing is quoted around the customer's itinerary. Reference-site package hours, pricing, unlimited-mileage claims and reviews are not asserted for Lake Geneva.
- Planning cards occupy the editorial section; they do not present placeholder testimonials as customer reviews.
- `WeddingQuote.astro` uses the existing `FormRuntime.astro` submission handling and `formEndpoint` configuration. The additional Netlify form name is `wedding-quote-request`; configure notifications for this form alongside the existing forms when deploying.
- The quote dialog supports Escape, backdrop dismissal and native modal focus handling. Without JavaScript, its links go to the existing homepage quote form.
- Development submissions are deliberately skipped by the shared form handler. Production delivery still depends on the configured forms backend.

Run `npm run check`, `npm run build` and `npm run test:weddings` to verify the page. The wedding test checks four viewport widths, modal and FAQ keyboard access, required fields, failed/successful submission handling, payload contents and fallback links. Every form POST is intercepted locally.
