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
		a: 'Pricing is quoted per trip rather than posted as a flat rate. The estimate is built from the date, the vehicle, the length of the charter, the pickup location and the full route. Send those details through the quote form and you will get a figure specific to your day.',
	},
	{
		q: 'How many people can your trolleys and buses accommodate?',
		a: `The Classic Trolley seats ${capacity('classic-trolley')} and the Limo Trolley ${capacity('limo-trolley')}. Coach buses come in three sizes: ${capacity('small-coach-bus')}, ${capacity('coach-bus')} and ${capacity('super-coach-bus')}. The party bus carries ${capacity('party-bus')}, the Limo Van ${capacity('limo-van')} and the Executive Sprinter ${capacity('executive-sprinter')}. Bigger groups can be split across more than one vehicle.`,
	},
	{
		q: 'Do you provide wedding transportation in Lake Geneva?',
		a: 'Yes, subject to availability and route confirmation. A wedding itinerary can include hotel or resort pickup, transportation to the ceremony, photo stops along the way, the reception arrival and a return run, and a coach can shuttle guests while the trolley carries the wedding party.',
	},
	{
		q: 'What areas do you service?',
		a: 'Charters are planned around Geneva Lake, including Lake Geneva, Fontana, Williams Bay, Delavan and Elkhorn, with trips across southern Wisconsin and into Chicago on request. Include every pickup and stop with your inquiry so the route and timing can be confirmed.',
	},
	{
		q: 'How do I get a quote for my event?',
		a: 'Use the quote form at the top of this page, or call. Share the date, the number of passengers, the pickup address and every stop you expect to make. The more complete that picture is, the more accurate the quote.',
	},
];

export interface Article {
	title: string;
	body: string;
	points?: string[];
}

export const localExpertsIntro =
	'Lake Geneva Trolley provides private trolley rental and transportation services in Lake Geneva, Wisconsin and the surrounding area. Whether you are planning a wedding, a corporate event or a private party, or simply need dependable group transportation around Geneva Lake, our trolleys, buses and vans offer a stylish, comfortable and memorable way to get there. As a women-owned business, we put attentive service, professional chauffeurs and a plan built around your day first.';

export const articles: Article[] = [
	{
		title: 'Why Choose Lake Geneva Trolley Rental in Lake Geneva WI',
		body: 'Every charter is planned around one goal: getting your group where it needs to be, together and on time. Each reservation comes with a professional chauffeur, a vehicle sized to your headcount and an itinerary built around your actual stops, not a generic rate sheet.',
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
		body: 'Reserve a trolley for the whole day or a single transfer. Wedding parties, family celebrations, corporate groups and weekend visitors all follow the same simple process: share the date, the group size and the route, and we put together a quote and a plan that fits.',
		points: [
			'Private trolley rental for any occasion',
			'Wedding transportation and guest shuttles',
			'Corporate event and convention transportation',
			'Group transportation around Geneva Lake',
			'Custom routes and flexible scheduling',
		],
	},
	{
		title: 'Trolley Rental Near Me and Wedding Transportation Near Me in Lake Geneva',
		body: 'Searching for “trolley rental near me” or “wedding transportation near me” from Lake Geneva? Our charters are planned around Geneva Lake and its neighboring towns, so we plan pickups from hotels, resorts, rental homes and venues around the lake. Tell us where your group is staying and where it needs to go.',
	},
	{
		title: 'Lake Geneva Wedding Trolley Rental for Ceremonies, Receptions and Guest Shuttles',
		body: 'A wedding day rarely happens at one address. A trolley keeps the wedding party together from the hotel to the ceremony, through photo stops along the lake and on to the reception, while a coach bus can shuttle guests between hotels and the venue. Share your timeline and we will plan the runs around it.',
	},
	{
		title: 'Group Transportation, Bus Rental and Charter Services Around Geneva Lake',
		body: 'For larger groups, our coach buses seat 22 to 57 passengers across three sizes, with reclining seats for longer trips and a lavatory available on request on coaches above 33 passengers. They suit corporate outings, conventions, team events and transfers between Lake Geneva, Milwaukee, Madison and Chicago.',
	},
	{
		title: 'Hotel, Resort and Venue Transportation in Lake Geneva Wisconsin',
		body: 'Hotel shuttles and resort transfers keep guests moving without anyone hunting for parking. We coordinate pickup points, loading times and return runs with your schedule, whether you are moving wedding guests, conference attendees or a family reunion between where they are staying and where they need to be.',
	},
	{
		title: 'Service Areas: Lake Geneva, Fontana, Williams Bay and Nearby Communities',
		body: 'We serve Lake Geneva, Fontana-on-Geneva Lake, Williams Bay, Delavan, Elkhorn and the communities around them, with trips across southern Wisconsin and into Chicago available on request. Include every pickup and stop with your request so the route and timing can be confirmed.',
	},
	{
		title: 'Best Trolley Rental in Lake Geneva WI for Private Events and Large Groups',
		body: 'From a 14-passenger limo van to a 57-passenger coach, the fleet covers small private outings and large group events alike. Choose a classic trolley for photographs and charm, a party bus for a night out or a Sprinter van for a smaller group, or pair vehicles when the guest list outgrows any one of them.',
	},
];

export const transportOptions = [
	{ label: 'Lake Geneva wedding trolley rental', href: '/weddings/' },
	{ label: 'Corporate event transportation', href: '/services/' },
	{ label: 'Private trolley rental Lake Geneva Wisconsin', href: '/fleet/#trolley' },
	{ label: 'Group shuttle Lake Geneva WI', href: '/services/' },
	{ label: 'Trolley bus rental Lake Geneva WI', href: '/fleet/#trolley' },
	{ label: 'Lake Geneva hotel transportation', href: '/services/' },
	{ label: 'Wedding shuttle Lake Geneva WI', href: '/weddings/' },
	{ label: 'Charter bus rental Lake Geneva WI', href: '/fleet/#coach-bus' },
];
