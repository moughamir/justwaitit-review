'use client';

import { useReducedMotion } from 'framer-motion';

import { FeatureCardAtom } from '@/components/atoms/FeatureCardAtom';
import { useDeviceTier } from '@/hooks/use-device-tier';
import { FEATURES } from '@/lib/data/features-section';

export function FeaturesSection() {
  const reduced = useReducedMotion();
  const tier = useDeviceTier();
  const animated = !reduced && tier !== 'low';

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center px-4 pb-24 pt-32 lg:pt-48"
    >
      <h2 id="features-heading" className="sr-only">
        Our Features
      </h2>

      <div className="mb-16 text-center">
        <p className="mb-4 text-center font-label text-[0.65rem] uppercase tracking-label text-muted-foreground">
          Core Capabilities
        </p>
        <h3 className="text-center font-display text-[clamp(2.5rem,5vw,6rem)] font-light leading-tight">
          Everything you need to{' '}
          <em className="text-brand-gradient not-italic">transform</em> your
          production
        </h3>
      </div>

      <div className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, index) => (
          <FeatureCardAtom
            key={feature.title}
            feature={feature}
            index={animated ? index : 0}
          />
        ))}
      </div>
    </section>
  );
}
