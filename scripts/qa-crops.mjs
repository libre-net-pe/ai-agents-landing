import { chromium } from 'playwright';

const BASE = process.env.BASE_URL ?? 'http://localhost:4173';
const browser = await chromium.launch();
try {
	// Recortes de control: demo chat (emoji/burbujas) y héroe mobile (ajuste de chips).
	const desktop = await browser.newContext({
		viewport: { width: 1440, height: 900 },
		reducedMotion: 'reduce'
	});
	const dpage = await desktop.newPage();
	await dpage.goto(BASE, { waitUntil: 'networkidle' });
	const pizarra = dpage.locator('#pizarra-title').locator('xpath=ancestor::section[1]');
	await pizarra.scrollIntoViewIfNeeded();
	await dpage.waitForTimeout(600);
	await dpage.locator('section.bg-carbon .rounded-2xl').screenshot({ path: '/tmp/qa-chat.png' });

	const heroD = dpage.locator('main section').first();
	await dpage.evaluate(() => window.scrollTo(0, 0));
	await dpage.waitForTimeout(400);
	await heroD.screenshot({ path: '/tmp/qa-hero-desktop.png' });
	await desktop.close();

	const mobile = await browser.newContext({
		viewport: { width: 390, height: 844 },
		reducedMotion: 'reduce'
	});
	const mpage = await mobile.newPage();
	await mpage.goto(BASE, { waitUntil: 'networkidle' });
	await mpage.waitForTimeout(4200);
	await mpage.locator('main section').first().screenshot({ path: '/tmp/qa-hero-mobile.png' });
	await mobile.close();
	console.log('qa crops done');
} finally {
	await browser.close();
}
