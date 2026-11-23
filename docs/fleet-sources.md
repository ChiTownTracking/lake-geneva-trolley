# Fleet catalog and photo sources

Updated September 23, 2026 from the owner's [ChiTown Trolley](https://chitowntrolley.com/fleet/) and [Chicago Supercoach Bus](https://chicagosupercoachbus.com/fleet) sites, following the request to combine their vehicles and images. The trolley listings were replaced on November 23, 2026 with the five trolleys on the [ChiTown fleet page](https://chitowntrolley.com/fleet/#trolley), keeping their ChiTown names (T3, T4, T5, T7, T8); the Christmas Trolley was kept at the owner's request.

The catalog contains 12 listings in four categories. These are vehicle offerings, not a claim that 12 separate physical vehicles are available simultaneously. Christmas Trolley is a seasonal service.

| Category | Listing | Published capacity | Detail sources | Local photos |
| --- | --- | --- | --- | --- |
| Trolley Buses | White Trolley Classic - T3 | 30; forward-facing rows, rear balcony | [ChiTown](https://chitowntrolley.com/fleet/classic-white-trolley/) | 4 |
| Trolley Buses | White Limo Trolley - T4 | 36; circular limo-style seating | [ChiTown](https://chitowntrolley.com/fleet/white-limo-trolley/) | 5 |
| Trolley Buses | White Limo Trolley - T5 | 36; perimeter wood benches | [ChiTown](https://chitowntrolley.com/fleet/wedding-trolley-chicago/) | 5 |
| Trolley Buses | Festive Trolley - T7 | 30; wraparound wood benches | [ChiTown](https://chitowntrolley.com/fleet/festive-trolley/) | 6 |
| Trolley Buses | White Trolley Classic - T8 | 30; forward-facing benches, open rear platform | [ChiTown](https://chitowntrolley.com/fleet/chicago-trolley/) | 5 |
| Trolley Buses | Christmas Trolley | 30 (owner-confirmed; ChiTown lists 36); seasonal | [ChiTown](https://chitowntrolley.com/christmas-trolley/) | 1 |
| Coach Buses | Super Coach Bus | 50–57 | [Supercoach](https://chicagosupercoachbus.com/fleet/supercoach), [ChiTown](https://chitowntrolley.com/fleet/super-coach-bus/) | 10 |
| Coach Buses | Coach Bus | 39–44 | [Supercoach](https://chicagosupercoachbus.com/fleet/coach), [ChiTown](https://chitowntrolley.com/fleet/coach-bus-44/) | 3 |
| Coach Buses | Small Coach Bus | 22–28 | [Supercoach](https://chicagosupercoachbus.com/fleet/small-coach), [ChiTown](https://chitowntrolley.com/fleet/coach-bus-28/) | 3 |
| Party Buses | Party Bus | Up to 40 | [ChiTown](https://chitowntrolley.com/fleet/party-bus/); replacement photos supplied by owner | 2 |
| Sprinter Vans | Limo Van | Up to 14; lounge seating | [ChiTown](https://chitowntrolley.com/fleet/limo-vans/) | 3 |
| Sprinter Vans | Executive Sprinter Van | 13–15; individual seats | [Supercoach](https://chicagosupercoachbus.com/fleet/executive-sprinter), [ChiTown](https://chitowntrolley.com/fleet/executive-van/) | 5 |

## Reconciliation

- The three coach classes appear on both sites with matching capacity ranges and vehicle imagery. Each class has one listing here, with photos combined where the sites provide different views.
- ChiTown's Executive Van and Supercoach's Executive Sprinter use the same two interior images, including the conference table. They are represented as one offering, Executive Sprinter Van, with the published 13–15 capacity from Supercoach. The Limo Van remains separate because its lounge seating is different.
- Each ChiTown trolley is its own listing under its ChiTown name, with capacity, features and photos from its ChiTown detail page; descriptions are lightly reworded for Lake Geneva. The retired Classic, Limo and Festive Trolley URLs redirect (301) to the T3, T4 and T7 listings (`astro.config.mjs` and `public/_redirects`).
- Christmas Trolley is marked Seasonal. Its route and date are subject to confirmation; no Chicago route or published tour schedule was copied to Lake Geneva.
- Coach capacity ranges are preserved. Lavatories and undercarriage storage are described as available on request where the source says so.
- Prices, minimum hours, deposits and cancellation terms were not imported as vehicle facts.
- **Form vehicle options** (October 4, 2026, owner request) follow the ChiTown Trolley quote form, with sizes shown as a bare number ("Coach Bus — 44"): `vehicleChoices` in `src/data/fleet.ts`, used by the quote and reservation forms (the wedding form sends the Wedding Package value). Each fleet listing's `quoteValue` points at one of them (the build fails if one does not). Five choices have no Lake Geneva fleet listing: Party Bus 45, 35 and 25, and Coach Bus 50 and 40. Confirm they can be offered here, or remove them.

## Maintaining the implementation

- `src/data/fleet.ts` owns categories, descriptions, capacities, status and booking values. Fleet pages, homepage previews and both forms use this data.
- `src/data/fleet-images.ts` maps 52 photos to galleries: 50 from the source sites and two replacement party bus PNGs supplied by the owner. Originals are in `src/assets/fleet/`; Astro generates responsive images during the build. The site does not hotlink the source websites.
- `docs/fleet-image-sources.json` records each active asset's source URL or supplied file path, local filename and dimensions. The owner's `party-bus.png` and `party-bus-interior.png` replace the earlier three-image party bus gallery across the homepage, fleet and wedding cards, and vehicle detail page.
- The homepage Trolley card and the social sharing image use the White Trolley Classic - T8 exterior (`fleetClassicTrolley` in `src/data/images.ts`); the card reveals the White Limo Trolley - T5 interior on hover or keyboard focus.
- Category hashes are retained. Retired vehicle IDs redirect to their replacements; retired trolley form values are no longer offered.

Run `npm run check`, `npm run build` and `npm run test:booking` after fleet changes. The booking test serves the production build locally and intercepts form submissions.
