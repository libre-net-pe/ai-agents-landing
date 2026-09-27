/**
 * Brand + contact constants for Sami.
 */

export const BRAND = 'Sami';

// Número confirmado por el propietario (2026-09): +34 623 43 95 76.
export const WHATSAPP_NUMBER = '34623439576';

export const WHATSAPP_DEFAULT_TEXT = '¡Buenas! Quiero un agente que atienda mi negocio 24/7.';

export function waUrl(text: string = WHATSAPP_DEFAULT_TEXT): string {
	return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
