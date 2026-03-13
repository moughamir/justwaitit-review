'use client';

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { Camera, LayoutList, Share2, ShoppingBag } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

import { useDeviceTier } from '@/hooks/use-device-tier';
import { clipReveal } from '@/lib/motion';

export function ProblemSection() {
  const t = useTranslations('landing.problem');
  const reduced = useReducedMotion();
  const tier = useDeviceTier();
  const animated = !reduced && tier !== 'low';
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headlineY = useTransform(scrollYProgress, [0, 0.4], ['60px', '0px']);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);

  const PAIN_ICONS = [Camera, Share2, ShoppingBag, LayoutList];
  const painPoints = (t.raw('painPoints') as Array<{ text: string }>).map(
    (p, i) => ({
      text: p.text,
      icon: PAIN_ICONS[i],
    })
  );

  return (
    <section
      ref={sectionRef}
      id="problem"
      aria-labelledby="problem-heading"
      className="relative flex min-h-[100dvh] w-full flex-col justify-center overflow-hidden px-6 pb-24 pt-32 sm:px-12 md:px-[8.33%] lg:pt-48"
    >
      <h2 id="problem-heading" className="sr-only">
        {t('eyebrow')}: {t('visualHeadline.line1')} {t('visualHeadline.line2')}
      </h2>

      {/* Atmospheric "?" [PINNED, right-5% top-15%] */}
      <span
        data-atom
        data-decorative
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 top-[10%] z-0 select-none font-display font-light leading-none text-foreground opacity-[0.03] md:right-[5%] md:top-[15%]"
        style={{ fontSize: 'clamp(12rem, 30vw, 30rem)' }}
      >
        ?
      </span>

      <div className="relative z-10 flex w-full max-w-4xl flex-col gap-8 md:gap-12">
        {/* Eyebrow */}
        <p
          data-atom
          className="font-label text-[0.65rem] uppercase tracking-label text-muted-foreground"
        >
          {t('eyebrow')}
        </p>

        {/* Large statement */}
        <motion.div
          data-atom
          aria-hidden="true"
          style={
            animated
              ? {
                  y: headlineY,
                  opacity: headlineOpacity,
                  fontSize: 'clamp(2.8rem, 7vw, 7rem)',
                }
              : { fontSize: 'clamp(2.8rem, 7vw, 7rem)' }
          }
          className="max-w-[14ch] font-display font-light leading-[0.95] text-foreground"
        >
          {t('visualHeadline.line1')}
          <br />
          <em className="text-brand-gradient pt-2 not-italic">
            {t('visualHeadline.line2')}
          </em>
        </motion.div>

        {/* Accent line */}
        <div
          data-atom
          data-decorative
          aria-hidden="true"
          className="h-px w-1/3 bg-border/40 sm:w-1/4"
        />

        {/* Pain points */}
        <div className="mt-4 flex flex-col gap-8 sm:gap-12">
          {painPoints.map((point, i) => (
            <motion.div
              key={point.text}
              data-atom
              {...(animated ? clipReveal(reduced, i * 0.12) : {})}
              className="flex items-start gap-4 border-l border-aq-blue/30 pl-4 sm:max-w-[38ch]"
            >
              <point.icon
                className="mt-0.5 h-4 w-4 shrink-0 text-aq-blue"
                aria-hidden="true"
              />
              <span className="font-label text-xs uppercase tracking-label text-muted-foreground">
                {point.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
