/**
 * Renders development placeholders for every entry in the shot list.
 *
 *   node scripts/generate-placeholders.mjs
 *
 * Output goes to src/assets/photos/<file>.jpg at the exact dimensions the
 * layout expects, so the real photographs drop straight in on top of them.
 * Each placeholder is stamped DEV PLACEHOLDER with its brief and size — it is
 * never mistakable for final imagery.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { shotList } from './shot-list.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'src/assets/photos');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Greedy wrap on an approximate character budget. */
function wrap(text, max) {
	const lines = [];
	let line = '';
	for (const word of text.split(/\s+/)) {
		if (line && (line + ' ' + word).length > max) {
			lines.push(line);
			line = word;
		} else {
			line = line ? line + ' ' + word : word;
		}
	}
	if (line) lines.push(line);
	return lines;
}

function svg({ width, height, title, brief }) {
	const s = Math.min(width, height);
	const pad = Math.round(s * 0.07);
	const titleSize = Math.round(s * 0.058);
	const briefSize = Math.round(s * 0.032);
	const metaSize = Math.round(s * 0.026);
	const briefLines = wrap(brief, Math.round(width / (briefSize * 0.52)));
	const ratio = (() => {
		const gcd = (a, b) => (b ? gcd(b, a % b) : a);
		const g = gcd(width, height);
		return `${width / g}:${height / g}`;
	})();

	// Horizon sits on the lower third — a lake-country silhouette, in brand colours.
	const h1 = Math.round(height * 0.66);
	const h2 = Math.round(height * 0.74);

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1d3f4e"/>
      <stop offset="55%" stop-color="#3d6a7c"/>
      <stop offset="100%" stop-color="#cbd9d5"/>
    </linearGradient>
    <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4a7183"/>
      <stop offset="100%" stop-color="#26495a"/>
    </linearGradient>
    <pattern id="hatch" width="34" height="34" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="34" height="34" fill="none"/>
      <line x1="0" y1="0" x2="0" y2="34" stroke="#fdfcfa" stroke-opacity="0.09" stroke-width="12"/>
    </pattern>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#sky)"/>
  <path d="M0 ${h1} Q ${width * 0.2} ${h1 - s * 0.09}, ${width * 0.42} ${h1 - s * 0.01} T ${width} ${h1 - s * 0.05} L ${width} ${height} L 0 ${height} Z" fill="#3f5a48" fill-opacity="0.88"/>
  <path d="M0 ${h2} Q ${width * 0.3} ${h2 - s * 0.05}, ${width * 0.6} ${h2 + s * 0.02} T ${width} ${h2 - s * 0.02} L ${width} ${height} L 0 ${height} Z" fill="url(#water)"/>
  <rect width="${width}" height="${height}" fill="url(#hatch)"/>
  <rect x="${pad}" y="${pad}" width="${width - pad * 2}" height="${height - pad * 2}" fill="none" stroke="#f0d9a8" stroke-opacity="0.55" stroke-width="${Math.max(2, Math.round(s * 0.004))}"/>
  <g font-family="Arial, Helvetica, sans-serif" text-anchor="middle" fill="#fdfcfa">
    <text x="${width / 2}" y="${height / 2 - titleSize * 1.15}" font-size="${metaSize}" letter-spacing="${metaSize * 0.34}" fill="#f0d9a8">DEV PLACEHOLDER</text>
    <text x="${width / 2}" y="${height / 2 + titleSize * 0.18}" font-size="${titleSize}" font-weight="bold">${esc(title)}</text>
    ${briefLines
			.map(
				(line, i) =>
					`<text x="${width / 2}" y="${height / 2 + titleSize * 1.1 + i * briefSize * 1.45}" font-size="${briefSize}" fill="#e6eeec">${esc(line)}</text>`,
			)
			.join('\n    ')}
    <text x="${width / 2}" y="${height / 2 + titleSize * 1.1 + briefLines.length * briefSize * 1.45 + briefSize * 0.9}" font-size="${metaSize}" letter-spacing="${metaSize * 0.18}" fill="#f0d9a8">${width} × ${height} · ${ratio}</text>
  </g>
</svg>`;
}

await mkdir(outDir, { recursive: true });

let written = 0;
let skipped = 0;

for (const shot of shotList) {
	if (shot.supplied) {
		skipped++;
		console.log(`${shot.file}.jpg  skipped — real photograph supplied`);
		continue;
	}
	const buffer = await sharp(Buffer.from(svg(shot)), { density: 96 })
		.jpeg({ quality: 82, mozjpeg: true })
		.toBuffer();
	await writeFile(resolve(outDir, `${shot.file}.jpg`), buffer);
	written++;
	console.log(`${shot.file}.jpg  ${shot.width}×${shot.height}  ${(buffer.length / 1024).toFixed(0)} KB`);
}

console.log(
	`\n${written} placeholder${written === 1 ? '' : 's'} written to src/assets/photos/` +
		(skipped ? `, ${skipped} real photograph${skipped === 1 ? '' : 's'} left alone.` : '.'),
);
