import type { ImageMetadata } from 'astro';
import { fleetGalleries, type VehiclePhoto } from './fleet-images';

export const fleetCategories = [
	{ id: 'trolley', label: 'Trolley Buses', description: 'Classic and limo seating, plus seasonal trolley options.' },
	{ id: 'coach-bus', label: 'Coach Buses', description: 'Three coach sizes for groups of 22–57 passengers.' },
	{ id: 'party-bus', label: 'Party Buses', description: 'Lounge seating and party lighting for celebrations.' },
	{ id: 'limo-van', label: 'Sprinter Vans', description: 'Limo-style lounge or individual executive seating.' },
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
		"quoteValue": "Classic Trolley",
		"description": "Traditional forward-facing rows, a wood-finished cabin and the classic trolley look.",
		"detail": "The Classic Trolley seats 30 passengers in forward-facing rows. Its wood-finished cabin, Bluetooth sound and climate control suit wedding parties, photo stops and private group outings. This is the classic model with the rear balcony platform; confirm the vehicle and any planned balcony photos when arranging your date.",
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
		"quoteValue": "Limo Trolley",
		"description": "Perimeter seating keeps everyone facing one another, with an open center aisle.",
		"detail": "The Limo Trolley seats 36 passengers around the perimeter of its wood-finished cabin. The group-facing layout and open center aisle make the ride part of the celebration, whether you are moving between wedding venues, planning a private outing or gathering friends for a night out.",
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
		"description": "A heated, decorated trolley for private holiday lights outings.",
		"detail": "The Christmas Trolley brings seasonal lights and decorations to a private 30-passenger trolley charter. Perimeter seating, an enclosed heated cabin and Bluetooth sound keep the group together between holiday displays and planned stops. Share your pickup location and preferred route so the team can confirm seasonal availability and service details.",
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
		"quoteValue": "Festive Trolley",
		"description": "A distinctive green-and-red trolley with traditional styling.",
		"detail": "The Festive Trolley brings a green-and-red exterior and traditional trolley styling to private group charters. It suits holiday outings, festive celebrations and any occasion that calls for a little extra color. Share your date, group size and route so the team can confirm availability and seating for your plans.",
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
		"quoteValue": "Super Coach Bus",
		"description": "The largest coach option for guest shuttles, events and longer journeys.",
		"detail": "The Super Coach Bus range accommodates 50–57 passengers, depending on the vehicle assigned. High-back reclining leather seats, onboard audio and USB charging suit larger guest lists and longer trips. Overhead storage is provided; request undercarriage luggage space and a lavatory-equipped coach when booking so the team can confirm the right vehicle.",
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
		"quoteValue": "Coach Bus",
		"description": "A mid-size coach for wedding guests, corporate groups and day trips.",
		"detail": "The Coach Bus range carries 39–44 passengers with high-back reclining leather seats, overhead luggage storage, seatbelts and USB charging. It provides a practical step between a small coach and the full-size Super Coach. Luggage space beyond the overhead racks is limited, and a lavatory must be requested and confirmed for the assigned vehicle.",
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
		"quoteValue": "Small Coach Bus",
		"description": "Coach seating and amenities for groups that need more room than a van.",
		"detail": "The Small Coach Bus range accommodates 22–28 passengers in high-back reclining leather seats. Overhead storage, seatbelts, USB charging and an onboard PA support wedding parties, airport transfers, corporate outings and day trips while keeping the group in one vehicle.",
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
		"quoteValue": "Party Bus",
		"description": "Wraparound seating, color lighting and a sound system for celebrations in transit.",
		"detail": "The Party Bus carries up to 40 passengers in a lounge-style interior. Wraparound seating, color LED lighting, a premium sound system and an open dance-floor area suit birthdays, bachelor and bachelorette parties, concerts and nights out. A professional chauffeur handles the planned route and stops.",
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
		"quoteValue": "Limo Van",
		"description": "A smaller lounge-style van with perimeter seating and color-changing lighting.",
		"detail": "The Limo Van seats up to 14 passengers in wraparound leather lounge seating. Color-changing ceiling and accent lighting, wood-look flooring and climate control create a private setting for small wedding parties, birthdays and nights out.",
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
		"quoteValue": "Executive Sprinter Van",
		"description": "Individual high-back seating and a conference table for business and private travel.",
		"detail": "The Executive Sprinter Van combines individual high-back leather seating and a conference table with rear luggage space, seatbelts and USB charging. It suits airport transfers, corporate transportation and smaller private groups. Capacity ranges from 13–15 passengers; confirm the assigned seating configuration and luggage needs with your itinerary.",
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

// Four homepage cards introduce the categories; the fleet page shows every listing.
export const homeFleetIds = ['classic-trolley', 'super-coach-bus', 'party-bus', 'limo-van'];
