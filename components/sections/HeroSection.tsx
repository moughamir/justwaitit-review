'use client';

import { ArrowDownRight } from 'lucide-react';
import { useRef } from 'react';

import { Button } from '../ui/button';

// Refined, slower cinematic animations
// const containerVariants = { // Removed as per instruction
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.25,
//       delayChildren: 0.2, // Reduced delay to speed up LCP
//     },
//   },
// };

// const fadeUpVariants = { // Removed as per instruction
//   hidden: { opacity: 0, y: 30 }, // Removed heavy blur filter, reduced y travel
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
//   },
// };

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="hero-gradient relative flex min-h-screen snap-start flex-col justify-center overflow-hidden px-6 py-24 sm:px-12 lg:px-20"
      style={{ transform: 'translateZ(0)' }} // GPU Acceleration
    >
      {/* Immersive background effects */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/50" />
        {/* Reduced blur radius for performance */}
        <div className="absolute right-0 top-0 h-[80vh] w-[80vw] rounded-full bg-aq-blue/5 opacity-50 mix-blend-screen blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[50vh] w-[50vw] rounded-full bg-purple-500/5 opacity-30 mix-blend-screen blur-3xl" />
      </div>

      {/* Main Content Container - Golden Grid Layout */}
      <div
        ref={contentRef}
        className="relative z-20 mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-16 lg:grid-cols-[1.618fr_1fr] lg:gap-24"
      >
        {/* Primary Fraction (1.618) - Core Messaging */}
        <div className="flex flex-col items-start gap-12 lg:gap-16">
          <div className="flex w-full flex-col gap-8">
            <h1 className="text-balance font-display text-4xl font-bold leading-[0.95] tracking-tighter sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              Skip the Studio. <br />
              <span className="bg-gradient-to-r from-aq-blue to-purple-400 bg-clip-text font-serif font-light italic tracking-normal text-transparent">
                Ship the Collection.
              </span>
            </h1>

            <p className="max-w-xl text-lg font-light leading-relaxed text-muted-foreground/80 sm:text-xl md:text-2xl">
              Stop paying 5,000–20,000 MAD for unpredictable photoshoots.
              Anaqio's AI replaces expensive sets and models so you can style
              and launch your next campaign today.
            </p>
          </div>

          <div className="flex flex-col items-start gap-6 pt-4 sm:flex-row sm:items-center sm:gap-10">
            <div className="group cursor-pointer">
              <Button
                variant={'brand'}
                onClick={() =>
                  document
                    .getElementById('waitlist')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                aria-label="Get Early Access to Anaqio"
                className="group flex items-center gap-4 rounded-bl-3xl rounded-tr-3xl py-8 text-sm font-bold uppercase tracking-[0.2em] text-background transition-all duration-700 hover:bg-aq-blue hover:text-white"
              >
                <span>Secure Beta Access</span>
                <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-background/10 transition-colors group-hover:bg-white/20">
                  <div className="transform transition-transform duration-500 ease-in-out group-hover:translate-x-1 group-hover:animate-bounce">
                    <ArrowDownRight className="h-4 w-4" />
                  </div>
                </div>
              </Button>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-aq-blue">
                Only 200 Spots
              </span>
              <span className="font-serif text-sm italic text-muted-foreground">
                Takes 30 seconds
              </span>
            </div>
          </div>
        </div>

        {/* Golden Fraction (1) - Structured Negative Space / Interactive Element */}
        <div className="relative hidden h-full flex-col items-end justify-center delay-500 duration-1000 animate-in fade-in slide-in-from-bottom-8 fill-mode-both lg:flex">
          {/* Typographic Art & Negative Space */}
          <div className="glass-strong group relative flex aspect-[3/4] w-full max-w-[400px] flex-col justify-between overflow-hidden rounded-[3rem] border border-white/5 p-12 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-aq-blue/10 to-transparent opacity-0 transition-opacity duration-1000 group-hover:opacity-100" />

            <div className="z-10 flex w-full items-start justify-between">
              <span className="font-mono text-xs text-muted-foreground/50">
                SYS.01
              </span>
              <span className="font-mono text-xs text-muted-foreground/50">
                AQ-CORE
              </span>
            </div>

            <div className="z-10 space-y-4">
              <h3 className="font-serif text-5xl italic leading-none text-white/90">
                Fluid
                <br />
                <span className="bg-gradient-to-r from-white to-white/50 bg-clip-text font-display text-4xl font-bold uppercase not-italic tracking-tighter text-transparent">
                  Reality
                </span>
              </h3>
              <div className="h-[1px] w-12 bg-aq-blue shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
              <p className="max-w-[200px] text-sm font-light tracking-wide text-muted-foreground/70">
                Physics-based lighting and structural fabric AI simulations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
