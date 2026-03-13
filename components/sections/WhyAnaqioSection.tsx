'use client';

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { Move3D, Ruler, ShieldCheck, Sun, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

import { useDeviceTier } from '@/hooks/use-device-tier';
import { ease } from '@/lib/motion';

export function WhyAnaqioSection() {
  const t = useTranslations('landing.whyAnaqio');
  const POINT_ICONS = [Ruler, Move3D, Sun, Zap, ShieldCheck];
  const points = (t.raw('points') as Array<{title: string; body: string}>).map((p, i) => ({
    ...p,
    icon: POINT_ICONS[i],
  }));

  const sectionRef = useRef<HTMLElement>(null);

  const reduced = useReducedMotion();
  const tier = useDeviceTier();
  const animated = !reduced && tier !== 'low';

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const scrollX = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);

  // Randomish vertical offsets for the organic layout
  const verticalOffsets = ['0', '15%', '-10%', '20%', '-5%'];

  return (
    <section
      ref={sectionRef}
      id="why-anaqio"
      aria-labelledby="why-heading"
      className="relative h-[300vh] bg-background"
    >
      <h2 id="why-heading" className="sr-only">
        {t('eyebrow')}: {t('headline.pre')} {t('headline.gradient')}
      </h2>

      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden px-4 pt-24 md:px-16 md:pt-32">
        {/* Background Atmospheric Atom */}
        <span
          data-atom
          data-decorative
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none font-display font-light text-foreground opacity-[0.025]"
          style={{ fontSize: 'clamp(6rem, 20vw, 22rem)' }}
        >
          WHY
        </span>

        {/* Section Header */}
        <div className="relative z-20 flex-shrink-0">
          <p
            data-atom
            className="mb-4 font-label text-[0.65rem] uppercase tracking-label text-muted-foreground"
          >
            {t('eyebrow')}
          </p>
          <p
            data-atom
            aria-hidden="true"
            className="max-w-2xl font-display text-[clamp(2.5rem,5vw,5rem)] font-light leading-[1] text-foreground"
          >
            {t('headline.pre')}{' '}
            <em className="text-brand-gradient not-italic">
              {t('headline.gradient')}
            </em>{' '}
            {t('headline.post')}
          </p>
        </div>

        {/* Track content Desktop: Horizontal, Mobile: Vertical Grid */}
        <motion.div
          style={animated ? { x: scrollX } : {}}
          className="relative z-20 mt-16 flex flex-1 flex-col items-center gap-8 pb-24 md:mt-0 md:flex-row md:gap-32 md:pl-0 lg:pl-32"
        >
          {points.map((point, i) => (
            <motion.div
              key={point.title}
              data-atom
              whileHover={animated ? { scale: 1.02 } : {}}
              className="group relative flex w-full max-w-[280px] flex-col rounded-2xl border border-border/10 bg-card/10 p-8 backdrop-blur-md transition-shadow hover:shadow-[0_0_40px_rgba(37,99,235,0.1)] md:min-w-[320px]"
              style={{ marginTop: verticalOffsets[i] }}
            >
              <motion.div
                whileHover={animated ? { scale: 1.15 } : {}}
                transition={{ duration: 0.3, ease }}
                className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-aq-blue/10 text-aq-blue"
              >
                <point.icon className="h-6 w-6" aria-hidden="true" />
              </motion.div>
              <h3 className="mb-4 font-display text-[clamp(1.2rem,1.8vw,1.6rem)] font-light leading-tight text-foreground/90">
                {point.title}
              </h3>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">
                {point.body}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer atom */}
        <p
          data-atom
          className="absolute bottom-8 left-4 z-20 text-xs text-muted-foreground md:left-16"
        >
          {t('footer')}
        </p>
      </div>
    </section>
  );
}
