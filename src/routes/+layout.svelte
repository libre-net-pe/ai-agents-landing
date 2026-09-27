<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} type="image/svg+xml" />
	<link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Passion+One:wght@400;700;900&family=Hanken+Grotesk:wght@400;500;600;700;800&family=Caveat:wght@600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

{@render children()}
