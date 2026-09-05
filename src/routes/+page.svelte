<script lang="ts">
	import ChatPreview from '$lib/components/ChatPreview.svelte';
	import ChiliDivider from '$lib/components/ChiliDivider.svelte';
	import WhatsAppButton from '$lib/components/WhatsAppButton.svelte';
	import WhatsAppIcon from '$lib/components/WhatsAppIcon.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { BRAND, waUrl } from '$lib/site';

	type Chip = { text: string; tone: 'lima' | 'mar' | 'aji' };
	type MenuItem = { name: string; chip: Chip };
	type Course = { title: string; tag: string; items: MenuItem[] };

	const chipClass: Record<Chip['tone'], string> = {
		lima: 'bg-lima text-carbon',
		mar: 'bg-mar text-white',
		aji: 'bg-aji text-white'
	};

	const carta: Course[] = [
		{
			title: 'Cebiches',
			tag: 'al instante, fresquito',
			items: [
				{ name: 'Pedidos y reservas, de día y de madrugada', chip: { text: '24/7', tone: 'lima' } },
				{
					name: 'Precios, horarios y stock de tu carta',
					chip: { text: 'Siempre al día', tone: 'mar' }
				},
				{ name: 'Estado del pedido y delivery', chip: { text: 'Sin espera', tone: 'aji' } }
			]
		},
		{
			title: 'Segundos',
			tag: 'el fondo del negocio',
			items: [
				{
					name: 'Entrenado con tus productos y tu tono',
					chip: { text: 'A tu medida', tone: 'lima' }
				},
				{
					name: 'Califica clientes y te los pasa al WhatsApp',
					chip: { text: 'Clientes calientes', tone: 'mar' }
				},
				{ name: 'Atiende WhatsApp y web chat a la vez', chip: { text: 'Doble mesa', tone: 'aji' } }
			]
		},
		{
			title: 'Postres',
			tag: 'para que duermas tranquilo',
			items: [
				{ name: 'Resumen del día en tu celular', chip: { text: 'Cada tarde', tone: 'lima' } },
				{ name: 'Si se complica, escala a tu equipo', chip: { text: 'Con juicio', tone: 'mar' } },
				{ name: 'Panel simple de ventas y conversas', chip: { text: 'Sin enredos', tone: 'aji' } }
			]
		}
	];

	const pasos = [
		{
			n: '1',
			curso: 'Entrada',
			titulo: 'Nos cuentas de tu negocio',
			texto: 'Nos mandas tu carta, precios y horarios por WhatsApp. Con eso partimos.'
		},
		{
			n: '2',
			curso: 'Fondo',
			titulo: 'Entrenamos a Sami',
			texto:
				'Aprende tus productos, tu tono y tus reglas: qué ofrecer, qué no, y cuándo pasarte la conversación.'
		},
		{
			n: '3',
			curso: 'Servido',
			titulo: 'Atiende 24/7',
			texto:
				'En días está tomando pedidos y respondiendo. Sin proyectos de seis meses ni consultores raros.'
		}
	];

	const rubros = [
		'Restaurantes y pollerías',
		'Tiendas online',
		'Farmacias y boticas',
		'Ferreterías',
		'Clínicas y consultorios',
		'Ópticas',
		'Pet shops',
		'Bodegas y minimarkets',
		'Talleres',
		'Academias e institutos'
	];

	const precios = [
		{ text: 'Pensado para PYMEs', tone: 'lima' as const },
		{ text: 'Sin costo escondido de implementación', tone: 'mar' as const },
		{ text: 'Sin contratos eternos', tone: 'aji' as const }
	];

	const faqs = [
		{
			q: '¿Funciona con el WhatsApp que ya tengo?',
			a: 'Sí. Sami se conecta al número de tu negocio y atiende por ahí mismo. Tus clientes no notarán el cambio, solo que ahora siempre les respondes.'
		},
		{
			q: '¿Habla peruano de verdad?',
			a: 'Sí: modismos, el “maestro”, el tuteo y el usted cuando toca. Y si tu negocio tiene su propia jerga, la aprende.'
		},
		{
			q: '¿Qué pasa si no sabe responder?',
			a: 'No improvisa: pasa la conversación a tu equipo con todo el contexto servido, para que sigas donde se quedó.'
		},
		{
			q: '¿Cuánto demora en estar listo?',
			a: 'Días, no meses. Nos mandas la información de tu negocio, entrenamos al agente, y en días está atendiendo.'
		},
		{
			q: '¿Cuánto cuesta?',
			a: 'De precio PYME, ajustado a lo que tu negocio necesita. Mándanos un WhatsApp y te damos tu cotización al toque.'
		},
		{
			q: '¿Y si yo quiero atender yo mismo?',
			a: 'Le avisas y te pasa la conversación al toque. La máquina atiende, tú decides.'
		}
	];

	type ChatMsg = { from: 'cliente' | 'sami'; text: string };

	const demo: ChatMsg[] = [
		{ from: 'cliente', text: 'Buenas, ¿hacen delivery hoy?' },
		{ from: 'sami', text: '¡Buenas! Sí, hoy atendemos hasta las 10 pm. ¿Para qué zona sería? 😊' },
		{ from: 'cliente', text: 'Para Los Olivos' },
		{
			from: 'sami',
			text: 'Sí llegamos, demora como 35–45 min por ahí. ¿Qué le va gustando?'
		},
		{ from: 'cliente', text: 'Un medio pollo a la brasa' },
		{
			from: 'sami',
			text: '¡Listo, maestro! Medio pollo a la brasa anotado. ¿Algo más: gaseosa o papas extra? ¿Paga con efectivo o Yape?'
		},
		{ from: 'cliente', text: 'Yape' },
		{
			from: 'sami',
			text: 'Perfecto 🙌 Le mando el detalle y el total por aquí mismo. ¡Gracias por su preferencia!'
		}
	];
