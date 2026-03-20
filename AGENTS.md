# AGENTS.md

This file provides guidance to AI agents (Kiro, Gemini, Claude) when working with code in this repository.

## Project Overview

**ANAQIO** — Morocco's first AI-powered virtual fashion studio.

- **Tagline:** "Your Digital Atelier — Create. Style. Launch."
- **Position:** Sovereign Moroccan AI infrastructure for fashion commerce.
- **Pain:** Traditional photoshoots cost 5,000-20,000 MAD/collection.
- **Promise:** 90% cost reduction via AI-generated studio imagery.

### URLs

- **Production waitlist:** anaqio.com
- **Staging:** stage.anaqio.com
- **MVP studio:** studio.anaqio.com (single-page app, in build)

## Commands

```bash
bun dev              # Start local dev server at http://localhost:3000
bun run build        # Production build
bun start            # Serve built app
bun run lint         # Run ESLint
bun run lint:fix     # Auto-fix linting issues
bun run format       # Format all files with Prettier
bun run format:check # Check formatting without writing
bun run test         # Run all Playwright E2E tests (builds app first)

# Run a single test file:
bun run test -- __tests__/performance/landing-page-performance.test.ts

# Index codebase for AI context:
bunx repomix
```

## Environment Setup

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Never commit secrets; rely on Vercel/Supabase environment config.

### Host Environment

- **OS:** Arch Linux, Hyprland (Wayland), no Xorg
- **Sandbox:** Ubuntu 24 container — headless, no display. `computer_use` is NOT available.
- All visual QA must use headless Playwright via bash.

## Architecture

**Stack:** Next.js 16 (App Router) + React 19 + TypeScript + Framer Motion (animation) + Supabase (DB + auth) + Brevo (email automation).

### Key Directories

- `app/` — App Router pages. `app/auth/` for auth routes, `app/protected/` for authenticated routes, `app/playground/` for development/demos.
- `components/sections/` — Landing page sections (Hero, Waitlist, Solution, etc.) loaded via dynamic imports for code-splitting.
- `components/ui/` — shadcn/ui components (New York style) + custom components (`AnaqioLogo`, `AbstractBackground`, `PerspectiveGrid`, `MagneticButton`, `GrainOverlay`).
- `lib/actions/` — Server Actions (use `'use server'` + Zod validation). Example: `waitlist.ts`.
- `lib/supabase/` — Supabase clients: `client.ts` (browser), `server.ts` (RSC), `middleware.ts` (session refresh).
- `lib/content/` — All section text content (hero.ts, problem.ts, solution.ts, how-it-works.ts, why-anaqio.ts, who-its-for.ts, vision.ts, waitlist.ts, final-cta.ts, types.ts).
- `lib/motion.ts` — Animation utilities (fadeUp, fadeUpCard, fadeIn, slideInLeft, clipReveal, flipReveal, charReveal, scatterIn). All accept `useReducedMotion()` result.
- `hooks/` — Custom React hooks (`use-multi-step-form.ts`, `use-device-tier.ts`).
- `__tests__/` — Playwright tests organized by category: `performance/` and `preservation/`.
- `supabase/migrations/` — Live migrations: `init_waitlist`, `add_campaigns_marketing`. Table in scope: `generations` (usage logging).
- `remotion/` — Video composition components integrated via `@remotion/player`.
- `docs/` — Project docs and feature plans.

### Data Flow

- **Waitlist form** -> Server Action (Zod validation) -> Supabase `waitlist` table (RLS: insert only) -> Brevo welcome sequence triggered
- **Auth** -> Supabase SSR with cookie-based session; middleware refreshes sessions on every request
- **Landing page sections** -> dynamically imported with SSR for code-splitting
- **Studio MVP** -> Garment upload -> preset model selection -> HuggingFace IDM-VTON via Gradio client -> download. Each request logged to `generations` table.

## Design System — Brand Tokens

```
--navy:    #1B2F52   (dominant dark background)
--blue:    #2C5F8A   (primary interactive / CTA)
--gold:    #D4AF37   (accent — used sparingly, high signal)
--ink:     #0F172A   (deepest bg, body text on light)
--elblue:  #2563EB   (UI highlights, links)
--violet:  #7C3AED   (AI / generative feature tags)
--white:   #F8F6F0   (warm off-white, not #FFFFFF)
```

