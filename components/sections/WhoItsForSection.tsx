'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Store, Palette, Briefcase, LayoutGrid } from 'lucide-react';

const audiences = [
  {
    title: 'Fashion Brands',
    body: 'Scale product visuals for e-commerce and marketing campaigns.',
    icon: Store,
  },
  {
    title: 'Emerging Designers',
    body: 'Create professional visuals without expensive photoshoots.',
    icon: Palette,
  },
  {
    title: 'Creative Studios',
    body: 'Accelerate production for client campaigns.',
    icon: Briefcase,
  },
  {
    title: 'Marketplaces',
    body: 'Standardize visual quality across large product inventories.',
    icon: LayoutGrid,
  },
];

export function WhoItsForSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="who-its-for"
      className="bg-secondary-surface flex min-h-screen w-full flex-col justify-center px-4 py-24 sm:px-8 lg:px-12"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <motion.h2
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
        >
          <span className="block w-full text-center text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Who It&apos;s For
          </span>
          Built for the Fashion{' '}
          <span className="text-brand-gradient font-bold italic">
            Ecosystem
          </span>
        </motion.h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.title}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group cursor-pointer rounded-xl border border-border/60 bg-white/50 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-aq-blue/25 hover:shadow-[0_8px_30px_rgba(37,99,235,0.1)]"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-aq-blue/10 text-aq-blue transition-colors duration-300 group-hover:bg-aq-blue/15">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-foreground">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {a.body}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-sm text-muted-foreground"
        >
          Anyone producing fashion visuals at scale.
        </motion.p>
      </div>
    </section>
  );
}
