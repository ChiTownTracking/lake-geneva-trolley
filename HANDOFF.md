# Lake Geneva Trolley — handoff

Everything below is something the site needs from the business before it goes
live. Nothing in this list has been guessed at or filled in with placeholder
facts: where a detail is missing, the site either omits the block entirely or
says plainly that it is not available yet.

---

## 1. Business details (blocking for launch)

All of these live in one file: [`src/data/site.ts`](src/data/site.ts). Fill in
the `null`s and the whole site picks them up — top bar, footer, contact page,
call-to-action band and the `Organization` structured data.

| Field | Where it appears | Status |
| --- | --- | --- |
| `contact.phoneHref` / `phoneLabel` | Top bar, footer, contact page, CTA band | Done: +1 630-624-3448 (owner-supplied) |
| `contact.email` | Top bar, footer, contact page | **Missing** |
| `contact.address` | Footer, contact page, structured data | **Missing** |
| `socials[]` | Top bar, footer | **Missing** |

While these are empty the top bar shows the tagline and a "Request a quote"
link instead, and the footer/contact page point people at the quote form. No
fake number or address is ever rendered.

> The phone number (+1 630-624-3448) was supplied by the owner on
> September 23, 2026; it is the same number the ChiTown Trolley site lists. The
> ChiTown email and Elk Grove Village address were **not** carried over.

## 2. Facts deliberately left out

These were not invented. Each needs confirming before it can be published.

- **Fleet and passenger capacities.** The combined catalog in
  [`src/data/fleet.ts`](src/data/fleet.ts) now uses capacities and vehicle photos
  from the owner's two sites. See [`docs/fleet-sources.md`](docs/fleet-sources.md)
  for sources and reconciliation. Festive Trolley is now available, but its
  capacity is unpublished ("Capacity on request"); supply it so the listing and
  booking forms can show it. Christmas Trolley is seasonal.
- **Prices and minimums.** No rates, hourly minimums or "starting from" figures
  appear anywhere. Copy consistently says pricing is quoted per trip.
- **Deposit, payment and cancellation policy.** No FAQ covers these. Supply the
  real policy and it can be added to [`src/data/content.ts`](src/data/content.ts).
- **Service area.** Copy says charters are planned around Geneva Lake and asks
  for the full route; it does not claim a defined radius or list towns served.
- **Venue and resort names.** No property is named, so nothing implies a
  partnership, endorsement or guaranteed access.
- **Licensing, insurance and certifications.** No "licensed & insured" or
  women-owned/WBENC badge is shown. Provide documentation and these can go in
  the footer the way the reference site does.
- **Reviews and testimonials.** The homepage testimonial carousel is **built
  but carries placeholder quotes** - see the notice above `testimonials` in
  [`src/data/content.ts`](src/data/content.ts). Every quote reads "Placeholder
  review - replace before launch" and is signed "Client name / Town, WI", so it
  cannot ship unnoticed. **This is blocking for launch.** Replace the entries
  with real, attributable Lake Geneva Trolley reviews; emptying the array
  removes the section rather than leaving a gap. Nothing was carried over from
  the ChiTown Trolley site - those reviews were written by other people about a
  different service in another city, and re-signing them with Wisconsin names
  would invent customers this business has not had.
- **Legal pages.** No privacy policy or terms page exists, so the footer has no
  legal row. Both are usually required once a form collects personal data.
- **Planning guides / journal.** Omitted — the reference has one, but there is
  no Lake Geneva content to put in it yet.
- **Christmas Trolley beverage policy and booking window.** The ChiTown page
  advertises BYOB for guests 21+ and a six-to-twelve-month booking window.
  Neither is claimed for Lake Geneva; the FAQ tells guests to confirm the
  policy for their charter. See [`docs/christmas-page.md`](docs/christmas-page.md).
- **Chicago airport pickups.** `/chicago-il/` offers O'Hare and Midway transfers
  on request. Confirm the business is able to serve both airports. See
  [`docs/chicago-page.md`](docs/chicago-page.md).

## 3. Form delivery

The quote, reservation and contact forms are marked up for **Netlify Forms**
(`data-netlify="true"`, a hidden `form-name`, and a `bot-field` honeypot).
Because the pages are prerendered, Netlify's build-time parser will detect all
three.

- Form names: `quote-request`, `reservation-request`, `contact-message`.
- Submission target is `formEndpoint` in [`src/data/site.ts`](src/data/site.ts)
  (currently `/`). Point it elsewhere for Formspree, a serverless function, etc.
- **Success is only reported on a 2xx response.** A failure shows an error and
  tells the visitor to get in touch another way — it never shows a false
  confirmation. This is covered by
  [`scripts/interaction-test.mjs`](scripts/interaction-test.mjs).
