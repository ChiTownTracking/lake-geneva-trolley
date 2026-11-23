import type { ImageMetadata } from 'astro';
// Trolley photos from the owner's ChiTown Trolley fleet page (T3, T4, T5, T7, T8).
import t3Photo1 from '../assets/fleet/white-trolley-classic-t3-01.webp';
import t3Photo2 from '../assets/fleet/white-trolley-classic-t3-02.webp';
import t3Photo3 from '../assets/fleet/white-trolley-classic-t3-03.webp';
import t3Photo4 from '../assets/fleet/white-trolley-classic-t3-04.webp';
import t4Photo1 from '../assets/fleet/white-limo-trolley-t4-01.webp';
import t4Photo2 from '../assets/fleet/white-limo-trolley-t4-02.webp';
import t4Photo3 from '../assets/fleet/white-limo-trolley-t4-03.webp';
import t4Photo4 from '../assets/fleet/white-limo-trolley-t4-04.webp';
import t4Photo5 from '../assets/fleet/white-limo-trolley-t4-05.webp';
import t5Photo1 from '../assets/fleet/white-limo-trolley-t5-01.webp';
import t5Photo2 from '../assets/fleet/white-limo-trolley-t5-02.webp';
import t5Photo3 from '../assets/fleet/white-limo-trolley-t5-03.webp';
import t5Photo4 from '../assets/fleet/white-limo-trolley-t5-04.webp';
import t5Photo5 from '../assets/fleet/white-limo-trolley-t5-05.webp';
import t7Photo1 from '../assets/fleet/festive-trolley-t7-01.webp';
import t7Photo2 from '../assets/fleet/festive-trolley-t7-02.webp';
import t7Photo3 from '../assets/fleet/festive-trolley-t7-03.webp';
import t7Photo4 from '../assets/fleet/festive-trolley-t7-04.webp';
import t7Photo5 from '../assets/fleet/festive-trolley-t7-05.webp';
import t7Photo6 from '../assets/fleet/festive-trolley-t7-06.webp';
import t8Photo1 from '../assets/fleet/white-trolley-classic-t8-01.webp';
import t8Photo2 from '../assets/fleet/white-trolley-classic-t8-02.webp';
import t8Photo3 from '../assets/fleet/white-trolley-classic-t8-03.webp';
import t8Photo4 from '../assets/fleet/white-trolley-classic-t8-04.webp';
import t8Photo5 from '../assets/fleet/white-trolley-classic-t8-05.webp';
import photo9 from '../assets/fleet/christmas-trolley-01.webp';
import photo11 from '../assets/fleet/super-coach-bus-01.webp';
import photo12 from '../assets/fleet/super-coach-bus-02.webp';
import photo13 from '../assets/fleet/super-coach-bus-03.webp';
import photo14 from '../assets/fleet/super-coach-bus-04.webp';
import photo15 from '../assets/fleet/super-coach-bus-05.webp';
import photo16 from '../assets/fleet/super-coach-bus-06.webp';
import photo17 from '../assets/fleet/super-coach-bus-07.webp';
import photo18 from '../assets/fleet/super-coach-bus-08.webp';
import photo19 from '../assets/fleet/super-coach-bus-09.webp';
import photo20 from '../assets/fleet/super-coach-bus-10.webp';
import photo21 from '../assets/fleet/coach-bus-01.webp';
import photo22 from '../assets/fleet/coach-bus-02.webp';
import photo23 from '../assets/fleet/coach-bus-03.webp';
import photo24 from '../assets/fleet/small-coach-bus-01.webp';
import photo25 from '../assets/fleet/small-coach-bus-02.webp';
import photo26 from '../assets/fleet/small-coach-bus-03.webp';
import partyBusExterior from '../assets/fleet/party-bus.png';
import partyBusInterior from '../assets/fleet/party-bus-interior.png';
import photo30 from '../assets/fleet/limo-van-01.webp';
import photo31 from '../assets/fleet/limo-van-02.webp';
import photo32 from '../assets/fleet/limo-van-03.webp';
import photo33 from '../assets/fleet/executive-sprinter-01.webp';
import photo34 from '../assets/fleet/executive-sprinter-02.webp';
import photo35 from '../assets/fleet/executive-sprinter-03.webp';
import photo36 from '../assets/fleet/executive-sprinter-04.webp';
import photo37 from '../assets/fleet/executive-sprinter-05.webp';

export interface VehiclePhoto { image: ImageMetadata; alt: string; caption: string; }

