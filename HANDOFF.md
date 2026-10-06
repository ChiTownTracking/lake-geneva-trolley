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
| `contact.email` | Top bar, footer, contact page, reservation page | Done: info@lakegenevatrolleys.com (owner-supplied) |
| `contact.address` | Footer, contact page, structured data | Intentionally not published (owner request, September 27, 2026) |
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
- **Service area.** The homepage redesign (October 3, 2026) names Lake Geneva,
  Fontana, Williams Bay, Delavan and Elkhorn, plus southern Wisconsin and
  Chicago trips on request (see `serviceAreas` and `homeFaqs` in
  [`src/data/home.ts`](src/data/home.ts)). No radius is claimed. **Confirm the
  business serves each of those towns**, or trim the list.
- **Venue and resort names.** No property is named, so nothing implies a
  partnership, endorsement or guaranteed access.
- **Licensing, insurance and certifications.** No "licensed & insured" or
  women-owned/WBENC badge is shown. Provide documentation and these can go in
  the footer the way the reference site does.
- **Reviews and testimonials.** The homepage review carousel shows three
  reviews supplied by the owner on October 4, 2026 (Emily Carter, Michael
  Bennett, Rachel Morgan), in `testimonials` in
  [`src/data/content.ts`](src/data/content.ts). They came without star ratings
  or towns, so neither is shown; add them only from the source reviews. Nothing
  was carried over from the ChiTown Trolley site.
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

All four forms are set up for **Netlify Forms** (`data-netlify="true"`, a
hidden `form-name`, and a `bot-field` honeypot), and
[`netlify.toml`](netlify.toml) tells Netlify how to build the site. Because the
pages are prerendered, Netlify's build-time parser detects every form; each
form name has the same fields on every page it appears on.

| Form name | Where |
| --- | --- |
| `quote-request` | Home, Chicago, Southern Wisconsin |
| `wedding-quote-request` | Weddings |
| `reservation-request` | Reservation (includes the card fields) |
| `contact-message` | Contact |

- Submission target is `formEndpoint` in [`src/data/site.ts`](src/data/site.ts)
  (`/`, which is what Netlify Forms expects).
- **Success is only reported on a 2xx response.** A failure shows an error and
  tells the visitor to get in touch another way — it never shows a false
  confirmation. This is covered by
  [`scripts/interaction-test.mjs`](scripts/interaction-test.mjs).
- During `astro dev` the request is skipped and the form says so, so a local run
  cannot be mistaken for a working submission.

**Action needed in the Netlify dashboard** (these cannot be set from the repo):

1. **Turn on form detection:** Site configuration → Forms → Enable form
   detection. Newer Netlify sites have it off by default; until it is on, no
   form is registered and every submission fails. Redeploy after enabling it.
2. **Email delivery is through Resend.**
   [`netlify/functions/submission-created.mjs`](netlify/functions/submission-created.mjs)
   runs after every submission that passes Netlify's spam filter. It emails
   info@lakegenevatrolleys.com, sets the reply-to address to the customer's email,
   and uses these subjects: `Quote - <name>`, `Wedding Quote - <name>`,
   `Reservation - <name>` and `Contact - <name>`. Set `RESEND_API_KEY` under
   Site configuration → Environment variables. You can also set `RESEND_FROM`
   if the sender should not be `forms@lakegenevatrolleys.com`. The sender's
   domain must be verified in Resend. Remove any Netlify built-in email
   notification for these forms, or each enquiry arrives twice.
3. **Send a test submission from each form** on the live site and confirm it
   appears under Forms and arrives by email.

**Card data:** the reservation form collects card number, expiration and
security code. Netlify stores submissions and includes them in notification
emails, so confirm with your security provider that this data path is covered.
PCI rules do not allow storing the security code after authorization.

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

**Favicons are supplied** (October 4, 2026): the LGT monogram in `public/` at
16, 32, 180 (Apple touch icon), 192 and 512 pixels, plus `favicon.ico` built
from the 16 and 32 pixel files and `site.webmanifest` for Android.

## 5. Analytics and tooling

The reference site runs Google Ads tag `gtag.js` and Microsoft Clarity. Nothing
equivalent has been added here — no third-party script is loaded at all. Supply
the property IDs if you want them, and note that a consent banner may be
required depending on where visitors are.

## 6. Pre-launch checklist

- [ ] Fill in `contact` and `socials` in `src/data/site.ts`
- [ ] Review current availability in `src/data/fleet.ts`; capacities and photos are sourced in `docs/fleet-sources.md`
- [ ] Replace the 10 remaining placeholder photographs (the hero is supplied)
- [x] Replace the favicon (supplied October 4, 2026)
- [ ] Enable form detection and notifications in Netlify; send a real test submission from each form
- [ ] Add privacy policy and terms pages, then link them in the footer
- [x] Add real testimonials (supplied October 4, 2026)
- [ ] Verify the production domain matches `site` in `astro.config.mjs`
      (`https://lakegenevatrolley.com`) so canonicals and the sitemap are right