- **Display font:** Syne (bold, geometric — headings only). Load via `next/font`, subset: latin + latin-ext.
- **Body font:** Plus Jakarta Sans (readable at all sizes). Load via `next/font`.
- **Color rule:** 60-30-10 — `--navy` (60%, backgrounds), section surfaces (30%), `--gold` (10%, CTAs/accents).
- **Pricing:** Always display in **MAD/DH** (Moroccan market).
- **Utility classes:** `text-brand-gradient`, `bg-brand-gradient`, `glass`, `glass-strong`, `glass-card`, `perspective-grid`, `animated-grid`, `abstract-blob`, `gravitate`.
- Tailwind CSS + shadcn/ui with CSS variable theming.

## Waitlist Page — Desired State (anaqio.com)

- **Hero:** Full-bleed `--navy` background, Syne display heading. Tagline: "Your Digital Atelier" dominant, "Create. Style. Launch." secondary. Pain-point subheading in Plus Jakarta Sans: "Photoshoots at 20,000 MAD? Generate a full collection in minutes." CTA button: `--gold` fill, `--navy` label, Framer Motion `scale(1.04)` hover. Email capture -> Supabase waitlist (RLS: insert only). Success triggers Brevo welcome sequence.
- **Social proof band:** "90% cost savings vs. traditional studio" — `--gold` accent stat. Moroccan fashion brands referenced (kaftan/jellaba aesthetic language). Dior 62% purchase intent stat.
- **Features teaser (3 cards):** AI Virtual Studio, Virtual Try-On, AI Lookbook Generator. `--navy` bg, `--blue` border, `--gold` icon accent, Framer Motion stagger on scroll.
- **Footer:** Arabic/French/English language hint (Darija-first community signal). Links: LinkedIn Amal, LinkedIn Moughamir, anaqio.com.

## Studio MVP — Expo Kiosk Mode (studio.anaqio.com)

- Single-page, no auth, no batch generation.
- Garment upload -> preset model selection -> generate -> download.
- Kiosk mode: large touch targets >= 64px, no scroll, fits 1920x1080 landscape.
- Supabase `generations` table logs each request (model, timestamp, status).
- HuggingFace IDM-VTON via Gradio client (primary). fal.ai upgrade deferred until payment capability available.
- 4-tap maximum flow: upload -> select -> generate -> download.
- Friendly error state for HF Gradio client timeout handling.

## Omnizya Composition System

The landing page follows **Omnizya** — a free-atom composition philosophy.

### Core Rule

Every visual element is an independent atom, positioned freely in the viewport canvas, animated individually relative to scroll. Nothing is grouped inside a "card" or "flex row" by default.

### Four Layers (never collapse)

| Layer          | Purpose                             | Technology                                        |
| -------------- | ----------------------------------- | ------------------------------------------------- |
| **Semantic**   | HTML hierarchy, SEO, accessibility  | Correct HTML elements, ARIA, `sr-only`            |
| **Visual**     | Composition, free spatial placement | `position: absolute`, `transform`, Tailwind       |
| **Kinetic**    | Scroll choreography per atom        | Framer Motion `useScroll` + `useTransform`        |
| **Resilience** | Graceful degradation                | `useReducedMotion`, `useDeviceTier`, CSS `@media` |

### Atom Positioning Modes

- **PINNED** — `position: absolute`, fixed in section canvas, no JS needed.
- **DRIFTING** — `position: absolute` + scroll-driven transform via `useTransform`.
- **ANCHORED** — `position: relative` in normal flow + transform offset.
- **FIXED** — `position: fixed`, viewport-relative (grain, cursor, progress bar only).

### Z-Axis Vocabulary (strict)

```
z-0    atmosphere (gradients, grain, video bg)
z-10   secondary visual atoms (decorative text, lines, shapes)
z-20   primary content atoms (headlines, body, images)
z-30   interactive atoms (buttons, links, inputs)
z-40   floating overlays (tooltips)
z-50   global fixed (cursor, preloader, progress bar)
```

### Choreography Rules

