# Feature Specification: Seen Labs Landing Page

**Feature Branch**: `001-seenlabs-landing`

**Created**: 2026-05-30

**Status**: Draft — Updated with cinematic design direction

**Input**: Premium single-page dark landing page for Seen Labs, modeled after a high-end portfolio
experience with loading screen, HLS video backgrounds, GSAP animations, and Framer Motion reveals.
Adapted to Seen Labs branding, copy, and conversion goals.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Prospect lands and is immediately captivated (Priority: P1)

A business owner opens seenlabs.com for the first time. They see a cinematic loading screen
counting to 100, then the hero reveals with a dark HLS video background, animated headline,
and two CTAs. The entire first impression communicates premium quality before a word is read.

**Why this priority**: First impression is the conversion lever. If the loading + hero feel cheap,
the visitor leaves. This section establishes the brand's credibility at a visceral level.

**Independent Test**: Load the page fresh — the loading screen must complete (2.7s), transition
smoothly into the hero, and the hero video + headline must be visible and animated within 0.5s
of the loading screen exit.

**Acceptance Scenarios**:

1. **Given** a visitor opens the page, **When** it loads, **Then** the loading screen appears full-screen with a counter animating 000→100 over ~2.7 seconds.
2. **Given** the counter reaches 100, **When** 400ms pass, **Then** the loading screen fades out and the hero section is revealed with entrance animations.
3. **Given** the hero is visible, **When** the visitor looks at it, **Then** they see: HLS video background (or placeholder), dark overlay, floating navbar, animated headline "Your business deserves to be seen.", role cycling text, and two CTA buttons.
4. **Given** any device, **When** the hero loads, **Then** the video plays muted autoplay or a static gradient fallback is shown — no broken video state.

---

### User Story 2 — Prospect scrolls through the full conversion journey (Priority: P1)

A visitor scrolls from hero through manifesto, problem cards, solution pillars, 7-step system,
pricing, comparison table, guarantee, cases, team, FAQ, and final CTA — each section reveals
with smooth Framer Motion animations triggered by scroll.

**Why this priority**: The scroll experience IS the sales funnel. Every section must work together.

**Independent Test**: Scroll the full page at a steady pace on desktop and mobile — every section
must animate in cleanly, no layout breaks, no content overlap.

**Acceptance Scenarios**:

1. **Given** a visitor scrolls past each section, **When** it enters the viewport, **Then** it animates in (opacity + translateY or equivalent) via Framer Motion whileInView.
2. **Given** a visitor reaches the Pricing section, **Then** all 3 cards are visible with correct names, prices, features, and CTAs. "Partner Light" is visually featured.
3. **Given** a visitor reaches the Final CTA, **Then** the section shows the door visual, headline, and primary button — all matching the reference HTML content exactly.

---

### User Story 3 — Mobile visitor has a premium experience (Priority: P2)

A visitor on a smartphone (390px viewport) opens the site, sees the loading screen, navigates
with the hamburger menu, and can reach any section and tap any CTA without issues.

**Why this priority**: Mobile traffic is critical. A premium desktop experience that breaks on
mobile destroys brand credibility.

**Independent Test**: Open on 390px viewport — loading screen fills screen, hamburger nav works,
all sections readable, all CTAs tappable with no overflow or horizontal scroll.

**Acceptance Scenarios**:

1. **Given** a mobile visitor, **When** the loading screen runs, **Then** it fills the full screen with correctly sized counter and progress bar.
2. **Given** a mobile visitor on the hero, **When** they tap the hamburger, **Then** the full-screen mobile nav opens with all section links.
3. **Given** a mobile visitor, **When** they scroll through pricing, **Then** the 3 cards stack vertically and are fully readable.

---

### User Story 4 — Visitor resolves objections in the FAQ (Priority: P3)

A visitor with specific doubts (7-day delivery, guarantee, payment methods) uses the FAQ
accordion to answer their questions before clicking a CTA.

**Why this priority**: FAQ reduces friction. One resolved objection can close a deal.

**Independent Test**: Navigate to FAQ on desktop and mobile — all 10 items open/close with
smooth animation, one at a time.

**Acceptance Scenarios**:

1. **Given** a visitor taps/clicks a FAQ question, **When** it opens, **Then** the answer expands with smooth animation and any previously open item closes.
2. **Given** a visitor reads the FAQ, **Then** all 10 questions and answers match the reference HTML content exactly.

---

### Edge Cases

- What if hls.js fails to load the video? A static dark gradient with purple glow MUST replace it — no broken video icon or white flash.
- What if Google Fonts fails? Body falls back to system sans-serif; display font falls back to Georgia italic — no invisible text.
- What if JavaScript is disabled? Core text content of all sections MUST still be readable (no JS-only content renders).
- What if the user prefers reduced motion? All GSAP and Framer Motion animations MUST respect `prefers-reduced-motion: reduce` and skip or simplify transitions.
- What if the page is visited at 600px width? No horizontal scrollbar, no clipped content.

---

## Requirements *(mandatory)*

### Functional Requirements

**Loading Screen**
- **FR-001**: A full-screen loading overlay MUST appear on first page load (z-index above all content).
- **FR-002**: The loading counter MUST animate from 000 to 100 over approximately 2700ms using requestAnimationFrame.
- **FR-003**: A "SEEN LABS" or "Out of the Dark" label MUST appear top-left during loading.
- **FR-004**: A cycling word (e.g., "Visibility", "Automation", "Results", "Growth") MUST animate in the center during loading using AnimatePresence.
- **FR-005**: A progress bar at the bottom MUST grow from 0% to 100% with the accent gradient (purple) and a subtle glow.
- **FR-006**: When the counter reaches 100, the loading screen MUST fade out after a 400ms delay and reveal the hero.

