// Renderiza static/logo.png (512×512, cuadrado) para el `logo` de
// schema.org (Google pide una imagen cuadrada de al menos 112×112, no el
// banner 1200×630 de og:image). Reusa el trazo del mascota de marca.
//
// Uso: node scripts/render-logo.mjs
import { createCanvas, loadImage } from '@napi-rs/canvas';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(DIR, '..', 'static', 'mascot.svg');
const OUT = path.join(DIR, '..', 'static', 'logo.png');

const SIZE = 512;
// Recorte apretado alrededor del mascota dentro del viewBox 1024×1024
// (el trazo ocupa ~360×390 en el centro; el viewBox deja mucho aire).
const CROP = { x: 296, y: 286, w: 424, h: 424 };
const FILL = 0.86; // proporción del lienzo que ocupa el mascota

const img = await loadImage(SRC);
const canvas = createCanvas(SIZE, SIZE);
const ctx = canvas.getContext('2d');

// Fondo del plato (mismo crema que static/mascot.svg).
ctx.fillStyle = '#FBF3E4';
ctx.fillRect(0, 0, SIZE, SIZE);

const side = SIZE * FILL;
const off = (SIZE - side) / 2;
ctx.drawImage(img, CROP.x, CROP.y, CROP.w, CROP.h, off, off, side, side);

fs.writeFileSync(OUT, canvas.toBuffer('image/png'));
console.log('✓', OUT);
