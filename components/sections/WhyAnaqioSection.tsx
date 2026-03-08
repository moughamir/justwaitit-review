'use client';

import { motion } from 'framer-motion';

export function WhyAnaqioSection() {
  const points = [
    {
      title: 'Garment Precision',
      body: 'Faithful reproduction of textures, cuts, colors, and brand details.',
    },
    {
      title: 'Controlled Poses',
      body: 'Consistent positioning across product collections.',
    },
    {
      title: 'Lighting Consistency',
      body: 'Uniform lighting that preserves accurate color representation.',
    },
    {
      title: 'Scalable Production',
      body: 'Generate hundreds of visuals without increasing production costs.',
    },
    {
      title: 'Brand-Safe Outputs',
      body: 'Structured AI pipelines designed for fashion brands — not experimental image generation.',
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
            Product Benefits
          </span>
          Why{' '}
          <span className="text-brand-gradient font-bold italic">Anaqio</span>{' '}
          is Better ?
        </motion.h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {points.map((p) => (
            <div
              key={p.title}
              className="rounded-xl border border-border/60 bg-white/50 p-5 backdrop-blur-sm"
            >
              <h3 className="font-semibold text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Anaqio is built for reliability, consistency, and scale.
        </p>
      </div>
    </section>
  );
}
