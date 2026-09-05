# Handoff — AI Agents Landing Page Build

This document transfers a completed **direction round** to the agent who will implement the build. Read it top to bottom before touching code.

## State of the project

| Artifact | Path | Status |
|---|---|---|
| Product truth | `PRODUCT.md` | ✅ Written (init complete) |
| Surface brief + direction contract | `.impeccable/surfaces/src-routes-page-svelte.md` | ✅ Written, all 6 contract blocks + seed key present |
| Build path config | `.impeccable/config.json` | ✅ `"buildPath": "comp"` |
| Visual direction | Chosen: **Cevichería Menu** (seed key `d03aa789`, assigned candidate 5) | ✅ User-confirmed |
| Code | `src/routes/+page.svelte` | ❌ Still SvelteKit scaffold placeholder |
| Approved comp | — | ❌ None yet (comp round happens during build) |
| DESIGN.md | — | ❌ Written at finish by the documenter, never before the build |

## The chosen direction (summary — authority is the surface brief)

**Cevichería Menu.** The page borrows the grammar of a Peruvian cevichería menu: fresh, bold, immediate service. The AI agent is the attentive server who never misses an order. This is the assigned direction from the concept-seed roll (`d03aa789`), presented to the user alongside challengers, and chosen in chat (no decision page was available in that session — this substitution is disclosed and the choice is user-confirmed).

- **Palette:** white ceramic-plate ground; tomato-red (ají) display headlines; lime-green + ocean-blue accents; charcoal body; WhatsApp-green primary controls.
- **Sectioning:** menu-style rhythm (like Cebiches / Segundos / Postres) carried into capability sections.
- **First viewport:** tomato-red headline "Tu negocio, atendido 24/7", menu-style capability list with affordability chips, pulsing WhatsApp CTA, floating chat preview after 3s ("¡Buenas! ¿En qué te ayudo?").
- **Signature interaction:** the pulsing WhatsApp button + floating Peruvian-Spanish chat preview.
- **Full contract:** read `## Direction Contract` in the surface brief. It is binding.

## Non-negotiables for the build

1. **Language:** Peruvian Spanish, Lima business register — not translated marketing Spanish, not neutral LatAm.
2. **Conversion:** direct WhatsApp contact (floating CTA + repeated section CTAs). No forms as primary path.
3. **Audience:** Peruvian SMB owners + e-commerce, mobile-first, non-technical.
4. **No fabricated claims:** no invented prices, customer names, testimonials, or benchmarks. Placeholder social proof must be visibly labeled synthetic. Sample AI chat conversations may be authored at full fidelity but labeled as demonstration.
5. **Stack:** existing SvelteKit + Tailwind CSS scaffold. Do not swap frameworks.

## Next steps (comp-led flow — do these in order)

1. Run `impeccable context` to boot (it will resolve the brief above).
2. Load `reference/new-work.md` §6 and `reference/visualize.md` (skill base dir: `/home/paseo/.pi/agent/skills/impeccable`).
3. Start the build state machine: `impeccable build-phase start --direction d03aa789 --kind assigned`.
4. Comp round: generate three compositional comps of the first viewport (desktop landing → landscape frame; this surface is mobile-first so verify the mobile rendering separately) under `.impeccable/mocks/`, put before the user for approval, mark the chosen one `"approved": true`.
5. Proceed through phases: spec → plates → hero → sections → motion → responsive, advancing each gate with `impeccable build-phase advance`.
6. Before any UI edits, load `reference/craft-floor.md`.
7. Finish: capture `.impeccable/review/desktop.png` (1440w) and `mobile.png` (390w), run `impeccable detect --json` on changed targets, spawn `impeccable-finish-reviewer` with the full input packet (see new-work.md §7), act on its disposition, then spawn `impeccable-documenter` to write `DESIGN.md`.

## Open decisions left to the build

- **Company name:** none exists. Generate one that feels Peruvian and credible; confirm with the user before locking it in.
- **Real proof assets:** none exist. Owner will supply testimonials/case studies later; until then, synthetic placeholders must be labeled.
- **Pricing:** "affordable" framing only — no figures until the owner provides real ones.
