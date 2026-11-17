/**
 * Brand + contact constants for Sami.
 */

export const BRAND = 'Sami';

// Origen canónico del sitio (se sirve en la raíz del dominio, ver CNAME).
export const SITE_URL = 'https://chatbot.libre.net.pe';

// URL canónica con barra final: la misma forma que usa sitemap.xml.
export const CANONICAL_URL = `${SITE_URL}/`;

// Número confirmado por el propietario (2026-09): +34 623 43 95 76.
export const WHATSAPP_NUMBER = '34623439576';

export const WHATSAPP_E164 = `+${WHATSAPP_NUMBER}`;

export const WHATSAPP_DEFAULT_TEXT = '¡Buenas! Quiero un agente que atienda mi negocio 24/7.';

/**
 * Título y descripción canónicos. Una sola fuente para <title>,
 * meta description, Open Graph, Twitter y JSON-LD.
 * Largo: 55 y 148 caracteres (los buscadores cortan ~60/~155).
 */
export const SITE_TITLE = 'Sami — Chatbot de WhatsApp con IA para negocios · Perú';

export const SITE_DESCRIPTION =
	'Sami es el chatbot de WhatsApp con IA que atiende tu negocio 24/7: pedidos, precios y ventas. En español peruano, de precio PYME y listo en días.';

export const OG_IMAGE_URL = `${SITE_URL}/og-image.png`;

export const LOGO_URL = `${SITE_URL}/logo.png`;

export function waUrl(text: string = WHATSAPP_DEFAULT_TEXT): string {
	return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
