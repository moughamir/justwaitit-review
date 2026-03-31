'use client';

import { motion } from 'framer-motion';

import type { Segment } from '@/lib/data/segments-section';

interface SegmentCardAtomProps {
  segment: Segment;
  index?: number;
}

export function SegmentCardAtom({ segment, index = 0 }: SegmentCardAtomProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ x: 4, transition: { duration: 0.2 } }}
      className="group flex gap-4 rounded-lg border border-slate-200 bg-white p-5 transition-all hover:border-aq-blue hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-aq-blue/50"
    >
      <div className="shrink-0 text-4xl">{segment.icon}</div>

      <div className="min-w-0 flex-1">
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">
            {segment.name}
          </h3>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {segment.role}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, height: 0 }}
          whileHover={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="mt-3 space-y-2 overflow-hidden"
        >
          <div className="border-l-2 border-aq-blue/30 pl-3">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Problem
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              {segment.problem}
            </p>
          </div>

          <div className="border-l-2 border-aq-purple/30 pl-3">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Solution
            </p>
            <p className="text-sm font-medium text-aq-purple dark:text-aq-purple">
              {segment.solution}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
