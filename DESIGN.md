---
name: Sami
description: Agentes con IA que atienden 24/7 por WhatsApp — mundo visual "carta de cevichería"
colors:
  plate: '#FFFDF8'
  carbon: '#2B2622'
  aji: '#C22A18'
  aji-deep: '#A02010'
  aji-soft: '#FBE3DD'
  lima: '#A9CC4E'
  lima-soft: '#ECF5D4'
  mar: '#0C6DA0'
  mar-soft: '#DCEEF8'
  wsp: '#0B7A3E'
  wsp-deep: '#096632'
  wsp-bright: '#25D366'
  wsp-soft: '#D9F7E7'
typography:
  display:
    fontFamily: 'Passion One, Arial Narrow, sans-serif'
    fontSize: 'clamp(3.4rem, 11vw, 6rem)'
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: 'normal'
  headline:
    fontFamily: 'Passion One, Arial Narrow, sans-serif'
    fontSize: 'clamp(2.6rem, 6vw, 4rem)'
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: 'normal'
  course:
    fontFamily: 'Passion One, Arial Narrow, sans-serif'
    fontSize: '1.5rem'
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: '0.025em'
  body:
    fontFamily: 'Hanken Grotesk, Segoe UI, sans-serif'
    fontSize: '1.0625rem'
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: 'normal'
  hand:
    fontFamily: 'Caveat, cursive'
    fontSize: '1.5rem'
    fontWeight: 600
    lineHeight: 1.2
rounded:
  chip: '8px'
  card: '16px'
  bubble: '14px'
  bubble-tail: '4px'
  pill: '999px'
spacing:
  section: '80px (128px desktop)'
  container-x: '20px (32px desktop)'
  menu-column: 'max-width 42rem'
  item-gap: '16px'
  course-gap: '56px'
components:
  button-primary:
    backgroundColor: '{colors.wsp}'
    textColor: '#FFFFFF'
    rounded: '{rounded.pill}'
    padding: '14px 28px'
  button-primary-hover:
    backgroundColor: '{colors.wsp-deep}'
    textColor: '#FFFFFF'
    rounded: '{rounded.pill}'
    padding: '14px 28px'
  chip:
    backgroundColor: '{colors.lima}'
    textColor: '{colors.carbon}'
    rounded: '{rounded.chip}'
    padding: '3px 10px'
  chip-blue:
    backgroundColor: '{colors.mar}'
    textColor: '#FFFFFF'
    rounded: '{rounded.chip}'
    padding: '3px 10px'
  chip-red:
    backgroundColor: '{colors.aji}'
    textColor: '#FFFFFF'
    rounded: '{rounded.chip}'
    padding: '3px 10px'
---

# Design System: Sami

## Overview

**Creative North Star: "La carta de la cevichería que nunca cierra"**

Sami se viste con la gramática de una carta de cevichería peruana: plato de cerámica blanco, titulares en tomate (ají), puntos de menú entre el plato y su precio, ajíes como separadores y un verde WhatsApp que manda en toda acción. El agente de IA es el mozo que nunca falta: la página no explica tecnología, toma el pedido. La disposición rechaza el molde SaaS de hero + tres tarjetas + tabla de precios; en su lugar, una sola columna de carta centrada, con cursos (Cebiches / Segundos / Postres) que nombran las capacidades del agente.

La densidad es de menú bien editado: listas cortas con líneas punteadas, generoso aire entre cursos, un solo pasaje oscuro — "la pizarra" — donde la conversación de demostración se lee como especial del día. El movimiento es de servicio: un pulso constante en el botón WhatsApp (la firma de la casa), la vista previa de conversación que aparece sola a los 3 segundos y entradas de scroll con ease-out exponencial. Todo se apaga bajo `prefers-reduced-motion`.

**Key Characteristics:**

