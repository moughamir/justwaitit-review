'use client';

import { motion } from 'framer-motion';

export function SocialProofSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-4 py-20">
      <div className="mx-auto w-full max-w-6xl space-y-12 text-center sm:space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-aq-blue sm:text-sm">
            Coming Soon
          </h2>
          <h3 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
            Trusted by the{' '}
            <span className="text-brand-gradient">avant-garde.</span>
          </h3>
          <p className="mx-auto max-w-2xl font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
            We are currently in private beta with selected fashion houses and
            independent stylists. Official testimonials and case studies are
            launching soon.
          </p>
        </motion.div>

        <div className="relative z-10 grid grid-cols-2 gap-8 opacity-40 contrast-150 grayscale sm:gap-12 md:grid-cols-4">
          {/* Logo Placeholders with brand-like feel */}
          {['VOGUE', "HARPER'S", 'ELLE', 'LOOFFICIEL'].map((brand) => (
            <div
              key={brand}
              className="flex h-12 items-center justify-center sm:h-16"
            >
              <span className="font-display text-xl font-bold tracking-[0.4em] text-foreground/40 sm:text-2xl">
                {brand}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-8 sm:pt-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-aq-blue/40">
            Selected Partners Only
          </p>
        </div>
      </div>
    </section>
  );
}
