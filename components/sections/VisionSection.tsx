'use client';

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { Globe, RefreshCw, Rocket } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

import { VisionPointAtom } from './atoms/vision-point-atom';

import { useDeviceTier } from '@/hooks/use-device-tier';
import { NANOBANANA_VISUALS } from '@/lib/content/nanobanana-assets';
import { ease } from '@/lib/motion';

export function VisionSection() {
  const t = useTranslations('landing.vision');
  const VISION_ICONS = [Rocket, RefreshCw, Globe];
  const points = (t.raw('points') as Array<{ text: string }>).map((p, i) => ({
    ...p,
    icon: VISION_ICONS[i],
  }));
  const sectionRef = useRef<HTMLElement>(null);

  const reduced = useReducedMotion();
  const tier = useDeviceTier();
  const animated = !reduced && tier !== 'low';

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.4], ['60px', '0px']);
  const headerOp = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const visualY = useTransform(scrollYProgress, [0, 1], ['0px', '120px']);

  return (
    <section
      ref={sectionRef}
      id="vision"
      aria-labelledby="vision-heading"
      className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-background px-4 pb-24 pt-32 sm:px-12 lg:pt-48"
    >
      <h2 id="vision-heading" className="sr-only">
        {t('eyebrow')}: {t('headline.pre')} {t('headline.gradient')}
      </h2>

      {/* Atmospheric Background Atom */}
      <motion.span
        data-atom
        data-decorative
        aria-hidden="true"
        initial={animated ? { opacity: 0, scale: 0.95 } : false}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.5, ease }}
        className="pointer-events-none absolute inset-x-0 top-[5%] z-0 select-none text-center font-display font-light text-foreground/[0.03]"
        style={{ fontSize: 'clamp(8rem, 20vw, 22rem)', filter: 'blur(32px)' }}
      >
        2027
      </motion.span>

      {/* Visual Image Atom [DRIFTING] */}
      <motion.div
        data-atom
        style={animated ? { y: visualY } : {}}
        className="absolute -left-32 top-[20%] z-0 hidden h-[500px] w-96 overflow-hidden rounded-[4rem] border border-white/5 opacity-[0.07] grayscale transition-all duration-1000 hover:opacity-[0.15] hover:grayscale-0 lg:block"
      >
        <Image
          src={NANOBANANA_VISUALS.studio.goldenHour}
          alt=""
          fill
          className="object-cover"
        />
      </motion.div>

      <div className="relative z-10 w-full max-w-3xl space-y-16">
        <motion.div
          data-atom
          style={animated ? { y: headerY, opacity: headerOp } : {}}
          className="text-center"
        >
          <p className="mb-6 font-label text-[0.65rem] uppercase tracking-label text-muted-foreground">
            {t('eyebrow')}
          </p>
          <p
            data-atom
            aria-hidden="true"
            className="font-display text-[clamp(2.5rem,5vw,5rem)] font-light leading-tight"
          >
            {t('headline.pre')}{' '}
            <em className="text-brand-gradient not-italic">
              {t('headline.gradient')}
            </em>
          </p>
          <p className="mx-auto mt-8 max-w-2xl font-body text-[0.95rem] leading-relaxed text-muted-foreground">
            {t('intro')}
          </p>
        </motion.div>

        <div className="flex flex-col gap-6">
          {points.map((point, i) => (
            <VisionPointAtom
              key={point.text}
              point={point}
              index={i}
              scrollYProgress={scrollYProgress}
              animated={animated}
            />
          ))}
        </div>

        <motion.p
          data-atom
          initial={animated ? { opacity: 0 } : false}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
          className="mx-auto max-w-xl text-center font-editorial text-[clamp(1.2rem,2.5vw,1.8rem)] italic leading-relaxed text-muted-foreground/60"
        >
          &quot;{t('quote')}&quot;
        </motion.p>
      </div>
    </section>
  );
}
