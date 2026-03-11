'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';

import { useDeviceTier } from '@/hooks/use-device-tier';
import { HeroSectionText } from '@/lib/content/hero';

export default function SupportLine() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const reduced = useReducedMotion();
  const tier = useDeviceTier();
  const animated = !reduced && tier !== 'low';

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWordIndex(
        (prev) => (prev + 1) % HeroSectionText.supportLine.words.length
      );
    }, 2500);
    return () => clearInterval(wordInterval);
  }, []);

  return (
    <motion.p
      data-atom
      initial={animated ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.4 }}
      className="p-8 text-left font-medium uppercase tracking-[0.22em] text-muted-foreground/60 sm:text-sm md:text-[1.62rem]"
    >
      {HeroSectionText.supportLine.pre}
      <span className="relative inline-flex justify-center">
        <span className="invisible" aria-hidden>
          agencies
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={currentWordIndex}
            initial={{ y: 8, opacity: 0, filter: 'blur(2px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: -8, opacity: 0, filter: 'blur(2px)' }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="text-brand-gradient absolute left-0 top-0 w-full text-center italic"
          >
            {HeroSectionText.supportLine.words[currentWordIndex]}
          </motion.span>
        </AnimatePresence>
      </span>
      {HeroSectionText.supportLine.post}
    </motion.p>
  );
}
