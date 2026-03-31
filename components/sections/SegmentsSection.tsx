'use client';

import { useReducedMotion } from 'framer-motion';

import { SegmentCardAtom } from '@/components/atoms/SegmentCardAtom';
import { useDeviceTier } from '@/hooks/use-device-tier';
import { SEGMENTS } from '@/lib/data/segments-section';

export function SegmentsSection() {
  const reduced = useReducedMotion();
  const tier = useDeviceTier();
  const animated = !reduced && tier !== 'low';

  return (
    <section
      id="segments"
      aria-labelledby="segments-heading"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center px-4 pb-24 pt-32 lg:pt-48"
    >
      <h2 id="segments-heading" className="sr-only">
        Who It's For
      </h2>

      <div className="mb-16 text-center">
        <p className="mb-4 text-center font-label text-[0.65rem] uppercase tracking-label text-muted-foreground">
          Target Segments
        </p>
        <h3 className="text-center font-display text-[clamp(2.5rem,5vw,6rem)] font-light leading-tight">
          Built for{' '}
          <em className="text-brand-gradient not-italic">fashion creators</em>{' '}
          at any scale
        </h3>
      </div>

      <div className="w-full max-w-4xl space-y-4">
        {SEGMENTS.map((segment, index) => (
          <SegmentCardAtom
            key={segment.name}
            segment={segment}
            index={animated ? index : 0}
          />
        ))}
      </div>
    </section>
  );
}
