'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { Section, SectionContainer } from '@/components/ui/section';
import { GradientText, SectionHeader } from '@/components/ui/section-header';
import { SolutionSectionText } from '@/lib/content/solution';
import { fadeUp } from '@/lib/motion';

const pipelineCardStyles = {
  default: 'border-border/80 bg-white/50 dark:border-white/10 dark:bg-card/40',
  purple: 'border-aq-purple/20 bg-aq-purple/5 dark:bg-aq-purple/10',
  amber:
    'border-amber-500/30 bg-amber-500/5 shadow-[0_0_30px_rgba(245,158,11,0.05)] dark:bg-amber-500/10 dark:shadow-[0_0_30px_rgba(245,158,11,0.1)]',
} as const;

const pipelineStageStyles = {
  default: 'text-muted-foreground',
  purple: 'text-aq-purple',
  amber: 'text-amber-600 dark:text-amber-500',
} as const;

const arrowColors = {
  purple: 'text-aq-purple',
  amber: 'text-amber-500',
} as const;

interface AnimatedArrowProps {
  color: keyof typeof arrowColors;
  delay?: number;
}

function AnimatedArrow({ color, delay = 0 }: AnimatedArrowProps) {
  const reduced = useReducedMotion();
  const transition = {
    duration: 1.5,
    repeat: Infinity,
    ease: 'easeInOut' as const,
    delay,
  };

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.3, delay: delay > 0 ? 0.5 : 0.2 }}
      className="flex items-center justify-center p-2"
    >
      <motion.div
        className="hidden md:block"
        animate={reduced ? undefined : { x: [0, 6, 0] }}
        transition={transition}
      >
        <ArrowRight className={`h-6 w-6 opacity-80 ${arrowColors[color]}`} />
      </motion.div>
      <motion.div
        className="md:hidden"
        animate={reduced ? undefined : { y: [0, 6, 0] }}
        transition={transition}
      >
        <ArrowRight
          className={`h-6 w-6 rotate-90 opacity-80 ${arrowColors[color]}`}
        />
      </motion.div>
    </motion.div>
  );
}

export function SolutionSection() {
  const reduced = useReducedMotion();
  const { eyebrow, headline, description, footer, pipeline } =
    SolutionSectionText;

  return (
    <Section id="solution">
      <SectionContainer>
        <SectionHeader eyebrow={eyebrow} className="text-center">
          {headline.pre} <GradientText>{headline.gradient}</GradientText>{' '}
          {headline.post}
        </SectionHeader>

        <motion.p
          {...fadeUp(reduced, 0.1)}
          className="mx-auto mt-8 max-w-3xl text-center text-lg leading-relaxed text-muted-foreground"
        >
          {description}
        </motion.p>

        <div className="mt-16 flex flex-col items-center justify-center gap-4 sm:mt-24 md:flex-row md:gap-8">
          {pipeline.map((step, i) => (
            <>
              <motion.div
                key={step.stage}
                initial={
                  reduced
                    ? false
                    : {
                        opacity: 0,
                        x: i === 0 ? -20 : i === 2 ? 20 : 0,
                        y: i === 1 ? 20 : 0,
                      }
                }
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`flex h-[140px] w-full flex-col items-center justify-center rounded-2xl border shadow-sm backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 md:w-[260px] ${pipelineCardStyles[step.color]}`}
              >
                <span
                  className={`mb-2 text-sm font-medium ${pipelineStageStyles[step.color]}`}
                >
                  {step.stage}
                </span>
                <span className="font-display text-2xl font-bold text-foreground">
                  {step.label}
                </span>
              </motion.div>
              {i < pipeline.length - 1 && (
                <AnimatedArrow
                  key={`arrow-${i}`}
                  color={i === 0 ? 'purple' : 'amber'}
                  delay={i === 1 ? 0.2 : 0}
                />
              )}
            </>
          ))}
        </div>

        <motion.p
          {...fadeUp(reduced, 0.8)}
          className="mt-16 text-center text-muted-foreground sm:mt-24 sm:text-lg"
        >
          {footer}
        </motion.p>
      </SectionContainer>
    </Section>
  );
}
