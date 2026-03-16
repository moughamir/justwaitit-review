# Repository Guidelines

## Project Structure & Module Organization

- `app/`: Next.js App Router pages, layouts, and route handlers.
- `components/`: Reusable UI (kebab-case files, React exports in PascalCase).
- `lib/`: Domain utilities (`actions/`, `supabase/`, `types/`, `utils/`).
- `hooks/`: Custom React hooks (e.g., `use-multi-step-form.ts`).
- `public/`: Static assets. `docs/`: Project docs. `supabase/`: Supabase config.
- `__tests__/`: Playwright tests by feature (e.g., `performance/`, `preservation/`).

## Skills & Sub-Agents

This repository is equipped with specialized AI skills and sub-agents to maintain high standards:

- **Skills (@.agents/skills/):**
  - `react-refactor`: Architectural refactoring for React.
  - `nextjs-performance`: Next.js optimization patterns.
  - `tailwind-ui-refactor`: UI polish and hierarchy with Tailwind.
  - `typescript-refactor`: Modern TypeScript patterns.
  - `clean-code`: General best practices and maintainability.
- **Sub-Agents (@.claude/agents/):**
  - `anaqio-ui-designer`: Specialized in high-end luxury fashion aesthetics.
  - `code-improver`: Batch refactoring and optimization.

Use `kiro chat "..."` to dispatch tasks to these experts.

## Build, Test, and Development Commands

- `bun dev`: Start local dev server at `http://localhost:3000`.
- `bun run build`: Production build. `bun start`: Serve built app.
- `bun run lint` / `bun run lint:fix`: Lint and auto-fix with ESLint.
- `bun run format` / `bun run format:check`: Format with Prettier.
- `bun run test`: Run Playwright tests (build and start handled via config).
  - Example: `bun run test -- __tests__/performance/landing-page-performance.test.ts`.
- `bunx repomix`: Index the codebase for AI context.
- npm alternative: replace `bun run` with `npm run`.

## Coding Style & Naming Conventions

- Language: TypeScript + React. Indentation: 2 spaces, LF line endings.
- Files: kebab-case (`login-form.tsx`), components export PascalCase.
- Imports: grouped and alphabetized (see `eslint.config.mjs`).
- Allowed console: `console.warn`, `console.error` only.
- Tooling: ESLint (Next, React, Tailwind plugins) + Prettier (Tailwind plugin).

## Testing Guidelines

- Framework: Playwright (`@playwright/test`). Tests live in `__tests__/`.
- Names: `*.test.ts(x)` per feature folder. Keep tests parallel-safe.
- Running locally: `bun dev` (for manual), CI uses Playwright’s `webServer`.
- Aim for stable selectors and fast, focused specs.

## Commit & Pull Request Guidelines

- Use Conventional Commits: `feat:`, `fix:`, `refactor:`, `test:`, `chore:`, `docs:`.
  - Examples in history: `fix: …`, `feat: …`, `refactor: …`.
- PRs: clear title + description, link issues, screenshots for UI changes,
  checklist: lint + tests pass, no console noise, updated docs if needed.

## Security & Configuration Tips

- Copy `.env.example` → `.env.local` and set Supabase vars:
  - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEYAULT_KEY`.
- Never commit secrets; rely on Vercel/Supabase environment config.
- Husky + lint-staged enforce formatting on commit; run fixes before PR.