</script>

<svelte:head>
	<title>Sami — Agentes con IA que atienden 24/7 por WhatsApp · Lima, Perú</title>
	<meta
		name="description"
		content="Sami crea agentes de inteligencia artificial que toman pedidos, responden preguntas y venden por WhatsApp las 24 horas. En español peruano, de precio PYME y listos en días."
	/>
	<meta property="og:title" content="Sami — Tu negocio, atendido 24/7" />
	<meta
		property="og:description"
		content="Agentes con IA que toman pedidos, responden y venden por WhatsApp. En español peruano, de precio PYME, listos en días."
	/>
	<meta property="og:type" content="website" />
</svelte:head>

<a
	href="#top"
	class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-60 focus:rounded-lg focus:bg-carbon focus:px-4 focus:py-2 focus:text-white"
>
	Saltar al contenido
</a>

<!-- Cabecera tipo masthead de carta -->
<header class="sticky top-0 z-40 border-b-[3px] border-carbon/90 bg-plate/95 backdrop-blur-sm">
	<div class="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5 md:px-8">
		<a href="#top" class="flex items-baseline gap-1" aria-label="{BRAND} — inicio">
			<span class="font-display text-3xl leading-none font-bold text-aji">Sami</span>
			<span class="size-2 rounded-full bg-lima" aria-hidden="true"></span>
		</a>
		<nav class="ml-auto hidden items-center gap-6 text-sm font-bold md:flex" aria-label="Secciones">
			<a class="transition hover:text-aji" href="#carta">La carta</a>
			<a class="transition hover:text-aji" href="#como">Cómo funciona</a>
			<a class="transition hover:text-aji" href="#preguntas">Preguntas</a>
		</nav>
		<WhatsAppButton label="Escríbenos" class="ml-auto px-4 py-2 text-sm md:ml-0" />
	</div>
</header>

