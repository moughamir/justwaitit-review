'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

import { HeroCTAs } from './atoms/HeroCTAs';
import { HeroText } from './atoms/HeroText';
import { HeroVideoPlayer } from './atoms/HeroVideoPlayer';

import { useDeviceTier } from '@/hooks/use-device-tier';

/**
 * Refactored VideoHeroSection using Atomic Components
 * Following DRY and Scalability principles.
 */
export function VideoHeroSection() {
  const t = useTranslations('landing.hero');
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const tier = useDeviceTier();
  const animated = !reduced && tier !== 'low';

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-background"
    >
      {/* Semantic duplicate for screen readers / SEO */}
      <h1 id="hero-heading" className="sr-only">
        ANAQIO — {t('headline.pre')} {t('headline.pro')}
      </h1>

      {/* Layer 0: Subtle abstract background */}
      <div
        data-atom
        data-decorative
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        {/* Soft gradient orb — top-left accent */}
        <div className="absolute -left-[20%] -top-[10%] h-[60vh] w-[60vh] rounded-full bg-aq-blue/[0.07] blur-[120px]" />
        {/* Soft gradient orb — bottom-right accent */}
        <div className="absolute -bottom-[10%] -right-[15%] h-[50vh] w-[50vh] rounded-full bg-aq-purple/[0.05] blur-[100px]" />
        {/* Center glow */}
        <div className="absolute left-1/2 top-1/2 h-[40vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-aq-navy/[0.15] blur-[150px]" />
      </div>

      {/* Layer 2: Content - Two Column Layout */}
      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-1 flex-col-reverse items-center justify-center gap-8 px-6 pt-20 sm:px-12 lg:flex-row lg:items-center lg:gap-12 lg:pt-24">
        {/* Left Column: Text & CTAs */}
        <div className="flex w-full flex-col items-center lg:w-7/12 lg:items-start">
          <HeroText animated={animated} reduced={!!reduced} />
          <HeroCTAs animated={animated} tier={tier} />
        </div>

        {/* Right Column: Video Player */}
        <HeroVideoPlayer />
      </div>

      {/* Scroll indicator */}
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
