'use client';

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { ArrowDownRight, ChevronDown } from 'lucide-react';
import { useRef } from 'react';

import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ScrollLink } from '@/components/ui/scroll-link';
import { useDeviceTier } from '@/hooks/use-device-tier';
import { HeroSectionText } from '@/lib/content/hero';
import { charReveal, ease } from '@/lib/motion';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const tier = useDeviceTier();
  const animated = !reduced && tier !== 'low';

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const headlineY = useTransform(scrollYProgress, [0, 1], ['0px', '-40px']);

  const subheadlineWords = HeroSectionText.subheadline.a.split(' ');
  const proWords = HeroSectionText.headline.pro.split(' ');

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-background"
    >
      {/* Semantic duplicate for screen readers / SEO */}
      <h1 id="hero-heading" className="sr-only">
        ANAQIO — {HeroSectionText.headline.pre} {HeroSectionText.headline.pro}
      </h1>

      {/* Layer 0: Background */}
      <div
        data-atom
        data-decorative
        aria-hidden="true"
        className="hero-gradient pointer-events-none absolute inset-0 z-0"
      />
      <div
        data-atom
        data-decorative
        aria-hidden="true"
        className="animated-grid pointer-events-none absolute inset-0 z-0 opacity-25"
      />

      {/* Layer 1: Perspective Grid Overlay */}
      <div
        data-atom
        data-decorative
        aria-hidden="true"
        className="absolute inset-0 z-10 overflow-hidden"
      >
        <div className="perspective-grid mx-auto h-[160%] w-[120%]" />
      </div>

      {/* Layer 2: Content Column */}
      <div className="relative z-20 mx-auto flex w-full flex-1 flex-col items-center justify-center px-6 pt-24 text-center sm:px-12">
        {/* Eyebrow atom: x: -24→0, opacity: 0→1 (0.6s, delay 0.15s) */}
        <motion.div
          data-atom
          initial={animated ? { opacity: 0, x: -24 } : false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="flex items-center justify-center gap-4"
        >
          <div className="h-px w-10 bg-muted-foreground/40" />
          <span className="font-label text-[0.65rem] font-medium uppercase tracking-label text-muted-foreground">
            {HeroSectionText.eyebrow}
          </span>
          <div className="h-px w-10 bg-muted-foreground/40" />
        </motion.div>

        {/* Atom A: pre — charReveal per character */}
        <motion.p
          data-atom
          aria-hidden="true"
          style={animated ? { y: headlineY } : {}}
          className="flex flex-wrap justify-center font-display font-light text-foreground"
        >
          {HeroSectionText.headline.pre.split('').map((char, i) => (
            <motion.span
              key={`pre-${char}-${i}`}
              data-atom
              aria-hidden="true"
              {...(animated ? charReveal(reduced, i) : {})}
              className="inline-block"
              style={{
                fontSize: 'clamp(3.5rem, 8vw, 9rem)',
                letterSpacing: '-0.02em',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.p>
        {/* Atom B: pro — word-by-word y: 20→0, gradient italic */}
        <p
          data-atom
          aria-hidden="true"
          className="flex flex-wrap justify-center font-display font-light italic"
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
                fontSize: 'clamp(2rem, 4vw, 4.5rem)',
                letterSpacing: '-0.01em',
              }}
            >
              {word}
            </motion.span>
          ))}
        </p>

        <p
          className="mt-8 text-sm leading-[1.8] text-muted-foreground sm:text-[0.93rem]"
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

      {/* Layer 3: Interactive atoms (Buttons) */}
      <div className="relative z-30 mb-12 mt-8 flex w-full flex-col items-center justify-center gap-4 px-6 sm:mb-16">
        <motion.div
          data-atom
          initial={animated ? { y: 20, opacity: 0 } : false}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1, ease }}
          className="flex flex-col items-center gap-4 sm:flex-row"
        >
          <MagneticButton strength={tier === 'high' ? 0.35 : 0}>
            <Button
              variant="hero"
              asChild
              className="group h-12 gap-3 rounded-xl px-8 text-[0.7rem] font-semibold uppercase tracking-[0.18em]"
            >
              <ScrollLink targetId="waitlist">
                <span>{HeroSectionText.cta.act}</span>
                <ArrowDownRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </ScrollLink>
            </Button>
          </MagneticButton>
          <Button
            variant="heroOutline"
            asChild
            className="h-11 gap-2 rounded-xl px-7 text-[0.7rem] font-medium uppercase tracking-[0.18em]"
          >
            <ScrollLink targetId="how-it-works">
              {HeroSectionText.cta.learn}
            </ScrollLink>
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator atom */}
      <motion.div
        data-atom
        data-decorative
        aria-hidden="true"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-muted-foreground/40"
      >
        <ChevronDown className="h-5 w-5" />
      </motion.div>
    </section>
  );
}
