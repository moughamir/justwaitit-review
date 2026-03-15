import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import type { Metadata } from 'next';

import { ComingSoonPage } from '@/components/sections/ComingSoonPage';
import { PWAInstallPrompt } from '@/components/ui/PWAInstallPrompt';
import { isNewLandingPageActive } from '@/lib/landing-page-config';

/**
 * Home Page with Date-Based Routing
 *
 * Before March 20, 2026: Shows the Coming Soon page
 * After March 20, 2026: Redirects to the experiment page (which shows the new landing page)
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
      defaultValue: 'ANAQIO — AI Fashion Studio | Coming Soon',
    }),
    description: t('home.desc', {
      defaultValue:
        'ANAQIO is an AI-powered fashion studio for the Moroccan luxury market. Generate lookbooks, swap backgrounds, adjust lighting, and produce cinematic fashion videos. Launching 2026.',
    }),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Check if new landing page should be active
  const showNewLandingPage = isNewLandingPageActive();

  if (showNewLandingPage) {
    // Redirect to experiment page which now serves the new landing page
    redirect(`/${locale}/expirement`);
  }

  return (
    <>
      <ComingSoonPage />
      <PWAInstallPrompt />
    </>
  );
}
