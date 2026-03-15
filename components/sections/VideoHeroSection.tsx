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

      {/* Layer 2: Content - Two Column Layout */}
      <div className="relative z-20 mx-auto flex w-full flex-1 flex-col items-center justify-center px-6 pt-20 sm:px-12 lg:flex-row lg:items-start lg:gap-16 lg:pt-24">
        {/* Left Column: Text & CTAs */}
        <div className="flex w-full flex-col items-center lg:w-1/2 lg:items-start">
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
