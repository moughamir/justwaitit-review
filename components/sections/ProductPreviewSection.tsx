"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { InteractivePreview } from "./interactive-preview";

const features = [
  "Studio-quality lighting & textures",
  "Instant background transformation",
  "Diverse model AI generation",
  "Commerce-ready exports",
];

export function ProductPreviewSection() {
  return (
    <section id="product-preview" className="relative min-h-screen flex items-center justify-center px-4 snap-start overflow-hidden py-20">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl bg-aq-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8 text-center lg:text-left"
        >
          <div className="space-y-4">
            <h2 className="text-xs sm:text-sm font-bold text-aq-blue uppercase tracking-[0.3em]">Product Preview</h2>
            <h3 className="text-3xl sm:text-5xl font-bold tracking-tight font-display leading-[1.1]">
              Your virtual studio, <br />
              <span className="text-brand-gradient">reimagined.</span>
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0 font-body">
              Transform your product shots into high-end editorial campaigns without leaving your desk.
              Our AI understands fashion textures, draping, and lighting.
            </p>
          </div>

          <ul className="space-y-4 max-w-md mx-auto lg:mx-0 text-left">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-foreground font-medium">
                <CheckCircle2 className="w-5 h-5 text-aq-blue flex-shrink-0" />
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
          className="relative aspect-[4/5] lg:aspect-square w-full"
        >
          <InteractivePreview />
        </motion.div>
      </div>
    </section>
  );
}
