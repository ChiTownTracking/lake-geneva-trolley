/**
 * Homepage copy. Section headings follow the approved homepage design; body
 * copy sticks to facts the rest of the site already states (fleet capacities,
 * a chauffeur on every charter, quotes per trip). Nothing here names a venue,
 * a price or a credential that has not been confirmed - see HANDOFF.md.
 */
import { fleet } from './fleet';

type IconName =
	| 'heart'
	| 'briefcase'
	| 'wine'
	| 'hotel'
	| 'plane'
	| 'presentation';

/** "Up to 40 passengers" -> "up to 40 passengers", for use mid-sentence. */
const capacity = (id: string) => {
	const label = fleet.find((v) => v.id === id)?.capacityLabel ?? '';
	return label.charAt(0).toLowerCase() + label.slice(1);
};

export const localServices: { icon: IconName; label: string }[] = [
	{ icon: 'heart', label: 'Weddings & Receptions' },
	{ icon: 'hotel', label: 'Hotel Shuttles' },
	{ icon: 'briefcase', label: 'Corporate Events' },
	{ icon: 'plane', label: 'Airport Transfers' },
	{ icon: 'wine', label: 'Breweries & Winery Tours' },
	{ icon: 'presentation', label: 'Local Conventions' },
];

export const weddingServices = [
	'Wedding party transportation from the hotel to the ceremony',
	'Guest shuttles between hotels, the ceremony and the reception',
	'Photo stops around the lake, planned into the timeline',
	'Return runs at the end of the night',
];

/** Geography only - no venue or radius is claimed. */
export const serviceAreas = [
	{ name: 'Lake Geneva', note: 'Downtown and the east end of Geneva Lake' },
	{ name: 'Fontana', note: 'West end of Geneva Lake' },
	{ name: 'Williams Bay', note: 'North shore of Geneva Lake' },
	{ name: 'Delavan', note: 'Delavan Lake and downtown' },
	{ name: 'Elkhorn', note: 'The Walworth County seat' },
	{ name: 'Southern Wisconsin', note: 'Milwaukee, Madison, Kenosha and beyond', href: '/southern-wisconsin/' },
];

export const homeFaqs = [
	{
		q: 'How much does a trolley rental cost in Lake Geneva?',
		a: 'Lake Geneva trolley rental pricing depends on your date, vehicle, charter hours, pickup location and route. Request a quote with your passenger count and planned stops to receive an estimate for your wedding, event or private outing.',
	},
	{
		q: 'How many people can your trolleys and buses accommodate?',
		a: `The Classic Trolley seats ${capacity('classic-trolley')} and the Limo Trolley ${capacity('limo-trolley')}. Coach buses come in three sizes: ${capacity('small-coach-bus')}, ${capacity('coach-bus')} and ${capacity('super-coach-bus')}. The party bus carries ${capacity('party-bus')}, the Limo Van ${capacity('limo-van')} and the Executive Sprinter ${capacity('executive-sprinter')}. Bigger groups can be split across more than one vehicle.`,
	},
	{
		q: 'Do you provide wedding transportation in Lake Geneva?',
		a: 'Yes. Our Lake Geneva wedding transportation can include hotel and resort pickups, ceremony transfers, Geneva Lake photo stops, reception arrivals and scheduled returns. Request a trolley for the wedding party and a coach bus for guest shuttles, subject to vehicle availability and route confirmation.',
	},
	{
		q: 'What areas do you service?',
		a: 'Our Lake Geneva transportation service covers Fontana, Williams Bay, Delavan, Elkhorn and surrounding communities. Private charters across southern Wisconsin and to Chicago are available on request. Include all pickup addresses and destinations so we can confirm your route and travel times.',
	},
	{
		q: 'How do I get a quote for my event?',
		a: 'Request a Lake Geneva trolley or bus rental quote using the form above, or call our team. Include your event date, passenger count, pickup address, destinations and preferred times. These details help us match a vehicle and estimate your charter cost.',
	},
];

export interface Article {
	title: string;
	body: string;
	points?: string[];
}

export const localExpertsIntro =
	'Lake Geneva Trolley & Bus Rental provides private trolley rental in Lake Geneva, WI and group transportation around Geneva Lake. Our women-owned business offers trolleys, coach buses, party buses and Sprinter vans for weddings, corporate events, hotel shuttles and private celebrations. Every charter includes a professional chauffeur, with the route and schedule planned around your group.';

