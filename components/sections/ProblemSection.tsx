'use client';

import { motion } from 'framer-motion';

export function ProblemSection() {
  return (
    <section className="bg-secondary-surface text-secondary-surface flex min-h-screen w-full flex-col justify-center px-4 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-[1200px]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
        >
          <span className="block w-full text-center text-sm uppercase text-aq-ink">
            The Challenge
          </span>
          Fashion Content Demand.
          <br /> Is{' '}
          <span className="font-bold italic text-purple-900">Exploding</span>.
        </motion.h2>

        <div className="mt-8 grid gap-6 text-muted-foreground sm:grid-cols-2">
          <div className="space-y-4">
            <p className="text-lg">
              Fashion brands today need an enormous volume of visuals.
            </p>
            <ul className="list-disc pl-6 text-sm leading-7">
              <li>Product launches.</li>
              <li>Social media campaigns.</li>
              <li>E-commerce catalogs.</li>
              <li>Marketplace listings.</li>
            </ul>
          </div>
          <div className="space-y-4">
            <p className="text-lg">
              But traditional production wasn’t built for this speed.
            </p>
            <p className="text-sm leading-7">
              Photoshoots require studios, models, logistics, and
              post-production — making them expensive, slow, and difficult to
              scale. For emerging designers and growing brands, this creates a
              bottleneck between creative vision and commercial growth.
            </p>
            <p className="text-sm italic">
              Fashion is art. Commerce requires optimization.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
