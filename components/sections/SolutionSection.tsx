'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

export function SolutionSection() {
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
            The Solution
          </span>
          Meet the AI-Native{' '}
          <span className="font-bold italic text-purple-900">
            Production Layer
          </span>{' '}
          for Fashion
        </motion.h2>

        <div className="mt-6 max-w-3xl text-muted-foreground">
          <p className="text-lg">
            Anaqio transforms simple garment inputs into photorealistic fashion
            visuals using a structured AI pipeline designed specifically for
            fashion commerce.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-border/60 bg-white/50 p-5 backdrop-blur-sm">
            <p className="text-sm font-semibold text-foreground">
              Upload a garment image.
            </p>
          </div>
          <div className="rounded-xl border border-border/60 bg-white/50 p-5 backdrop-blur-sm">
            <p className="text-sm font-semibold text-foreground">
              Select pose, lighting, and environment.
            </p>
          </div>
          <div className="rounded-xl border border-border/60 bg-white/50 p-5 backdrop-blur-sm">
            <p className="text-sm font-semibold text-foreground">
              Generate editorial-quality visuals in minutes.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 text-sm text-foreground sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-destructive/15 text-destructive ring-1 ring-destructive/20">
              <X className="h-3.5 w-3.5 stroke-[2.5]" />
            </div>
            <p className="font-medium">No photoshoots.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-destructive/15 text-destructive ring-1 ring-destructive/20">
              <X className="h-3.5 w-3.5 stroke-[2.5]" />
            </div>
            <p className="font-medium">No production delays.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-aq-blue/15 text-aq-blue ring-1 ring-aq-blue/20">
              <Check className="h-3.5 w-3.5 stroke-[2.5]" />
            </div>
            <p className="font-medium text-aq-blue">
              Just scalable production.
            </p>
          </div>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Just scalable visual production designed for modern fashion brands.
        </p>
      </div>
    </section>
  );
}
