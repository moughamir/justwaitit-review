'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Rocket, RefreshCw, Globe } from 'lucide-react';

const visionPoints = [
  {
    text: 'Collections launch faster.',
    icon: Rocket,
  },
  {
    text: 'Content cycles move quicker.',
    icon: RefreshCw,
  },
  {
    text: 'Brands reach global audiences instantly.',
    icon: Globe,
  },
];

export function VisionSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="vision"
      className="flex min-h-screen w-full flex-col justify-center bg-background px-4 py-24 sm:px-8 lg:px-12"
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
            Our Vision
          </span>
          The Future of{' '}
          <span className="text-brand-gradient font-bold italic">
            Fashion Production
          </span>
        </motion.h2>

        <div className="mt-8 max-w-3xl">
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg leading-relaxed text-muted-foreground"
          >
            The fashion industry is entering a new era where visual production
            must keep pace with digital commerce.
          </motion.p>

          <div className="mt-6 space-y-3">
            {visionPoints.map((point, i) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={point.text}
                  initial={
                    prefersReducedMotion ? false : { opacity: 0, x: -16 }
                  }
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex items-center gap-4 rounded-lg border border-border/40 bg-white/30 px-5 py-3.5 backdrop-blur-sm transition-all duration-300 hover:border-aq-blue/20 hover:bg-white/50"
                >
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-aq-blue/10 text-aq-blue">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {point.text}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 border-l-2 border-aq-blue/30 pl-4 font-serif text-base italic leading-relaxed text-muted-foreground"
          >
            Anaqio&apos;s vision is to become the visual infrastructure layer of
            the global fashion industry, transforming visual production from a
            bottleneck into a growth engine.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