export const fleetGalleries = {
	'white-trolley-classic-t3': [
		{ image: t3Photo1, alt: "White Trolley Classic - T3: front three-quarter exterior", caption: "Classic white exterior" },
		{ image: t3Photo2, alt: "White Trolley Classic - T3: wood bench rows and center aisle", caption: "Wood bench rows" },
		{ image: t3Photo3, alt: "White Trolley Classic - T3: forward-facing seating toward the driver", caption: "Forward-facing seating" },
		{ image: t3Photo4, alt: "White Trolley Classic - T3: forward-facing rows under a wood ceiling", caption: "Wood-finished cabin" },
	],
	'white-limo-trolley-t4': [
		{ image: t4Photo1, alt: "White Limo Trolley - T4: front three-quarter exterior", caption: "Front exterior" },
		{ image: t4Photo2, alt: "White Limo Trolley - T4: side exterior with arched windows", caption: "Side exterior" },
		{ image: t4Photo3, alt: "White Limo Trolley - T4: black limo-style perimeter seating", caption: "Circular limo-style seating" },
		{ image: t4Photo4, alt: "White Limo Trolley - T4: open center aisle between the benches", caption: "Open center aisle" },
		{ image: t4Photo5, alt: "White Limo Trolley - T4: wood-finished cabin with interior lighting", caption: "Interior lighting" },
	],
	'white-limo-trolley-t5': [
		{ image: t5Photo1, alt: "White Limo Trolley - T5: front three-quarter exterior", caption: "Classic white exterior" },
		{ image: t5Photo2, alt: "White Limo Trolley - T5: front exterior with arched windows", caption: "Front exterior" },
		{ image: t5Photo3, alt: "White Limo Trolley - T5: side exterior beside a lawn", caption: "Side exterior" },
		{ image: t5Photo4, alt: "White Limo Trolley - T5: perimeter wood benches and brass rails", caption: "Perimeter wood benches" },
		{ image: t5Photo5, alt: "White Limo Trolley - T5: wide center aisle facing the rear benches", caption: "Wide center aisle" },
	],
	'festive-trolley-t7': [
		{ image: t7Photo1, alt: "Festive Trolley - T7: red-and-green exterior with gold pinstriping", caption: "Red-and-green exterior" },
		{ image: t7Photo2, alt: "Festive Trolley - T7: front exterior with the door open", caption: "Front exterior" },
		{ image: t7Photo3, alt: "Festive Trolley - T7: rear exterior", caption: "Rear exterior" },
		{ image: t7Photo4, alt: "Festive Trolley - T7: wraparound wood benches and brass rails", caption: "Wraparound wood benches" },
		{ image: t7Photo5, alt: "Festive Trolley - T7: wood ceiling over the bench seating", caption: "Wood ceiling and brass rails" },
		{ image: t7Photo6, alt: "Festive Trolley - T7 parked between two white trolleys", caption: "Alongside the white trolleys" },
	],
	'white-trolley-classic-t8': [
		{ image: t8Photo1, alt: "White Trolley Classic - T8: white exterior with a green roof", caption: "Green roof and arched windows" },
		{ image: t8Photo2, alt: "White Trolley Classic - T8: front exterior", caption: "Front exterior" },
		{ image: t8Photo3, alt: "White Trolley Classic - T8: side exterior with the door", caption: "Side exterior" },
		{ image: t8Photo4, alt: "White Trolley Classic - T8: rear exterior and open platform", caption: "Open rear platform" },
		{ image: t8Photo5, alt: "White Trolley Classic - T8: cushioned forward-facing benches under a wood ceiling", caption: "Forward-facing benches" },
	],
	'christmas-trolley': [
		{ image: photo9, alt: "christmas trolley: Christmas lights and seasonal decorations", caption: "Christmas lights and seasonal decorations" },
	],
	'super-coach-bus': [
		{ image: photo11, alt: "super coach bus: Exterior with luggage bays open", caption: "Exterior with luggage bays open" },
		{ image: photo12, alt: "super coach bus: Reclining leather seating", caption: "Reclining leather seating" },
		{ image: photo13, alt: "super coach bus: Exterior view 1", caption: "Exterior view 1" },
		{ image: photo14, alt: "super coach bus: Exterior view 2", caption: "Exterior view 2" },
		{ image: photo15, alt: "super coach bus: Exterior view 3", caption: "Exterior view 3" },
		{ image: photo16, alt: "super coach bus: Interior view 1", caption: "Interior view 1" },
		{ image: photo17, alt: "super coach bus: Interior view 2", caption: "Interior view 2" },
		{ image: photo18, alt: "super coach bus: Interior view 3", caption: "Interior view 3" },
		{ image: photo19, alt: "super coach bus: Interior view 4", caption: "Interior view 4" },
		{ image: photo20, alt: "super coach bus: Interior view 5", caption: "Interior view 5" },
	],
	'coach-bus': [
		{ image: photo21, alt: "coach bus: Coach bus exterior", caption: "Coach bus exterior" },
		{ image: photo22, alt: "coach bus: Reclining leather seating", caption: "Reclining leather seating" },
		{ image: photo23, alt: "coach bus: Interior lighting", caption: "Interior lighting" },
	],
	'small-coach-bus': [
		{ image: photo24, alt: "small coach bus: Small coach exterior", caption: "Small coach exterior" },
		{ image: photo25, alt: "small coach bus: Reclining leather seating", caption: "Reclining leather seating" },
		{ image: photo26, alt: "small coach bus: Interior lighting", caption: "Interior lighting" },
	],
	'party-bus': [
		{ image: partyBusExterior, alt: 'White party bus parked outside an event venue.', caption: 'Party bus exterior' },
		{ image: partyBusInterior, alt: 'Party bus interior with black quilted lounge seating and blue ceiling and aisle lighting.', caption: 'Lounge seating and party lighting' },
	],
	'limo-van': [
		{ image: photo30, alt: "limo van: Limo van exterior", caption: "Limo van exterior" },
		{ image: photo31, alt: "limo van: Rear exterior", caption: "Rear exterior" },
		{ image: photo32, alt: "limo van: Wraparound lounge seating", caption: "Wraparound lounge seating" },
	],
	'executive-sprinter': [
		{ image: photo33, alt: "executive sprinter: Executive Sprinter exterior", caption: "Executive Sprinter exterior" },
		{ image: photo34, alt: "executive sprinter: Seating and conference table", caption: "Seating and conference table" },
		{ image: photo35, alt: "executive sprinter: Cabin from the side door", caption: "Cabin from the side door" },
		{ image: photo36, alt: "executive sprinter: Front exterior", caption: "Front exterior" },
		{ image: photo37, alt: "executive sprinter: Side exterior", caption: "Side exterior" },
	],
} satisfies Record<string, VehiclePhoto[]>;
