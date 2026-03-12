'use client';

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Fragment, useRef } from 'react';

import { useDeviceTier } from '@/hooks/use-device-tier';
import { SolutionSectionText } from '@/lib/content/solution';
import { flipReveal, scatterIn } from '@/lib/motion';

export function SolutionSection() {
  const reduced = useReducedMotion();
  const tier = useDeviceTier();
  const animated = !reduced && tier !== 'low';
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const { eyebrow, headline, pipeline } = SolutionSectionText;

  const headerY = useTransform(scrollYProgress, [0, 0.3], ['60px', '0px']);
  const headerOp = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="solution"
      aria-labelledby="solution-heading"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center px-4 pb-24 pt-32 lg:pt-48"
    >
      <h2 id="solution-heading" className="sr-only">
        {eyebrow}: {headline.pre} {headline.gradient} {headline.post}
      </h2>

      {/* Eyebrow [ANCHORED] */}
      <motion.p
        data-atom
        style={animated ? { y: headerY, opacity: headerOp } : {}}
        className="mb-8 text-center font-label text-[0.65rem] uppercase tracking-label text-muted-foreground"
      >
        {eyebrow}
      </motion.p>

      {/* Headline [ANCHORED] */}
      <motion.div
        data-atom
        aria-hidden="true"
        style={animated ? { y: headerY, opacity: headerOp } : {}}
        className="mb-16 text-center font-display font-light leading-tight"
      >
        <span className="text-[clamp(2.5rem,5vw,6rem)]">
          {headline.pre}{' '}
          <em className="text-brand-gradient animate-gradient not-italic">
            {headline.gradient}
          </em>{' '}
          {headline.post}
        </span>
      </motion.div>

      {/* Stat contrast strip */}
      <div className="mb-24 flex w-full max-w-4xl flex-col items-center justify-center gap-12 sm:flex-row sm:gap-24">
        {/* Left: traditional */}
        <motion.div
          data-atom
          {...(animated ? scatterIn(reduced, -40, 0, 0) : {})}
          className="flex flex-col items-center text-center"
        >
          <span className="font-display text-[clamp(2rem,4vw,4.5rem)] text-muted-foreground/30 line-through">
            14 days
          </span>
          <span className="mt-2 font-label text-xs uppercase tracking-label text-muted-foreground/40">
            Traditional shoot
          </span>
        </motion.div>

        {/* Right: ANAQIO */}
        <motion.div
          data-atom
          {...(animated ? scatterIn(reduced, 40, 0, 0.1) : {})}
          className="flex flex-col items-center text-center"
        >
          <span className="font-display text-[clamp(2rem,4vw,4.5rem)] text-aq-blue">
            2 hours
          </span>
          <span className="mt-2 font-label text-xs uppercase tracking-label text-aq-blue/60">
            With ANAQIO
          </span>
        </motion.div>
      </div>

      {/* Pipeline atom clusters */}
      <div className="flex w-full max-w-6xl flex-col items-center justify-center gap-8 md:flex-row md:items-start md:gap-12">
        {pipeline.map((stage, i) => (
          <Fragment key={stage.label}>
            <motion.article
              data-atom
              aria-label={stage.label}
              {...(animated ? flipReveal(reduced, i) : {})}
              className="relative flex w-full max-w-[280px] flex-col gap-3 text-center md:text-left"
            >
              <span
                aria-hidden="true"
                className="font-display font-light text-aq-blue/20"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-[clamp(1.4rem,2.5vw,2.2rem)] font-light text-foreground/90">
                {stage.label}
              </h3>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">
                {stage.body}
              </p>
            </motion.article>

            {i < pipeline.length - 1 && (
              <motion.div
                data-atom
                data-decorative
                aria-hidden="true"
                animate={animated ? { x: [0, 8, 0] } : {}}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2,
                }}
                className="hidden pt-6 text-aq-blue/40 md:block"
              >
                <ArrowRight className="h-6 w-6" />
              </motion.div>
            )}
          </Fragment>
        ))}
      </div>

      {/* Background Pipeline Atmospheric Atom */}
      <span
        data-atom
        data-decorative
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[60%] z-0 -translate-x-1/2 -translate-y-1/2 select-none text-center font-display font-light text-foreground opacity-[0.02]"
        style={{ fontSize: 'clamp(10rem, 20vw, 24rem)' }}
      >
        FLOW
      </span>
    </section>
  );
}
