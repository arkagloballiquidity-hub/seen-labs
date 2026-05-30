# Tasks: Seen Labs Landing Page

**Input**: Design documents from `specs/001-seenlabs-landing/`

**Branch**: `001-seenlabs-landing`

**Stack**: React 18 + Vite + TypeScript + Tailwind CSS + GSAP + Framer Motion + hls.js

**Format**: `[ID] [P?] [Story?] Description — file path`

- **[P]**: Can run in parallel (different files, no blocking dependency)
- **[Story]**: User story this task belongs to (US1–US4)

---

## Phase 1: Setup (Project Scaffold)

**Purpose**: Initialize the Vite project and install all dependencies. Nothing else can start until this is done.

- [ ] T001 Create Vite + React + TypeScript project: `npm create vite@latest seenlabs-web -- --template react-ts` at repo root
- [ ] T002 Install all dependencies: `npm install tailwindcss postcss autoprefixer gsap @gsap/react framer-motion hls.js` inside `seenlabs-web/`
- [ ] T003 Initialize Tailwind: `npx tailwindcss init -p` and configure `seenlabs-web/tailwind.config.ts` with brand CSS custom property tokens (bg, surface, purple, muted, stroke)
- [ ] T004 Write `seenlabs-web/src/index.css` — CSS custom properties (--purple, --dark, --dark-2, etc.), keyframes (pulse, doorBreath, scrollDown, roleFadeIn, gradientShift), base body styles, scrollbar styles
- [ ] T005 [P] Update `seenlabs-web/index.html` — add Google Fonts preconnect + import for Sora (600,700,800) and Manrope (300,400,500,600), set page title "Seen Labs — Out of the Dark"
- [ ] T006 [P] Write `seenlabs-web/src/lib/constants.ts` — HLS placeholder URL, brand color values, external link placeholders (`#`)
- [ ] T007 [P] Write all data files from reference HTML content:
  - `seenlabs-web/src/data/problems.ts` — 6 problem cards (icon, title, description)
  - `seenlabs-web/src/data/pillars.ts` — 11 solution pillars (num, name, subtitle)
  - `seenlabs-web/src/data/steps.ts` — 12 system path steps (num, title, description, highlight)
  - `seenlabs-web/src/data/pricing.ts` — 3 pricing plans (name, price, period, description, features, ctaLabel, ctaStyle, featured, badge)
  - `seenlabs-web/src/data/comparison.ts` — 10 comparison table rows (feature, traditional, seenLabs)
  - `seenlabs-web/src/data/cases.ts` — 3 case studies (domain, label, quote, author)
  - `seenlabs-web/src/data/team.ts` — 4 team members (initial, name, role)
  - `seenlabs-web/src/data/faq.ts` — 10 FAQ entries (question, answer)
- [ ] T008 Write `seenlabs-web/src/App.tsx` — skeleton with `isLoading` state, `AnimatePresence` wrapping `LoadingScreen`, and placeholder section list

**Checkpoint**: `npm run dev` starts without errors. Blank page with correct fonts loaded.

---

## Phase 2: Foundational (Shared UI Infrastructure)

**Purpose**: Hooks and primitive UI components used across multiple sections. Must be complete before section work begins.

- [ ] T009 Write `seenlabs-web/src/hooks/useReducedMotion.ts` — reads `prefers-reduced-motion: reduce` via `window.matchMedia`, returns boolean
- [ ] T010 [P] Write `seenlabs-web/src/hooks/useScrollNavbar.ts` — tracks `scrollY > 100`, returns boolean for shadow toggle
- [ ] T011 [P] Write `seenlabs-web/src/hooks/useHLS.ts` — accepts `videoRef` + `src`, sets up hls.js if supported, falls back to native HLS (Safari), returns `{ error: boolean }`
- [ ] T012 [P] Write `seenlabs-web/src/components/ui/HLSVideo.tsx` — wraps `useHLS`, renders `<video>` with autoPlay muted loop playsInline + absolute positioning; shows dark gradient fallback on error; accepts `overlay: 'light' | 'heavy'` prop
- [ ] T013 [P] Write `seenlabs-web/src/components/ui/DoorVisual.tsx` — SVG door frame, door-light gradient, door-glow, door-line-h, door-knob, silhouette SVG — accepts `size: 'small' | 'large'` prop

