'use client';

import { useReducedMotion } from 'framer-motion';

import { StepAtom } from './atoms/step-atom';

import { useDeviceTier } from '@/hooks/use-device-tier';
import { HowItWorksSectionText } from '@/lib/content/how-it-works';

export function HowItWorksSection() {
  const { eyebrow, headline, steps } = HowItWorksSectionText;
  const reduced = useReducedMotion();
  const tier = useDeviceTier();
  const animated = !reduced && tier !== 'low';

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="relative flex flex-col justify-center px-4 pb-16 pt-32 sm:px-12 lg:px-24 lg:pt-48"
    >
      {/* Semantic Headings */}
      <h2 id="how-it-works-heading" className="sr-only">
        {eyebrow}: {headline.pre} {headline.gradient}
      </h2>

      <div className="mx-auto w-full max-w-7xl">
        <p
          data-atom
          className="mb-6 font-label text-[0.65rem] uppercase tracking-label text-muted-foreground"
        >
          {eyebrow}
        </p>

        <p
          data-atom
          aria-hidden="true"
          className="mb-20 max-w-2xl font-display text-[clamp(2.5rem,5vw,5rem)] font-light leading-tight"
        >
          {headline.pre}{' '}
          <em className="text-brand-gradient not-italic">
            {headline.gradient}
          </em>{' '}
          {headline.post}
        </p>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((s, i) => (
            <StepAtom key={s.num} step={s} index={i} animated={animated} />
          ))}
        </div>
      </div>
    </section>
  );
}
