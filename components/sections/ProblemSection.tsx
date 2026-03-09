'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { Section, SectionContainer } from '@/components/ui/section';
import { GradientText, SectionHeader } from '@/components/ui/section-header';
import { ProblemSectionText } from '@/lib/content/problem';
import { fadeUp, fadeUpCard } from '@/lib/motion';

export function ProblemSection() {
  const reduced = useReducedMotion();
  const { eyebrow, headline, intro, painPoints } = ProblemSectionText;

  return (
    <Section id="problem">
      <SectionContainer>
        <SectionHeader eyebrow={eyebrow} className="text-center">
          {headline.pre}
          <br /> Is <GradientText>{headline.gradient}</GradientText>.
        </SectionHeader>

        <div className="mt-8 grid gap-8 text-muted-foreground sm:grid-cols-2">
          <motion.div {...fadeUp(reduced)} className="space-y-4">
            <p className="text-lg leading-relaxed">{intro.a}</p>
            <div className="grid grid-cols-2 gap-3">
              {painPoints.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.text}
                    {...fadeUpCard(reduced, i)}
                    className="flex items-center gap-3 rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-3 backdrop-blur-sm transition-all duration-300 hover:border-aq-blue/20 hover:bg-white/[0.07]"
                  >
                    <Icon
                      className="h-4 w-4 flex-shrink-0 text-aq-blue"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium text-foreground">
                      {item.text}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div {...fadeUp(reduced, 0.15)} className="space-y-4">
            <p className="text-lg leading-relaxed">{intro.b}</p>
            <p className="text-sm leading-7">{intro.detail}</p>
            <p className="border-l-2 border-aq-blue/25 pl-4 font-serif text-sm italic">
              {intro.quote}
            </p>
          </motion.div>
        </div>
      </SectionContainer>
    </Section>
  );
}
