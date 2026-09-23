# Services page photography and content

Images downloaded September 23, 2026. The four photographs below are offered under the [Unsplash License](https://unsplash.com/license), which permits commercial use. They are stored locally in `src/assets/services/`; Astro produces responsive WebP versions. Download URLs use `fm=jpg&w=1800&q=85`. Display crops are set in CSS, and image alt text describes the visible scene.

| Local file | Photographer | Photo page | Image URL |
| --- | --- | --- | --- |
| `lake-dock.jpg` | Vincent Y @USA | [Geneva Lake pier](https://unsplash.com/photos/a-dock-on-a-lake-with-trees-in-the-background-SOTD91_mT-k) | https://images.unsplash.com/photo-1690084516271-fb167a474e01 |
| `wedding.jpg` | Lachlan Rennie | [Outdoor wedding table](https://unsplash.com/photos/a-table-set-for-a-wedding-with-a-pool-in-the-background-SIkMbOxnsPo) | https://images.unsplash.com/photo-1676027649792-9e6b014a0e2f |
| `chicago.jpg` | Jeff Brown | [Chicago skyline](https://unsplash.com/photos/chicago-skyline-across-lake-michigan-xOj6_Ha1_R8) | https://images.unsplash.com/photo-1493134799591-2c9eed26201a |
| `celebration.jpg` | Filip Rankovic Grobgaard | [Dinner celebration](https://unsplash.com/photos/people-toasting-with-wine-glasses-at-a-dinner-party-2febX043dTg) | https://images.unsplash.com/photo-1768508950434-fc76c9f3ed9f |

Two photographs were supplied by the site owner on September 23, 2026. Their sources and licences are not recorded here; **confirm the site has the right to use both before launch.**

| Local file | Used for | Replaced |
| --- | --- | --- |
| `corporate-event.jpg` | Corporate Events & Retreats: guests networking over coffee in a conference room | An Unsplash team photo |
| `resort-aerial.jpg` | Lake Geneva Resort & Wedding Shuttles: aerial view of a resort, golf course and fountain pond | An Unsplash resort-grounds photo |

`resort-aerial.jpg` looks like a professional photograph of a specific resort. If it came from the resort's own marketing, get written permission, and keep the page from naming the property so it does not imply a partnership.

The lake pier is identified by its photographer as Lake Geneva, Wisconsin. The Chicago photo depicts Chicago. Other event imagery illustrates occasions; it is not presented as a photograph of Lake Geneva Trolley customers, staff or partner venues. The small hero trolley image comes from the existing fleet catalog; see `fleet-sources.md`.

The five service titles follow the user's supplied categories. The copy is written for Lake Geneva, using the [ChiTown services page](https://chitowntrolley.com/services/) only for general content inspiration. The split hero, numbered navigation and varied service layouts are independently designed.

Service-specific quote links send an allowed `type` query parameter to `/contact/`. The contact page selects the matching existing event option; unknown values are ignored. No new form endpoint is introduced.
