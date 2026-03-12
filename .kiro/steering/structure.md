# Project Structure

## Root Organization

```
/app                 # Next.js App Router pages and layouts
/components          # React components
/lib                 # Utility functions and configurations
/public              # Static assets
/supabase            # Database migrations
/docs                # Project documentation
```

## App Directory (`/app`)

Next.js 16 App Router structure with file-based routing:

- **Route Groups**: `(auth)`, `(protected)` - Organize routes without affecting URL
- **Special Files**:
  - `layout.tsx` - Shared layouts
  - `page.tsx` - Route pages
  - `loading.tsx` - Loading states
  - `error.tsx` - Error boundaries
  - `route.ts` - API routes
- **Metadata**: `manifest.ts`, `robots.ts`, `sitemap.ts`, `opengraph-image.png`

### Key Routes

- `/` - Landing page with hero, waitlist, product preview
- `/auth/*` - Authentication flows (login, sign-up, password reset)
- `/protected/*` - Authenticated user areas
- `/early-access` - Early access program
- `/brand`, `/privacy`, `/terms`, `/cookies` - Static pages

## Components Directory (`/components`)

```
/components
  /ui              # shadcn/ui base components (button, input, card, etc.)
  /sections        # Page sections (HeroSection, WaitlistSection, etc.)
  /layout          # Layout components (header, footer, nav)
  /brand           # Brand-specific components (logos, graphics)
  /tutorial        # Tutorial/onboarding components
  *-form.tsx       # Form components (login-form, sign-up-form, etc.)
```

### Component Patterns

- Use shadcn/ui components from `/components/ui` as building blocks
- Compose page sections in `/components/sections`
- Forms are standalone components with client-side validation
- Brand components handle logo and visual identity elements

## Library Directory (`/lib`)

```
/lib
  /supabase        # Supabase client configurations
    client.ts      # Browser client (use in Client Components)
    server.ts      # Server client (use in Server Components/Actions)
    middleware.ts  # Auth middleware
  /actions         # Server Actions
  utils.ts         # Utility functions (cn, etc.)
```

### Supabase Client Usage

- **Server Components/Actions**: Import from `@/lib/supabase/server`
- **Client Components**: Import from `@/lib/supabase/client`
- **Middleware**: Import from `@/lib/supabase/middleware`
- Always create new client instances (don't use globals)

## Styling Conventions

### Tailwind Usage

- Use `cn()` utility from `@/lib/utils` to merge class names
- Custom colors via `aq.*` prefix (e.g., `text-aq-blue`, `bg-aq-purple`)
- Typography classes: `font-display`, `font-ui`, `font-editorial`, `font-wordmark`
- Letter spacing: `tracking-display`, `tracking-editorial`, `tracking-label`

### Component Variants

- Use `class-variance-authority` (cva) for component variants
- See `/components/ui/button.tsx` for reference pattern
- Export both component and variants for reusability

## Path Aliases

- `@/*` - Root directory alias (e.g., `@/components`, `@/lib`)

## Database

- Migrations in `/supabase/migrations`
- SQL files with timestamp prefix: `YYYYMMDDHHMMSS_description.sql`

## Configuration Files

- `next.config.ts` - Next.js config with security headers, image optimization
- `tailwind.config.ts` - Tailwind theme with brand colors and fonts
- `tsconfig.json` - TypeScript config with strict mode
- `components.json` - shadcn/ui configuration

## Conventions

- **File naming**: kebab-case for files, PascalCase for components
- **Server vs Client**: Mark client components with `"use client"` directive
- **Async components**: Server Components can be async, Client Components cannot
- **Environment variables**: Prefix public vars with `NEXT_PUBLIC_`
- **Imports**: Use path alias `@/` for all internal imports
