import Link from 'next/link';

import type { Metadata } from 'next';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'https://anaqio.com';

export const metadata: Metadata = {
  title: 'Contact Anaqio',
  description:
    'Get in touch with Anaqio — AI Visual Studio for Fashion Commerce. Partnerships, support, and general inquiries.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Anaqio',
    description:
      'Reach Anaqio for partnerships, support, and general inquiries.',
    url: `${defaultUrl}/contact`,
    siteName: 'Anaqio',
    type: 'website',
    images: [
      { url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Anaqio' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Anaqio',
    description:
      'Get in touch with Anaqio — AI Visual Studio for Fashion Commerce.',
    images: ['/twitter-image.png'],
  },
};

export default function ContactPage() {
  const contactLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Anaqio',
    url: `${defaultUrl}/contact`,
    mainEntity: { '@type': 'Organization', name: 'Anaqio', url: defaultUrl },
    potentialAction: {
      '@type': 'ContactAction',
      target: `${defaultUrl}/contact`,
    },
  };

  return (
    <main
      id="main-content"
      className="relative mx-auto max-w-3xl px-4 py-16 text-foreground"
    >
      <script
        id="contact-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactLd) }}
      />

      {/* Microdata duplication for broader parsing */}
      <div
        className="sr-only"
        aria-hidden
        itemScope
        itemType="https://schema.org/ContactPage"
      >
        <meta itemProp="name" content="Contact Anaqio" />
        <link itemProp="url" href={`${defaultUrl}/contact`} />
      </div>

      <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
        Contact Anaqio
      </h1>
      <p className="mt-3 max-w-prose text-muted-foreground">
        For partnerships, support, and general inquiries, use this contact page.
        For product access updates, consider joining the{' '}
        <Link href="/early-access" className="underline underline-offset-4">
          early access waitlist
        </Link>
        .
      </p>

      <section className="mt-10 rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-xl font-semibold">Contact</h2>
        <ul className="mt-4 space-y-2 text-sm">
          <li>
            Website:{' '}
            <Link href="/" className="underline">
              anaqio.com
            </Link>
          </li>
          <li>
            Social:{' '}
            <a
              href="https://twitter.com/anaqio"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Twitter
            </a>{' '}
            ·{' '}
            <a
              href="https://www.linkedin.com/company/anaqio"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              LinkedIn
            </a>
          </li>
        </ul>

        {/* Placeholder form (wire backend when ready) */}
        <form className="mt-6 grid grid-cols-1 gap-4" aria-disabled>
          <label className="grid gap-2">
            <span className="text-sm">Name</span>
            <input
              type="text"
              className="rounded-md border border-border bg-background px-3 py-2"
              placeholder="Your name"
              disabled
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm">Email</span>
            <input
              type="email"
              className="rounded-md border border-border bg-background px-3 py-2"
              placeholder="you@example.com"
              disabled
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm">Message</span>
            <textarea
              className="min-h-32 rounded-md border border-border bg-background px-3 py-2"
              placeholder="How can we help?"
              disabled
            />
          </label>
          <button
            type="button"
            className="cursor-not-allowed rounded-md bg-aq-blue/30 px-4 py-2 text-white"
            disabled
          >
            Send (coming soon)
          </button>
          <p className="text-xs text-muted-foreground">
            While we finalize contact handling, reach us via social links above.
          </p>
        </form>
      </section>
    </main>
  );
}
