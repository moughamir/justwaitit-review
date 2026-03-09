'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Rocket, RefreshCw, Globe } from 'lucide-react';

import { Section, SectionContainer } from '@/components/ui/section';
import { GradientText, SectionHeader } from '@/components/ui/section-header';
import { fadeUp, fadeIn, slideInLeft } from '@/lib/motion';

const visionPoints = [
  { text: 'Collections launch faster.', icon: Rocket },
  { text: 'Content cycles move quicker.', icon: RefreshCw },
  { text: 'Brands reach global audiences instantly.', icon: Globe },
];

export function VisionSection() {
  const reduced = useReducedMotion();

  return (
    <Section id="vision" className="bg-background">
      <SectionContainer>
        <SectionHeader eyebrow="Our Vision">
          The Future of <GradientText>Fashion Production</GradientText>
        </SectionHeader>

        <div className="mt-8 max-w-3xl">
          <motion.p
            {...fadeUp(reduced)}
            className="text-lg leading-relaxed text-muted-foreground"
          >
            The fashion industry is entering a new era where visual production
            must keep pace with digital commerce.
          </motion.p>

          <div className="mt-6 space-y-3">
            {visionPoints.map((point, i) => {
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
            Anaqio&apos;s vision is to become the visual infrastructure layer of
            the global fashion industry, transforming visual production from a
            bottleneck into a growth engine.
          </motion.p>
        </div>
      </SectionContainer>
    </Section>
  );
}
