---
version: 1
slug: "src-routes-page-svelte"
primary_target: "src/routes/+page.svelte"
related_targets: []
---

# Surface Brief — Landing Page (`src/routes/+page.svelte`)

## Scope & Visitor Mode

- Single landing page, the product's only surface for now. Mode: **Persuade** — the visitor decides and acts; design is the product.
- Language: **Peruvian Spanish** throughout. Copy must sound like Lima business speech, not translated marketing Spanish.

## Audience, Job, Action

- **Audience:** Peruvian small and medium business owners and e-commerce operators (S/500K–S/10M/year revenue), browsing mostly on phones.
- **Job:** They lose sales and drown in support outside business hours; they want automation that is affordable, fast to deploy, and doesn't feel foreign.
- **Primary action:** Direct contact via **WhatsApp** (floating CTA + repeated section CTAs).
- **Proof/content:** No real testimonials or case studies exist yet — any social proof must be labeled as placeholder/synthetic. Demonstration material (sample AI chat conversations in Peruvian Spanish) must be authored at full fidelity and labeled synthetic where a visitor could mistake it for real.
- **Constraints:** Mobile-first; high contrast; simple navigation for non-technical users; claims must not invent prices, customers, or benchmarks (prices shown as "affordable" framing, never fabricated figures).

## Chosen Direction: Cevichería Menu (assigned, seed key `d03aa789`)

The visual world is the Peruvian cevichería menu: fresh, bold, immediate service. The AI agent is the attentive server who never misses an order. Memorable moment: the pulsing WhatsApp button plus the floating chat preview greeting in Peruvian Spanish — "¡Buenas! ¿En qué te ayudo?"

## Direction Contract

THESIS: This page owns cevichería-menu grammar — service, freshness, immediacy — and refuses the generic SaaS arrangement of hero + three feature cards + pricing table.

OWN-WORLD: White ceramic-plate ground; tomato-red (ají) display headlines; lime-green and ocean-blue accents; charcoal body text; chili-line section dividers; bold color-block price chips; WhatsApp-green primary controls with a gentle pulse. Menu-style sectioning (Cebiches / Segundos / Postres rhythm) carried into "what the agent does" sections.

STORY: The visitor recognizes home within seconds, understands the agent takes orders and answers support 24/7, believes it is affordable and fast to deploy, and messages WhatsApp to start.

FIRST VIEWPORT: Tomato-red headline "Tu negocio, atendido 24/7" above a menu-style list of agent capabilities (takes orders, answers questions, sells) with bold affordability chips; pulsing WhatsApp CTA visible immediately; floating chat preview appears after 3 seconds with a sample Peruvian-Spanish AI conversation.

FORM: Assigned direction, grounded candidate 5 of 7, seed key `d03aa789`, mode persuade, build path comp-led (recorded in `.impeccable/config.json`).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Build Path Notes for the Next Agent

- Build path is **comp-led** (recorded in `.impeccable/config.json`). The direction round happened without a decision page (no browser available), so the direction was presented and chosen in chat; no approved comp exists yet.
- Comp-led flow: run `impeccable build-phase start --direction d03aa789 --kind assigned`, then follow the phases (comps → spec → plates → hero → sections → motion → responsive) per `reference/new-work.md` section 6 and `reference/visualize.md`.
- On finish: run the detector (`impeccable detect --json`), spawn `impeccable-finish-reviewer`, then `impeccable-documenter` to write DESIGN.md from the built world.

## Unresolved Decisions

- Company name: none exists yet — generate during build; must feel Peruvian and credible.
- Placeholder testimonials/case studies: to be authored as clearly-labeled synthetic content; the owner supplies real ones later.
- Final pricing presentation: "affordable" framing only, no invented figures.
