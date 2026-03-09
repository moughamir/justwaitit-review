'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { Section, SectionContainer } from '@/components/ui/section';
import { GradientText, SectionHeader } from '@/components/ui/section-header';
import { fadeUp } from '@/lib/motion';

const paragraphs = [
  {
    text: (
      <>
        Fashion has always been a form of artistic expression. Technology should
        not replace creativity — it should <GradientText>empower</GradientText>{' '}
        it.
      </>
    ),
  },
  {
    text: (
      <>
        Anaqio was built with a simple belief: AI should{' '}
        <GradientText>optimize</GradientText> the operational side of fashion
        production so designers and brands can focus on creativity and
        storytelling.
      </>
    ),
  },
  {
    text: 'We are not replacing fashion art. We are building the infrastructure that allows it to scale.',
  },
];

export function PhilosophySection() {
  const reduced = useReducedMotion();

  return (
    <Section id="philosophy" className="text-secondary-surface">
      <SectionContainer>
        <SectionHeader eyebrow="Our Philosophy" className="text-neutral-950">
          AI Should <GradientText>Elevate</GradientText> Fashion Creativity
        </SectionHeader>

        <div className="mt-8 max-w-3xl space-y-6">
          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              {...fadeUp(reduced, i * 0.12)}
              className="border-l-2 border-aq-blue/20 pl-5 text-justify text-base leading-relaxed text-muted-foreground transition-colors duration-300 hover:border-aq-blue/40"
            >
              {p.text}
            </motion.p>
          ))}
        </div>
      </SectionContainer>
    </Section>
  );
}
