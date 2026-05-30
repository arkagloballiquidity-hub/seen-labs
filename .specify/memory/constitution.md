<!--
SYNC IMPACT REPORT
Version change: 0.0.0 (template) → 1.0.0 (initial ratification)
Added sections: Core Principles, Tech Stack, Dev Workflow, Governance
Modified principles: All (initialized from template placeholders)
Templates requiring updates:
  ✅ constitution.md — this file
  ⚠ plan-template.md — review for SeenLabs-specific constraints
  ⚠ spec-template.md — review for SeenLabs-specific constraints
  ⚠ tasks-template.md — review for SeenLabs-specific constraints
Deferred TODOs: none
-->

# Seen Labs Constitution

## Core Principles

### I. Conversion-First (NON-NEGOTIABLE)

Every page, section, component, and copy element MUST serve a conversion goal.
Visual beauty is secondary to clarity, trust, and action.
No decorative element ships unless it reinforces the brand or guides the user toward a CTA.
The primary conversion path is: Hero → Pricing → CTA. Everything else supports that path.

### II. Brand Fidelity

The Seen Labs visual identity is fixed and MUST NOT be altered without explicit approval:
- **Colors**: Purple `#9B5CF6` (primary), `#7C3AED` (dim), dark backgrounds `#0A0A0F / #111118 / #18181F`
- **Fonts**: `Sora` (headings, weight 600–800) · `Manrope` (body, weight 300–500)
- **Style**: Dark mode only · purple glow effects · glass-border cards · sharp corners (no large border-radius)
- **Tagline**: "Out of the Dark" — appears in hero, footer, and final CTA. Never omitted.
- Logo dot with pulse animation is a brand signature. MUST appear in nav.

### III. Performance & Responsiveness

Every build MUST be mobile-first and fully responsive at 3 breakpoints: 1200px+, 900px, 600px.
Core Web Vitals targets: LCP < 2.5s · CLS < 0.1 · FID < 100ms.
Images MUST use modern formats (WebP/AVIF). No blocking render resources allowed.
Animations MUST respect `prefers-reduced-motion`.

### IV. Content Integrity

Copy is locked from the reference HTML (`seen-labs.html`) and MUST NOT be paraphrased or simplified
without explicit approval. This includes: manifesto lines, problem descriptions, pillar names,
pricing descriptions, FAQ answers, and team bios.
Placeholder text (`[REPLACE: ...]`) in the reference HTML flags items pending real assets —
these MUST be tracked as open tasks and never shipped as-is.

### V. Animation & Interaction Quality (NON-NEGOTIABLE)

The site MUST deliver a premium, cinematic experience. Every transition, entrance, and scroll
interaction MUST feel intentional and polished. Animation libraries are justified by the product's
positioning — Seen Labs sells premium digital experiences, so its own site MUST embody that.
Required animation layers: loading screen counter, GSAP scroll-driven parallax, Framer Motion
section entrances, HLS video backgrounds. No interaction may feel abrupt or unpolished.

### VI. Simplicity Within Complexity

No library is added beyond the approved stack. Every component MUST be decomposed into single-
responsibility pieces. No inline logic in JSX that belongs in a hook or utility. Stack is fixed —
no additions without explicit approval.

## Tech Stack

- **Primary stack**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS with custom design tokens matching brand variables (CSS custom properties)
- **Fonts**: Google Fonts — Sora (headings 600–800) + Manrope (body 300–500)
- **Animation**: GSAP (scroll-driven, entrance timelines) + Framer Motion (section reveals, AnimatePresence)
- **Video**: hls.js — HLS video backgrounds (hero + footer). Placeholder video used until client provides asset.
- **Deployment**: Vercel (primary) · domain TBD
- **Assets**: Screenshots of client sites (arkaglobalinvestments.com, alphadrivers.mx, arkaltd.io) — pending
- **Payments/CTA**: Links to Hotmart (external) — no payment processing in this repo
- **No**: Next.js, Redux, GraphQL, CMS, or any database — this is a static marketing SPA

## Dev Workflow

1. Every feature starts with `/speckit-specify` on a dedicated feature branch
2. UI components go through `/ui-ux-pro-max` before implementation
3. Implementation via `/speckit-implement`
4. Code review via `/code-review` before merging to `main`
5. Security check via `/security-review` before any deploy
6. Deploy checklist via `/engineering:deploy-checklist`

Placeholder assets (`[REPLACE: ...]`) MUST be tracked as open tasks — never merged to main unfilled
unless explicitly marked as `[DEFERRED]` with owner and date.

## Governance

This constitution supersedes all other conventions in this project.
Amendments require: description of change + version bump + update to this file.
All feature specs MUST reference applicable principles from this document.
Complexity MUST be justified against Principle V — if it can be done simply, do it simply.
The reference file `seen-labs.html` is the source of truth for content and design intent.

**Version**: 1.1.0 | **Ratified**: 2026-05-30 | **Last Amended**: 2026-05-30
