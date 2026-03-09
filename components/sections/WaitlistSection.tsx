'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import { WaitlistSectionText } from '@/lib/content/waitlist';

const WaitlistForm = dynamic(
  () => import('./waitlist-form').then((mod) => mod.WaitlistForm),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-3">
        <div className="h-2 w-1/3 animate-pulse rounded bg-white/10" />
        <div className="h-14 w-full animate-pulse rounded-xl bg-white/10" />
        <div className="h-14 w-full animate-pulse rounded-xl bg-white/10" />
      </div>
    ),
  }
);

export function WaitlistSection() {
  const { headline, socialProof, formHeadline, formSubline, incentives } =
    WaitlistSectionText;

  return (
    <section
      id="waitlist"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 1200px' }}
    >
      <div className="animate-glow pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-full max-w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-aq-blue/10 blur-[160px]" />
      <div className="relative z-10 mx-auto w-full max-w-4xl duration-1000 animate-in fade-in slide-in-from-bottom-8 fill-mode-both">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-5">
          {/* Incentives */}
          <div className="space-y-8 text-center lg:col-span-2 lg:text-left">
            <div className="space-y-4">
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                {headline.pre} <br />
                <span className="text-brand-gradient">{headline.gradient}</span>
              </h2>
              <p className="mx-auto max-w-md font-body text-sm text-muted-foreground sm:text-base lg:mx-0">
                {socialProof}
              </p>
            </div>

            <div className="mx-auto max-w-sm space-y-6 text-left lg:mx-0">
              {incentives.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-aq-blue/20">
                    <div className="h-2 w-2 rounded-full bg-aq-blue" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground sm:text-base">
                      {item.title}
                    </h4>
                    <p className="text-xs text-muted-foreground sm:text-sm">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <div className="glass-strong noise-overlay mx-auto w-full max-w-md space-y-8 rounded-[2rem] border-border/40 p-6 text-left sm:p-10 lg:col-span-3 lg:max-w-none">
            <div className="relative z-10 space-y-2 text-center sm:text-left">
              <h3 className="font-display text-2xl font-bold tracking-tight">
                {formHeadline}
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                {formSubline}
              </p>
            </div>

            <WaitlistForm source="home" />

            <p className="relative z-10 text-center font-body text-xs text-muted-foreground">
              By joining you agree to our{' '}
              <Link
                href="/terms"
                className="underline transition-colors hover:text-aq-blue"
              >
                Terms
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy"
                className="underline transition-colors hover:text-aq-blue"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