**Checkpoint**: Import HLSVideo and DoorVisual in App.tsx and verify they render without errors.

---

## Phase 3: User Story 1 — First impression + hero (Priority: P1) 🎯 MVP

**Goal**: Visitor sees loading screen → cinematic hero with video, animations, and CTAs. This alone proves the site's premium quality.

**Independent Test**: Load the page fresh. Loading screen counts to 100, fades out, hero appears with GSAP animations and all copy visible. Video plays or gradient fallback shows. Both CTA buttons are visible and clickable.

### Loading Screen

- [ ] T014 [US1] Write `seenlabs-web/src/components/LoadingScreen.tsx`:
  - Full-screen fixed overlay (z-[9999] bg-[var(--dark)])
  - `requestAnimationFrame` counter 0→100 over 2700ms
  - Top-left "SEEN LABS" label with Framer Motion entrance (y:-20→0, opacity 0→1)
  - Center: cycling words ["Visibility", "Automation", "Results", "Growth"] every 900ms — `AnimatePresence` mode="wait" with y:20→0→-20
  - Bottom-right: counter display `String(count).padStart(3,"0")`, font-display, text-7xl+
  - Bottom progress bar: `h-[3px]`, purple accent gradient, `scaleX(count/100)`, box-shadow glow
  - On count===100: 400ms delay → call `onComplete()`

- [ ] T015 [US1] Wire `LoadingScreen` into `seenlabs-web/src/App.tsx` with `AnimatePresence` — loading screen exits with opacity fade, main content fades in

### Navbar

- [ ] T016 [US1] Write `seenlabs-web/src/components/Navbar.tsx`:
  - Fixed top-center floating pill (backdrop-blur, border border-white/10, bg-surface)
  - Logo: animated purple dot (pulse keyframe) + "SEEN LABS" text in Sora
  - Nav links: Manifesto, Solution, System, Pricing, Cases — scroll to anchor on click
  - "Start The Path" CTA button with purple border, hover background fill
  - Shadow added when `useScrollNavbar` returns true
  - Mobile: hide links, show hamburger icon, toggle `MobileNav`

- [ ] T017 [US1] Write `seenlabs-web/src/components/MobileNav.tsx`:
  - Fixed full-screen overlay (z-[998])
  - `AnimatePresence` slide-in from right (translateX 100%→0)
  - All section links + "Start The Path" CTA
  - Close on link click

### Hero Section

- [ ] T018 [US1] Write `seenlabs-web/src/components/ui/ParticleCanvas.tsx` — canvas particle system ported from reference HTML: 80 particles, purple `rgba(155,92,246,α)`, connecting lines at distance < 100, `requestAnimationFrame` loop, resize handler

- [ ] T019 [US1] Write `seenlabs-web/src/components/sections/HeroSection.tsx`:
  - Full-viewport section, overflow hidden
  - `HLSVideo` as background (overlay='light') with bottom fade gradient
  - `ParticleCanvas` absolute full-screen
  - `DoorVisual` size='small' centered at bottom
  - Hero background radial gradients (purple glow)
  - Hero content (z-10, centered):
    - Eyebrow: "◈ OUT OF THE DARK" with border + purple bg
    - H1: "Your business deserves to be seen." (Sora 800, clamp font size)
    - Cycling role: "A {role} digital agency." — roles: ["Premium", "Automated", "Trusted", "Unstoppable"] — key-based re-animation with `animate-role-fade-in`
    - Sub text and support text (from reference HTML)
    - CTA buttons: "Start The Path" (primary, purple fill) + "See The System" (secondary, ghost)
  - GSAP `useGSAP` entrance timeline: H1 y:50→0 opacity:0→1 (1.2s), eyebrow+sub blur:10px→0 y:20→0 staggered
  - Scroll indicator (line + "SCROLL" label) at bottom center with `animate-scroll-down`
  - `useReducedMotion` guard: skip GSAP timeline if true

