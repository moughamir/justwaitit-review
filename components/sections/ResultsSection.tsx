'use client';

import { useReducedMotion } from 'framer-motion';

import { ResultCardAtom } from '@/components/atoms/ResultCardAtom';
import { useDeviceTier } from '@/hooks/use-device-tier';
import { RESULTS } from '@/lib/data/results-section';

export function ResultsSection() {
  const reduced = useReducedMotion();
  const tier = useDeviceTier();
  const animated = !reduced && tier !== 'low';

  return (
    <section
      id="results"
      aria-labelledby="results-heading"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center px-4 pb-24 pt-32 lg:pt-48"
    >
      <h2 id="results-heading" className="sr-only">
        Measurable Impact
      </h2>

      <div className="mb-16 text-center">
        <p className="mb-4 text-center font-label text-[0.65rem] uppercase tracking-label text-muted-foreground">
          Proven Results
        </p>
        <h3 className="text-center font-display text-[clamp(2.5rem,5vw,6rem)] font-light leading-tight">
          Numbers that speak for{' '}
          <em className="text-brand-gradient not-italic">themselves</em>
        </h3>
      </div>

      <div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        {RESULTS.map((result, index) => (
          <ResultCardAtom
            key={result.metric}
            result={result}
            index={animated ? index : 0}
          />
        ))}
      </div>
    </section>
  );
}
