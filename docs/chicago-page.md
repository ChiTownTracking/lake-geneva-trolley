# Chicago, IL page

`/chicago-il/` presents Lake Geneva Trolley & Bus Rental's service in Chicago, Illinois. It is linked from the More menu in the main nav, the footer and the Airport & Chicago section of `/services/`. The design is original. Its accents come from the Chicago city flag: light-blue stripes and red six-pointed stars, used purely as decoration.

## Photography

Downloaded September 23, 2026 from [Pexels](https://www.pexels.com/). All six are offered under the [Pexels License](https://www.pexels.com/license/), which permits free commercial use without attribution. They are stored in `src/assets/chicago/`; Astro generates the responsive versions.

| Local file | Photographer | Pexels page | Used for |
| --- | --- | --- | --- |
| `river-night.jpg` | Qiang Lai | [Night view of Chicago River skyline](https://www.pexels.com/photo/stunning-night-view-of-chicago-river-skyline-32149681/) | Hero |
| `skyline-lake.jpg` | King | [Skyscrapers by Lake Michigan](https://www.pexels.com/photo/skyscrapers-by-lake-michigan-in-chicago-usa-19001877/) | City-to-lake section |
| `wedding-park.jpg` | Sarthak Banga | [Autumn wedding in a Chicago park](https://www.pexels.com/photo/romantic-autumn-wedding-in-chicago-park-34494897/) | Weddings card |
| `riverwalk.jpg` | Dominik Gryzbon | [Dearborn Street bridge and river](https://www.pexels.com/photo/chicago-dearborn-street-bridge-and-river-view-31222622/) | Corporate card |
| `airport-landing.jpg` | Mik Hapte | [Airplane at sunset](https://www.pexels.com/photo/yellow-sky-over-airplane-during-takeoff-19925645/) | Airport card |
| `skyline-night.jpg` | Chait Goli | [Cityscape](https://www.pexels.com/photo/cityscape-1797195/) | Nights out card |

The airport photo was taken in Los Angeles, so its alt text describes a plane landing at dusk and does not name O'Hare or Midway. The event photos illustrate occasions; they do not show Lake Geneva Trolley & Bus Rental customers or vehicles. The hero photo includes a building's rooftop sign as part of the skyline.

## Content and facts

- The page states that the business serves Chicago, as directed by the owner on September 23, 2026.
- Vehicle names and capacities in the fleet strip and FAQ come from `src/data/fleet.ts`.
- **Confirm before launch:** O'Hare and Midway pickups are presented as available on request. Airports set their own rules for commercial ground transportation, so confirm the business can serve both.
- "About 80 miles" is the approximate driving distance between downtown Chicago and Lake Geneva, Wisconsin.
- The page makes no claims about prices, a defined service radius, named suburbs, venues or response times. The pickup FAQ asks for full addresses and promises only to confirm the route.

## Links

- The page carries its own copy of the site quote form (`QuoteForm.astro`, Netlify form name `quote-request`) directly below the flag strip, at `#getquote`.
- Every quote link on the page scrolls to that form. The service cards and the city-to-lake button also pre-select the event type via the hash (`#getquote?type=Wedding`, `Corporate Event`, `Airport Transfer`, `Night Out`, `Group Transportation`). `QuoteForm.astro` accepts `type` as well as `vehicle` in the hash, and ignores values that are not existing options.
- The closing section shows the phone number from `src/data/site.ts` when one is set.
- The main nav moved Chicago, IL into the More dropdown when Southern Wisconsin was added (see `docs/southern-wisconsin-page.md`).
