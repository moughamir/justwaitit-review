'use client';

import { motion } from 'framer-motion';
import * as React from 'react';

import { cn } from '@/lib/utils';

interface AnaqioLogoProps {
  className?: string;
  theme?: 'light' | 'dark';
}

export function AnaqioLogo({ className, theme = 'light' }: AnaqioLogoProps) {
  const isDark = theme === 'dark';

  return (
    <div
      className={cn(
        'group relative flex items-center font-wordmark text-2xl font-bold tracking-[0.2em] transition-colors',
        isDark ? 'text-white' : 'text-aq-ink',
        className
      )}
      aria-label="Anaqio"
    >
      <span className="relative z-10 mr-[0.1em]">ANAQI</span>
      <div className="relative z-10 flex h-[0.7em] w-[0.7em] items-center justify-center">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 180 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex h-full w-full items-center justify-center"
        >
          {/* Outer diamond */}
          <div
            className={cn(
              'absolute inset-0 rotate-45 border-[1.5px]',
              isDark ? 'border-white' : 'border-aq-ink'
            )}
          />
          {/* Inner solid diamond */}
          <div
            className={cn(
              'absolute h-[40%] w-[40%] rotate-45',
              isDark ? 'bg-white' : 'bg-aq-blue'
            )}
          />
        </motion.div>
      </div>
    </div>
  );
}
