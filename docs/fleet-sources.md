# Fleet catalog and photo sources

Updated September 23, 2026 from the owner's [ChiTown Trolley](https://chitowntrolley.com/fleet/) and [Chicago Supercoach Bus](https://chicagosupercoachbus.com/fleet) sites, following the request to combine their vehicles and images.

The catalog contains 10 listings in four categories. These are vehicle offerings, not a claim that 10 separate physical vehicles are available simultaneously. Christmas Trolley is a seasonal service.

| Category | Listing | Published capacity | Detail sources | Local photos |
| --- | --- | --- | --- | --- |
| Trolley Buses | Classic Trolley | 30; forward-facing rows | [ChiTown](https://chitowntrolley.com/fleet/classic-white-trolley/) | 3 |
| Trolley Buses | Limo Trolley | 36; perimeter seating | [ChiTown](https://chitowntrolley.com/fleet/white-limo-trolley/) | 6 |
| Trolley Buses | Christmas Trolley | 30 (owner-confirmed; ChiTown lists 36); seasonal | [ChiTown](https://chitowntrolley.com/christmas-trolley/) | 1 |
| Trolley Buses | Festive Trolley | Not published; available (owner, September 23, 2026) | [ChiTown](https://chitowntrolley.com/fleet/festive-trolley/) | 1 |
| Coach Buses | Super Coach Bus | 50–57 | [Supercoach](https://chicagosupercoachbus.com/fleet/supercoach), [ChiTown](https://chitowntrolley.com/fleet/super-coach-bus/) | 10 |
| Coach Buses | Coach Bus | 39–44 | [Supercoach](https://chicagosupercoachbus.com/fleet/coach), [ChiTown](https://chitowntrolley.com/fleet/coach-bus-44/) | 3 |
| Coach Buses | Small Coach Bus | 22–28 | [Supercoach](https://chicagosupercoachbus.com/fleet/small-coach), [ChiTown](https://chitowntrolley.com/fleet/coach-bus-28/) | 3 |
| Party Buses | Party Bus | Up to 40 | [ChiTown](https://chitowntrolley.com/fleet/party-bus/); replacement photos supplied by owner | 2 |
| Sprinter Vans | Limo Van | Up to 14; lounge seating | [ChiTown](https://chitowntrolley.com/fleet/limo-vans/) | 3 |
| Sprinter Vans | Executive Sprinter Van | 13–15; individual seats | [Supercoach](https://chicagosupercoachbus.com/fleet/executive-sprinter), [ChiTown](https://chitowntrolley.com/fleet/executive-van/) | 5 |

## Reconciliation

- The three coach classes appear on both sites with matching capacity ranges and vehicle imagery. Each class has one listing here, with photos combined where the sites provide different views.
- ChiTown's Executive Van and Supercoach's Executive Sprinter use the same two interior images, including the conference table. They are represented as one offering, Executive Sprinter Van, with the published 13–15 capacity from Supercoach. The Limo Van remains separate because its lounge seating is different.
- Classic and Limo Trolley remain separate entries. Classic uses the source's forward-facing interior photos; Limo uses perimeter seating photos.
- Festive Trolley is available for quotes and reservations (changed from Coming Soon by the owner on September 23, 2026). It has no inferred capacity; its label reads "Capacity on request". Its fleet-card hover shows the Classic Trolley's forward-facing cabin photo (`interiorFrom` in `src/data/fleet.ts`); that photo is not added to the Festive Trolley's own gallery.
- Christmas Trolley is marked Seasonal. Its route and date are subject to confirmation; no Chicago route or published tour schedule was copied to Lake Geneva.
- Coach capacity ranges are preserved. Lavatories and undercarriage storage are described as available on request where the source says so.
- Prices, minimum hours, deposits and cancellation terms were not imported as vehicle facts.
- **Form vehicle options** (October 4, 2026, owner request) follow the ChiTown Trolley quote form, with sizes shown as a bare number ("Coach Bus — 44"): `vehicleChoices` in `src/data/fleet.ts`, used by the quote and reservation forms (the wedding form sends the Wedding Package value). Each fleet listing's `quoteValue` points at one of them (the build fails if one does not). Five choices have no Lake Geneva fleet listing: Party Bus 45, 35 and 25, and Coach Bus 50 and 40. Confirm they can be offered here, or remove them.

## Maintaining the implementation

- `src/data/fleet.ts` owns categories, descriptions, capacities, status and booking values. Fleet pages, homepage previews and both forms use this data.
- `src/data/fleet-images.ts` maps 37 photos to galleries: 35 from the source sites and two replacement party bus PNGs supplied by the owner. Originals are in `src/assets/fleet/`; Astro generates responsive images during the build. The site does not hotlink the source websites.
- `docs/fleet-image-sources.json` records each active asset's source URL or supplied file path, local filename and dimensions. The owner's `party-bus.png` and `party-bus-interior.png` replace the earlier three-image party bus gallery across the homepage, fleet and wedding cards, and vehicle detail page.
- The homepage retains the requested `fleet-classic-trolley.png` as the umbrella Trolley Bus card and reveals the Limo Trolley's perimeter-seating interior on hover or keyboard focus. The individual Classic Trolley listing uses its actual source exterior and forward-facing interior photos.
- Existing vehicle IDs, category hashes and form values are retained so existing links continue to work.

Run `npm run check`, `npm run build` and `npm run test:booking` after fleet changes. The booking test serves the production build locally and intercepts form submissions.