**Checkpoint (US1 complete)**: `npm run dev` → loading screen runs → fades to hero with video/fallback, animated headline, navbar, mobile nav toggle. ✅

---

## Phase 4: User Story 2 — Full conversion scroll journey (Priority: P1)

**Goal**: All 10 content sections visible with correct copy and Framer Motion scroll reveals. The full sales funnel works.

**Independent Test**: Scroll the full page on desktop — every section animates in, pricing shows 3 cards with correct prices, Final CTA is reachable with working button.

### Manifesto

- [ ] T020 [US2] Write `seenlabs-web/src/components/sections/ManifestoSection.tsx`:
  - bg-[var(--dark-2)], border-top
  - Title: "Darkness kills more businesses than bad products." (Sora 800)
  - Body paragraph (from reference HTML)
  - 3 manifesto lines (01–03) with staggered Framer Motion whileInView reveals (opacity+y)
  - `useReducedMotion` guard on animations

### Problem

- [ ] T021 [US2] Write `seenlabs-web/src/components/ui/ProblemCard.tsx` — icon square (purple border), title, description; hover: translateY(-3px) + purple border + gradient overlay

- [ ] T022 [P] [US2] Write `seenlabs-web/src/components/sections/ProblemSection.tsx` — 6-card grid using `problems.ts` data, section label + title + accent span, Framer Motion whileInView per card

### Solution

- [ ] T023 [P] [US2] Write `seenlabs-web/src/components/ui/PillarCard.tsx` — num (purple, Sora), name + subtitle; hover: purple border + carbon-2 bg

- [ ] T024 [P] [US2] Write `seenlabs-web/src/components/sections/SolutionSection.tsx` — section label + title + accent + solution-intro grid (sub + tagline) + 11-pillar grid using `pillars.ts`, Framer Motion reveals

### System Path

- [ ] T025 [P] [US2] Write `seenlabs-web/src/components/ui/PathStep.tsx` — step number square (border or highlight variant), step-connector line, title + description; Framer Motion whileInView with `translateX(-20px)→0`

- [ ] T026 [P] [US2] Write `seenlabs-web/src/components/sections/SystemSection.tsx` — 12 steps from `steps.ts`, staggered reveals using Framer Motion

### Pricing

- [ ] T027 [US2] Write `seenlabs-web/src/components/ui/PricingCard.tsx`:
  - Base: bg-surface, border, padding
  - Featured variant: accent border (`rgba(155,92,246,0.5)`), gradient bg, box-shadow glow, badge "Most Chosen", negative margin offset
  - Price name, amount, period, description, features list (→ icon), CTA button (ghost/main/outline variants)
  - Hover: translateY(-6px)

- [ ] T028 [US2] Write `seenlabs-web/src/components/sections/PricingSection.tsx` — 3-column grid using `pricing.ts`, section label + "Investment in visibility.", Framer Motion reveals per card

### Differentiator

- [ ] T029 [P] [US2] Write `seenlabs-web/src/components/sections/DifferentiatorSection.tsx` — comparison table using `comparison.ts` data; 3-col grid rows (feature | Traditional ✕ | Seen Labs ✓); col-sl highlight; Framer Motion whileInView on table

### Guarantee

- [ ] T030 [P] [US2] Write `seenlabs-web/src/components/sections/GuaranteeSection.tsx` — centered layout, circular badge (100px, purple border, glow box-shadow), "7" + "Day Guarantee", guarantee title + text from reference HTML, "Start Risk-Free" CTA, Framer Motion reveal

### Cases

- [ ] T031 [P] [US2] Write `seenlabs-web/src/components/ui/CaseCard.tsx`:
  - Browser chrome mock (dots: red/yellow/green + URL bar)
  - Case screen: dark gradient + purple label (placeholder; `photoUrl` prop for future real screenshot)
  - Case info: domain (purple uppercase), quote, author
  - Hover: translateY(-4px) + purple border

- [ ] T032 [P] [US2] Write `seenlabs-web/src/components/sections/CasesSection.tsx` — 3-card grid using `cases.ts`, section label + title + accent, Framer Motion reveals

