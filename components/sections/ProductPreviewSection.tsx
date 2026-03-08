'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

import { InteractivePreview } from './interactive-preview';

const features = [
  'Studio-quality lighting & textures',
  'Instant background transformation',
  'Diverse model AI generation',
  'Commerce-ready exports',
];

export function ProductPreviewSection() {
  return (
    <section
      id="product-preview"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20"
    >
      {/* Background glow */}
      <div className="max-h-4xl pointer-events-none absolute left-1/2 top-1/2 h-full w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-aq-blue/5 blur-[120px]" />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 sm:gap-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8 text-center lg:text-left"
        >
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-aq-blue sm:text-sm">
              Product Preview
            </h2>
            <h3 className="font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              Your virtual studio, <br />
              <span className="text-brand-gradient">reimagined.</span>
            </h3>
            <p className="mx-auto max-w-lg font-body text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
              Transform your product shots into high-end editorial campaigns
              without leaving your desk. Our AI understands fashion textures,
              draping, and lighting.
            </p>
          </div>

          <ul className="mx-auto max-w-md space-y-4 text-left lg:mx-0">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-3 font-medium text-foreground"
              >
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-aq-blue" />
                <span className="text-sm sm:text-base">{feature}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/5] w-full lg:aspect-square"
        >
          <InteractivePreview />
        </motion.div>
      </div>
    </section>
  );
}
