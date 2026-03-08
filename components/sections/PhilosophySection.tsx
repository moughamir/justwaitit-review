'use client';

import { motion } from 'framer-motion';

export function PhilosophySection() {
  return (
    <section className="bg-secondary-surface text-secondary-surface flex min-h-screen w-full flex-col justify-center px-4 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-[1200px]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
        >
          <span className="block w-full text-center text-sm uppercase text-aq-ink">
            Our Philosophy
          </span>
          AI Should{' '}
          <span className="text-brand-gradient font-bold italic">Elevate</span>{' '}
          Fashion Creativity
        </motion.h2>
        <div className="mt-6 max-w-3xl text-muted-foreground">
          <p className="max-w-prose text-justify">
            Fashion has always been a form of artistic expression. Technology
            should not replace creativity — it should{' '}
            <span className="text-brand-gradient font-bold italic">
              empower
            </span>{' '}
            it.
          </p>
          <p className="mt-4 text-justify">
            Anaqio was built with a simple belief: AI should{' '}
            <span className="text-brand-gradient font-bold italic">
              optimize
            </span>{' '}
            the operational side of fashion production so designers and brands
            can focus on creativity and storytelling.
          </p>
          <p className="mt-4 text-justify">
            We are not replacing fashion art. We are building the infrastructure
            that allows it to scale.
          </p>
        </div>
      </div>
    </section>
  );
}
