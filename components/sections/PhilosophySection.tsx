'use client';

import { motion } from 'framer-motion';

export function PhilosophySection() {
  return (
    <section className="bg-secondary-surface text-secondary-surface w-full px-4 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-[1200px]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
        >
          AI Should Elevate Fashion Creativity
        </motion.h2>
        <div className="mt-6 max-w-3xl text-muted-foreground">
          <p>
            Fashion has always been a form of artistic expression. Technology
            should not replace creativity — it should empower it.
          </p>
          <p className="mt-4">
            Anaqio was built with a simple belief: AI should optimize the
            operational side of fashion production so designers and brands can
            focus on creativity and storytelling.
          </p>
          <p className="mt-4">
            We are not replacing fashion art. We are building the infrastructure
            that allows it to scale.
          </p>
        </div>
      </div>
    </section>
  );
}
