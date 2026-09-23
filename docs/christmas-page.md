# Christmas Trolley page

`/christmas-trolley/` presents the seasonal Christmas Trolley as a private holiday lights tour. Its content outline follows the owner's [ChiTown Christmas Trolley page](https://chitowntrolley.com/christmas-trolley/): hero, amenities, a lights-route section, FAQs and a closing call to action. The copy is rewritten for Lake Geneva, and the layout is designed independently. The page is linked from the main nav, the footer and a "Seasonal service" section on `/services/`.

## Assets

Supplied by the site owner on September 23, 2026 and converted from PNG to WebP (quality 90) in `src/assets/christmas/`. Astro generates the responsive sizes.

| Local file | Shows | Used on |
| --- | --- | --- |
| `christmas-street.webp` | The trolley on a snowy, decorated street at dusk | Christmas page hero |
| `christmas-exterior.webp` | The trolley at dusk with roofline lights | Christmas page features; services seasonal section |
| `christmas-interior.webp` | Perimeter benches under a lit wood ceiling | Christmas page lights-route section |

The street scene is not identified as a Lake Geneva location, and its alt text does not name one. **Confirm the rights to all three images before launch.** If the street scene is a composite or AI-generated image, decide whether that is acceptable for marketing use.

The old vehicle page `/fleet/christmas-trolley/` no longer exists; it redirects here (`redirects` in `astro.config.mjs`, plus a 301 in `public/_redirects` for Netlify). The Christmas Trolley card on `/fleet/` links straight to this page through the `page` field in `src/data/fleet.ts`, and still uses its original card photo from `src/data/fleet-images.ts`.

## Content and facts

- Capacity (30, set by the owner on September 23, 2026; the ChiTown page lists 36), the seasonal status and the quote value come from the `christmas-trolley` entry in `src/data/fleet.ts`. Seating, the heated cabin, Bluetooth sound and the lights inside and out match that entry and the reference page.
- **Not asserted for Lake Geneva:** the reference page's BYOB policy, its six-to-twelve-month booking window, rear-balcony photos and its Chicagoland service area. The beverage FAQ asks guests to check the policy for their charter and states only the 21+ rule. **Supply the real beverage policy** if it should say more.
- No prices, tour durations, named light displays or specific neighborhoods appear.

## Links

- "Check Holiday Availability" and "Request a Christmas Trolley Quote" open the homepage quote form with the Christmas Trolley pre-selected (`/?vehicle=Christmas%20Trolley#getquote`).
- "Or make a reservation request" opens `/reservation/?vehicle=Christmas%20Trolley` with the vehicle pre-selected.
- The FAQ uses the shared `Faq.astro` accordion through its `items` prop.
- `LightString.astro` is a decorative, `aria-hidden` bulb string drawn with CSS gradients. Its twinkle is disabled under `prefers-reduced-motion`.
