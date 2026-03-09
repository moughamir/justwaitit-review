'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { FeatureCard } from '@/components/ui/feature-card';
import { Section, SectionContainer } from '@/components/ui/section';
import { GradientText, SectionHeader } from '@/components/ui/section-header';
import { WhyAnaqioSectionText } from '@/lib/content/why-anaqio';
import { fadeIn } from '@/lib/motion';

export function WhyAnaqioSection() {
  const reduced = useReducedMotion();
  const { eyebrow, headline, footer, points } = WhyAnaqioSectionText;

  return (
    <Section id="why-anaqio" className="bg-background">
      <SectionContainer>
        <SectionHeader eyebrow={eyebrow}>
          {headline.pre} <GradientText>{headline.gradient}</GradientText>{' '}
          {headline.post}
        </SectionHeader>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {points.map((p, i) => (
            <FeatureCard
              key={p.title}
              icon={p.icon}
              title={p.title}
              body={p.body}
              index={i}
            />
          ))}
        </div>

        <motion.p
          {...fadeIn(reduced, 0.5)}
          className="mt-8 text-sm text-muted-foreground"
        >
          {footer}
        </motion.p>
      </SectionContainer>
    </Section>
  );
}
