import { chromium } from 'playwright';

const BASE = process.env.BASE_URL ?? 'http://localhost:4173';

// Capturas de revisión: desktop 1440 y mobile 390, página completa.
// Se emula prefers-reduced-motion para que la entrada (reveals, chat)
// quede asentada en su estado final; se espera >3 s para que la vista
// previa flotante de conversación aparezca (forma parte del primer viewport).
const browser = await chromium.launch();
try {
	for (const [name, width, height] of [
		['desktop', 1440, 900],
		['mobile', 390, 844]
	]) {
		const context = await browser.newContext({
			viewport: { width, height },
			reducedMotion: 'reduce',
			deviceScaleFactor: 1
		});
		const page = await context.newPage();
		await page.goto(BASE, { waitUntil: 'networkidle' });
		await page.waitForTimeout(4500);
		await page.screenshot({ path: `.impeccable/review/${name}.png`, fullPage: true });
		console.log(`captured .impeccable/review/${name}.png (${width}w)`);
		await context.close();
	}
} finally {
	await browser.close();
}