- During `astro dev` the request is skipped and the form says so, so a local run
  cannot be mistaken for a working submission.

**Action needed:** confirm the host. If the site is not deployed to Netlify,
set `formEndpoint` to a real endpoint — otherwise every submission will fail
loudly (by design) and no enquiry will reach anyone.

Also worth adding: a notification recipient for form submissions, and
`/success`-style redirect handling if you prefer that to the in-page dialog.

## 4. Photography

The **homepage hero photograph is real** — the supplied golden-hour shot of the
Sprinter, trolley and coach beside the lake. Everything else in
`src/assets/photos/` is still a
**development placeholder**, generated by `node scripts/generate-placeholders.mjs`
and stamped "DEV PLACEHOLDER" with its brief and pixel size. None of ChiTown
Trolley's photography was reused.

Shots marked `supplied: true` in the shot list are skipped by the generator, so
re-running it cannot overwrite real artwork.

The brief for each shot lives in
[`scripts/shot-list.mjs`](scripts/shot-list.mjs). To go live, drop a real
photograph over the file of the same name at the same aspect ratio — no code
changes needed. Alt text lives alongside the imports in
[`src/data/images.ts`](src/data/images.ts) and should be checked against the
final photographs.

| File | Size | Shot |
| --- | --- | --- |
| `hero-desktop.jpg` | 1774×887 | **Supplied.** Golden-hour lineup beside Geneva Lake. |
| `hero-mobile.jpg` | 832×1286 | **Supplied** (September 23, 2026). A separate portrait photo: the trolley on a lakeside drive at sunset. **The backdrop shows alpine mountains and a European waterfront, which reads as Lake Geneva, Switzerland rather than Wisconsin** (see the direction note below). Confirm usage rights and that this is intended. |
| `fleet-classic-trolley.png` | 1200×800 | Three-quarter exterior at a lakeside venue. |
| `fleet-limo-trolley.jpg` | 1200×800 | Interior showing the circular perimeter seating. |
| `fleet-coach-bus.jpg` | 1200×800 | Coach at a hotel entrance during loading. |
| `fleet-limo-van.jpg` | 1200×800 | Limo van on a residential lake road. |
| `occasions.jpg` | 1200×1400 | Wedding party boarding, lake and mature trees behind. |
| `banner-fleet.jpg` | 2400×900 | Trolley on a shoreline drive, late afternoon. |
| `banner-weddings.jpg` | 2400×900 | Couple and wedding party outside the trolley. |
| `banner-services.jpg` | 2400×900 | Group boarding at a resort entrance. |
| `banner-contact.jpg` | 2400×900 | Geneva Lake waterfront, boats and wooded shoreline. |
| `og-default.jpg` | 1200×630 | Signature trolley-and-lake shot for social sharing. |

Direction: Wisconsin lake country — waterfront, leafy roads, lakeside venues,
relaxed celebrations. No tropical beaches, no Chicago skyline, nothing from
Lake Geneva, Switzerland.

**Worth knowing about the hero:** the supplied file is 1774px wide. That is
comfortable on desktop — the hero box is wider than the photo's 2:1, so it crops
vertically rather than losing the lineup. Phones use a separate portrait photo,
`hero-mobile.jpg`, which is 832px wide: roughly 2.1× density on a 390px phone.
A wider original of either photo can be dropped in over the same file name.

The same photograph would also make a much better `og-default.jpg` (the social
share image, still a placeholder) than anything else currently available.

Also needed: a **real brand mark**. `public/favicon.svg` and `favicon.ico` are
an interim gold-on-navy placeholder — enough that the site does not ship with
Astro's logo, but not a designed identity.

## 5. Analytics and tooling

The reference site runs Google Ads tag `gtag.js` and Microsoft Clarity. Nothing
equivalent has been added here — no third-party script is loaded at all. Supply
the property IDs if you want them, and note that a consent banner may be
required depending on where visitors are.

## 6. Pre-launch checklist

- [ ] Fill in `contact` and `socials` in `src/data/site.ts`
- [ ] Review current availability in `src/data/fleet.ts`; capacities and photos are sourced in `docs/fleet-sources.md`
- [ ] Replace the 10 remaining placeholder photographs (the hero is supplied)
- [ ] Replace the favicon and add a brand mark
- [ ] Confirm the host and `formEndpoint`; send a real test submission
- [ ] Add privacy policy and terms pages, then link them in the footer
- [ ] Add real testimonials, or leave the section out
- [ ] Verify the production domain matches `site` in `astro.config.mjs`
      (`https://lakegenevatrolley.com`) so canonicals and the sitemap are right
