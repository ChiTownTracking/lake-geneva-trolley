# Southern Wisconsin page

`/southern-wisconsin/` presents Lake Geneva Trolley & Bus Rental's service across Southern Wisconsin, with Milwaukee and Madison featured. It is a top-level link in the main nav and is also listed in the footer. The layout follows the Chicago page (`docs/chicago-page.md`). Its accent is a map pin, and its signature section is a route map centered on Lake Geneva.

## Photography

Downloaded September 26, 2026 from [Pexels](https://www.pexels.com/). All are offered under the [Pexels License](https://www.pexels.com/license/), which permits free commercial use without attribution. They are stored in `src/assets/southern-wisconsin/`; Astro generates the responsive versions.

| Local file | Photographer | Pexels page | Used for |
| --- | --- | --- | --- |
| `milwaukee-sunset.jpg` | Hanna Elesha Abraham | [Sunset over Milwaukee Art Museum](https://www.pexels.com/photo/stunning-sunset-over-milwaukee-art-museum-36119195/) | Hero |
| `milwaukee-lakefront.jpg` | Jim | [Downtown Milwaukee along the lakefront](https://www.pexels.com/photo/skyline-view-of-downtown-milwaukee-along-lakefront-29224300/) | Milwaukee feature |
| `madison-capitol-dusk.jpg` | Mike Norris | [Dusk at the Wisconsin State Capitol](https://www.pexels.com/photo/dusk-at-wisconsin-state-capitol-in-madison-30843092/) | Madison feature |
| `barn-wedding.jpg` | Pavel Danilyuk | [Bride and groom in a field](https://www.pexels.com/photo/bride-and-groom-standing-on-a-grass-field-while-kissing-each-other-7178888/) | Weddings card |
| `milwaukee-riverwalk.jpg` | Quang Vuong | [Autumn Riverwalk in Milwaukee](https://www.pexels.com/photo/autumn-riverwalk-in-milwaukee-wisconsin-28578848/) | Corporate card |
| `brewery-toast.jpg` | Pavel Danilyuk | [Friends clinking glasses in a bar](https://www.pexels.com/photo/friends-clinking-glasses-of-beer-at-table-in-bar-5858159/) | Nights out card |

The airport card reuses `src/assets/chicago/airport-landing.jpg` (see the Chicago page doc). The wedding and brewery photos are not known to be taken in Wisconsin, so their alt text does not place them there. The event photos illustrate occasions; they do not show Lake Geneva Trolley & Bus Rental customers or vehicles. The hero was supplied as a PNG and re-encoded as JPEG.

## Content and facts

- The page states that the business serves Southern Wisconsin, including Milwaukee and Madison, as directed by the owner on September 26, 2026.
- Vehicle names and capacities in the fleet strip and FAQ come from `src/data/fleet.ts`. The FAQ mentions the lavatory option only while the Super Coach Bus has `lavatoryOnRequest`.
- **Confirm before launch:** pickups at Milwaukee Mitchell International Airport (MKE) and Dane County Regional Airport (MSN) are presented as available on request. Airports set their own rules for commercial ground transportation, so confirm the business can serve both.
- Distances are driving miles from Lake Geneva, calculated September 26, 2026 with the [OSRM](https://project-osrm.org/) demo router (OpenStreetMap data) and rounded: Milwaukee 50, Madison 74 (shown as about 75), Racine 43 (about 45), Kenosha 33, Janesville 35, Beloit 36 and Waukesha 36 (all shown as about 35). Delavan, Elkhorn and Burlington are 11 to 13 miles away; the page describes the nearby towns only as near the lake.
- The page gives no Chicago distance. The Chicago page's "about 80 miles" is left unchanged.
- The page makes no claims about prices, a defined service radius, named venues or response times.

## Route map

- City positions are projected in the page frontmatter from real latitude and longitude, using an equirectangular projection corrected for latitude. The Wisconsin–Illinois line is drawn at its real latitude.
- The Lake Michigan shoreline and the Geneva Lake outline are simplified approximations, drawn for decoration.
- The Chicago arrow follows the real bearing from Lake Geneva to Chicago and stops at the map edge.
- The SVG has a caption and the same cities and distances are listed as text beside it, so the map is not the only source of that information. Labels use a halo in the map's background color so route lines do not run through them.

## Links

- The page carries its own copy of the site quote form (`QuoteForm.astro`, Netlify form name `quote-request`, id prefix `swq`) directly below the city strip, at `#getquote`.
- The service cards and the "Plan a Trip to the Lake" button preselect the event type via the hash (`Wedding`, `Corporate Event`, `Airport Transfer`, `Night Out`, `Group Transportation`). The Milwaukee and Madison links scroll to the form without preselecting anything.
- The closing section shows the phone number from `src/data/site.ts` when one is set.

## Navigation

The main nav has six top-level items: Fleet, Wedding Package, Christmas Trolley, Southern Wisconsin, Services and More. Chicago, IL sits in the More dropdown with FAQ and Contact. The header uses the slide-in drawer below 1200px (it was 1024px) and slightly narrower link spacing on desktop (see `Header.astro`).
