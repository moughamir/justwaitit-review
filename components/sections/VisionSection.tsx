'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { Section, SectionContainer } from '@/components/ui/section';
import { GradientText, SectionHeader } from '@/components/ui/section-header';
import { VisionSectionText } from '@/lib/content/vision';
import { fadeIn, fadeUp, slideInLeft } from '@/lib/motion';

export function VisionSection() {
  const reduced = useReducedMotion();
  const { eyebrow, headline, intro, quote, points } = VisionSectionText;

  return (
    <Section id="vision" className="bg-background">
      <SectionContainer>
        <SectionHeader eyebrow={eyebrow}>
          {headline.pre} <GradientText>{headline.gradient}</GradientText>
        </SectionHeader>

        <div className="mt-8 max-w-3xl">
          <motion.p
            {...fadeUp(reduced)}
            className="text-lg leading-relaxed text-muted-foreground"
          >
            {intro}
          </motion.p>

          <div className="mt-6 space-y-3">
            {points.map((point, i) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={point.text}
                  {...slideInLeft(reduced, i)}
                  className="flex items-center gap-4 rounded-lg border border-white/[0.08] bg-white/[0.04] px-5 py-3.5 backdrop-blur-sm transition-all duration-300 hover:border-aq-blue/20 hover:bg-white/[0.07]"
                >
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-aq-blue/10 text-aq-blue">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {point.text}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <motion.p
            {...fadeIn(reduced, 0.3)}
            className="mt-6 border-l-2 border-aq-blue/30 pl-4 font-serif text-base italic leading-relaxed text-muted-foreground"
          >
            {quote}
          </motion.p>
        </div>
      </SectionContainer>
    </Section>
  );
}
