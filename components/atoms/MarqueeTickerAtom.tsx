// components/atoms/MarqueeTickerAtom.tsx
'use client';

import { motion, useReducedMotion } from 'framer-motion';

import type { MarqueeItem } from '@/lib/data/marquee-content';

import { marqueeScroll, marqueeOnHover } from '@/lib/data/motion';

interface MarqueeTickerAtomProps {
  items: MarqueeItem[];
  background?: string;
}

export function MarqueeTickerAtom({
  items,
  background = 'bg-slate-900',
}: MarqueeTickerAtomProps) {
  const reduced = useReducedMotion();

  const duplicatedItems = [...items, ...items];

  return (
    <div className={`overflow-hidden ${background}`}>
      <motion.div
        className="flex gap-12 px-6 py-4"
        animate={marqueeScroll(reduced)}
        whileHover={marqueeOnHover()}
      >
        {duplicatedItems.map((item, idx) => (
          <div
            key={`${item.text}-${idx}`}
            data-marquee-item
            className="flex shrink-0 items-center gap-2 whitespace-nowrap"
          >
            <span className="text-2xl">{item.emoji}</span>
            <span className="text-lg font-semibold text-white">
              {item.text}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