### Team

- [ ] T033 [P] [US2] Write `seenlabs-web/src/components/ui/TeamCard.tsx` — circular avatar (initial letter or `photoUrl` img), name (Sora 700), role text; hover: purple border

- [ ] T034 [P] [US2] Write `seenlabs-web/src/components/sections/TeamSection.tsx` — 4-card grid using `team.ts`, section label + title + accent, Framer Motion reveals

### Final CTA

- [ ] T035 [US2] Write `seenlabs-web/src/components/sections/FinalCTASection.tsx`:
  - `HLSVideo` background with `overlay='heavy'`
  - `DoorVisual` size='large' centered at bottom
  - Background radial glow
  - Section label, headline "Your market is waiting. Step out of the dark.", subtitle, "Begin The Path" CTA button
  - All copy from reference HTML, Framer Motion reveals

**Checkpoint (US2 complete)**: Scroll full page — all 10 sections visible, pricing shows correct data, Final CTA reachable. ✅

---

## Phase 5: User Story 3 — Mobile experience (Priority: P2)

**Goal**: Full premium mobile experience at 390px — loading screen, hamburger nav, stacked pricing, all sections readable.

**Independent Test**: Chrome DevTools at 390px width — no horizontal scroll, hamburger opens/closes, pricing cards stack vertically, all CTAs are tap-sized (min 44×44px).

- [ ] T036 [US3] Audit and fix `seenlabs-web/src/components/LoadingScreen.tsx` — verify counter, cycling word, and progress bar fill screen correctly at 390px
- [ ] T037 [US3] Audit and fix `seenlabs-web/src/components/Navbar.tsx` — hamburger icon visible at ≤900px, nav links hidden, pill padding adjusts to mobile
- [ ] T038 [US3] Audit all section components for responsive breakpoints at 600px and 390px:
  - `PricingSection.tsx`: 3-col → 1-col at 900px
  - `CasesSection.tsx`: 3-col → 1-col at 900px
  - `TeamSection.tsx`: 4-col → 2-col at 900px → 2-col at 600px
  - `SolutionSection.tsx`: pillars grid wraps correctly
  - `DifferentiatorSection.tsx`: comparison col adjustments at 600px
  - All sections: padding 100px → 70px → adjusted at 600px
- [ ] T039 [US3] Verify all CTA buttons have minimum tap target (44×44px) on mobile
- [ ] T040 [US3] Test `HeroSection.tsx` on mobile — door visual, particle canvas, headline font sizes via `clamp()`, CTA buttons wrap correctly with `flex-wrap`

**Checkpoint (US3 complete)**: Site fully usable at 390px with no overflow or clipped content. ✅

---

## Phase 6: User Story 4 — FAQ accordion (Priority: P3)

**Goal**: FAQ accordion with smooth expand/collapse, one item open at a time.

**Independent Test**: Navigate to `#faq` on desktop and mobile — click/tap each of the 10 questions, verify smooth animation, verify only one open at a time.

- [ ] T041 [US4] Write `seenlabs-web/src/components/ui/FAQItem.tsx`:
  - Question button (full width, Sora 600, flex between text and icon)
  - Icon: 28px square border, "+" rotates 45° when open (`transition: transform 0.3s`)
  - Answer: `motion.div` with `AnimatePresence`, `initial: {height:0, opacity:0}` → `animate: {height:'auto', opacity:1}` → `exit: {height:0, opacity:0}`
  - Accepts `isOpen: boolean` + `onToggle: () => void` props
  - Hover: question text turns purple

- [ ] T042 [US4] Write `seenlabs-web/src/components/sections/FAQSection.tsx`:
  - Manages `openIndex: number | null` state — enforces one-open-at-a-time
  - Renders 10 `FAQItem` components from `faq.ts`
  - Section label + "Before you ask." title + accent
  - Max-width 760px centered list
  - Framer Motion whileInView reveal on section header

**Checkpoint (US4 complete)**: All 10 FAQ items open/close smoothly, one at a time, on desktop and mobile. ✅

---

## Phase 7: Footer + Marquee

