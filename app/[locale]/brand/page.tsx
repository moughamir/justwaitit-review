import { BrandIdentityContent } from './brand-content';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Brand Identity Guidelines — Anaqio',
  description:
    'Official Brand Identity Guidelines for Anaqio — logos, typography, colors, and usage. Publicly available brand assets.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function BrandIdentityPage() {
  return <BrandIdentityContent />;
}
