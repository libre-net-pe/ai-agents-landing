<script lang="ts">
	import { onMount } from 'svelte';
	import { BRAND, waUrl } from '$lib/site';
	import WhatsAppIcon from './WhatsAppIcon.svelte';

	// Vista previa flotante (interacción firma): aparece a los 3 s con el saludo
	// del agente y una mini conversación de demostración en español peruano.
	const APPEAR_MS = 3000;
	const SECOND_BUBBLE_MS = 1600;

	let visible = $state(false);
	let secondBubble = $state(false);
	let dismissed = $state(false);

	onMount(() => {
		const t1 = setTimeout(() => {
			if (!dismissed) visible = true;
		}, APPEAR_MS);
		return () => clearTimeout(t1);
	});

	$effect(() => {
		if (visible) {
			const t2 = setTimeout(() => (secondBubble = true), SECOND_BUBBLE_MS);
			return () => clearTimeout(t2);
		}
	});
</script>

{#if visible && !dismissed}
	<aside class="chat-card" aria-label="Vista previa de una conversación con {BRAND}">
		<header class="chat-head">
			<span class="chat-avatar" aria-hidden="true">S</span>
			<div class="min-w-0">
				<p class="text-sm leading-tight font-bold text-white">{BRAND}</p>
				<p class="flex items-center gap-1.5 text-[11px] leading-tight text-white/85">
					<span class="inline-block size-1.5 rounded-full bg-[#7CF2A8]" aria-hidden="true"></span>
					en línea
				</p>
			</div>
			<button
				type="button"
				class="ml-auto rounded-full p-1.5 text-white/80 transition hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
				aria-label="Cerrar vista previa"
				onclick={() => (dismissed = true)}
			>
				<svg
					class="size-4"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
					aria-hidden="true"
				>
					<path d="M6 6l12 12M18 6L6 18" />
				</svg>
			</button>
		</header>

		<div class="chat-body" aria-live="polite">
			<p class="chat-in">¡Buenas! ¿En qué te ayudo?</p>
			{#if secondBubble}
				<p class="chat-in">¿Pedidos, precios o reservas? Te atiendo de una.</p>
			{/if}
		</div>

		<footer class="chat-foot">
			<a
				href={waUrl()}
				target="_blank"
				rel="noopener"
				class="inline-flex items-center gap-1.5 text-xs font-bold text-wsp underline decoration-wsp/40 decoration-2 underline-offset-2 transition hover:decoration-wsp focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wsp"
			>
				<WhatsAppIcon class="size-3.5" />
				Responder por WhatsApp
			</a>
			<span class="text-[10px] text-carbon/50">Conversación de demostración</span>
		</footer>
	</aside>
{/if}
