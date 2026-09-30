// Renderiza los textos de campaña sobre las imágenes 960×1200 (salida 1080×1350, 4:5 Instagram)
// usando la tipografía y paleta del design system de Sami (DESIGN.md).
//
// Uso: node design/instagram/render.mjs
import { createCanvas, GlobalFonts, Path2D, loadImage } from '@napi-rs/canvas';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const FONTS = path.join(DIR, 'fonts');

GlobalFonts.registerFromPath(path.join(FONTS, 'passion-700.ttf'), 'Passion One');
GlobalFonts.registerFromPath(path.join(FONTS, 'passion-900.ttf'), 'Passion One XL');
GlobalFonts.registerFromPath(path.join(FONTS, 'hanken-400.ttf'), 'Hanken Grotesk');
GlobalFonts.registerFromPath(path.join(FONTS, 'hanken-600.ttf'), 'Hanken Grotesk Medium');
GlobalFonts.registerFromPath(path.join(FONTS, 'hanken-700.ttf'), 'Hanken Grotesk Bold');
GlobalFonts.registerFromPath(path.join(FONTS, 'hanken-800.ttf'), 'Hanken Grotesk XBold');
GlobalFonts.registerFromPath(path.join(FONTS, 'caveat-600.ttf'), 'Caveat');
GlobalFonts.registerFromPath(path.join(FONTS, 'caveat-700.ttf'), 'Caveat Bold');

// Paleta del design system
const AJI = '#c22a18';
const CARBON = '#2b2622';
const WSP = '#0b7a3e';
const LIMA = '#a9cc4e';

const W = 1080, H = 1350;
const S = W / 960; // diseño pensado en 960×1200

// Glifo WhatsApp (Simple Icons, CC0)
const WSP_PATH =
	'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z';

function drawMultiline(ctx, lines, x, y, { family, size, color, weight = '', lineHeight = 0.95 }) {
	ctx.save();
	ctx.font = `${weight ? weight + ' ' : ''}${size * S}px "${family}"`;
	ctx.fillStyle = color;
	ctx.textBaseline = 'alphabetic';
	let baseline = y * S;
	for (const line of lines) {
		ctx.fillText(line, x * S, baseline);
		baseline += size * S * lineHeight;
	}
	ctx.restore();
	return baseline / S; // siguiente y en coords de diseño
}

function drawCta(ctx, x, yCenter, label) {
	const fs_ = 34 * S;
	ctx.save();
	ctx.font = `${fs_}px "Hanken Grotesk XBold"`;
	const textW = ctx.measureText(label).width;
	const padX = 36 * S;
	const iconD = 46 * S;
	const gap = 14 * S;
	const w = padX * 2 + iconD + gap + textW;
	const h = 86 * S;
	const bx = x * S;
	const by = yCenter * S - h / 2;
	const r = h / 2;

	// sombra suave estilo botón WhatsApp
	ctx.shadowColor = 'rgba(11, 122, 62, 0.45)';
	ctx.shadowBlur = 24 * S;
	ctx.shadowOffsetY = 10 * S;

	ctx.fillStyle = WSP;
	ctx.beginPath();
	ctx.roundRect(bx, by, w, h, r);
	ctx.fill();
	ctx.shadowColor = 'transparent';

	// ícono: círculo lima + glifo WhatsApp en carbón
	const cx = bx + padX + iconD / 2;
	const cy = by + h / 2;
	ctx.fillStyle = LIMA;
	ctx.beginPath();
	ctx.arc(cx, cy, iconD / 2, 0, Math.PI * 2);
	ctx.fill();

	const gSize = iconD * 0.58;
	const p = new Path2D(WSP_PATH);
	ctx.save();
	ctx.translate(cx - gSize / 2, cy - gSize / 2);
	ctx.scale(gSize / 24, gSize / 24);
	ctx.fillStyle = CARBON;
	ctx.fill(p);
	ctx.restore();

	// etiqueta
	ctx.fillStyle = '#ffffff';
	ctx.textBaseline = 'middle';
	ctx.fillText(label, cx + iconD / 2 + gap, cy + 1);
	ctx.restore();
	return { w: w / S, h: h / S };
}

function drawHand(ctx, parts, x, y, { size, color, lineHeight = 1.15, rotate = 0 }) {
	// parts: array de líneas, cada línea array de {text, bold}
	ctx.save();
	ctx.translate(x * S, y * S);
	ctx.rotate((rotate * Math.PI) / 180);
	ctx.textBaseline = 'alphabetic';
	let baseline = 0;
	for (const line of parts) {
		let cx = 0;
		for (const seg of line) {
			ctx.font = `${seg.bold ? '700' : '600'} ${size * S}px "${seg.bold ? 'Caveat Bold' : 'Caveat'}"`;
			ctx.fillStyle = color;
			ctx.fillText(seg.text, cx * S, baseline);
			cx += ctx.measureText(seg.text).width / S;
		}
		baseline += size * S * lineHeight;
	}
	ctx.restore();
}

async function render(src, out, draw) {
	const img = await loadImage(fs.readFileSync(path.join(DIR, src)));
	const canvas = createCanvas(W, H);
	const ctx = canvas.getContext('2d');
	ctx.drawImage(img, 0, 0, W, H);
	draw(ctx);
	fs.writeFileSync(path.join(DIR, out), canvas.toBuffer('image/png'));
	console.log('✓', out);
}

// ---------- 1. Tu negocio, atendido 24/7 ----------
await render('source-1.png', 'post-1-tu-negocio.png', (ctx) => {
	let y = drawMultiline(ctx, ['Tu negocio,', 'atendido 24/7'], 64, 170, {
		family: 'Passion One', size: 118, color: AJI, weight: '700', lineHeight: 0.95,
	});
	drawHand(ctx, [
		[{ text: 'Conoce a ' }, { text: 'Sami', bold: true }, { text: ':' }],
		[{ text: 'tu agente por WhatsApp.' }],
	], 68, y + 92, { size: 54, color: CARBON, rotate: -1.5 });
});

// ---------- 2. ¿Te escriben cuando no puedes responder? ----------
await render('source-2.png', 'post-2-te-escriben.png', (ctx) => {
	drawMultiline(ctx, ['¿Te escriben', 'cuando no puedes', 'responder?'], 64, 150, {
		family: 'Passion One', size: 104, color: CARBON, weight: '700', lineHeight: 0.95,
	});
});

// ---------- 3. Menos chats pendientes. Más ventas. ----------
await render('source-3.png', 'post-3-mas-ventas.png', (ctx) => {
	let y = drawMultiline(ctx, ['Menos chats', 'pendientes.', 'Más ventas.'], 56, 430, {
		family: 'Passion One', size: 94, color: AJI, weight: '700', lineHeight: 0.95,
	});
	drawCta(ctx, 56, y + 130, 'Pide tu Sami por WhatsApp');
});