1. Each atom gets its own `useTransform` with a unique scroll input range — NOT a JS `delay`.
2. Stagger = offset start points in the scroll timeline.
3. Only `transform` and `opacity` are scroll-driven. Never animate `width`, `height`, `top`, `left`, or `background` via scroll.
4. Primary atoms rise 60px. Secondary atoms rise 30px. Atmospheric atoms drift 120px+.
5. `will-change: transform` on max 8 elements simultaneously; remove after animation completes.

### Standard Section Hook Setup

```typescript
const sectionRef = useRef<HTMLElement>(null);
const reduced = useReducedMotion();
const tier = useDeviceTier();
const animated = !reduced && tier !== 'low';

const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ['start end', 'end start'],
});
```

### Resilience Tiers

- `tier === 'high'` + `!reduced` -> full choreography
- `tier === 'mid'` OR `reduced` -> opacity-only `whileInView`, no parallax, no clip-path
- `tier === 'low'` -> static layout, `position: static` on all atoms, normal flow

### Accessibility (enforce on every section)

- `<section aria-labelledby="...">` on every section.
- `sr-only` heading exists if the visual heading is `aria-hidden="true"`.
- `data-atom` on every atom element.
- `aria-hidden="true"` + `data-decorative` on all decorative atoms.
- All animated motion wraps check `useReducedMotion()`.
- Images: explicit `width` + `height`, `alt`, `loading="lazy"` (except LCP image: `loading="eager" fetchpriority="high"`).

## Performance Targets

- Playwright: FCP < 1.8s, LCP < 2.5s, TBT < 200ms.
- Lighthouse: Performance >= 85 mobile / >= 92 desktop. CLS < 0.1.

## Playwright Headless QA

```typescript
import { chromium } from 'playwright';
const vps = [375, 768, 1024, 1440, 1920];
const br = await chromium.launch({
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--headless=new',
    '--disable-gpu',
    '--disable-dev-shm-usage',
  ],
});
for (const w of vps) {
  const pg = await br.newPage();
  await pg.setViewportSize({ width: w, height: Math.round(w * 0.6) });
  await pg.goto('http://localhost:3000');
  await pg.waitForTimeout(1500); // Framer Motion settle
  await pg.screenshot({ path: `anaqio_${w}.png`, fullPage: true });
  await pg.close();
}
await br.close();
```

## Next.js Configuration

