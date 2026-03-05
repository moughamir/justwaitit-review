'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import { HeroLogoComposition } from './HeroLogoComposition';

export function EntranceLoader() {
  const [loading, setLoading] = useState(true);

  const handleAnimationComplete = () => {
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#0F172A]"
        >
          {/* Background cinematic glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.5, scale: 1.2 }}
            transition={{ duration: 4, ease: 'easeOut' }}
            className="bg-radial-gradient absolute inset-0 from-aq-purple/20 to-transparent blur-3xl"
          />

          <div className="relative flex w-full max-w-[320px] flex-col items-center px-8 sm:max-w-[400px]">
            <HeroLogoComposition
              theme="dark"
              onComplete={handleAnimationComplete}
              className="h-auto w-full"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 1, ease: 'easeOut' }}
              className="mt-8 text-center"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-aq-muted/50">
                Experience the Future of Fashion
              </span>
            </motion.div>
          </div>

          {/* Grain overlay for cinematic feel */}
          <div className="bg-grain pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
