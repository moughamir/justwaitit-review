import { getTranslations } from 'next-intl/server';

import type { Metadata } from 'next';

// The landing page switches layout based on the current date, so it must be
// rendered dynamically per request rather than statically at build time.
export const dynamic = 'force-dynamic';

import { Header } from '@/components/layout/Header';
import { NewLandingPage } from '@/components/sections/NewLandingPage';
import { ScrollTriggered } from '@/components/sections/ScrollTriggered';
import { isNewLandingPageActive } from '@/lib/landing-page-config';

/**
 * Home Page
 * Now defaults to the new landing page or the original experiment page.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: t('home.title', {
      defaultValue: 'ANAQIO — AI Fashion Studio | Visual Infrastructure',
    }),
    description: t('home.desc', {
      defaultValue:
        'ANAQIO is an AI-powered fashion studio for the Moroccan luxury market. Generate lookbooks, swap backgrounds, adjust lighting, and produce cinematic fashion videos.',
    }),
  };
}

export default async function HomePage() {
  // Always show the new landing page content if active,
  // otherwise fallback to the original ScrollTriggered layout.
  const showNewLandingPage = isNewLandingPageActive();

  return (
    <main id="main-content" className="relative">
      <Header />
      {showNewLandingPage ? <NewLandingPage /> : <ScrollTriggered />}
    </main>
  );
}
