/** Editorial content and shared form choices. Fleet facts live in fleet.ts. */
export { fleet, fleetCategories, fleetGroups, type Vehicle } from './fleet';

export interface Step {
	number: string;
	title: string;
	body: string;
}

/** How a Lake Geneva day is actually put together. */
export const itinerary: Step[] = [
	{
		number: '01',
		title: 'Resort or Hotel Pickup',
		body: 'The day starts at one confirmed meeting point. Pickup is planned around a hotel, resort or rental house with enough time for everyone to gather, board and leave together.',
	},
	{
		number: '02',
		title: 'Ceremony Transportation',
		body: 'Departure is worked backwards from the ceremony time, the loading time and the route. Keeping the group on one vehicle avoids the trickle of separate arrivals.',
	},
	{
		number: '03',
		title: 'Photo Stops Around the Lake',
		body: 'Shoreline and downtown stops can be added between the ceremony and the reception when travel time, parking and the length of the charter allow. Share the locations early so the schedule accounts for them.',
	},
	{
		number: '04',
		title: 'Reception and Return',
		body: 'The itinerary closes with the reception arrival and, when it is part of the reservation, a planned return run. Final timing needs the pickup point, the destination and who is expected to be aboard.',
	},
];

export interface Testimonial {
	quote: string;
	person: string;
	/** Whatever the review is signed with - a town, or a role and a town. */
	role: string;
	/** Star rating out of 5, as given on the source review. Omit to show no stars. */
	rating?: number;
}

/**
 * TODO(handoff): PLACEHOLDER REVIEWS - NOT FOR LAUNCH.
 *
 * A review is a claim a customer made about this business, so none are
 * invented here, and none were carried over from the ChiTown Trolley site:
 * those were written by other people about a different service in another
 * city, and re-signing them with Wisconsin names would be inventing customers
 * this business has not had.
 *
 * Replace every entry with a real Lake Geneva Trolley & Bus Rental review - Google, The
 * Knot, WeddingWire, wherever they live - and delete this notice. The ratings
 * are placeholders too: copy each one from its source review, or omit it. Emptying the
 * array removes the section from the page rather than leaving a gap.
 */
export const testimonials: Testimonial[] = [
	{
		quote: 'Placeholder review - replace before launch. A short one, to show how the smallest card sits.',
		person: 'Client name',
		role: 'Town, WI',
		rating: 5,
	},
	{
		quote:
			'Placeholder review - replace before launch. A middling length, which is what most real reviews run to once the pleasantries are trimmed off the front and back of them.',
		person: 'Client name',
		role: 'Town, WI',
		rating: 5,
	},
	{
		quote:
			'Placeholder review - replace before launch. This one is deliberately long, so the cards can be checked against a review that runs on a bit: someone describing the pickup, the driver, the stops around the lake and how the timing held up across the whole afternoon.',
		person: 'Client name',
		role: 'Event role, Town, WI',
		rating: 5,
	},
];

export interface Faq {
	q: string;
	a: string;
}

export const faqs: Faq[] = [
	{
		q: 'Do you provide trolley rentals in Lake Geneva, Wisconsin?',
		a: 'Yes. Lake Geneva Trolley & Bus Rental runs private charters by reservation. Whether a given date can be served depends on the date itself, the complete itinerary, how long the charter runs and which vehicle you want, so include every pickup and stop when you send your request.',
	},
	{
		q: 'How much does a trolley rental cost?',
		a: 'Pricing is quoted per trip rather than posted as a flat rate. The estimate is built from the date, the vehicle, the length of the charter, the pickup location and the full route. Send those details through the quote form and you will get a figure specific to your day.',
	},
	{
		q: 'Can we use the trolley for a wedding?',
		a: 'Yes, subject to availability and route confirmation. A wedding itinerary can include hotel or resort pickup, transportation to the ceremony, photo stops along the way, the reception arrival and a return run when that is written into the reservation.',
	},
	{
		q: 'Can the trolley make several stops around the lake?',
		a: 'Multiple stops can be planned when the addresses, the timing, the loading access and the overall length of the charter are agreed in advance. List every destination with your inquiry and treat a stop as confirmed only once it appears on the final itinerary.',
	},
	{
		q: 'Can you carry wedding guests as well as the wedding party?',
		a: 'Often, yes, by pairing vehicles: the trolley carries the wedding party while a larger coach moves guests between the hotels, the ceremony and the reception. The right combination depends on the headcount, the timing and what is available on your date.',
	},
	{
		q: 'How far in advance should we reserve?',
		a: 'Reserve as soon as your date and venues are settled. Availability changes constantly through the year, so it is still worth asking about a date that is close - the answer depends on what is already on the calendar.',
	},
	{
		q: 'Is a chauffeur included?',
		a: 'Yes. Every charter is driven by a professional chauffeur. You are reserving the vehicle and the driver together for the hours on your itinerary.',
	},
	{
		q: 'What should I include when I ask for a quote?',
		a: 'The date, the number of passengers, the pickup address, every stop you expect to make and the time the group needs to be at each one. The more complete that picture is, the more accurate the quote and the fewer surprises on the day.',
	},
];

/**
 * Shared event, group-size and duration choices. VehicleOptions renders the
 * grouped vehicle choices directly from fleet.ts.
 */
export const quoteOptions = {
	eventTypes: [
		'Wedding',
		'Wedding Guest Shuttle',
		'Private Celebration',
		'Corporate Event',
		'Group Transportation',
		'Airport Transfer',
		'Night Out',
		'Something Else',
	],
	groupSizes: ['1-10', '11-20', '21-30', '31-40', '41-50', '51-57', '58 or more'],
	durations: [
		'A few hours',
		'Half day',
		'Full day',
		'One-way transfer',
		'Round trip',
		'Multi-day / wedding weekend',
	],
} as const;
