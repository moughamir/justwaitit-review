'use client';

import { motion } from 'framer-motion';

export function SolutionSection() {
  return (
    <section className="w-full bg-background px-4 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-[1200px]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
        >
          Meet the AI-Native Production Layer for Fashion
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

        <div className="mt-6 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
          <p>No studios.</p>
          <p>No scheduling.</p>
          <p>No production delays.</p>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Just scalable visual production designed for modern fashion brands.
        </p>
      </div>
    </section>
  );
}
