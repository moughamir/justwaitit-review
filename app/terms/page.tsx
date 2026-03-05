import Link from 'next/link';

import type { Metadata } from 'next';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

export const metadata: Metadata = {
  title: 'Terms of Service — Anaqio',
  description:
    'Terms of Service for Anaqio, a virtual studio for fashion commerce.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background font-body text-foreground selection:bg-aq-blue/20">
      <Header />

      <main className="noise-overlay relative px-6 pb-24 pt-32">
        <div className="mx-auto max-w-3xl">
          <header className="mb-16 border-b border-border/50 pb-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-8 bg-aq-blue" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-aq-blue">
                Legal Framework
              </span>
            </div>
            <h1 className="mb-6 font-display text-5xl font-bold tracking-tight sm:text-6xl">
              Terms of Service
            </h1>
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <span>Effective: Feb 21, 2026</span>
              <span>Version 1.0</span>
            </div>
          </header>

          <div className="mb-12 rounded-r-xl border-l-2 border-aq-blue bg-secondary/30 p-6">
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong className="text-foreground">
                Moroccan Law Compliance.
              </strong>{' '}
              These Terms of Service are governed by and construed in accordance
              with Moroccan law, including{' '}
              <strong className="text-aq-blue">Law No. 53-05</strong> on
              Electronic Exchange of Legal Data,{' '}
              <strong className="text-aq-blue">Law No. 31-08</strong> on
              Consumer Protection Measures, and the{' '}
              <strong className="text-foreground">
                Dahir des Obligations et Contrats (DOC)
              </strong>
              .
            </p>
          </div>

          <nav className="mb-16 rounded-2xl border border-border/50 bg-secondary/20 p-8">
            <h2 className="mb-6 text-sm font-bold uppercase tracking-widest text-foreground">
              Table of Contents
            </h2>
            <ol className="grid gap-3 text-sm">
              <li>
                <a
                  href="#acceptance"
                  className="text-muted-foreground transition-colors hover:text-aq-blue"
                >
                  1. Acceptance of Terms
                </a>
              </li>
              <li>
                <a
                  href="#definitions"
                  className="text-muted-foreground transition-colors hover:text-aq-blue"
                >
                  2. Definitions
                </a>
              </li>
              <li>
                <a
                  href="#service"
                  className="text-muted-foreground transition-colors hover:text-aq-blue"
                >
                  3. Description of Service
                </a>
              </li>
              <li>
                <a
                  href="#waitlist"
                  className="text-muted-foreground transition-colors hover:text-aq-blue"
                >
                  4. Waitlist & Pre-Launch
                </a>
              </li>
              <li>
                <a
                  href="#account"
                  className="text-muted-foreground transition-colors hover:text-aq-blue"
                >
                  5. Account Registration & Security
                </a>
              </li>
              <li>
                <a
                  href="#subscription"
                  className="text-muted-foreground transition-colors hover:text-aq-blue"
                >
                  6. Subscription & Billing
                </a>
              </li>
              <li>
                <a
                  href="#ip"
                  className="text-muted-foreground transition-colors hover:text-aq-blue"
                >
                  7. Intellectual Property
                </a>
              </li>
              <li>
                <a
                  href="#content"
                  className="text-muted-foreground transition-colors hover:text-aq-blue"
                >
                  8. User Content & AI Outputs
                </a>
              </li>
              <li>
                <a
                  href="#prohibited"
                  className="text-muted-foreground transition-colors hover:text-aq-blue"
                >
                  9. Prohibited Uses
                </a>
              </li>
              <li>
                <a
                  href="#warranties"
                  className="text-muted-foreground transition-colors hover:text-aq-blue"
                >
                  10. Disclaimers & Warranties
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-muted-foreground transition-colors hover:text-aq-blue"
                >
                  15. Contact
                </a>
              </li>
            </ol>
          </nav>

          <article className="prose prose-invert prose-aq max-w-none space-y-16">
            <section id="acceptance">
              <h2 className="mb-6 font-display text-3xl font-bold tracking-tight">
                1. Acceptance of Terms
              </h2>
              <p className="mb-4 leading-relaxed text-muted-foreground">
                By accessing or using Anaqio&apos;s website, platform, mobile
                application, or any associated services (collectively, the{' '}
                <strong className="text-foreground">&quot;Service&quot;</strong>
                ), you confirm that you have read, understood, and agree to be
                bound by these Terms of Service (
                <strong className="text-foreground">&quot;Terms&quot;</strong>)
                and our{' '}
                <Link href="/privacy" className="text-aq-blue hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
              <p className="leading-relaxed text-muted-foreground">
                You must be at least{' '}
                <strong className="text-foreground">18 years of age</strong> to
                use Anaqio. By using the Service, you represent that you meet
                this minimum age requirement.
              </p>
            </section>

            <section id="definitions">
              <h2 className="mb-6 border-t border-border/30 pt-16 font-display text-3xl font-bold tracking-tight">
                2. Definitions
              </h2>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <span className="font-bold text-aq-blue">01</span>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">
                      &quot;Anaqio&quot;
                    </strong>{' '}
                    refers to Anaqio SARL, operator of the platform.
                  </p>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-aq-blue">02</span>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">
                      &quot;AI Outputs&quot;
                    </strong>{' '}
                    means images, lookbooks, or other content generated by our
                    models.
                  </p>
                </li>
              </ul>
            </section>

            <section id="ip">
              <h2 className="mb-6 border-t border-border/30 pt-16 font-display text-3xl font-bold tracking-tight">
                7. Intellectual Property
              </h2>
              <h3 className="mb-4 text-xl font-semibold italic text-aq-purple">
                7.1 Anaqio&apos;s IP
              </h3>
              <p className="mb-6 leading-relaxed text-muted-foreground">
                All rights, title, and interest in the Service — including but
                not limited to the software, AI models, algorithms, and design —
                are owned by or licensed to Anaqio.
              </p>
              <div className="rounded-xl border border-aq-blue/20 bg-aq-blue/5 p-6">
                <h3 className="mb-2 text-sm font-bold uppercase tracking-widest text-aq-blue">
                  Commercial Rights
                </h3>
                <p className="text-sm text-muted-foreground">
                  You may use AI Outputs for commercial purposes consistent with
                  your subscription plan. Anaqio does not claim ownership over
                  AI Outputs generated from your unique inputs.
                </p>
              </div>
            </section>

            <section id="contact">
              <h2 className="mb-6 border-t border-border/30 pt-16 font-display text-3xl font-bold tracking-tight">
                15. Contact
              </h2>
              <div className="rounded-2xl border border-border/50 bg-secondary/50 p-8">
                <h3 className="mb-4 font-display text-xl font-bold">
                  Anaqio — Legal Department
                </h3>
                <p className="mb-2 text-muted-foreground">
                  Email:{' '}
                  <a
                    href="mailto:legal@anaqio.com"
                    className="text-aq-blue hover:underline"
                  >
                    legal@anaqio.com
                  </a>
                </p>
                <p className="mb-4 text-muted-foreground">
                  Address: Casablanca, Morocco
                </p>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Response time: within 15 business days
                </p>
              </div>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
