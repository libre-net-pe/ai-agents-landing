import type { Action } from 'svelte/action';

/**
 * Acción de entrada al hacer scroll: el elemento parte visible y asienta
 * hacia su lugar con una curva exponencial ease-out cuando entra al viewport.
 * Respeta `prefers-reduced-motion` (sin transformación, solo aparece).
 */
export const reveal: Action<HTMLElement, { delay?: number } | undefined> = (node, params) => {
	const delay = params?.delay ?? 0;

	const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (prefersReduced || !('IntersectionObserver' in window)) {
		node.classList.add('is-revealed');
		return {};
	}

	node.classList.add('will-reveal');
	node.style.setProperty('--reveal-delay', `${delay}ms`);

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('is-revealed');
					observer.disconnect();
				}
			}
		},
		{ threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
	);
	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
};