- `next.config.js`: confirm no conflicting image domains.
- Fonts: load Syne + Plus Jakarta Sans via `next/font` (subset: latin + latin-ext).
- Framer Motion: lazy-import heavy components (`dynamic` import + `ssr: false`).
- Env: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` must be set.

## Skills & Sub-Agents

This repository is equipped with specialized AI skills in `.agents/skills/`:

**Core Skills:**

- `nextjs` / `nextjs-best-practices` / `nextjs-performance` / `nextjs-seo` — Next.js patterns and optimization.
- `react` / `react-refactor` / `react-optimise` — React architecture and performance.
- `tailwind` / `tailwind-ui-refactor` / `tailwind-responsive-ui` / `tailwind-design-system` — Tailwind CSS styling and responsive design.
- `shadcn` / `shadcn-ui` — shadcn/ui component integration.
- `omnizya` — Omnizya free-atom composition system.
- `framer-motion` / `framer-motion-animator` — Animation patterns.
- `typescript` / `typescript-refactor` — TypeScript patterns.
- `zod` — Schema validation.
- `playwright` — E2E testing.

**Design & UX Skills:**

- `ui-design` / `ui-ux-pro-max` / `ux-audit` — UI/UX best practices.
- `web-design-methodology` / `web-design-patterns` — Design system patterns.
- `glassmorphism` / `liquid-glass-design` — Glass-morphism effects.
- `responsiveness-check` — Cross-viewport validation.
- `color-palette` — Color system design.
- `tailwindcss-accessibility` / `tailwindcss-animations` — Specialized Tailwind patterns.

**Utility Skills:**

- `code-simplifier` / `clean-code` / `clean-architecture` / `refactor` — Code quality.
- `git-master` / `git-security-2025` — Git workflows.
- `feature-arch` / `feature-spec` — Feature planning.

Use `kiro chat "..."` to dispatch tasks to these skills.

## Coding Conventions

- **Files:** kebab-case (`login-form.tsx`); component exports in PascalCase.
- **Imports:** grouped and alphabetized (enforced by ESLint `import` plugin).
- **Console:** only `console.warn` and `console.error` allowed.
- **Database:** No new schema changes — only the two live migrations.
- **Commits:** Conventional Commits — `feat:`, `fix:`, `refactor:`, `test:`, `chore:`, `docs:`.
- Husky + lint-staged enforce formatting on commit; run `bun run lint:fix` and `bun run format` before opening a PR.
- PRs: clear title + description, link issues, screenshots for UI changes.

## Hard Constraints — Scope Freeze March 28

- No new features after March 28 — bug fixes and polish only.
- No new npm packages without CTO (Moughamir) approval.
- No Supabase schema changes — only the two live migrations.
- Do not enable batch generation — out of scope for expo MVP.
- No auth gate on studio.anaqio.com — kiosk mode is intentionally public.
- Do not replace Framer Motion with CSS-only for "simplicity".
- fal.ai upgrade: out of scope until payment capability available.
- Expo kiosk mode IS in scope — 1920x1080 landscape, large touch targets.
- Darija / Arabic copy IS in scope for social authenticity sections.

## Non-Negotiable Brand Rules

- `--navy` #1B2F52 must never be lightened "for readability".
- Syne must never be replaced with Inter, Space Grotesk, or system fonts.
- `--gold` #D4AF37 must never be substituted with generic yellow or amber.
- `--white` is #F8F6F0 (warm off-white) — never use #FFFFFF.
- Supabase RLS must never be disabled or bypassed.
- Brevo trigger must never be removed — waitlist signup = Brevo event.

## What NOT to Do

- Do not wrap groups of atoms in `<FeatureCard>` for visual grouping.
- Do not use `delay: X` for stagger — use offset scroll ranges.
- Do not animate `width`, `height`, `top`, `left` — only `transform` + `opacity`.
- Do not apply `will-change: transform` to every element — budget: 8 max simultaneously.
- Do not use inline px values for atom positions — use % or `calc(N/12 * 100%)`.
- Do not use static `text-5xl` on display headlines — use `clamp()`.
- Do not create new Tailwind config colors — use existing brand tokens.
- Do not create new z-index values outside the defined vocabulary (0, 10, 20, 30, 40, 50).
- Do not break existing `dynamic()` imports in `page.tsx`.
- Do not use `position: fixed` for section content atoms.
- Do not use font-size smaller than 11px for any visible text.

## Audit Report Template

```
## Brand Audit Findings
| # | File | Line | Issue | Token | Severity |

## Patches Applied
  FILE:     components/Hero.tsx
  SELECTOR: .hero-cta
  BEFORE:   background: #FFD700; color: #000;
  AFTER:    background: var(--gold); color: var(--navy);
  REASON:   Gold must pair with navy — brand token enforcement

## Supabase / Brevo Validation
  Waitlist insert: PASS / FAIL
  RLS policy:      insert-only confirmed / gap found
  Brevo trigger:   fired / not fired / misconfigured
  campaign_id:     populated / null

## QA Checklist
  - [ ] No horizontal scroll 375 -> 1920 px
  - [ ] Syne used only for headings; Plus Jakarta Sans for body
  - [ ] --gold #D4AF37 CTA renders correctly (not #FFD700 / amber)
  - [ ] --navy #1B2F52 dominant — no white/grey bg sections
  - [ ] Waitlist form inserts to Supabase + Brevo fires
  - [ ] Framer Motion stagger on features cards visible at 768 px+
  - [ ] studio.anaqio.com: 4-tap kiosk flow works at 1920x1080
  - [ ] Generations table row created per generation attempt
  - [ ] Lighthouse Performance >= 85 mobile / >= 92 desktop
  - [ ] All copy in FR primary (EN secondary) — no placeholder text

## Notion Log
  POST findings to Anaqio issue tracker via Notion MCP
  Parent page: 321e345f-841c-8110-80e9-c681ce8a56b3
```

## External References

- **Notion issue tracker:** Parent page `321e345f-841c-8110-80e9-c681ce8a56b3`.
- **Supabase:** psycholium account (production waitlist).
- **Brevo:** Email automation for waitlist welcome sequence.
- **HuggingFace:** IDM-VTON via Gradio client for virtual try-on.
