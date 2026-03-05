import { BrandIdentityContent } from './brand-content';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Brand Identity Guidelines — Anaqio',
  description:
    'Official Brand Identity Guidelines for Anaqio. Confidential and proprietary assets for the Anaqio virtual studio.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function BrandIdentityPage() {
  return <BrandIdentityContent />;
}
