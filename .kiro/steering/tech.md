# Tech Stack

## Framework & Runtime

- **Next.js 16** (App Router) - React framework with server/client components
- **React 19** - UI library
- **TypeScript 5** - Type-safe JavaScript
- **Node.js 20+** - Runtime environment

## Backend & Database

- **Supabase** - Backend-as-a-Service
  - Authentication (cookie-based via @supabase/ssr)
  - PostgreSQL database
  - Real-time subscriptions
- **Server Actions** - Next.js server-side mutations
- **Zod** - Runtime validation and type safety

## Styling & UI

- **Tailwind CSS 3** - Utility-first CSS framework
- **shadcn/ui** - Radix UI-based component library
- **Framer Motion** - Animation library
- **class-variance-authority** - Component variant management
- **Lucide React** - Icon library

## Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## Deployment

- **Vercel** - Hosting platform
- **Google Analytics** - Analytics tracking

## Common Commands

```bash
# Development
bun dev              # Start dev server (localhost:3000)

# Production
bun build            # Build for production
bun start            # Start production server

# Code Quality
bun lint             # Run ESLint

# Package Management
bun install          # Install dependencies
bun add <package>    # Add new dependency
```

## Environment Variables

Required in `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` - Supabase publishable/anon key