**Purpose**: Final visual element — GSAP marquee + footer bar.

- [ ] T043 Write `seenlabs-web/src/components/ui/Marquee.tsx`:
  - Renders "OUT OF THE DARK • " repeated 10× in a flex row
  - GSAP `useGSAP`: `gsap.to(marqueeRef, { xPercent: -50, duration: 40, ease: "none", repeat: -1 })`
  - Pauses when `useReducedMotion` is true
  - Font: Sora 800, large text, uppercase

- [ ] T044 Update `seenlabs-web/src/components/sections/FinalCTASection.tsx` — add `Marquee` component above footer bar; add footer bar with logo, "Out of the Dark" slogan, nav links, copyright "© 2025 Seen Labs · All rights reserved"

**Checkpoint**: Marquee scrolls continuously at constant speed. Footer bar shows correct content. ✅

---

## Phase 8: Polish & QA

**Purpose**: Accessibility, performance, and final copy audit.

- [ ] T045 [P] Wire `useReducedMotion` across ALL animated components — wrap GSAP timelines and Framer Motion `transition` props with conditional check; if reduced motion, use instant opacity-only transitions
- [ ] T046 [P] Full copy audit — compare every text string in all section components against `seen-labs.html`; fix any discrepancies
- [ ] T047 [P] Placeholder audit — verify all 3 case study cards show branded placeholder (not broken img), video fallback gradient renders on hls.js failure, all CTA hrefs that point to Hotmart are set to `"#"` with a `TODO` comment
- [ ] T048 [P] Responsive QA at 1200px, 900px, 600px, 390px — check all sections for layout breaks, overflow, font size readability
- [ ] T049 Performance check: run `npm run build` + `npm run preview`, verify Lighthouse LCP < 2.5s, no render-blocking resources, bundle size < 500kb (excluding hls.js)
- [ ] T050 Add `<meta>` tags in `seenlabs-web/index.html` — description, og:title, og:description, og:image placeholder, theme-color `#9B5CF6`
- [ ] T051 Add `seenlabs-web/public/favicon.svg` — simple purple dot or "SL" monogram matching brand

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 complete — blocks all sections
- **Phase 3 (US1 — Hero)**: Depends on Phase 2 — FIRST visible milestone
- **Phase 4 (US2 — All Sections)**: Depends on Phase 2; can start in parallel with Phase 3
- **Phase 5 (US3 — Mobile)**: Depends on Phases 3 + 4 complete
- **Phase 6 (US4 — FAQ)**: Depends on Phase 2; can run in parallel with Phases 3 + 4
- **Phase 7 (Marquee/Footer)**: Depends on Phase 4
- **Phase 8 (Polish)**: Depends on all phases complete

### Parallel Opportunities Within Phases

**Phase 1**: T005, T006, T007 can run in parallel after T001–T004
**Phase 2**: T009, T010, T011, T012, T013 all parallel
**Phase 4**: T021–T024, T025–T026, T027–T028, T029, T030, T031–T032, T033–T034 are independent section pairs

---

## Implementation Strategy

### MVP (US1 only — ~8 hours)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational hooks + HLSVideo + DoorVisual
3. Complete Phase 3: LoadingScreen + Navbar + MobileNav + HeroSection
4. **Validate**: Loading screen → hero works on desktop and mobile
5. Deploy to Vercel preview URL

### Full Site (~3–4 days total)

1. Phase 1+2 → Foundation (~2h)
2. Phase 3 → Hero + Loading (~3h)
3. Phase 4 → All 10 sections (~6h, many tasks parallelizable)
4. Phase 6 → FAQ (~1h)
5. Phase 5 → Mobile QA (~2h)
6. Phase 7 → Marquee + Footer (~1h)
7. Phase 8 → Polish + QA (~2h)

---

## Notes

- [P] tasks touch different files — safe to work in parallel
- All copy comes from `seenlabs-web/src/data/*.ts` files (never hardcoded in JSX)
- Placeholder assets are NEVER removed — they stay until real assets are provided
- `useReducedMotion` must be checked before every GSAP call and Framer Motion `transition`
- Commit after each Phase checkpoint