**Navbar**
- **FR-007**: A floating pill navbar MUST be fixed at the top center of the viewport.
- **FR-008**: The navbar MUST contain: Seen Labs logo dot (animated pulse), nav links [Manifesto, Solution, System, Pricing, Cases], and a "Start The Path" CTA button.
- **FR-009**: The navbar pill MUST add a shadow when scrollY > 100.
- **FR-010**: On mobile (≤ 900px), nav links MUST be hidden and a hamburger icon MUST appear, opening a full-screen overlay nav.

**Hero**
- **FR-011**: The hero MUST display a full-viewport HLS video background (muted, autoplay, loop) using hls.js. A placeholder video or gradient MUST be used until the client provides a real URL.
- **FR-012**: The hero MUST display a dark overlay and a bottom fade-to-background gradient.
- **FR-013**: The hero content MUST include: eyebrow label "OUT OF THE DARK", headline "Your business deserves to be seen.", cycling role text ("Visible", "Automated", "Trusted", "Unstoppable"), description copy, and two CTA buttons ("Start The Path", "See The System").
- **FR-014**: GSAP MUST animate the hero content on entrance: headline slides up from y:50, supporting text fades in with blur.
- **FR-015**: A scroll indicator (line + "SCROLL" label) MUST appear at the bottom center of the hero.

**Content Sections (Manifesto → Final CTA)**
- **FR-016**: All 10 content sections MUST be implemented: Manifesto, Problem, Solution, System, Pricing, Differentiator, Guarantee, Cases, Team, FAQ, Final CTA.
- **FR-017**: Every section MUST use Framer Motion `whileInView` for entrance animation (opacity + translateY, viewport once).
- **FR-018**: The manifesto lines (01, 02, 03) MUST animate in staggered on scroll.
- **FR-019**: The 12-step system path MUST animate in staggered on scroll with step connectors.
- **FR-020**: All copy MUST exactly match the reference `seen-labs.html` — no paraphrasing.

**Pricing**
- **FR-021**: The 3 pricing cards (OOTD $2,630 / Partner Light $983+18% / Enterprise Custom) MUST render with all feature lists and CTAs.
- **FR-022**: "Partner Light" MUST be visually featured: accent border, "Most Chosen" badge, negative margin offset.

**Cases**
- **FR-023**: The 3 case study cards MUST show browser chrome mock, placeholder screenshot area, domain, quote, and author.
- **FR-024**: Placeholder images MUST be branded (dark gradient + purple label) — no broken images.

**FAQ**
- **FR-025**: The FAQ accordion MUST support one-open-at-a-time behavior with smooth expand/collapse animation.

**Footer / Final CTA**
- **FR-026**: The footer section MUST have a second HLS video background (same source, or placeholder) with a heavier dark overlay.
- **FR-027**: A GSAP-animated marquee ("OUT OF THE DARK • " repeated) MUST scroll horizontally at constant speed.
- **FR-028**: The footer MUST display: logo, slogan, nav links, copyright © 2025 Seen Labs.

**General**
- **FR-029**: The site MUST be fully responsive at 1200px+, 900px, and 600px breakpoints.
- **FR-030**: All animations MUST respect `prefers-reduced-motion`.
- **FR-031**: The purple brand color `#9B5CF6` and its variants MUST be defined as CSS custom properties and mapped to Tailwind tokens.

### Key Entities

- **LoadingScreen**: Full-screen overlay component with counter, cycling word, and progress bar
- **Navbar**: Floating pill with logo, links, CTA, mobile menu
- **HeroSection**: Video background + overlay + GSAP-animated content
- **ContentSection**: Reusable wrapper with Framer Motion whileInView entrance
- **PricingCard**: Package card with name, price, features, CTA, featured variant
- **CaseCard**: Client showcase with browser chrome, placeholder image, quote
- **TeamCard**: Avatar + name + role
- **FAQItem**: Accordion item with open/close state
- **Marquee**: GSAP horizontal scrolling text band

---

## Success Criteria *(mandatory)*

- **SC-001**: Loading screen completes in ~2.7s and transitions to hero without white flash or layout jump.
- **SC-002**: Hero video plays (or placeholder renders) within 1s of loading screen exit on a standard connection.
- **SC-003**: All 10 content sections render with correct copy matching the reference HTML — zero missing text.
- **SC-004**: Every Framer Motion section entrance triggers correctly on first scroll-past, on desktop and mobile.
- **SC-005**: Pricing section shows all 3 cards with correct prices, features, and "Partner Light" as featured.
- **SC-006**: FAQ accordion opens/closes all 10 items smoothly with one-at-a-time behavior.
- **SC-007**: Page is fully usable at 390px viewport — no horizontal scroll, no clipped content, all CTAs tappable.
- **SC-008**: GSAP marquee in footer scrolls continuously without stuttering.
- **SC-009**: Page passes reduced-motion check — no animations run when `prefers-reduced-motion: reduce` is active.

---

## Assumptions

- The reference file `/Users/gabriellopez/Downloads/seen-labs.html` is authoritative for all copy and design intent.
- The HLS video URL is a placeholder (using the portfolio reference URL or a dark gradient) until Seen Labs provides a real brand video.
- Screenshot assets for case study cards are not yet available — branded placeholders will be used.
- Team photos are not yet available — initials avatars will be used.
- Hotmart CTA URLs are not yet available — `#` placeholder links will be used and flagged.
- The site is a static SPA (React + Vite) — no server-side rendering, no API, no database.
- Deployment is to Vercel. Domain is TBD.
- Privacy policy and terms links are out of scope for v1.
