"use client";

import { motion } from "framer-motion";
import { Sparkles, Layers, Eye } from "lucide-react";

const features = [
  {
    title: "AI Studio Alpha",
    desc: "A professional workspace for high-end fashion editing.",
    icon: Layers,
    status: "In Development",
  },
  {
    title: "Virtual Try-On",
    desc: "Hyper-realistic garment draping on AI models.",
    icon: Sparkles,
    status: "Q2 2026",
  }
];

export function ComingSoonSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 snap-start overflow-hidden py-24 sm:py-32">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-12 text-center lg:text-left order-2 lg:order-1"
          >
            <div className="space-y-6">
              <h2 className="text-xs sm:text-sm font-bold text-aq-blue uppercase tracking-[0.4em] opacity-80">Coming Soon</h2>
              <h3 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tighter font-display leading-[1.1]">
                The Future of <br />
                <span className="text-brand-gradient italic font-light">Moroccan Fashion</span>
              </h3>
              <p className="text-lg sm:text-xl text-muted-foreground/80 leading-relaxed font-light max-w-lg mx-auto lg:mx-0">
                Building the first professional AI Visual Studio tailored for the unique aesthetic and scale of modern fashion commerce in Morocco.
              </p>
            </div>

            <div className="space-y-4 max-w-lg mx-auto lg:mx-0 text-left">
              {features.map((f, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                  key={f.title}
                  className="flex items-start gap-6 p-6 rounded-3xl border border-white/5 bg-secondary/5 hover:bg-secondary/10 transition-all duration-500 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-aq-blue/5 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-aq-blue/10 transition-all duration-500">
                    <f.icon className="w-6 h-6 text-aq-blue/80" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-4">
                      <h4 className="font-medium text-foreground text-lg tracking-tight">{f.title}</h4>
                      <span className="text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-aq-blue/10 text-aq-blue font-semibold border border-aq-blue/20">
                        {f.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground/70 font-light leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start pt-4">
              <button
                onClick={() => document.getElementById('product-preview')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center gap-3 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] bg-aq-blue text-white shadow-lg shadow-aq-blue/20 hover:shadow-aq-blue/40 transition-all duration-500 hover:-translate-y-1"
              >
                <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Explore Interactive Preview</span>
              </button>
            </div>
          </motion.div>

          {/* Typographic Art Media Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-1 lg:order-2 w-full max-w-md mx-auto lg:max-w-none"
          >
            <div className="aspect-[4/5] rounded-[3rem] sm:rounded-[4rem] overflow-hidden glass-strong border-white/5 shadow-2xl relative flex flex-col items-center justify-center p-8 sm:p-12 text-center group">

              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-aq-blue/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative z-10 space-y-8 mt-12"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-aq-blue/20 to-aq-blue/5 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner border border-white/10 group-hover:scale-105 transition-transform duration-700">
                  <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-aq-blue" strokeWidth={1.5} />
                </div>

                <div className="space-y-4">
                  <h4 className="text-3xl sm:text-4xl font-light font-display italic tracking-tight text-white/90">
                    Phase Three
                  </h4>
                  <h5 className="text-xl sm:text-2xl font-bold font-display tracking-tight bg-clip-text text-transparent bg-brand-gradient">
                    Studio Engine
                  </h5>
                </div>

                <p className="text-sm sm:text-base text-muted-foreground/60 leading-relaxed max-w-[280px] mx-auto font-light">
                  A revolutionary workspace designed exclusively for high-end fashion commerce.
                </p>
              </motion.div>

              {/* Minimalist Grid Pattern */}
              <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}
              />

              {/* Timeline Indicator - Redesigned for elegance */}
              <div className="absolute bottom-12 left-0 right-0 px-12 z-10">
                <div className="h-[2px] w-full bg-white/5 rounded-full relative overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    whileInView={{ width: "66%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                    className="absolute top-0 left-0 h-full bg-aq-blue shadow-[0_0_10px_rgba(37,99,235,0.8)]"
                  />
                </div>
                <div className="flex justify-between mt-6 px-1">
                  <span className="text-[9px] font-bold text-aq-blue uppercase tracking-[0.2em] opacity-80">Phase 1</span>
                  <span className="text-[9px] font-bold text-aq-blue uppercase tracking-[0.2em] opacity-80">Phase 2</span>
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.2em] opacity-50">Phase 3</span>
                </div>
              </div>
            </div>

            {/* Floating accent badge */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-background/80 backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center shadow-2xl z-20"
            >
              <span className="font-display font-medium text-muted-foreground text-[10px] sm:text-xs tracking-widest uppercase mb-1">Status</span>
              <span className="font-display font-bold text-aq-blue text-sm sm:text-base tracking-tighter uppercase">Alpha</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
