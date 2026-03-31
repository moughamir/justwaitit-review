'use client';

import { motion } from 'framer-motion';

import type { Feature } from '@/lib/data/features-section';

interface FeatureCardAtomProps {
  feature: Feature;
  index?: number;
}

export function FeatureCardAtom({ feature, index = 0 }: FeatureCardAtomProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
    >
      <div className="text-5xl">{feature.icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          {feature.title}
        </h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {feature.description}
        </p>
      </div>
      <motion.div
        className="h-1 w-0 bg-gradient-to-r from-aq-blue to-aq-purple"
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
