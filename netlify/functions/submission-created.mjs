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

	const fields = Object.entries(data).filter(([key, value]) => !HIDDEN_FIELDS.has(key) && oneLine(value));
	const rows = fields
		.map(
			([key, value]) =>
				`<tr><th align="left" valign="top" style="padding:2px 16px 2px 0;white-space:nowrap">${escapeHtml(key)}</th><td style="padding:2px 0;white-space:pre-wrap">${escapeHtml(String(value).trim())}</td></tr>`,
		)
		.join('');
	const text = fields
		.map(([key, value]) => `${key}: ${String(value).trim()}`)
		.join('\n');

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
			html: `<p style="margin:0 0 8px">New <strong>${escapeHtml(formName)}</strong> submission from the website.</p><table cellpadding="0" cellspacing="0" style="margin:0;border-collapse:collapse">${rows}</table>`,
			text: `New ${formName} submission from the website.\n\n${text}`,
		}),
	});

	if (!response.ok) {
		const detail = await response.text();
		console.error(`Resend rejected the ${formName} email (HTTP ${response.status}): ${detail}`);
		return { statusCode: 502, body: 'Email could not be sent.' };
	}

	return { statusCode: 200, body: 'Sent.' };
};
