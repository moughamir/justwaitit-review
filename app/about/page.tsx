import AboutContent from './about-content';

import type { Metadata } from 'next';

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'https://anaqio.com';
};

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'About Anaqio',
  description:
    'Anaqio is an AI-powered visual studio for fashion commerce, built in Casablanca by designers and engineers passionate about elevating the Moroccan fashion industry.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Anaqio',
    description:
      'Meet the founding team behind Anaqio — AI visual studio for fashion commerce, built in Morocco.',
    url: '/about',
    siteName: 'Anaqio',
    type: 'website',
    images: [
      { url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Anaqio' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Anaqio',
    description:
      'Meet the founding team behind Anaqio — AI visual studio for fashion commerce, built in Morocco.',
    images: ['/twitter-image.png'],
  },
};

const founders = [{ name: 'Amal AIT OUKHARAZ' }, { name: 'Mohamed MOUGHAMIR' }];

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Anaqio',
    url: `${baseUrl}/about`,
    description:
      'Anaqio is an AI-powered visual studio for fashion commerce, built in Casablanca.',
    mainEntity: {
      '@type': 'Organization',
      name: 'Anaqio',
      url: baseUrl,
      foundingDate: '2026-02',
      foundingLocation: { '@type': 'Place', name: 'Casablanca, Morocco' },
      founders: founders.map((f) => ({ '@type': 'Person', name: f.name })),
    },
  };

  return (
    <main id="main-content" className="relative text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutContent />
    </main>
  );
}
