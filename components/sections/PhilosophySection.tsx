'use client';

import { motion, useReducedMotion } from 'framer-motion';

const paragraphs = [
  {
    text: (
      <>
        Fashion has always been a form of artistic expression. Technology should
        not replace creativity — it should{' '}
        <span className="text-brand-gradient font-bold italic">empower</span>{' '}
        it.
      </>
    ),
  },
  {
    text: (
      <>
        Anaqio was built with a simple belief: AI should{' '}
        <span className="text-brand-gradient font-bold italic">optimize</span>{' '}
        the operational side of fashion production so designers and brands can
        focus on creativity and storytelling.
      </>
    ),
  },
  {
    text: 'We are not replacing fashion art. We are building the infrastructure that allows it to scale.',
  },
];

export function PhilosophySection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="philosophy"
      className="bg-secondary-surface text-secondary-surface flex min-h-screen w-full flex-col justify-center px-4 py-24 sm:px-8 lg:px-12"
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
            Our Philosophy
          </span>
          AI Should{' '}
          <span className="text-brand-gradient font-bold italic">Elevate</span>{' '}
          Fashion Creativity
        </motion.h2>

        <div className="mt-8 max-w-3xl space-y-6">
          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="border-l-2 border-aq-blue/20 pl-5 text-justify text-base leading-relaxed text-muted-foreground transition-colors duration-300 hover:border-aq-blue/40"
            >
              {p.text}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
