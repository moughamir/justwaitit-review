'use client';

import { motion } from 'framer-motion';

export function DemoSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-4 py-20">
      <div className="mx-auto w-full max-w-5xl space-y-8 text-center sm:space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-aq-blue sm:text-sm">
            See it in action
          </h2>
          <h3 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
            From prompt to{' '}
            <span className="text-brand-gradient italic">perfection.</span>
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-3xl border-white/5 bg-black/40 shadow-2xl"
        >
          {/* Placeholder for Demo GIF */}
          <div className="space-y-4 p-6 text-center sm:space-y-6 sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/5 transition-transform duration-500 group-hover:scale-110 sm:h-24 sm:w-24">
              <svg
                className="ml-1 h-8 w-8 text-aq-blue sm:h-10 sm:w-10"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div className="space-y-2">
              <p className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
                Demo GIF Preview
              </p>
              <p className="mx-auto max-w-sm font-body text-sm text-muted-foreground sm:text-base">
                Our AI studio demonstration is being prepared. Join the waitlist
                to be notified when it drops.
              </p>
            </div>
          </div>

          {/* Overlay gradient */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
