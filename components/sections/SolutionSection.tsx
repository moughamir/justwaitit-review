'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const processSteps = [
  'Upload a garment image.',
  'Select pose, lighting, and environment.',
  'Generate editorial-quality visuals in minutes.',
];

const outcomes = [
  { text: 'No photoshoots.', positive: false },
  { text: 'No production delays.', positive: false },
  { text: 'Just scalable production.', positive: true },
];

export function SolutionSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="solution"
      className="flex w-full flex-col justify-center bg-background px-4 py-24 sm:px-8 lg:px-12"
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
            The Solution
          </span>
          Meet the AI-Native{' '}
          <span className="text-brand-gradient font-bold italic">
            Production Layer
          </span>{' '}
          for Fashion
        </motion.h2>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-3xl"
        >
          <p className="text-lg leading-relaxed text-muted-foreground">
            Anaqio transforms simple garment inputs into photorealistic fashion
            visuals using a structured AI pipeline designed specifically for
            fashion commerce.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {processSteps.map((step, i) => (
            <motion.div
              key={step}
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
              <span className="text-brand-gradient mb-2 inline-block font-display text-xl font-bold">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-sm font-semibold text-foreground">{step}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 text-sm text-foreground sm:grid-cols-3">
          {outcomes.map((item, i) => (
            <motion.div
              key={item.text}
              initial={prefersReducedMotion ? false : { opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.4,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex items-center gap-3"
            >
              {item.positive ? (
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-aq-blue/15 text-aq-blue ring-1 ring-aq-blue/20">
                  <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                </div>
              ) : (
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-destructive/15 text-destructive ring-1 ring-destructive/20">
                  <X className="h-3.5 w-3.5 stroke-[2.5]" />
                </div>
              )}
              <p
                className={`font-medium ${item.positive ? 'text-aq-blue' : ''}`}
              >
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-sm text-muted-foreground"
        >
          Just scalable visual production designed for modern fashion brands.
        </motion.p>
      </div>
    </section>
  );
}
