/**
 * Single source of truth for Lake Geneva Trolley & Bus Rental business facts.
 *
 * Anything set to `null` is a detail that has NOT been confirmed for this
 * business. Components render those blocks only when a value is supplied, so
 * nothing unverified is ever shown. Fill these in and the whole site updates.
 *
 * See HANDOFF.md for the outstanding list.
 */

export interface ContactDetails {
	/** E.164 number, e.g. '+16085550123' */
	phoneHref: string | null;
	/** Display form, e.g. '+1 608-555-0123' */
	phoneLabel: string | null;
	email: string | null;
	/** Full postal address as one line. */
	address: string | null;
}

export const site = {
	name: 'Lake Geneva Trolley & Bus Rental',
	url: 'https://lakegenevatrolley.com',
	/** Used as the default meta description and in structured data. */
	description:
		'Private trolley and bus charters for weddings, celebrations and group transportation around Lake Geneva, Wisconsin. Share your date and itinerary for a customized quote.',
	/** Short line used where contact details are not yet available. */
	tagline: 'Private trolley and bus charters by reservation',
	areaServed: 'Lake Geneva, Wisconsin',
} as const;

/**
 * The phone number is real (supplied by the owner, September 23, 2026).
 *
 * TODO(handoff): the EMAIL AND ADDRESS ARE PLACEHOLDERS - NOT REAL, DO NOT LAUNCH.
 * They exist so the footer layout can be reviewed with content in it:
 * example.com is reserved by RFC 2606 and the street address is invented.
 * Replace both with the real Lake Geneva details and set
 * `contactIsPlaceholder` to false.
 */
export const contactIsPlaceholder = true;

export const contact: ContactDetails = {
	phoneHref: '+16306243448',
	phoneLabel: '+1 630-624-3448',
	email: 'placeholder@example.com',
	address: '000 Placeholder Ave, Lake Geneva, WI 53147',
};

export interface Social {
	name: string;
	href: string;
	icon: 'instagram' | 'facebook';
}

/** TODO(handoff): PLACEHOLDER - swap `href` for the real profile URLs. */
export const socials: Social[] = [
	{ name: 'Instagram', href: '#', icon: 'instagram' },
	{ name: 'Facebook', href: '#', icon: 'facebook' },
];

/**
 * Footer credentials.
 *
 * `womenOwned` is the owner's own statement about the business. `wbenc` is a
 * third-party certification and a registered mark, so it renders only while
 * this entity actually holds the certification - artwork supplied by the
 * owner. Set it to false and the mark disappears.
 */
export const credentials = {
	womenOwned: true,
	wbenc: true,
	servingLine: 'Serving Lake Geneva and the surrounding lake country.',
};

export const hasContact =
	Boolean(contact.phoneLabel) || Boolean(contact.email) || Boolean(contact.address);

export interface NavItem {
	label: string;
	href: string;
	children?: { label: string; href: string }[];
	/** Render the label's two words in holiday green and red. */
	festive?: boolean;
}

export const nav: NavItem[] = [
	{
		label: 'Fleet',
		href: '/fleet/',
		children: [
			{ label: 'Trolley Buses', href: '/fleet/#trolley' },
			{ label: 'Coach Buses', href: '/fleet/#coach-bus' },
			{ label: 'Party Buses', href: '/fleet/#party-bus' },
			{ label: 'Sprinter Vans', href: '/fleet/#limo-van' },
		],
	},
	{ label: 'Wedding Package', href: '/weddings/' },
	{ label: 'Christmas Trolley', href: '/christmas-trolley/', festive: true },
	{ label: 'Southern Wisconsin', href: '/southern-wisconsin/' },
	{ label: 'Services', href: '/services/' },
	{
		label: 'More',
		href: '/faq/',
		children: [
			{ label: 'FAQ', href: '/faq/' },
			{ label: 'Contact', href: '/contact/' },
			{ label: 'Chicago, IL', href: '/chicago-il/' },
		],
	},
];

/** Flat list used by the footer. */
export const footerNav = [
	{ label: 'Fleet', href: '/fleet/' },
	{ label: 'Weddings', href: '/weddings/' },
	{ label: 'Christmas Trolley', href: '/christmas-trolley/' },
	{ label: 'Southern Wisconsin', href: '/southern-wisconsin/' },
	{ label: 'Chicago, IL', href: '/chicago-il/' },
	{ label: 'Services', href: '/services/' },
	{ label: 'FAQ', href: '/faq/' },
	{ label: 'Contact', href: '/contact/' },
	{ label: 'Reservation', href: '/reservation/' },
];

/**
 * Where quote / contact / reservation forms POST.
 *
 * The markup is emitted for Netlify Forms (the form is present in the
 * prerendered HTML, so Netlify's build-time parser detects it). On a host
 * without a form backend the POST fails and the form shows an error — it never
 * reports a false success. Point this at another endpoint (Formspree, a
 * serverless function, …) to change delivery.
 */
export const formEndpoint = '/';

/**
 * Organization JSON-LD built only from confirmed facts. Telephone, address and
 * social profiles are included only once they are filled in above.
 */
export function organizationSchema() {
	const schema: Record<string, unknown> = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: site.name,
		url: site.url,
		description: site.description,
		areaServed: site.areaServed,
	};
	// The phone number is confirmed, so it is always published.
	if (contact.phoneHref) schema.telephone = contact.phoneHref;
	// Placeholder email and address are for layout review only - publishing them
	// as structured data would feed fake details to search engines. Flip
	// `contactIsPlaceholder` once the real values are in.
	if (!contactIsPlaceholder) {
		if (contact.email) schema.email = contact.email;
		if (contact.address) schema.address = contact.address;
		const real = socials.filter((s) => s.href.startsWith('http'));
		if (real.length) schema.sameAs = real.map((s) => s.href);
	}
	return schema;
}
