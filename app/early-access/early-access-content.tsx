'use client';

import Link from 'next/link';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { WaitlistForm } from '@/components/sections/waitlist-form';

export function EarlyAccessContent() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="noise-overlay">
        {/* HERO */}
        <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-20">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-aq-blue" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-aq-blue">
                  Early Access · 2026
                </span>
              </div>

              <h1 className="font-display text-6xl font-bold leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
                Fashion&apos;s <br />
                <span className="text-brand-gradient">Virtual Studio</span>{' '}
                <br />
                <span className="font-normal italic">powered by AI.</span>
              </h1>

              <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
                Anaqio provides a professional AI-driven workspace to create,
                stage, and sell fashion — without traditional production
                overhead.
              </p>

              <div className="relative max-w-md">
                <WaitlistForm source="early-access-hero" variant="simple" />
                <p className="mt-4 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  By joining you agree to our{' '}
                  <Link href="/privacy" className="text-foreground underline">
                    Privacy
                  </Link>{' '}
                  &{' '}
                  <Link href="/terms" className="text-foreground underline">
                    Terms
                  </Link>
                </p>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="group relative aspect-[4/5] overflow-hidden rounded-[3rem] border border-white/5 bg-secondary/20 shadow-2xl">
                <div className="bg-brand-gradient absolute inset-0 opacity-10 transition-opacity duration-700 group-hover:opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-glow flex h-32 w-32 items-center justify-center rounded-full border border-aq-blue/20">
                    <div className="flex h-24 w-24 animate-pulse items-center justify-center rounded-full border border-aq-purple/20 text-center font-display text-[10px] font-bold uppercase tracking-widest text-aq-blue">
                      Studio
                      <br />
                      Layer
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-12 left-12 space-y-2">
                  <div className="h-px w-12 bg-white/20" />
                  <p className="text-xs font-bold uppercase tracking-[0.4em] text-white/40">
                    Visual Engine v1.0
                  </p>
                </div>
              </div>
              <div className="animate-float absolute -right-6 -top-6 flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-aq-ink shadow-xl">
                <span className="font-display text-xs font-bold tracking-tighter text-aq-blue">
                  AI-D
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="border-y border-border/50 py-24">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-12 px-6 lg:grid-cols-4">
            {[
              ['10×', 'Faster Content Creation'],
              ['90%', 'Lower Production Cost'],
              ['∞', 'Creative Freedom'],
              ['01', 'Unified Studio Platform'],
            ].map(([num, label]) => (
              <div key={label} className="space-y-2">
                <div className="font-display text-5xl font-bold tracking-tighter text-foreground">
                  {num}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-aq-blue">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-32">
          <div className="relative mx-auto max-w-5xl space-y-12 overflow-hidden rounded-[3rem] border border-white/5 bg-aq-ink p-12 text-center shadow-2xl lg:p-24">
            <div className="bg-brand-gradient pointer-events-none absolute inset-0 opacity-5" />
            <h2 className="relative z-10 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Be first to enter <br />
              the <span className="text-brand-gradient">future of fashion</span>
              .
            </h2>

            <div className="relative z-10 mx-auto max-w-md space-y-6">
              <WaitlistForm
                source="early-access-cta"
                variant="simple"
                className="flex-col sm:flex-row"
              />
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Limited slots available for v1.0
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
