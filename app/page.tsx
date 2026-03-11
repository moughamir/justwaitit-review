import type { Metadata } from 'next';

import { ComingSoonPage } from '@/components/sections/ComingSoonPage';

export const metadata: Metadata = {
  title: 'ANAQIO — AI Fashion Studio | Coming Soon',
  description:
    'ANAQIO is an AI-powered fashion studio for the Moroccan luxury market. Generate lookbooks, swap backgrounds, adjust lighting, and produce cinematic fashion videos. Launching 2026.',
};

export default function HomePage() {
  return <ComingSoonPage />;
}
