/**
 * Checks the notification email built by netlify/functions/submission-created.mjs.
 * Resend is mocked: nothing is sent.
 *
 *   node scripts/submission-email-test.mjs
 */
import assert from 'node:assert/strict';
import { handler } from '../netlify/functions/submission-created.mjs';

const sent = [];
globalThis.fetch = async (url, init) => {
	sent.push(JSON.parse(init.body));
	return new Response('{}', { status: 200 });
};

const submit = async (formName, data) => {
	sent.length = 0;
	const result = await handler({ body: JSON.stringify({ payload: { form_name: formName, data } }) });
	assert.equal(result.statusCode, 200);
	assert.equal(sent.length, 1);
	return sent[0];
};

// ---- Quote request: matches the requested layout ----------------------------
{
	// Field order as the browser posts it, plus the metadata Netlify adds.
	const email = await submit('quote-request', {
		'form-name': 'quote-request',
		'bot-field': '',
		vehicle: 'Christmas Trolley',
		passengers: '1–10',
		type: 'General Events',
		hours: '3 hours',
		date: '2026-12-19',
		time: '17:30',
		pickup: '123 Main Street',
		dropoff: '',
		name: 'Jane Sample',
		phone: '(262) 555 0123',
		email: 'jane@example.com',
		message: '',
		ip: '203.0.113.9',
		user_agent: 'Mozilla/5.0',
		referrer: 'https://lakegenevatrolleys.com/',
	});
	assert.equal(email.subject, 'Quote - Jane Sample');
	assert.equal(email.reply_to, 'jane@example.com');
	assert.equal(
		email.text,
		[
			'Event Type: General Events',
			'Number of Hours: 3 hours',
			'Vehicle: Christmas Trolley',
			'Number of Passengers: 1–10',
			'Event Date: Saturday - 12/19/2026',
			'Pickup Time: 5:30 PM',
			'Pickup Location: 123 Main Street',
			'Destination: ',
			'Full Name: Jane Sample',
			'Phone Number: 262-555-0123',
			'Email Address: jane@example.com',
			'How Did You Find Us?: ',
		].join('\n'),
	);
	assert.match(email.html, /<strong>Event Date:<\/strong> Saturday - 12\/19\/2026/);
	assert.match(email.html, /<a href="tel:2625550123">262-555-0123<\/a>/);
	assert.match(email.html, /<a href="mailto:jane@example.com">jane@example.com<\/a>/);
	assert.doesNotMatch(email.html + email.text, /203\.0\.113\.9|Mozilla|bot-field|form-name/);
	console.log('PASS: quote-request email matches the requested format\n');
	console.log(email.text.replace(/^/gm, '    '), '\n');
}

// ---- Time, date and phone edge cases -----------------------------------------
{
	const row = async (data, label) =>
		(await submit('reservation-request', data)).text.split('\n').find((line) => line.startsWith(label + ':'));
	assert.equal(await row({ time: '00:05' }, 'Pickup Time'), 'Pickup Time: 12:05 AM');
	assert.equal(await row({ time: '12:00' }, 'Pickup Time'), 'Pickup Time: 12:00 PM');
	assert.equal(await row({ time: '09:15' }, 'Pickup Time'), 'Pickup Time: 9:15 AM');
	assert.equal(await row({ 'end-time': '23:45' }, 'End Time'), 'End Time: 11:45 PM');
	assert.equal(await row({ date: '2027-01-01' }, 'Event Date'), 'Event Date: Friday - 01/01/2027');
	assert.equal(await row({ date: '2028-02-29' }, 'Event Date'), 'Event Date: Tuesday - 02/29/2028');
	assert.equal(await row({ phone: '+1 262.555.0123' }, 'Phone Number'), 'Phone Number: 262-555-0123');
	assert.equal(await row({ phone: '2625550123' }, 'Phone Number'), 'Phone Number: 262-555-0123');
	assert.equal(await row({ phone: '+44 20 7946 0958' }, 'Phone Number'), 'Phone Number: +44 20 7946 0958');
	console.log('PASS: AM/PM times, weekday dates and dashed phone numbers');
}

// ---- Other forms keep their own labels and escape input ----------------------
{
	const wedding = await submit('wedding-quote-request', {
		type: 'Wedding',
		name: 'A <b>Test</b>',
		message: 'Ceremony at 3\nReception at 6',
		lavatory: 'Requested',
	});
	assert.match(wedding.text, /^Wedding Details: Ceremony at 3\nReception at 6$/m);
	assert.match(wedding.text, /^Lavatory: Requested$/m);
	assert.match(wedding.html, /A &lt;b&gt;Test&lt;\/b&gt;/);
	const contact = await submit('contact-message', { name: 'C', message: 'Hello' });
	assert.match(contact.text, /^Message: Hello$/m);
	console.log('PASS: per-form labels, multi-line messages and HTML escaping');
}

console.log('\nAll submission email checks passed.');
