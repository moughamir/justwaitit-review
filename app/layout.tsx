import { GoogleAnalytics } from '@next/third-parties/google';
import { Space_Grotesk, Inter, Instrument_Serif } from 'next/font/google';

import type { Metadata } from 'next';
import './globals.css';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'https://anaqio.com';

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: 'Anaqio — AI Visual Studio for Fashion Commerce',
    template: '%s | Anaqio',
  },
  description:
    "Generate studio-quality fashion imagery instantly with Anaqio's AI Visual Studio. Empowering fashion brands with cutting-edge digital tools for modern commerce.",
  keywords: [
    'AI fashion photography',
    'virtual studio',
    'fashion commerce',
    'AI imagery',
    'digital fashion tools',
    'fashion brand marketing',
    'automated studio shoots',
  ],
  authors: [{ name: 'Anaqio Team' }],
  creator: 'Anaqio',
  publisher: 'Anaqio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Anaqio — AI Visual Studio for Fashion Commerce',
    description:
      'Generate studio-quality fashion imagery instantly. Empowering fashion brands with cutting-edge AI tools for modern commerce.',
    url: defaultUrl,
    siteName: 'Anaqio',
    locale: 'en_US',
    alternateLocale: ['ar_MA'],
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Anaqio — AI Visual Studio for Fashion Commerce',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anaqio — AI Visual Studio for Fashion Commerce',
    description:
      'Generate studio-quality fashion imagery instantly. Join the waitlist for early access.',
    images: ['/twitter-image.png'],
    creator: '@anaqio',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Anaqio',
  },
};

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
  preload: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Anaqio',
    url: defaultUrl,
    logo: `${defaultUrl}/logo.svg`,
    description:
      'Anaqio is an AI-powered virtual studio empowering fashion brands with cutting-edge digital tools for modern commerce.',
    sameAs: [
      'https://twitter.com/anaqio',
      'https://www.linkedin.com/company/anaqio',
      'https://www.instagram.com/anaqio',
    ],
    legalName: 'Anaqio',
    founders: [
      { '@type': 'Person', name: 'Amal AIT OUKHARAZ' },
      { '@type': 'Person', name: 'Mohamed MOUGHAMIR' },
    ],
    foundingDate: '2026-02',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        url: `${defaultUrl}/contact`,
        availableLanguage: ['en'],
        areaServed: 'MA',
      },
    ],
  };

  const softwareLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Anaqio AI Visual Studio',
    operatingSystem: 'Web',
    applicationCategory: 'DesignApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'MAD',
    },
    author: {
      '@type': 'Organization',
      name: 'Anaqio',
      url: defaultUrl,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '120',
    },
  };

  const websiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Anaqio',
    url: defaultUrl,
    inLanguage: 'en',
    publisher: { '@type': 'Organization', name: 'Anaqio' },
  };

  const webpageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Anaqio — AI Visual Studio for Fashion Commerce',
    url: defaultUrl,
    isPartOf: { '@type': 'WebSite', url: defaultUrl },
    about: { '@type': 'Organization', name: 'Anaqio' },
    description:
      "Generate studio-quality fashion imagery instantly with Anaqio's AI Visual Studio.",
    inLanguage: 'en',
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          id="org-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
        <script
          id="software-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }}
        />
        <script
          id="website-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        <script
          id="webpage-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageLd) }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${instrumentSerif.variable} antialiased`}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:shadow-lg focus:ring-2 focus:ring-ring"
        >
          Skip to main content
        </a>
        {/* Schema.org microdata (Organization) for additional enrichment */}
        <div
          className="sr-only"
          aria-hidden
          itemScope
          itemType="https://schema.org/Organization"
        >
          <meta itemProp="name" content="Anaqio" />
          <meta itemProp="url" content={defaultUrl} />
          <meta itemProp="foundingDate" content="2026-02" />
          <div
            itemProp="founder"
            itemScope
            itemType="https://schema.org/Person"
          >
            <meta itemProp="name" content="Amal AIT OUKHARAZ" />
          </div>
          <div
            itemProp="founder"
            itemScope
            itemType="https://schema.org/Person"
          >
            <meta itemProp="name" content="Mohamed MOUGHAMIR" />
          </div>
          <div
            itemProp="contactPoint"
            itemScope
            itemType="https://schema.org/ContactPoint"
          >
            <meta itemProp="contactType" content="customer support" />
            <link itemProp="url" href={`${defaultUrl}/contact`} />
          </div>
        </div>

        {children}
      </body>
      <GoogleAnalytics gaId="G-32QQVBGQN1" />
    </html>
  );
}
