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
		body: 'Start your Lake Geneva wedding transportation at a confirmed hotel, resort or vacation rental pickup point. Allow time for the wedding party to gather and board before the scheduled trolley departure.',
	},
	{
		number: '02',
		title: 'Ceremony Transportation',
		body: 'Plan your wedding trolley departure around the ceremony time, boarding and travel between your Lake Geneva venues. One shared ride keeps the wedding party together for the ceremony arrival.',
	},
	{
		number: '03',
		title: 'Photo Stops Around the Lake',
		body: 'Add Geneva Lake shoreline or downtown Lake Geneva photo stops between the ceremony and reception when vehicle access and charter hours allow. Share your chosen locations so travel, parking and photography fit your wedding timeline.',
	},
	{
		number: '04',
		title: 'Reception and Return',
		body: 'Complete your Lake Geneva wedding itinerary with a reception transfer and any reserved evening returns. Confirm the pickup point, hotel destinations and passenger count for each guest shuttle or trolley run.',
	},
];

export interface Testimonial {
	quote: string;
	person: string;
	/** Whatever the review is signed with - a town, or a role and a town. Optional. */
	role?: string;
	/** Star rating out of 5, as given on the source review. Omit to show no stars. */
	rating?: number;
}

/**
 * Customer reviews, supplied by the owner on October 4, 2026. They were given
 * without a star rating or a town, so neither is shown - add `rating` or `role`
 * only from the source review. Emptying the array removes the section.
 */
export const testimonials: Testimonial[] = [
	{
		quote:
			'We had a great time on the trolley. It was a fun part of our Lake Geneva trip. We would love to ride again!',
		person: 'Emily Carter',
	},
	{
		quote:
			'Our whole group enjoyed the ride. It was nice to sit back, relax, and spend time together. We are glad we tried it!',
		person: 'Michael Bennett',
	},
	{
		quote:
			'This was our first trolley ride, and we really enjoyed it. We took lots of photos and made some lovely memories.',
		person: 'Rachel Morgan',
	},
];

export interface Faq {
	q: string;
	a: string;
}

export const faqs: Faq[] = [
	{
		q: 'Do you provide trolley rentals in Lake Geneva, Wisconsin?',
		a: 'Yes. Lake Geneva Trolley & Bus Rental offers private trolley charters in Lake Geneva, Wisconsin by reservation. Availability depends on your date, preferred vehicle, charter hours and full itinerary. Include each pickup and destination when requesting a quote.',
	},
	{
		q: 'How much does a trolley rental cost?',
		a: 'Trolley rental pricing in Lake Geneva is quoted for your trip. Your date, vehicle, passenger count, charter length and route determine the estimate. Send your pickup location, planned stops and travel times through the quote form for a personalized rental quote.',
	},
	{
		q: 'Can we use the trolley for a wedding?',
		a: 'Yes. Lake Geneva wedding trolley rental can include hotel or resort pickups, ceremony transportation, photo stops around Geneva Lake and reception transfers. Evening returns can be included in the reservation, subject to availability and route confirmation.',
	},
	{
		q: 'Can the trolley make several stops around the lake?',
		a: 'A private Lake Geneva trolley charter can include multiple stops when the route, timing, vehicle access and charter hours are confirmed in advance. List each address in your inquiry so boarding time and travel between stops can be included in your itinerary.',
	},
	{
		q: 'Can you carry wedding guests as well as the wedding party?',
		a: 'You can request a trolley for your wedding party and a coach bus for wedding guest transportation in Lake Geneva. Guest shuttles can connect hotels, the ceremony and the reception. Vehicle availability, passenger counts and timing determine the right combination.',
	},
	{
		q: 'How far in advance should we reserve?',
		a: 'Request your Lake Geneva trolley or bus rental once your date and venues are settled. Booking early gives the team time to review vehicle availability and your route. For a nearby date, contact us to check which charter options are available.',
	},
	{
		q: 'Is a chauffeur included?',
		a: 'Yes. Every Lake Geneva trolley, bus or van charter includes a professional chauffeur. Your reservation covers the vehicle and driver for the hours and route confirmed on your itinerary.',
	},
	{
		q: 'What should I include when I ask for a quote?',
		a: 'For a Lake Geneva transportation quote, include your date, passenger count, preferred vehicle, pickup address and each destination. Add arrival times, charter hours and return-trip details so we can review vehicle availability and estimate your rental cost.',
	},
];

/**
 * Shared event, group-size and duration choices. VehicleOptions renders the
 * grouped vehicle choices directly from fleet.ts.
 */
export const quoteOptions = {
	eventTypes: [
		'Out-of-State Trips',
		'Wedding',
		'Wedding Guest Shuttle',
		'Corporate Events',
		'General Events',
		'Airport Transportation',
		'Night Out',
		'Christmas Light Tour',
		'Holiday Trolley',
		'Bar Hopping',
		'Others',
	],
	// Larger groups can be split across more than one vehicle, hence the last band.
	groupSizes: ['1–10', '11–20', '21–30', '31–40', '41–57', '58 or more'],
	durations: [
		'3 hours',
		'4 hours',
		'5 hours',
		'6 hours',
		'7 hours',
		'8 hours',
		'All-day charter (12 hours)',
		'One-way transfer',
		'Round trip',
	],
} as const;
