import type { ImageMetadata } from 'astro';
import { fleetGalleries, type VehiclePhoto } from './fleet-images';

export const fleetCategories = [
	{ id: 'trolley', label: 'Trolley Buses', description: 'Private Lake Geneva trolley rentals with classic or limo seating, plus seasonal options.' },
	{ id: 'coach-bus', label: 'Coach Buses', description: 'Lake Geneva charter bus rentals in three coach sizes for 22–57 passengers.' },
	{ id: 'party-bus', label: 'Party Buses', description: 'Lake Geneva party bus rentals with lounge seating and lighting for group celebrations.' },
	{ id: 'limo-van', label: 'Sprinter Vans', description: 'Sprinter van rentals for Lake Geneva private outings, airport transfers and corporate travel.' },
] as const;

export const lavatoryLabel = 'Lavatory available upon request';

export interface Vehicle {
	id: keyof typeof fleetGalleries;
	name: string;
	category: (typeof fleetCategories)[number]['id'];
	features: string[];
	caption: string;
	description: string;
	detail: string;
	/** This vehicle's option in `vehicleChoices`; deep links preselect it. */
	quoteValue: string;
	capacity: number | null;
	capacityLabel: string;
	/** Coaches above 33 passengers can be booked with a lavatory. */
	lavatoryOnRequest: boolean;
	status: 'available' | 'seasonal' | 'coming-soon';
	image: ImageMetadata;
	imageAlt: string;
	interior?: VehiclePhoto;
	gallery: VehiclePhoto[];
	/** Where the vehicle's page lives: /fleet/<id>/, or its own page when it has one. */
	detailHref: string;
}

type FleetEntry = Omit<Vehicle, 'image' | 'imageAlt' | 'interior' | 'gallery' | 'detailHref' | 'lavatoryOnRequest'> & {
	/** A dedicated page that replaces the /fleet/<id>/ listing page. */
	page?: string;
	interiorIndex?: number;
	/** Borrow the hover interior from another vehicle's gallery (it stays out of this vehicle's gallery). */
	interiorFrom?: keyof typeof fleetGalleries;
};