export const articles: Article[] = [
	{
		title: 'Why Choose Lake Geneva Trolley Rental in Lake Geneva WI',
		body: 'A Lake Geneva trolley rental includes a professional chauffeur and an itinerary planned for your group. Choose a vehicle with the seating you need, then coordinate hotel pickups, venue transfers and return trips around your event schedule. Your quote reflects your date, route and charter hours.',
		points: [
			'A professional chauffeur on every charter',
			'Trolleys, coach buses, a party bus and Sprinter vans',
			'Built for weddings, events, corporate and private charters',
			'Itineraries planned around Lake Geneva venues, hotels and roads',
			'Quotes built around your date, route and group size',
		],
	},
	{
		title: 'Private Trolley Rental, Wedding Transportation & Event Shuttle Service',
		body: 'Private trolley rental in Lake Geneva, WI gives wedding parties, corporate groups and families a shared ride between their planned stops. Request a transfer or a longer charter for your event, with pickup locations and timing confirmed before travel.',
		points: [
			'Private Lake Geneva trolley rental for weddings and events',
			'Wedding transportation and guest shuttles',
			'Corporate event and convention transportation',
			'Group transportation in Lake Geneva and nearby towns',
			'Custom routes and flexible scheduling',
		],
	},
	{
		title: 'Trolley Rental Near Me and Wedding Transportation Near Me in Lake Geneva',
		body: 'Planning group transportation near Lake Geneva? Arrange pickups at hotels, resorts, vacation rentals and event venues in Lake Geneva, Fontana, Williams Bay and nearby communities. Send your departure address, destinations and group size so we can review a local trolley rental or shuttle route.',
	},
	{
		title: 'Lake Geneva Wedding Trolley Rental for Ceremonies, Receptions and Guest Shuttles',
		body: 'Lake Geneva wedding trolley rental keeps your wedding party together for hotel pickups, ceremony arrivals, photographs and reception transfers. Add a coach bus for guest shuttles between lodging and your venue. We review both routes against your timeline, passenger counts and vehicle availability.',
	},
	{
		title: 'Group Transportation, Bus Rental and Charter Services Around Geneva Lake',
		body: 'Lake Geneva charter bus rental accommodates larger groups with three coach sizes seating 22 to 57 passengers. Reclining seats suit corporate outings, conventions and longer transfers to Milwaukee, Madison or Chicago. A lavatory is available on request on coaches above 33 passengers; confirm the assigned vehicle when booking.',
	},
	{
		title: 'Hotel, Resort and Venue Transportation in Lake Geneva Wisconsin',
		body: 'Arrange Lake Geneva hotel and resort transportation for wedding guests, conference attendees or family reunions. Scheduled shuttles connect your lodging and event venues, with pickup points, boarding time and return runs planned around your guest count and itinerary.',
	},
	{
		title: 'Service Areas: Lake Geneva, Fontana, Williams Bay and Nearby Communities',
		body: 'Request trolley rental and group transportation in Lake Geneva, Fontana-on-Geneva Lake, Williams Bay, Delavan or Elkhorn. We also review private charter routes across southern Wisconsin and to Chicago. Send every pickup address and stop so we can confirm service for your date.',
	},
	{
		title: 'Best Trolley Rental in Lake Geneva WI for Private Events and Large Groups',
		body: 'Compare Lake Geneva trolley, bus and van rentals by passenger capacity and seating layout. Choose a classic trolley for a wedding, a party bus for a celebration or a Sprinter van for a smaller group. Coach buses accommodate larger guest lists, and multiple vehicles can be requested for the same event.',
	},
];

export const transportOptions = [
	{ label: 'Lake Geneva wedding trolley rental', href: '/weddings/' },
	{ label: 'Corporate event transportation', href: '/services/' },
	{ label: 'Private trolley rental in Lake Geneva, WI', href: '/fleet/#trolley' },
	{ label: 'Lake Geneva group shuttle service', href: '/services/' },
	{ label: 'Lake Geneva trolley bus rental', href: '/fleet/#trolley' },
	{ label: 'Lake Geneva hotel transportation', href: '/services/' },
	{ label: 'Lake Geneva wedding guest shuttles', href: '/weddings/' },
	{ label: 'Charter bus rental in Lake Geneva, WI', href: '/fleet/#coach-bus' },
];
