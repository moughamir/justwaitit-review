'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Camera, Share2, ShoppingBag, LayoutList } from 'lucide-react';

const painPoints = [
  { text: 'Product launches.', icon: Camera },
  { text: 'Social media campaigns.', icon: Share2 },
  { text: 'E-commerce catalogs.', icon: ShoppingBag },
  { text: 'Marketplace listings.', icon: LayoutList },
];

export function ProblemSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="problem"
      className="bg-secondary-surface text-secondary-surface flex w-full flex-col justify-center px-4 py-24 sm:px-8 lg:px-12"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <motion.h2
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
        >
          <span className="block w-full text-center text-sm uppercase tracking-[0.2em] text-muted-foreground">
            The Challenge
          </span>
          Fashion Content Demand.
          <br /> Is{' '}
          <span className="text-brand-gradient font-bold italic">
            Exploding
          </span>
          .
        </motion.h2>

        <div className="mt-8 grid gap-8 text-muted-foreground sm:grid-cols-2">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <p className="text-lg leading-relaxed">
              Fashion brands today need an enormous volume of visuals.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {painPoints.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.text}
                    initial={
                      prefersReducedMotion ? false : { opacity: 0, y: 12 }
                    }
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex items-center gap-3 rounded-lg border border-border/40 bg-white/30 px-4 py-3 backdrop-blur-sm transition-all duration-300 hover:border-aq-blue/20 hover:bg-white/50"
                  >
                    <Icon
                      className="h-4 w-4 flex-shrink-0 text-aq-blue"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium text-foreground">
                      {item.text}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="space-y-4"
          >
            <p className="text-lg leading-relaxed">
              But traditional production wasn&apos;t built for this speed.
            </p>
            <p className="text-sm leading-7">
              Photoshoots require studios, models, logistics, and
              post-production — making them expensive, slow, and difficult to
              scale. For emerging designers and growing brands, this creates a
              bottleneck between creative vision and commercial growth.
            </p>
            <p className="border-l-2 border-aq-blue/25 pl-4 font-serif text-sm italic">
              Fashion is art. Commerce requires optimization.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