- Filas de menú: nombre en negrita, línea punteada de 3px, chip de bloque de color ligeramente inclinado
- Una acción primaria en todo el mundo: escribir por WhatsApp (verde profundo #0B7A3E, texto blanco)
- Notas a mano (Caveat) como adorno de pizarra, nunca como etiqueta sobre un título
- Español peruano de Lima en todo el copy; sin formularios como camino principal

## Colors

Paleta de bloque de color con roles fijos: el tomate manda en los titulares, el lima y el azul marino alternan en los chips, y el verde WhatsApp es el único color de acción.

### Primary

- **Ají** (#C22A18): titulares y énfasis de marca sobre el plato blanco; contraste ~6:1. Hover profundo #A02010. Versión suave #FBE3DD para fondos calmos.

### Secondary

- **Lima** (#A9CC4E): chips y marks de resaltado, siempre con texto carbón. Fondo suave #ECF5D4 para la sección de rubros.
- **Mar** (#0C6DA0): azul del Pacífico para cabeceras de curso y chips alternos, texto blanco (≥4.5:1). Fondo suave #DCEEF8; encabeza la tarjeta de chat flotante.

### Tertiary

- **Verde WhatsApp** (#0B7A3E): único color de botones y CTA flotante, texto blanco. Hover #096632. El verde vivo #25D366 solo para anillos de pulso y burbujas de chat (#D9F7E7 saliente); jamás texto blanco sobre él.

### Neutral

- **Plato** (#FFFDF8): fondo de toda la página, blanco cerámico cálido.
- **Carbón** (#2B2622): texto y la única superficie oscura (pizarra + footer). Texto secundario nunca gris puro: siempre carbón con opacidad sobre el mismo matiz.

### Named Rules

**La Regla de un Solo Plato.** El fondo es cerámica blanca en toda la página; el carbón oscuro solo aparece dos veces — la pizarra y el cierre del footer — para marcar el ritmo.
**La Regla del Mozo.** Toda acción primaria del mundo es un botón verde WhatsApp; no existen formularios ni botones de otro color.

## Typography

**Display Font:** Passion One (700; respaldo Arial Narrow)
**Body Font:** Hanken Grotesk (400–800; respaldo Segoe UI)
**Hand Font:** Caveat (600) — solo garnice

**Character:** Condensada y pintada a mano arriba, humanista y legible abajo (público no técnico de todas las edades), con la Caveat como tiza de pizarra.

### Hierarchy

- **Display** (700, clamp(3.4rem–6rem), 0.95): titular del hero y cierre rojo; jamás pasa de 6rem.
- **Headline** (700, clamp(2.6rem–4rem), 1.15): títulos de sección en ají (o blanco sobre carbón/ají).
- **Course** (700, 1.5rem, MAYÚSCULAS, tracking 0.025em): cabeceras de curso en mar (Cebiches / Segundos / Postres).
- **Body** (400–600, 1.0625rem, 1.65, máx ~60–65ch): párrafos y filas de carta en carbón.
- **Hand** (Caveat 600, 1.5rem): notas al margen y tags de curso, en ají o mar; siempre al costado o debajo, nunca encima de un título.

### Named Rules

**La Regla de la Tiza.** La Caveat es garnice de pizarra: acompaña, no etiqueta. Nada de kickers sobre títulos.

## Layout

Mobile-first, una sola columna de carta centrada (max-width 42rem) dentro de contenedores de 72rem (px 20/32). Secciones respiran con 80px verticales (128px en desktop) y más aire sobre cada título que debajo. Los cursos se separan con el divisor de ají (línea punteada 3px + SVG de ají en ají). El primer viewport sostiene de 1280 a 1600px con titulares fluidos por clamp; ninguna retícula de píxeles fijos. En móvil, las filas de carta se parten en dos líneas: el nombre arriba, punteado + chip alineado a la derecha debajo.

## Elevation & Depth

Sombra suave con desenfoque real, reservada a lo que flota: tarjeta de chat, botones primarios y la conversación de la pizarra. Las superficies de carta (chips, filas, rubros) son planas — la profundidad del mundo la dan el color de bloque y la línea punteada, no la sombra.

### Shadow Vocabulary

- **menu** (`0 10px 30px -8px rgb(43 38 34 / 0.18), 0 2px 8px -2px rgb(43 38 34 / 0.1)`): tarjetas y FAB.
- **botón WhatsApp** (`0 12px 24px -8px rgb(11 122 62 / 0.45), 0 2px 6px -2px rgb(43 38 34 / 0.18)`): eleva el botón primario; sube a 16px/28px en hover con -2px de translateY.

### Named Rules

**La Regla del Plato Llano.** Lo que está servido en la carta va plano; solo flota lo que el mozo trae volando (chat, botones).

## Shapes

Esquinas vivas pero moderadas: chips 8px, tarjetas y chat 16px, burbujas 14px con una cola de 4px hacia el emisor, botones píldora (999px). Sin clip-paths decorativos ni máscaras geométricas; la única silueta firma es el ají SVG de los divisores. Las líneas del sistema son de menú: punteadas (3px, carbón al 28%) para líderes y separadores internas; sólidas de 3px carbón para el masthead.

## Components

### Botón WhatsApp (primario)

- **Shape:** píldora (999px), padding 14px 28px, ícono de glifo WhatsApp + etiqueta
- **Primary:** fondo verde profundo {colors.wsp}, texto blanco, sombra propia
- **Hover / Focus:** fondo {colors.wsp-deep}, -2px y sombra crecida; foco anillo ají 3px con offset 2
- **Pulso:** anillo #25D366 al 50% que se expande 16px y se disipa, 2.2s en loop — la firma de la casa

### Chip de carta

- **Style:** bloque de color sólido (lima/carbón, mar/blanco, ají/blanco), 8px, texto 13px extrabold
- **State:** inclinación alternada ∓1–1.2° (nth-child) como precio puesto a mano; se usa dentro de filas con líder punteado o suelto en paños de chips

### Fila de menú (firma)

- **Anatomy:** nombre en 600–700 carbón → líder punteado flex-1 (mín 24px) → chip de bloque
- **Responsive:** en <640px el nombre baja a línea propia y el líder + chip cierran la segunda línea a la derecha

### Tarjeta de chat (pizarra y flotante)

- **Cards:** fondo plato, 16px, sombra menu; cabecera mar con avatar circular ají y estado "en línea"
- **Bubbles:** cliente #F1EDE5 con cola a la izquierda; agente {colors.wsp-soft} con cola a la derecha; radio 14px/4px
- **Flotante:** fixed abajo-derecha (bottom 104px), ancho máx 20.5rem, entra a los 3s con ease-out expo; pie con enlace "Responder por WhatsApp" y rótulo "Conversación de demostración"

### Navegación

- **Masthead:** sticky, plato al 95% con blur, regla inferior sólida de 3px carbón; wordmark "Sami" en Passion One ají con punto lima
- **Links:** 14px extrabold, hover a ají; foco anillo ají

### Divisor de ají

- Línea punteada 3px + ají SVG (game-icons, CC BY 3.0) en {colors.aji}, centrado entre secciones

## Do's and Don'ts

### Do:

- **Do** usar Passion One 700 en titulares con clamp y nunca pasar de 6rem.
- **Do** Alternar chips lima→mar→ají en cada lista de carta para el ritmo de bloque de color.
- **Do** Escribir todo el copy en español peruano de Lima; los CTA siempre con verbo de pedido ("Pide", "Escríbenos").
- **Do** Etiquetar toda conversación o testimonio sintético con chip visible ("Conversación de demostración", "Ejemplo — aquí irán los testimonios reales").

### Don't:

- **Don't** inventar precios, cifras ni clientes: el precio se encuadra ("de precio menú"), nunca se cifra.
- **Don't** usar kickers/eyebrows sobre títulos, texto en degradado, sombras duras sin blur ni emojis como sistema de íconos (los emoji solo viven dentro del copy de chat).
- **Don't** poner texto blanco sobre el verde vivo #25D366; el verde de botón es el profundo #0B7A3E.
- **Don't** romper la columna de carta con retículas de tarjetas SaaS ni acres de glassmorphism.
