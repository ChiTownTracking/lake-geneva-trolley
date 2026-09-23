import type { ImageMetadata } from 'astro';
import photo0 from '../assets/fleet/classic-trolley-01.webp';
import photo1 from '../assets/fleet/classic-trolley-02.webp';
import photo2 from '../assets/fleet/classic-trolley-03.webp';
import photo3 from '../assets/fleet/limo-trolley-01.webp';
import photo4 from '../assets/fleet/limo-trolley-02.webp';
import photo5 from '../assets/fleet/limo-trolley-03.webp';
import photo6 from '../assets/fleet/limo-trolley-04.webp';
import photo7 from '../assets/fleet/limo-trolley-05.webp';
import photo8 from '../assets/fleet/limo-trolley-06.webp';
import photo9 from '../assets/fleet/christmas-trolley-01.webp';
import photo10 from '../assets/fleet/festive-trolley-01.webp';
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
	'classic-trolley': [
		{ image: photo0, alt: "classic trolley: Classic trolley exterior", caption: "Classic trolley exterior" },
		{ image: photo1, alt: "classic trolley: Forward-facing cabin", caption: "Forward-facing cabin" },
		{ image: photo2, alt: "classic trolley: Forward-facing seats", caption: "Forward-facing seats" },
	],
	'limo-trolley': [
		{ image: photo3, alt: "limo trolley: Limo trolley exterior", caption: "Limo trolley exterior" },
		{ image: photo4, alt: "limo trolley: Front exterior", caption: "Front exterior" },
		{ image: photo5, alt: "limo trolley: Side exterior", caption: "Side exterior" },
		{ image: photo6, alt: "limo trolley: Perimeter seating", caption: "Perimeter seating" },
		{ image: photo7, alt: "limo trolley: Open center aisle", caption: "Open center aisle" },
		{ image: photo8, alt: "limo trolley: Interior lighting", caption: "Interior lighting" },
	],
	'christmas-trolley': [
		{ image: photo9, alt: "christmas trolley: Christmas lights and seasonal decorations", caption: "Christmas lights and seasonal decorations" },
	],
	'festive-trolley': [
		{ image: photo10, alt: "festive trolley: Green-and-red festive trolley exterior", caption: "Green-and-red festive trolley exterior" },
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
