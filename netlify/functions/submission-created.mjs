/**
 * Emails every verified Netlify Forms submission through Resend.
 *
 * Netlify runs a function named `submission-created` after each form
 * submission that passes its spam filter, so no form markup needs to change.
 *
 * Environment variables (Netlify → Site configuration → Environment variables):
 * - RESEND_API_KEY (required)
 * - RESEND_FROM (optional) - a sender on a domain verified in Resend.
 */

const TO = 'info@lakegenevatrolleys.com';
const DEFAULT_FROM = 'Lake Geneva Trolley <forms@lakegenevatrolleys.com>';

/** Subject prefix per Netlify form name: "<prefix> - <customer name>". */
const SUBJECTS = {
	'quote-request': 'Quote',
	'wedding-quote-request': 'Wedding Quote',
	'reservation-request': 'Reservation',
	'contact-message': 'Contact',
};

/** Form plumbing and request metadata Netlify adds - not customer input. */
const HIDDEN_FIELDS = new Set(['form-name', 'bot-field', 'ip', 'user_agent', 'referrer']);

/**
 * Email labels, in the order the fields are listed. Fields a form does not
 * have are skipped; anything not listed here follows at the end, labelled
 * with its field name.
 */
const LABELS = {
	type: 'Event Type',
	hours: 'Number of Hours',
	vehicle: 'Vehicle',
	passengers: 'Number of Passengers',
	lavatory: 'Lavatory',
	date: 'Event Date',
	time: 'Pickup Time',
	'end-time': 'End Time',
	pickup: 'Pickup Location',
	dropoff: 'Destination',
	name: 'Full Name',
	phone: 'Phone Number',
	email: 'Email Address',
	message: 'Message',
	'price-quote': 'Price Quote',
	'promo-code': 'Promo Code',
	'billing-name': 'Billing Contact Name',
	'billing-card-number': 'Card Number',
	'billing-card-exp': 'Expiration Date',
	'billing-card-cvv': 'Security Code (CVV)',
	'billing-street-address': 'Billing Street Address',
	'billing-city': 'City',
	'billing-state': 'State',
	'billing-zip': 'Billing ZIP Code',
	agreement: 'Agreement',
};

/** Labels that differ per form, matching what the visitor saw. */
const FORM_LABELS = {
	'quote-request': { message: 'How Did You Find Us?' },
	'wedding-quote-request': { message: 'Wedding Details' },
};

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/** "2026-12-19" -> "Saturday - 12/19/2026". Anything else is returned as sent. */
const formatDate = (value) => {
	const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
	if (!match) return value;
	const [, year, month, day] = match;
	const weekday = DAYS[new Date(Date.UTC(+year, +month - 1, +day)).getUTCDay()];
	return `${weekday} - ${month}/${day}/${year}`;
};

/** "17:30" -> "5:30 PM", "00:15" -> "12:15 AM". Anything else is returned as sent. */
const formatTime = (value) => {
	const match = /^(\d{1,2}):(\d{2})(?::\d{2})?$/.exec(value);
	if (!match || +match[1] > 23) return value;
	const hours = +match[1];
	return `${hours % 12 || 12}:${match[2]} ${hours < 12 ? 'AM' : 'PM'}`;
};

/** US numbers -> "262-555-0123" (a leading country code 1 is dropped). Anything else is returned as sent. */
const formatPhone = (value) => {
	let digits = value.replace(/\D/g, '');
	if (digits.length === 11 && digits.startsWith('1')) digits = digits.slice(1);
	if (digits.length !== 10) return value;
	return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
};

const FORMATTERS = { date: formatDate, time: formatTime, 'end-time': formatTime, phone: formatPhone };

/** The submission as [label, display value, field name] rows, in email order. */
export const emailRows = (formName, data) => {
	const labels = { ...LABELS, ...FORM_LABELS[formName] };
	const order = Object.keys(LABELS);
	const rank = (key) => (order.includes(key) ? order.indexOf(key) : order.length);
	return Object.entries(data)
		.filter(([key]) => !HIDDEN_FIELDS.has(key))
		.map(([key, value], index) => ({ key, index, value: String(value ?? '').trim() }))
		.sort((a, b) => rank(a.key) - rank(b.key) || a.index - b.index)
		.map(({ key, value }) => [labels[key] ?? key, value && FORMATTERS[key] ? FORMATTERS[key](value) : value, key]);
};

/** One "Label: value" line; phone and email are tappable links. */
const htmlRow = ([label, value, key]) => {
	let shown = escapeHtml(value);
	if (value && key === 'phone') shown = `<a href="tel:${escapeHtml(value.replace(/[^\d+]/g, ''))}">${shown}</a>`;
	if (value && key === 'email') shown = `<a href="mailto:${escapeHtml(value)}">${shown}</a>`;
	return `<p style="margin:0 0 6px;font-size:16px;line-height:1.4;white-space:pre-wrap"><strong>${escapeHtml(label)}:</strong> ${shown}</p>`;
};

const escapeHtml = (value) =>
	String(value)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');

/** Strip line breaks so a submitted name cannot spill into other headers. */
const oneLine = (value) => String(value ?? '').replace(/\s+/g, ' ').trim();

export const handler = async (event) => {
	const { payload } = JSON.parse(event.body);
	const formName = payload.form_name;
	const data = payload.data ?? {};

	const customer = oneLine(data.name) || 'Website visitor';
	const subject = `${SUBJECTS[formName] ?? 'Website Form'} - ${customer}`;

	const fields = emailRows(formName, data);
	const rows = fields.map(htmlRow).join('');
	const text = fields.map(([label, value]) => `${label}: ${value}`).join('\n');

	const email = oneLine(data.email);
	const response = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			from: process.env.RESEND_FROM || DEFAULT_FROM,
			to: [TO],
			subject,
			...(email && { reply_to: email }),
			html: `<div style="font-family:Arial,Helvetica,sans-serif;color:#111">${rows}</div>`,
			text,
		}),
	});

	if (!response.ok) {
		const detail = await response.text();
		console.error(`Resend rejected the ${formName} email (HTTP ${response.status}): ${detail}`);
		return { statusCode: 502, body: 'Email could not be sent.' };
	}

	return { statusCode: 200, body: 'Sent.' };
};
