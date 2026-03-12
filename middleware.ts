import createIntlMiddleware from 'next-intl/middleware';

import { routing } from '@/i18n/routing';

// Locale routing only — Supabase session is handled by the server-side proxy
export default createIntlMiddleware(routing);

export const config = {
  matcher: [
    // Match all paths except static assets and Next.js internals
    '/((?!_next/static|_next/image|favicon.ico|icon.*|apple-icon.*|manifest.*|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|ttf|eot|otf|css|js|map)$).*)',
  ],
};
