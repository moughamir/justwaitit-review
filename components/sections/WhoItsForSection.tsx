'use client';

import { motion } from 'framer-motion';

export function WhoItsForSection() {
  const audiences = [
    {
      title: 'Fashion Brands',
      body: 'Scale product visuals for e-commerce and marketing campaigns.',
    },
    {
      title: 'Emerging Designers',
      body: 'Create professional visuals without expensive photoshoots.',
    },
    {
      title: 'Creative Studios',
      body: 'Accelerate production for client campaigns.',
    },
    {
      title: 'Marketplaces',
      body: 'Standardize visual quality across large product inventories.',
    },
  ];

  return (
    <section className="flex min-h-screen w-full flex-col justify-center bg-background px-4 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-[1200px]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
        >
          <span className="block w-full text-center text-sm uppercase text-aq-ink">
            Who It's For
          </span>
          Built for the Fashion{' '}
          <span className="text-brand-gradient font-bold italic">
            Ecosystem
          </span>
        </motion.h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a) => (
            <div
              key={a.title}
              className="rounded-xl border border-border/60 bg-white/50 p-5 backdrop-blur-sm"
            >
              <h3 className="font-semibold text-foreground">{a.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Anyone producing fashion visuals at scale.
        </p>
      </div>
    </section>
  );
}
