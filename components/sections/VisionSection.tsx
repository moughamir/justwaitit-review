'use client';

import { motion } from 'framer-motion';

export function VisionSection() {
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
            Our Vision
          </span>
          The Future of{' '}
          <span className="text-brand-gradient font-bold italic">
            Fashion Production
          </span>
        </motion.h2>
        <div className="mt-6 max-w-3xl text-muted-foreground">
          <p>
            The fashion industry is entering a new era where visual production
            must keep pace with digital commerce.
          </p>
          <ul className="mt-4 list-disc pl-6">
            <li>Collections launch faster.</li>
            <li>Content cycles move quicker.</li>
            <li>Brands reach global audiences instantly.</li>
          </ul>
          <p className="mt-4">
            Anaqio’s vision is to become the visual infrastructure layer of the
            global fashion industry, transforming visual production from a
            bottleneck into a growth engine.
          </p>
        </div>
      </div>
    </section>
  );
}
