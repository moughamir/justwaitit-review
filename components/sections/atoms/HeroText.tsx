'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

import { charReveal, ease } from '@/lib/motion';

interface HeroTextProps {
  animated: boolean;
  reduced: boolean;
}

export function HeroText({ animated, reduced }: HeroTextProps) {
  const t = useTranslations('landing.hero');
  const textRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ['start start', 'end start'],
  });

  const headlineY = useTransform(scrollYProgress, [0, 1], ['0px', '-40px']);
  const proWords = t('headline.pro').split(' ');
  const subheadlineWords = t('subheadline.a').split(' ');

  return (
    <div
      ref={textRef}
      className="flex flex-col items-center text-center lg:items-start lg:text-left"
    >
      {/* Eyebrow */}
      <motion.div
        data-atom
        initial={animated ? { opacity: 0, x: -24 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease }}
        className="flex items-center justify-center gap-4 lg:justify-start"
      >
        <div className="h-px w-10 bg-muted-foreground/40" />
        <span className="font-label text-[0.65rem] font-medium uppercase tracking-label text-muted-foreground">
          {t('eyebrow')}
        </span>
        <div className="h-px w-10 bg-muted-foreground/40" />
      </motion.div>

      {/* Headline Pre */}
      <motion.p
        data-atom
        aria-hidden="true"
        style={animated ? { y: headlineY } : {}}
        className="mt-6 flex flex-wrap justify-center font-display font-light text-foreground lg:justify-start"
      >
        {t('headline.pre')
          .split('')
          .map((char, i) => (
            <motion.span
              key={`pre-${char}-${i}`}
              data-atom
              aria-hidden="true"
              {...(animated ? charReveal(reduced, i) : {})}
              className="inline-block"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 6rem)',
                letterSpacing: '-0.02em',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
      </motion.p>

      {/* Headline Pro */}
      <p
        data-atom
        aria-hidden="true"
        className="flex flex-wrap justify-center font-display font-light italic lg:justify-start"
      >
        {proWords.map((word, i) => (
          <motion.span
            key={`pro-${word}-${i}`}
            data-atom
            aria-hidden="true"
            initial={animated ? { y: 20, opacity: 0 } : false}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.72 + i * 0.07, ease }}
            className="text-brand-gradient mr-[0.25em] inline-block"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 3rem)',
              letterSpacing: '-0.01em',
            }}
          >
            {word}
          </motion.span>
        ))}
      </p>

      {/* Subheadline */}
      <p
        className="mt-6 max-w-xl text-sm leading-[1.8] text-muted-foreground sm:text-[0.93rem]"
        aria-hidden="true"
      >
        {subheadlineWords.map((word, i) => (
          <motion.span
            key={`sub-${word}-${i}`}
            data-atom
            initial={animated ? { y: 16, opacity: 0 } : false}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45, delay: 1.0 + i * 0.055, ease }}
            className="mr-[0.3em] inline-block"
          >
            {word}
          </motion.span>
        ))}
      </p>
    </div>
  );
}
