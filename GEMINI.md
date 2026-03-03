# GEMINI Context: ANAQIO (AI Fashion Studio)

This project, named **ANAQIO**, is a high-end AI fashion studio platform tailored for the Moroccan market. It is built using the Next.js and Supabase stack, featuring interactive AI simulations and automated video production.

## Project Overview

- **Purpose:** Provide a professional workspace for fashion brands to upload assets, adjust lighting, swap backgrounds, and generate lookbooks using AI.
- **Target Audience:** Moroccan fashion brand owners, creative directors, and designers.
- **Core Features:**
  - **Interactive Preview:** A "try-before-you-buy" simulation for backgrounds and lighting.
  - **AI Studio Workspace:** (In Development) Professional editor for fashion assets.
  - **AI Lookbook Generator:** (Planned) Automated editorial lookbook creation.
  - **Remotion Video:** Automated high-end luxury fashion video generation.
  - **Waitlist Management:** Leads collection with role and style preference data.

## Tech Stack

- **Framework:** [Next.js 15+](https://nextjs.org) (App Router)
- **Backend/Auth:** [Supabase](https://supabase.com) (DB, Auth, SSR)
- **Video Production:** [Remotion](https://remotion.dev)
- **Styling:** [Tailwind CSS](https://tailwindcss.com) & [shadcn/ui](https://ui.shadcn.com)
- **Animations:** [Framer Motion](https://framer.com/motion)
- **Validation:** [Zod](https://zod.dev)
- **Language:** TypeScript

## Directory Structure

- `app/`: Next.js App Router (pages, layouts, API routes).
- `components/`:
  - `layout/`: Global Header and Footer.
  - `sections/`: Individual landing page sections (Hero, Problem, Demo, Waitlist, etc.).
  - `ui/`: Reusable shadcn/ui components.
- `lib/`:
  - `actions/`: Server Actions (e.g., `waitlist.ts`).
  - `supabase/`: Supabase client and middleware configuration.
- `remotion/`: Video composition and asset logic.
- `supabase/migrations/`: SQL migrations for the database schema.
- `docs/plans/`: Feature roadmaps and implementation guides.

## Building and Running

### Prerequisites
- Node.js & bun.
- A Supabase project.

### Commands
- `bun dev`: Starts the development server.
- `bun build`: Builds the project for production.
- `bun start`: Runs the built production server.
- `bun lint`: Runs ESLint for code quality checks.

## Development Conventions

- **Auth:** Uses Supabase SSR for session management via cookies.
- **Server Actions:** All form submissions (like the Waitlist) should use Server Actions with Zod validation.
- **Styling:** Adhere to the established brand palette (e.g., `aq-blue`) and typography (Syne for headers, Cormorant for body).
- **Localization:** Pricing must always be displayed in **MAD/DH**.
- **Database:** Changes to the schema must be documented in `supabase/migrations/` with a timestamped filename.
- **Video:** All video components reside in `remotion/` and are integrated into the React app via `@remotion/player`.

## Roadmap Status (as of Feb 2026)
- **Phase 1 (Done):** Brand localization, typography standardization, and scaffolding.
- **Phase 2 (Done):** Interactive Preview component with AI Relighting simulation.
- **Phase 3 (Upcoming):** Dashboard for waitlisted users, refinement of Remotion video sequences, and "Style Preference" integration.
