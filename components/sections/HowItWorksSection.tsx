'use client';

import { motion } from 'framer-motion';

export function HowItWorksSection() {
  const steps = [
    {
      title: '1. Upload Your Garment',
      body: 'Upload a flat lay or ghost mannequin image.',
    },
    {
      title: '2. Define the Visual Style',
      body: 'Choose poses, lighting, and environments designed for fashion campaigns.',
    },
    {
      title: '3. Generate Photorealistic Output',
      body: 'Our AI pipeline transforms the garment into high-quality visuals ready for e-commerce, campaigns, and social media.',
    },
    {
      title: '4. Scale Instantly',
      body: 'Generate multiple variations for different markets, campaigns, or product launches. Minutes — not weeks.',
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
            How It Works
          </span>
          Four Steps to{' '}
          <span className="text-brand-gradient font-bold italic">
            Campaign-Ready
          </span>{' '}
          Visuals
        </motion.h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div
              key={s.title}
              className="rounded-xl border border-border/60 bg-white/40 p-5 backdrop-blur-sm"
            >
              <h3 className="font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
