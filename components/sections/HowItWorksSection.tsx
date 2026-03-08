'use client';

import { motion, useReducedMotion } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'Upload Your Garment',
    body: 'Upload a flat lay or ghost mannequin image.',
  },
  {
    num: '02',
    title: 'Define the Visual Style',
    body: 'Choose poses, lighting, and environments designed for fashion campaigns.',
  },
  {
    num: '03',
    title: 'Generate Photorealistic Output',
    body: 'Our AI pipeline transforms the garment into high-quality visuals ready for e-commerce, campaigns, and social media.',
  },
  {
    num: '04',
    title: 'Scale Instantly',
    body: 'Generate multiple variations for different markets, campaigns, or product launches. Minutes — not weeks.',
  },
];

export function HowItWorksSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="how-it-works"
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
            How It Works
          </span>
          Four Steps to{' '}
          <span className="text-brand-gradient font-bold italic">
            Campaign-Ready
          </span>{' '}
          Visuals
        </motion.h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.5,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group cursor-pointer rounded-xl border border-border/60 bg-white/50 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-aq-blue/25 hover:shadow-[0_8px_30px_rgba(37,99,235,0.1)]"
            >
              <span className="text-brand-gradient mb-3 inline-block font-display text-2xl font-bold">
                {s.num}
              </span>
              <h3 className="font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
