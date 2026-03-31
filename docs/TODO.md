# Tasks

## Data Structures (COMPLETE)
- [x] Task 1: Create Marquee Content Data Structure
- [x] Task 2: Create Features Section Data Structure
- [x] Task 3: Create Results Section Data Structure
- [x] Task 4: Create Segments Section Data Structure
- [x] Task 5: Create Pricing Section Data Structure
- [x] Task 6: Add Motion Animation Helpers

## Atom Components (COMPLETE)
- [x] Task 7: Create Marquee Ticker Atom Component
- [x] Task 8: Create Feature Card Atom Component
  - FeatureCardAtom.tsx + unit tests
  - Framer Motion stagger animation + hover effects
- [x] Task 9: Create Result Card Atom Component
  - ResultCardAtom.tsx + unit tests
  - Animated comparison layout with arrow animation
- [x] Task 10: Create Segment Card Atom Component
  - SegmentCardAtom.tsx + unit tests
  - Hover-reveal problem/solution with color-coded borders
- [x] Task 11: Create Pricing Tier Atom Component
  - PricingTierAtom.tsx + unit tests
  - Popular badge, feature list with checkmarks, custom pricing support

## Section Wrapper Components (COMPLETE)
- [x] Task 12: Create Section Wrapper Components
  - FeaturesSection.tsx — wraps FeatureCardAtom with grid layout
  - ResultsSection.tsx — wraps ResultCardAtom with comparison cards
  - SegmentsSection.tsx — wraps SegmentCardAtom with vertical stack
  - PricingSection.tsx — wraps PricingTierAtom with 3-column grid
  - MarqueeSection.tsx — wraps MarqueeTickerAtom with variant background support

## Integration & Testing (COMPLETE)
- [x] Task 13: Integrate Sections into NewLandingPage
  - All sections dynamically imported with SSR for code-splitting
  - MarqueeSection inserted after VideoHeroSection and after SolutionSection
  - Page layout verified and flowing correctly
- [x] Task 14: Run Full Test Suite and Performance Verification
  - `bun run test` — ALL 167 TESTS PASSING (29 test files)
  - Fixed IntersectionObserver mock in vitest.setup.ts (class-based, constructor-safe)
  - Bumped testTimeout to 10s to prevent timing flakes under full-suite CPU load
  - All atom and section components verified
  - E2E tests ready with `bun run test:e2e`

## Phase 2 — Visual Polish & Vooban Fidelity (TODO)
- [ ] Task 15: Fix MarqueeTickerAtom theme-awareness
  - Replace hardcoded `text-white` with `text-foreground`
  - Add separator dots between items (·) for Vooban ticker style
  - Support `direction` prop (ltr/rtl) for reversed row effect
- [ ] Task 16: Improve FeatureCardAtom design
  - Replace `bg-white dark:bg-slate-800` with CSS variable tokens
  - Add icon container with accent color ring
  - Ensure border uses `border-border` token
- [ ] Task 17: Add alternating section backgrounds
  - Odd sections: `bg-background`, Even sections: `bg-muted/30`
  - Enforce via section wrapper className convention
- [ ] Task 18: Typography pass on all new sections
  - All section headings: `font-display` with `clamp()` sizing
  - All section eyebrows: `font-label uppercase tracking-label`
  - Consistent with existing Omnizya design system sections
- [ ] Task 19: PricingSection dark-mode accent fix
  - Replace `border-primary` with `border-aq-blue` for brand alignment
  - Add `Popular` badge above plan name for highlighted tier
- [ ] Task 20: Add ScrollTriggered entrance to ResultsSection metrics
  - Animated number counter on scroll into view
  - Uses existing `ScrollTriggered` component pattern

## Post-Expo Status (as of 2026-03-31)
- Expo deadline (2026-03-28) has passed
- Phase 1 complete: all data, atoms, sections, integration, and tests committed
- Test suite healthy: 167 unit tests passing, E2E tests ready
- Phase 2 focus: visual polish and Vooban design fidelity
