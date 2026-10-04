// Renderiza static/og-image.png (1200×630) para las tarjetas de compartir
// (og:image / twitter:image) con la tipografía y paleta del design system de
// Sami (DESIGN.md), siguiendo el patrón de design/instagram/render.mjs.
//
// Uso: node scripts/render-og-image.mjs
import { createCanvas, GlobalFonts, Path2D } from '@napi-rs/canvas';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const FONTS = path.join(DIR, '..', 'design', 'instagram', 'fonts');
const OUT = path.join(DIR, '..', 'static', 'og-image.png');

GlobalFonts.registerFromPath(path.join(FONTS, 'passion-700.ttf'), 'Passion One');
GlobalFonts.registerFromPath(path.join(FONTS, 'hanken-400.ttf'), 'Hanken Grotesk');
GlobalFonts.registerFromPath(path.join(FONTS, 'hanken-600.ttf'), 'Hanken Grotesk Medium');
GlobalFonts.registerFromPath(path.join(FONTS, 'hanken-700.ttf'), 'Hanken Grotesk Bold');

// Paleta del design system
const PLATE = '#FFFDF8';
const CARBON = '#2B2622';
const AJI = '#C22A18';
const LIMA = '#A9CC4E';
const WSP = '#0B7A3E';
const WSP_SOFT = '#D9F7E7';

const W = 1200;
const H = 630;
const MX = 80; // margen izquierdo

// Glifo WhatsApp (Simple Icons, CC0) — el mismo que usa design/instagram/render.mjs
const WSP_PATH =
	'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z';

const canvas = createCanvas(W, H);
const ctx = canvas.getContext('2d');

function setFont(family, size, weight = '') {
	ctx.font = `${weight ? weight + ' ' : ''}${size}px "${family}"`;
}

// Reduce el tamaño hasta que el texto quepa en maxWidth
function fitFont(text, family, size, maxWidth, weight = '') {
	setFont(family, size, weight);
	while (ctx.measureText(text).width > maxWidth && size > 12) {
		size -= 2;
		setFont(family, size, weight);
	}
	return size;
}

// ---------- fondo ----------
ctx.fillStyle = PLATE;
ctx.fillRect(0, 0, W, H);

// ---------- glifo WhatsApp decorativo (arriba a la derecha) ----------
const G_SIZE = 260;
ctx.save();
ctx.translate(860, 90);
ctx.scale(G_SIZE / 24, G_SIZE / 24);
ctx.fillStyle = WSP_SOFT;
ctx.fill(new Path2D(WSP_PATH));
ctx.restore();

// ---------- marca ----------
setFont('Passion One', 60, '700');
ctx.fillStyle = AJI;
ctx.textBaseline = 'alphabetic';
ctx.fillText('Sami', MX, 112);
const brandW = ctx.measureText('Sami').width;
ctx.fillStyle = LIMA;
ctx.beginPath();
ctx.arc(MX + brandW + 24, 92, 9, 0, Math.PI * 2);
ctx.fill();

// ---------- titular (dos líneas, como el h1 de la landing) ----------
const H1_SIZE = fitFont('Tu negocio,', 'Passion One', 128, 760, '700');
ctx.fillStyle = AJI;
ctx.fillText('Tu negocio,', MX, 250);

const l2Size = fitFont('atendido', 'Passion One', H1_SIZE, 700, '700');
ctx.fillStyle = AJI;
ctx.fillText('atendido', MX, 382);
const l2W = ctx.measureText('atendido').width;

// "24/7" resaltado en lima, como el <mark> del titular
setFont('Passion One', l2Size, '700');
const chipText = '24/7';
const chipTextW = ctx.measureText(chipText).width;
const chipPadX = 36;
const chipH = l2Size + 8;
const chipW = chipTextW + chipPadX * 2;
const chipX = MX + l2W + 24;
const chipCY = 382 - l2Size * 0.32;

ctx.save();
ctx.translate(chipX + chipW / 2, chipCY);
ctx.rotate((-2 * Math.PI) / 180);
ctx.fillStyle = LIMA;
ctx.beginPath();
ctx.roundRect(-chipW / 2, -chipH / 2, chipW, chipH, 16);
ctx.fill();
ctx.fillStyle = AJI;
ctx.textBaseline = 'middle';
ctx.fillText(chipText, -chipTextW / 2, 2);
ctx.restore();
ctx.textBaseline = 'alphabetic';

// ---------- bajada ----------
const SUB = 'Agentes con IA que toman pedidos y venden por WhatsApp.';
fitFont(SUB, 'Hanken Grotesk', 34, 900, 'Medium');
ctx.fillStyle = CARBON;
ctx.fillText(SUB, MX, 474);

// ---------- píldora CTA (como el botón de WhatsApp de la landing) ----------
const label = 'Escríbenos';
setFont('Hanken Grotesk', 30, 'Bold');
const textW = ctx.measureText(label).width;
const padX = 28;
const iconD = 46;
const gap = 12;
const pillW = padX * 2 + iconD + gap + textW;
const pillH = 68;
const pillX = MX;
const pillY = 524;
const r = pillH / 2;

ctx.save();
ctx.shadowColor = 'rgba(11, 122, 62, 0.45)';
ctx.shadowBlur = 18;
ctx.shadowOffsetY = 8;
ctx.fillStyle = WSP;
ctx.beginPath();
ctx.roundRect(pillX, pillY, pillW, pillH, r);
ctx.fill();
ctx.restore();

const cx = pillX + padX + iconD / 2;
const cy = pillY + pillH / 2;
ctx.fillStyle = LIMA;
ctx.beginPath();
ctx.arc(cx, cy, iconD / 2, 0, Math.PI * 2);
ctx.fill();

const gSize = iconD * 0.58;
ctx.save();
ctx.translate(cx - gSize / 2, cy - gSize / 2);
ctx.scale(gSize / 24, gSize / 24);
ctx.fillStyle = CARBON;
ctx.fill(new Path2D(WSP_PATH));
ctx.restore();

ctx.fillStyle = '#ffffff';
ctx.textBaseline = 'middle';
ctx.fillText(label, cx + iconD / 2 + gap, cy + 1);

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, canvas.toBuffer('image/png'));
console.log('✓', OUT);
