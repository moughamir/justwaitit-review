'use client';

import { motion } from 'framer-motion';

import type { ResultCard } from '@/lib/data/results-section';

interface ResultCardAtomProps {
  result: ResultCard;
  index?: number;
}

export function ResultCardAtom({ result, index = 0 }: ResultCardAtomProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="overflow-hidden rounded-lg border border-border bg-card"
    >
      <div className="border-b border-border bg-muted/50 p-4">
        <h3 className="text-sm font-semibold text-foreground">
          {result.metric}
        </h3>
      </div>

      <div className="grid grid-cols-3 gap-4 p-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Traditional
          </p>
          <p className="mt-1 text-base font-semibold text-foreground">
            {result.traditional}
          </p>
        </div>

        <div className="flex items-center justify-center">
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-2xl text-muted-foreground/40"
          >
            →
          </motion.div>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-aq-blue">
            ANAQIO
          </p>
          <p className="mt-1 text-base font-semibold text-aq-blue">
            {result.anaqio}
          </p>
        </div>
      </div>

      <div className="border-t border-border bg-gradient-to-r from-aq-blue/5 to-aq-purple/5 p-4">
        <p className="text-center text-sm font-semibold text-aq-blue">
          {result.improvement}
        </p>
      </div>
    </motion.div>
  );
}
