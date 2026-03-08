'use client';

import { motion } from 'framer-motion';
import { Sparkles, Layers, Eye } from 'lucide-react';

const features = [
  {
    title: 'AI Studio Alpha',
    desc: 'A professional workspace for high-end fashion editing.',
    icon: Layers,
    status: 'In Development',
  },
  {
    title: 'Virtual Try-On',
    desc: 'Hyper-realistic garment draping on AI models.',
    icon: Sparkles,
    status: 'Q2 2026',
  },
];

export function ComingSoonSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 space-y-12 text-center lg:order-1 lg:text-left"
          >
            <div className="space-y-6">
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-aq-blue opacity-80 sm:text-sm">
                Coming Soon
              </h2>
              <h3 className="font-display text-4xl font-bold leading-[1.1] tracking-tighter sm:text-6xl lg:text-7xl">
                The Future of <br />
                <span className="text-brand-gradient font-light italic">
                  Moroccan Fashion
                </span>
              </h3>
              <p className="mx-auto max-w-lg text-lg font-light leading-relaxed text-muted-foreground/80 sm:text-xl lg:mx-0">
                Building the first professional AI Visual Studio tailored for
                the unique aesthetic and scale of modern fashion commerce in
                Morocco.
              </p>
            </div>

            <div className="mx-auto max-w-lg space-y-4 text-left lg:mx-0">
              {features.map((f, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                  key={f.title}
                  className="group flex items-start gap-6 rounded-3xl border border-white/5 bg-secondary/5 p-6 transition-all duration-500 hover:bg-secondary/10"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-aq-blue/5 transition-all duration-500 group-hover:scale-110 group-hover:bg-aq-blue/10">
                    <f.icon className="h-6 w-6 text-aq-blue/80" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-4">
                      <h4 className="text-lg font-medium tracking-tight text-foreground">
                        {f.title}
                      </h4>
                      <span className="rounded-full border border-aq-blue/20 bg-aq-blue/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-widest text-aq-blue">
                        {f.status}
                      </span>
                    </div>
                    <p className="text-sm font-light leading-relaxed text-muted-foreground/70">
                      {f.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center pt-4 lg:justify-start">
              <button
                onClick={() =>
                  document
                    .getElementById('product-preview')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="group flex items-center gap-3 rounded-full bg-aq-blue px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-aq-blue/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-aq-blue/40"
              >
                <Eye className="h-4 w-4 transition-transform group-hover:scale-110" />
                <span>Explore Interactive Preview</span>
              </button>
            </div>
          </motion.div>

          {/* Typographic Art Media Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-1 mx-auto w-full max-w-md lg:order-2 lg:max-w-none"
          >
            <div className="glass-strong group relative flex aspect-[4/5] flex-col items-center justify-center overflow-hidden rounded-[3rem] border-white/5 p-8 text-center shadow-2xl sm:rounded-[4rem] sm:p-12">
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-aq-blue/5 to-transparent opacity-50 transition-opacity duration-1000 group-hover:opacity-100" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative z-10 mt-12 space-y-8"
              >
                <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-[2rem] border border-white/10 bg-gradient-to-br from-aq-blue/20 to-aq-blue/5 shadow-inner transition-transform duration-700 group-hover:scale-105 sm:h-24 sm:w-24">
                  <Sparkles
                    className="h-10 w-10 text-aq-blue sm:h-12 sm:w-12"
                    strokeWidth={1.5}
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="font-display text-3xl font-light italic tracking-tight text-white/90 sm:text-4xl">
                    Phase Three
                  </h4>
                  <h5 className="bg-brand-gradient bg-clip-text font-display text-xl font-bold tracking-tight text-transparent sm:text-2xl">
                    Studio Engine
                  </h5>
                </div>

                <p className="mx-auto max-w-[280px] text-sm font-light leading-relaxed text-muted-foreground/60 sm:text-base">
                  A revolutionary workspace designed exclusively for high-end
                  fashion commerce.
                </p>
              </motion.div>

              {/* Minimalist Grid Pattern */}
              <div
                className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                  backgroundSize: '32px 32px',
                }}
              />

              {/* Timeline Indicator - Redesigned for elegance */}
              <div className="absolute bottom-12 left-0 right-0 z-10 px-12">
                <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    initial={{ width: '0%' }}
                    whileInView={{ width: '66%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                    className="absolute left-0 top-0 h-full bg-aq-blue shadow-[0_0_10px_rgba(37,99,235,0.8)]"
                  />
                </div>
                <div className="mt-6 flex justify-between px-1">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-aq-blue opacity-80">
                    Phase 1
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-aq-blue opacity-80">
                    Phase 2
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground opacity-50">
                    Phase 3
                  </span>
                </div>
              </div>
            </div>

            {/* Floating accent badge */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -right-6 -top-6 z-20 flex h-24 w-24 flex-col items-center justify-center rounded-full border border-white/10 bg-background/80 shadow-2xl backdrop-blur-xl sm:-right-8 sm:-top-8 sm:h-32 sm:w-32"
            >
              <span className="mb-1 font-display text-[10px] font-medium uppercase tracking-widest text-muted-foreground sm:text-xs">
                Status
              </span>
              <span className="font-display text-sm font-bold uppercase tracking-tighter text-aq-blue sm:text-base">
                Alpha
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
