<script lang="ts">
	import { waUrl } from '$lib/site';
	import WhatsAppIcon from './WhatsAppIcon.svelte';

	let {
		label,
		text,
		pulse = false,
		class: cls = ''
	}: { label: string; text?: string; pulse?: boolean; class?: string } = $props();
</script>

<a
	href={waUrl(text)}
	target="_blank"
	rel="noopener"
	class={`btn-wsp ${pulse ? 'pulse-wsp' : ''} ${cls}`}
>
	<WhatsAppIcon class="size-5 shrink-0" />
	<span>{label}</span>
</a>
