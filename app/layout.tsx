import type { Metadata, Viewport } from 'next';

import { AnaqioAnalytica } from '@/components/brand/Analytica';
import { GrainOverlay } from '@/components/ui/GrainOverlay';
import { NavigationProgress } from '@/components/ui/NavigationProgress';
import './globals.css';
import {
  appMeta,
  defaultUrl,
  appViewport,
  orgLd,
  softwareLd,
  webpageLd,
  websiteLd,
  appFonts,
  appConstants,
  appFounders,
} from '@/lib/app';

export const metadata: Metadata = { ...appMeta };
export const viewport: Viewport = appViewport;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* PWA Meta Tags */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0F172A" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="ANAQIO" />
        <link rel="apple-touch-icon" href="/icon-192x192.svg" />
        {/* Structured Data */}
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
        className={`${appFonts.cormorant.variable} ${appFonts.dmSans.variable} ${appFonts.instrumentSerif.variable} relative antialiased`}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:shadow-lg focus:ring-2 focus:ring-ring"
        >
          Skip to main content
        </a>

        <div
          className="sr-only"
          aria-hidden
          itemScope
          itemType="https://schema.org/Organization"
        >
          <meta itemProp="name" content={appConstants.name} />
          <meta itemProp="url" content={defaultUrl} />
          <meta itemProp="foundingDate" content={appConstants.foundingDate} />
          {appFounders.map((founder, i) => (
            <div
              key={i}
              itemProp="founder"
              itemScope
              itemType="https://schema.org/Person"
            >
              <meta itemProp="name" content={founder.name} />
              <meta itemProp="sameAs" content={founder.linkedin} />
            </div>
          ))}
          <div
            itemProp="contactPoint"
            itemScope
            itemType="https://schema.org/ContactPoint"
          >
            <meta itemProp="contactType" content="customer support" />
            <link itemProp="url" href={`${defaultUrl}/contact`} />
          </div>
        </div>

        <NavigationProgress />
        {children}
        <GrainOverlay />
        <Analytics />
      </body>
      <AnaqioAnalytica />
    </html>
  );
}