<main id="top">
	<!-- PRIMER VIEWPORT: titular tomate, carta del agente, CTA pulsante -->
	<section class="mx-auto max-w-6xl px-5 pt-14 pb-16 md:px-8 md:pt-20 md:pb-24">
		<div class="mx-auto max-w-2xl">
			<h1 class="font-display text-[clamp(3.4rem,11vw,6rem)] leading-[0.95] font-bold text-aji">
				Tu negocio, atendido
				<mark class="inline-block -rotate-1 rounded-md bg-lima px-3 text-aji">24/7</mark>
			</h1>
			<p class="mt-6 max-w-[62ch] text-lg text-carbon md:text-xl">
				{BRAND} es un agente con inteligencia artificial que toma los pedidos, responde preguntas y vende
				por WhatsApp mientras tú estás en otra cosa. En español peruano, como debe ser.
			</p>

			<ul class="mt-10 space-y-4" use:reveal>
				<li class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
					<span class="w-full font-bold sm:w-auto">Toma los pedidos y las reservas</span>
					<span class="leader-line min-w-6 flex-1" aria-hidden="true"></span>
					<span class="chip bg-lima text-carbon">24/7</span>
				</li>
				<li class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
					<span class="w-full font-bold sm:w-auto">Responde precios, horarios y dudas</span>
					<span class="leader-line min-w-6 flex-1" aria-hidden="true"></span>
					<span class="chip bg-mar text-white">Al instante</span>
				</li>
				<li class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
					<span class="w-full font-bold sm:w-auto">Vende y recupera clientes</span>
					<span class="leader-line min-w-6 flex-1" aria-hidden="true"></span>
					<span class="chip bg-aji text-white">Con sazón</span>
				</li>
			</ul>

			<div class="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3" use:reveal={{ delay: 120 }}>
				<span class="chip chip-tilt bg-lima text-carbon">De precio menú, no de enterprise</span>
				<span class="chip chip-tilt bg-mar text-white">Listo en días, no en meses</span>
			</div>

			<div class="mt-10 flex flex-col items-start gap-4" use:reveal={{ delay: 200 }}>
				<WhatsAppButton
					label="Pide el tuyo por WhatsApp"
					text="¡Buenas! Quiero un agente que atienda mi negocio 24/7."
					pulse
					class="text-lg"
				/>
				<p class="font-hand text-2xl text-mar">
					Sin formularios ni correos largos — puro WhatsApp.
				</p>
			</div>
		</div>
	</section>

	<ChiliDivider class="mx-auto max-w-3xl px-5" />

	<!-- LA CARTA: secciones de menú (Cebiches / Segundos / Postres) -->
	<section id="carta" class="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
		<div class="mx-auto max-w-2xl">
			<h2 class="font-display text-[clamp(2.6rem,6vw,4rem)] leading-tight font-bold text-aji">
				La carta
			</h2>
			<p class="mt-2 max-w-[60ch] text-lg text-carbon/85">
				Todo lo que {BRAND} atiende por ti. Sin letra chica.
			</p>

			<div class="mt-12 space-y-14">
				{#each carta as course, i (course.title)}
					<article use:reveal={{ delay: i * 80 }}>
						<div class="flex items-baseline gap-3">
							<h3 class="font-display text-2xl font-bold tracking-wide text-mar uppercase">
								{course.title}
							</h3>
							<span class="leader-line min-w-4 flex-1" aria-hidden="true"></span>
							<span class="font-hand text-2xl text-aji">{course.tag}</span>
						</div>
						<ul class="mt-5 space-y-4">
							{#each course.items as item (item.name)}
								<li class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
									<span class="w-full font-semibold sm:w-auto">{item.name}</span>
									<span class="leader-line min-w-6 flex-1" aria-hidden="true"></span>
									<span class={`chip chip-tilt ${chipClass[item.chip.tone]}`}>{item.chip.text}</span
									>
								</li>
							{/each}
						</ul>
					</article>
				{/each}
			</div>

			<p class="mt-12">
				<a
					href="#top"
					class="inline-flex items-center gap-2 font-bold text-wsp underline decoration-wsp/40 decoration-2 underline-offset-4 transition hover:decoration-wsp"
				>
					<WhatsAppIcon class="size-4" />
					¿Esto va con tu negocio? Se pide por WhatsApp
				</a>
			</p>
		</div>
	</section>

	<!-- LA PIZARRA: conversación de demostración sobre fondo pizarra -->
	<section class="bg-carbon py-20 md:py-28" aria-labelledby="pizarra-title">
		<div class="mx-auto max-w-6xl px-5 md:px-8">
			<div class="mx-auto max-w-2xl">
				<div use:reveal>
					<h2
						id="pizarra-title"
						class="font-display text-[clamp(2.6rem,6vw,4rem)] leading-tight font-bold text-plate"
					>
						Hoy en la pizarra
					</h2>
					<p class="mt-2 max-w-[60ch] text-lg text-plate/80">
						Así atiende {BRAND} cuando tu cliente escribe a cualquier hora. Se ve real porque así sería.
					</p>
					<p class="mt-4">
						<span class="chip bg-lima text-carbon">
							Conversación de demostración — no es un cliente real
						</span>
					</p>
				</div>

				<div class="mt-10 rounded-2xl bg-plate p-4 shadow-menu sm:p-5" use:reveal={{ delay: 150 }}>
					<div class="flex items-center gap-3 border-b-2 border-carbon/10 pb-3">
						<span
							class="grid size-9 place-items-center rounded-full bg-aji font-display text-lg font-bold text-white"
							aria-hidden="true"
						>
							S
						</span>
						<div>
							<p class="text-sm font-bold">Pollería El Buen Sabor</p>
							<p class="text-xs text-carbon/60">atendido por {BRAND}</p>
						</div>
					</div>
					<div class="flex flex-col gap-2.5 pt-4">
						{#each demo as msg (msg.text)}
							<p class={msg.from === 'cliente' ? 'bubble-client' : 'bubble-agent'}>
								{msg.text}
							</p>
						{/each}
						<p
							class="flex items-center gap-1.5 self-start rounded-[0.9rem] rounded-bl-[0.25rem] bg-[#f1ede5] px-3.5 py-3"
							aria-label="{BRAND} está escribiendo"
						>
							<span class="typing-dot" aria-hidden="true"></span>
							<span class="typing-dot" aria-hidden="true"></span>
							<span class="typing-dot" aria-hidden="true"></span>
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<ChiliDivider class="mx-auto max-w-3xl px-5 pt-12" />

	<!-- CÓMO FUNCIONA: tres pasos, servido en días -->
	<section id="como" class="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
		<div class="mx-auto max-w-2xl">
			<div use:reveal>
				<h2 class="font-display text-[clamp(2.6rem,6vw,4rem)] leading-tight font-bold text-aji">
					De la cocina a tu WhatsApp en días
				</h2>
				<p class="mt-2 max-w-[60ch] text-lg text-carbon/85">
					Sin implementaciones eternas. Tres pasos y a atender.
				</p>
			</div>

			<ol class="mt-12 space-y-10">
				{#each pasos as paso, i (paso.n)}
					<li class="flex gap-5" use:reveal={{ delay: i * 90 }}>
						<span
							class="grid size-12 shrink-0 place-items-center rounded-full bg-mar font-display text-2xl font-bold text-white"
							aria-hidden="true"
						>
							{paso.n}
						</span>
						<div class="border-b-2 border-dotted border-carbon/20 pb-8">
							<p class="font-hand text-2xl text-aji">{paso.curso}</p>
							<h3 class="font-display text-2xl leading-snug font-bold text-carbon">
								{paso.titulo}
							</h3>
							<p class="mt-1 text-carbon/85">{paso.texto}</p>
						</div>
					</li>
				{/each}
			</ol>

			<p class="mt-8">
				<span class="chip chip-tilt bg-lima text-carbon">Días, no meses</span>
			</p>
		</div>
	</section>

	<!-- RUBROS + PRECIO CLARO -->
	<section class="bg-lima-soft py-20 md:py-28" aria-labelledby="rubros-title">
		<div class="mx-auto max-w-6xl px-5 md:px-8">
			<div class="mx-auto max-w-2xl">
				<div use:reveal>
					<h2
						id="rubros-title"
						class="font-display text-[clamp(2.6rem,6vw,4rem)] leading-tight font-bold text-aji"
					>
						Para negocios como el tuyo
					</h2>
					<p class="mt-2 max-w-[60ch] text-lg text-carbon/85">
						Si tu cliente te escribe por WhatsApp, {BRAND} le responde.
					</p>
				</div>

				<ul class="mt-8 flex flex-wrap gap-2.5" use:reveal={{ delay: 100 }}>
					{#each rubros as rubro (rubro)}
						<li
							class="rounded-full border-2 border-carbon/25 bg-plate px-4 py-1.5 text-sm font-bold"
						>
							{rubro}
						</li>
					{/each}
				</ul>
			</div>

			<div class="mx-auto mt-16 max-w-2xl">
				<div use:reveal>
					<h3 class="font-display text-3xl font-bold text-mar">Precio claro, de una</h3>
					<p class="mt-2 max-w-[60ch] text-carbon/85">
						Hablando en platos: precios sin salsas. De precio PYME y con cotización por WhatsApp en
						minutos.
					</p>
					<div class="mt-6 flex flex-wrap gap-x-5 gap-y-3">
						{#each precios as precio, i (precio.text)}
							<span
								class={`chip chip-tilt ${chipClass[precio.tone]}`}
								use:reveal={{ delay: i * 80 }}
							>
								{precio.text}
							</span>
						{/each}
					</div>
					<div class="mt-8">
						<WhatsAppButton
							label="Pide tu cotización"
							text="¡Buenas! Quiero la cotización de un agente para mi negocio."
						/>
					</div>
				</div>

				<!-- Testimonio de ejemplo, visiblemente sintético -->
				<figure
					class="mt-12 rounded-xl border-2 border-dashed border-carbon/30 bg-plate/60 p-6"
					use:reveal
				>
					<figcaption class="mb-3">
						<span class="chip bg-carbon/10 text-carbon"
							>Ejemplo — aquí irán los testimonios reales</span
						>
					</figcaption>
					<blockquote class="text-lg text-carbon/85 italic">
						“Desde que {BRAND} atiende la noche, ya no pierdo ni un pedido.”
					</blockquote>
					<p class="mt-2 text-sm font-bold text-carbon/60">
						Nombre de ejemplo · Negocio de ejemplo, Lima
					</p>
				</figure>
			</div>
		</div>
	</section>

	<ChiliDivider class="mx-auto max-w-3xl px-5 pt-12" />

	<!-- PREGUNTAS DE LA MESA -->
	<section id="preguntas" class="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
		<div class="mx-auto max-w-2xl">
			<div use:reveal>
				<h2 class="font-display text-[clamp(2.6rem,6vw,4rem)] leading-tight font-bold text-aji">
					Preguntas de la mesa
				</h2>
				<p class="mt-2 max-w-[60ch] text-lg text-carbon/85">
					Lo que todos preguntan antes de pedir.
				</p>
			</div>

			<div class="mt-10 divide-y-2 divide-dotted divide-carbon/20">
				{#each faqs as faq, i (faq.q)}
					<details class="group py-4" use:reveal={{ delay: i * 50 }}>
						<summary
							class="flex cursor-pointer list-none items-baseline gap-3 font-bold text-carbon transition hover:text-aji [&::-webkit-details-marker]:hidden"
						>
							{faq.q}
							<span
								class="ml-auto shrink-0 font-display text-2xl leading-none text-mar transition-transform duration-300 group-open:rotate-45"
								aria-hidden="true">+</span
							>
						</summary>
						<p class="mt-3 max-w-[62ch] text-carbon/85">{faq.a}</p>
					</details>
				{/each}
			</div>
		</div>
	</section>

	<!-- CTA FINAL -->
	<section class="bg-aji py-20 md:py-24" aria-labelledby="cta-title">
		<div class="mx-auto max-w-6xl px-5 text-center md:px-8">
			<div use:reveal>
				<h2
					id="cta-title"
					class="font-display text-[clamp(3rem,8vw,5.5rem)] leading-[0.95] font-bold text-white"
				>
					¿Hoy empieza a atender {BRAND}?
				</h2>
				<p class="mx-auto mt-4 max-w-[52ch] text-lg text-white/90">
					Cuéntanos de tu negocio por WhatsApp y en días tendrás tu agente sirviendo 24/7.
				</p>
				<div class="mt-8 flex justify-center">
					<WhatsAppButton
						label="Escríbenos por WhatsApp"
						text="¡Buenas! Quiero empezar a atender mi negocio 24/7."
						pulse
						class="ring-4 ring-plate/40"
					/>
				</div>
			</div>
		</div>
	</section>
</main>

<footer class="bg-carbon py-12 text-plate">
	<div class="mx-auto max-w-6xl px-5 md:px-8">
		<div class="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
			<div>
				<p class="flex items-baseline gap-1">
					<span class="font-display text-3xl leading-none font-bold text-plate">Sami</span>
					<span class="size-2 rounded-full bg-lima" aria-hidden="true"></span>
				</p>
				<p class="mt-1 max-w-[46ch] text-sm text-plate/70">
					Agentes con IA que atienden 24/7 por WhatsApp. Para negocios peruanos, en español peruano.
				</p>
			</div>
			<nav class="flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold" aria-label="Pie de página">
				<a class="text-plate/80 transition hover:text-plate" href="#carta">La carta</a>
				<a class="text-plate/80 transition hover:text-plate" href="#como">Cómo funciona</a>
				<a class="text-plate/80 transition hover:text-plate" href="#preguntas">Preguntas</a>
			</nav>
		</div>
		<div class="mt-8 border-t border-plate/15 pt-6">
			<p class="text-xs text-plate/55">
				© 2026 {BRAND} · Hecho con sazón en Lima, Perú · Ícono de ají:
				<a
					class="underline underline-offset-2 hover:text-plate"
					href="https://game-icons.net"
					rel="noopener noreferrer"
					target="_blank">game-icons.net</a
				> (CC BY 3.0)
			</p>
		</div>
	</div>
</footer>

<!-- Interacción firma: CTA flotante + vista previa de conversación -->
<div class="fixed right-4 bottom-6 z-50 md:right-6">
	<a
		href={waUrl()}
		target="_blank"
		rel="noopener"
		aria-label="Escríbenos por WhatsApp"
		class="pulse-wsp grid size-14 place-items-center rounded-full bg-wsp text-white shadow-menu transition hover:bg-wsp-deep"
	>
		<WhatsAppIcon class="size-7" />
	</a>
</div>
<ChatPreview />
