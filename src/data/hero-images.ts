import { getImage } from 'astro:assets';
import { photos } from './images';

// Share the exact responsive candidates between the head preload and picture.
// Only the active viewport and supported format are downloaded by the browser.
let images: ReturnType<typeof generateImages> | undefined;

function generateImages() {
	return Promise.all([
		getImage({ src: photos.heroDesktop, widths: [960, 1280, 1600, 1774], format: 'avif', quality: 45 }),
		getImage({ src: photos.heroDesktop, widths: [960, 1280, 1600, 1774], format: 'webp', quality: 72 }),
		getImage({ src: photos.heroMobile, widths: [400, 600, 832], format: 'avif', quality: 45 }),
		getImage({ src: photos.heroMobile, widths: [400, 600, 832], format: 'webp', quality: 72 }),
	]);
}

export function getHomeHeroImages() {
	return images ??= generateImages();
}
