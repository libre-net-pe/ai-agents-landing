/**
 * Brand + contact constants for Sami.
 */

export const BRAND = 'Sami';

// TODO(reemplazar antes de publicar): número de WhatsApp real del propietario.
// El número 51999999999 es un placeholder y debe cambiarse por el definitivo.
export const WHATSAPP_NUMBER = '51999999999';

export const WHATSAPP_DEFAULT_TEXT = '¡Buenas! Quiero un agente que atienda mi negocio 24/7.';

export function waUrl(text: string = WHATSAPP_DEFAULT_TEXT): string {
	return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
