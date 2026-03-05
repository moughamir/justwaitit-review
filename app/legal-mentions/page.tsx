import type { Metadata } from 'next';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

export const metadata: Metadata = {
  title: 'Legal Mentions — Anaqio',
  description:
    'Legal Mentions for Anaqio, a virtual studio for fashion commerce.',
};

export default function LegalMentionsPage() {
  return (
    <div className="min-h-screen bg-background font-body text-foreground selection:bg-aq-blue/20">
      <Header />

      <main className="noise-overlay relative px-6 pb-24 pt-32">
        <div className="mx-auto max-w-3xl">
          <header className="mb-16 border-b border-border/50 pb-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-8 bg-aq-blue" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-aq-blue">
                Corporate Identity
              </span>
            </div>
            <h1 className="mb-4 font-display text-5xl font-bold tracking-tight sm:text-6xl">
              Legal Mentions
            </h1>
            <p className="mb-6 font-display text-xl italic text-muted-foreground">
              Mentions Légales
            </p>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Last Updated: Feb 21, 2026
            </div>
          </header>

          <div className="mb-12 rounded-r-xl border-l-2 border-aq-blue bg-secondary/30 p-6">
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong className="font-bold text-foreground">
                Mandatory Disclosure.
              </strong>{' '}
              In accordance with{' '}
              <strong className="text-aq-blue">Law No. 53-05</strong> on the
              Electronic Exchange of Legal Data and applicable Moroccan
              commercial legislation, the following information is published for
              all users of this platform.
            </p>
          </div>

          <article className="space-y-12">
            <section className="space-y-6 rounded-[2rem] border border-border/50 bg-secondary/20 p-8 shadow-sm">
              <h2 className="border-b border-border/30 pb-4 font-display text-2xl font-bold tracking-tight text-foreground">
                1. Publisher / Éditeur
              </h2>
              <div className="grid gap-4 text-sm">
                {[
                  ['Company', 'Anaqio Studio'],
                  ['Structure', 'SARL au capital de 10,000 MAD'],
                  ['Headquarters', 'Casablanca, Morocco'],
                  ['Registration', 'RC Casablanca n° PENDING'],
                  ['Tax ID / IF', 'n° PENDING'],
                  ['ICE', 'PENDING'],
                  ['CNSS', 'PENDING'],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-1 gap-2 sm:grid-cols-[160px_1fr] sm:gap-8"
                  >
                    <span className="pt-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      {label}
                    </span>
                    <span className="font-medium text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6 rounded-[2rem] border border-border/50 bg-secondary/20 p-8 shadow-sm">
              <h2 className="border-b border-border/30 pb-4 font-display text-2xl font-bold tracking-tight text-foreground">
                2. Responsibility
              </h2>
              <div className="grid gap-4 text-sm">
                {[
                  ['Director', 'Amal Ait Oukharaz'],
                  ['Contact', 'legal@anaqio.com'],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-1 gap-2 sm:grid-cols-[160px_1fr] sm:gap-8"
                  >
                    <span className="pt-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      {label}
                    </span>
                    <span
                      className={
                        label === 'Contact'
                          ? 'font-bold text-aq-blue'
                          : 'font-semibold text-foreground'
                      }
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6 rounded-[2rem] border border-border/50 bg-secondary/20 p-8 shadow-sm">
              <h2 className="border-b border-border/30 pb-4 font-display text-2xl font-bold tracking-tight text-foreground">
                3. Hosting / Hébergement
              </h2>
              <div className="grid gap-4 text-sm">
                {[
                  ['Provider', 'Vercel Inc.'],
                  ['Address', '440 N Barranca Ave #4133, Covina, CA 91723'],
                  ['Website', 'www.vercel.com'],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-1 gap-2 sm:grid-cols-[160px_1fr] sm:gap-8"
                  >
                    <span className="pt-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      {label}
                    </span>
                    <span className="text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6 p-8">
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground">
                4. Intellectual Property
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                The entire content of this site — including but not limited to
                graphics, images, texts, videos, and AI models — is the
                exclusive property of
                <strong className="text-foreground"> Anaqio Studio</strong>. Any
                reproduction, distribution, or publication, even partial, is
                strictly prohibited without express written consent.
              </p>
              <div className="rounded-2xl border border-aq-blue/20 bg-aq-blue/5 p-6">
                <p className="text-xs font-medium italic leading-relaxed text-muted-foreground">
                  For legal inquiries or notification of illicit content, please
                  contact the legal department at legal@anaqio.com.
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
