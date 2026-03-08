'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Ruler, Move3D, Sun, Zap, ShieldCheck } from 'lucide-react';

const points = [
  {
    title: 'Garment Precision',
    body: 'Faithful reproduction of textures, cuts, colors, and brand details.',
    icon: Ruler,
  },
  {
    title: 'Controlled Poses',
    body: 'Consistent positioning across product collections.',
    icon: Move3D,
  },
  {
    title: 'Lighting Consistency',
    body: 'Uniform lighting that preserves accurate color representation.',
    icon: Sun,
  },
  {
    title: 'Scalable Production',
    body: 'Generate hundreds of visuals without increasing production costs.',
    icon: Zap,
  },
  {
    title: 'Brand-Safe Outputs',
    body: 'Structured AI pipelines designed for fashion brands — not experimental image generation.',
    icon: ShieldCheck,
  },
];

export function WhyAnaqioSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="why-anaqio"
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
            Product Benefits
          </span>
          Why{' '}
          <span className="text-brand-gradient font-bold italic">Anaqio</span>{' '}
          is Better?
        </motion.h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {points.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
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
                <h3 className="font-semibold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-sm text-muted-foreground"
        >
          Anaqio is built for reliability, consistency, and scale.
        </motion.p>
      </div>
    </section>
  );
}