// Facts and photos reconciled from the owner's two sites; see docs/fleet-sources.md.
const entries: FleetEntry[] = [
	{
		"id": "classic-trolley",
		"name": "Classic Trolley",
		"category": "trolley",
		"caption": "Forward-Facing Seating",
		"capacity": 30,
		"capacityLabel": "30 passengers",
		"status": "available",
		"quoteValue": "White Trolley — Classic",
		"description": "Classic trolley rental in Lake Geneva, WI for 30 passengers. Enjoy a wood-finished cabin, climate control and a chauffeur for weddings and private events.",
		"detail": "Our Classic Trolley rental in Lake Geneva, WI seats 30 passengers in forward-facing rows. Its wood-finished cabin, Bluetooth sound and climate control suit wedding parties, photo stops and private group outings. This is the classic model with the rear balcony platform; confirm the vehicle and any planned balcony photos when arranging your date.",
		"features": [
			"Forward-facing seating",
			"Classic-model rear balcony platform",
			"Bluetooth sound system",
			"Heat and air conditioning",
			"Professional chauffeur included"
		],
		"interiorIndex": 1
	},
	{
		"id": "limo-trolley",
		"name": "Limo Trolley",
		"category": "trolley",
		"caption": "Perimeter Limo Seating",
		"capacity": 36,
		"capacityLabel": "36 passengers",
		"status": "available",
		"quoteValue": "White Trolley — Limo",
		"description": "Limo trolley rental in Lake Geneva for 36 passengers, with perimeter seating and a chauffeur for weddings, private outings and group celebrations.",
		"detail": "Our Lake Geneva Limo Trolley rental seats 36 passengers around the perimeter of its wood-finished cabin. The group-facing layout and open center aisle make the ride part of the celebration, whether you are moving between wedding venues, planning a private outing or gathering friends for a night out.",
		"features": [
			"Perimeter limo-style seating",
			"Group-facing interior layout",
			"Wood-finished trolley cabin",
			"Open center aisle",
			"Professional chauffeur included"
		],
		"interiorIndex": 3
	},
	{
		"id": "christmas-trolley",
		"name": "Christmas Trolley",
		"category": "trolley",
		"caption": "Private Holiday Outings",
		"capacity": 30,
		"capacityLabel": "30 passengers",
		"status": "seasonal",
		"page": "/christmas-trolley/",
		"quoteValue": "Christmas Trolley",
		"description": "Plan a private Lake Geneva trolley tour of lights on a heated Christmas Trolley for 30 passengers. Request your holiday route and seasonal availability.",
		"detail": "Plan a private trolley tour of lights in Lake Geneva aboard the decorated, 30-passenger Christmas Trolley. Perimeter seating, an enclosed heated cabin and Bluetooth sound keep the group together between holiday displays and planned stops. Share your pickup location and preferred route so the team can confirm seasonal availability and service details.",
		"features": [
			"Seasonal Christmas lights and decorations",
			"Circular perimeter seating",
			"Enclosed, heated cabin",
			"Bluetooth sound system",
			"Private group charters"
		]
	},
	{
		"id": "festive-trolley",
		"name": "Festive Trolley",
		"category": "trolley",
		"caption": "Green & Red Exterior",
		"capacity": null,
		"capacityLabel": "Capacity on request",
		"status": "available",
		"quoteValue": "Festive Trolley — Red & Green",
		"description": "Rent a green-and-red Festive Trolley for private Lake Geneva events and holiday outings. Request availability and passenger capacity for your group.",
		"detail": "Our Festive Trolley rental brings a green-and-red exterior and traditional styling to private Lake Geneva group charters. It suits holiday outings, festive celebrations and any occasion that calls for a little extra color. Share your date, group size and route so the team can confirm availability and seating for your plans.",
		"features": [
			"Distinctive green-and-red exterior",
			"Traditional trolley styling",
			"Private group charters",
			"Seating confirmed with your quote"
		],
		"interiorFrom": "classic-trolley",
		"interiorIndex": 1
	},
	{
		"id": "super-coach-bus",
		"name": "Super Coach Bus",
		"category": "coach-bus",
		"caption": "Full-Size Group Transportation",
		"capacity": 57,
		"capacityLabel": "50–57 passengers",
		"status": "available",
		"quoteValue": "Super Coach Bus — 57",
		"description": "Lake Geneva charter bus rental for 50–57 passengers. Plan wedding guest shuttles, corporate events or longer trips with reclining seats and USB charging.",
		"detail": "Our Lake Geneva Super Coach Bus rentals accommodate 50–57 passengers, depending on the vehicle assigned. High-back reclining leather seats, onboard audio and USB charging suit larger guest lists and longer trips. Overhead storage is provided; request undercarriage luggage space and a lavatory-equipped coach when booking so the team can confirm the right vehicle.",
		"features": [
			"High-back reclining leather seats",
			"Seatbelts and USB charging",
			"Overhead luggage storage",
			"Sound system with onboard PA",
			"Lavatory and undercarriage storage on request"
		],
		"interiorIndex": 1
	},
	{
		"id": "coach-bus",
		"name": "Coach Bus",
		"category": "coach-bus",
		"caption": "Mid-Size Coach",
		"capacity": 44,
		"capacityLabel": "39–44 passengers",
		"status": "available",
		"quoteValue": "Coach Bus — 44",
		"description": "Rent a 39–44 passenger coach bus in Lake Geneva for wedding shuttles, corporate travel and day trips. Reclining seats, USB charging and overhead storage.",
		"detail": "Our mid-size Lake Geneva coach bus rentals carry 39–44 passengers with high-back reclining leather seats, overhead luggage storage, seatbelts and USB charging. It provides a practical step between a small coach and the full-size Super Coach. Luggage space beyond the overhead racks is limited, and a lavatory must be requested and confirmed for the assigned vehicle.",
		"features": [
			"High-back reclining leather seats",
			"Seatbelts at every seat",
			"USB charging ports",
			"Overhead luggage storage",
			"Sound system and PA; lavatory on request"
		],
		"interiorIndex": 1
	},
	{
		"id": "small-coach-bus",
		"name": "Small Coach Bus",
		"category": "coach-bus",
		"caption": "Compact Coach Comfort",
		"capacity": 28,
		"capacityLabel": "22–28 passengers",
		"status": "available",
		"quoteValue": "Coach Bus — 28",
		"description": "Small coach bus rental in Lake Geneva for 22–28 passengers, with reclining seats and USB charging for wedding shuttles, airport transfers and group outings.",
		"detail": "Our Small Coach Bus rentals provide Lake Geneva group transportation for 22–28 passengers in high-back reclining leather seats. Overhead storage, seatbelts, USB charging and an onboard PA support wedding parties, airport transfers, corporate outings and day trips while keeping the group in one vehicle.",
		"features": [
			"High-back reclining leather seats",
			"Overhead luggage storage",
			"Seatbelts at every seat",
			"USB charging ports",
			"Sound system with onboard PA"
		],
		"interiorIndex": 1
	},
	{
		"id": "party-bus",
		"name": "Party Bus",
		"category": "party-bus",
		"caption": "Lounge Seating & Party Lighting",
		"capacity": 40,
		"capacityLabel": "Up to 40 passengers",
		"status": "available",
		"quoteValue": "Party Bus — 40",
		"description": "Party bus rental in Lake Geneva for up to 40 passengers. Plan birthdays, bachelor and bachelorette parties or nights out with a professional chauffeur.",
		"detail": "Our Lake Geneva Party Bus rental carries up to 40 passengers in a lounge-style interior. Wraparound seating, color LED lighting, a premium sound system and an open dance-floor area suit birthdays, bachelor and bachelorette parties, concerts and nights out. A professional chauffeur handles the planned route and stops.",
		"features": [
			"Wraparound lounge seating",
			"Color LED party lighting",
			"Premium sound system",
			"Open dance-floor space",
			"Heat, air conditioning and chauffeur"
		],
		"interiorIndex": 1
	},
	{
		"id": "limo-van",
		"name": "Limo Van",
		"category": "limo-van",
		"caption": "Private Lounge on Wheels",
		"capacity": 14,
		"capacityLabel": "Up to 14 passengers",
		"status": "available",
		"quoteValue": "Sprinter — Limo",
		"description": "Limo van rental in Lake Geneva for up to 14 passengers. Wraparound leather seating and accent lighting for small wedding parties and private celebrations.",
		"detail": "Our Lake Geneva Limo Van rental seats up to 14 passengers in wraparound leather lounge seating. Color-changing ceiling and accent lighting, wood-look flooring and climate control create a private setting for small wedding parties, birthdays and nights out.",
		"features": [
			"Wraparound leather lounge seating",
			"Color-changing ceiling and accent lights",
			"Wood-look flooring",
			"Heat and air conditioning",
			"Professional chauffeur included"
		],
		"interiorIndex": 2
	},
	{
		"id": "executive-sprinter",
		"name": "Executive Sprinter Van",
		"category": "limo-van",
		"caption": "Individual Executive Seating",
		"capacity": 15,
		"capacityLabel": "13–15 passengers",
		"status": "available",
		"quoteValue": "Sprinter — Executive",
		"description": "Executive Sprinter van rental in Lake Geneva for 13–15 passengers. Individual leather seats, USB charging and luggage space for airport and corporate travel.",
		"detail": "Our Executive Sprinter Van rental provides Lake Geneva transportation with individual high-back leather seating, a conference table, rear luggage space, seatbelts and USB charging. It suits airport transfers, corporate transportation and smaller private groups. Capacity ranges from 13–15 passengers; confirm the assigned seating configuration and luggage needs with your itinerary.",
		"features": [
			"Individual high-back leather seating",
			"Conference table and reading lights",
			"Rear luggage space",
			"Seatbelts and USB charging",
			"Climate control and professional chauffeur"
		],
		"interiorIndex": 1
	}
];

export const fleet: Vehicle[] = entries.map(({ interiorIndex, interiorFrom, page, ...vehicle }) => {
	const gallery = fleetGalleries[vehicle.id];
	const interiorSource = interiorFrom ? fleetGalleries[interiorFrom] : gallery;
	return {
		...vehicle,
		gallery,
		detailHref: page ?? `/fleet/${vehicle.id}/`,
		lavatoryOnRequest: vehicle.category === 'coach-bus' && (vehicle.capacity ?? 0) > 33,
		image: gallery[0].image,
		imageAlt: gallery[0].alt,
		interior: interiorIndex === undefined ? undefined : interiorSource[interiorIndex],
	};
});

export const fleetGroups = fleetCategories.map((category) => ({
	...category,
	vehicles: fleet.filter((vehicle) => vehicle.category === category.id),
}));

/**
 * Vehicle options on every booking form, following the owner's ChiTown Trolley
 * quote form (requested October 4, 2026) without the word "Passengers" after
 * the sizes. The value submitted is the label.
 * Some sizes here - Party Bus 45, 35 and 25, Coach Bus 50 and 40 - have no
 * Lake Geneva fleet listing; see docs/fleet-sources.md. `lavatory` marks the
 * coaches above 33 passengers that offer one on request.
 */
export const vehicleChoices: { value: string; lavatory?: boolean }[] = [
	{ value: 'Wedding Package - Trolley & Coach Bus' },
	{ value: 'White Trolley — Classic' },
	{ value: 'White Trolley — Limo' },
	{ value: 'Festive Trolley — Red & Green' },
	{ value: 'Christmas Trolley' },
	{ value: 'Party Bus — 45' },
	{ value: 'Party Bus — 40' },
	{ value: 'Party Bus — 35' },
	{ value: 'Party Bus — 25' },
	{ value: 'Super Coach Bus — 57', lavatory: true },
	{ value: 'Coach Bus — 50', lavatory: true },
	{ value: 'Coach Bus — 44', lavatory: true },
	{ value: 'Coach Bus — 40', lavatory: true },
	{ value: 'Coach Bus — 28' },
	{ value: 'Sprinter — Executive' },
	{ value: 'Sprinter — Limo' },
];

// Every fleet listing must have a matching choice, or its booking links would preselect nothing.
for (const vehicle of fleet) {
	if (!vehicleChoices.some((choice) => choice.value === vehicle.quoteValue)) {
		throw new Error(`No vehicle choice matches ${vehicle.id} (${vehicle.quoteValue})`);
	}
}
