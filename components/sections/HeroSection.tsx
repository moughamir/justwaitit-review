"use client";

import { useRef, useEffect, useState } from "react";
import { ArrowDownRight } from "lucide-react";
import { Button } from "../ui/button";

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
      className="relative flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-24 min-h-screen overflow-hidden snap-start hero-gradient"
      style={{ transform: "translateZ(0)" }} // GPU Acceleration
    >
      {/* Immersive background effects */}
      <div className="z-0 absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/50" />
        {/* Reduced blur radius for performance */}
        <div className="top-0 right-0 absolute bg-aq-blue/5 opacity-50 blur-3xl rounded-full w-[80vw] h-[80vh] mix-blend-screen" />
        <div className="bottom-0 left-0 absolute bg-purple-500/5 opacity-30 blur-3xl rounded-full w-[50vw] h-[50vh] mix-blend-screen" />
      </div>

      {/* Main Content Container - Golden Grid Layout */}
      <div
        ref={contentRef}
        className="z-20 relative items-center gap-16 lg:gap-24 grid grid-cols-1 lg:grid-cols-[1.618fr_1fr] mx-auto w-full max-w-[1400px]"
      >
        {/* Primary Fraction (1.618) - Core Messaging */}
        <div className="flex flex-col items-start gap-12 lg:gap-16">

          <div className="flex flex-col gap-8 w-full">
            <h1
              className="font-display font-bold lg:text-[5.5rem] text-4xl sm:text-6xl md:text-7xl text-balance leading-[0.95] tracking-tighter"
            >
              Skip the Studio. <br />
              <span className="bg-clip-text bg-gradient-to-r from-aq-blue to-purple-400 font-serif font-light text-transparent italic tracking-normal">Ship the Collection.</span>
            </h1>

            <p
              className="max-w-xl font-light text-muted-foreground/80 text-lg sm:text-xl md:text-2xl leading-relaxed"
            >
              Stop paying 5,000–20,000 MAD for unpredictable photoshoots. Anaqio's AI replaces expensive sets and models so you can style and launch your next campaign today.
            </p>
          </div>

          <div
            className="flex sm:flex-row flex-col items-start sm:items-center gap-6 sm:gap-10 pt-4"
          >
            <div className="group cursor-pointer">
              <Button
                variant={"brand"}
                onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                aria-label="Get Early Access to Anaqio"
                className="group flex items-center gap-4 hover:bg-aq-blue py-8 rounded-tr-3xl rounded-bl-3xl font-bold text-background hover:text-white text-sm uppercase tracking-[0.2em] transition-all duration-700"
              >
                <span>Secure Beta Access</span>
                <div className="relative flex justify-center items-center bg-background/10 group-hover:bg-white/20 rounded-full w-8 h-8 overflow-hidden transition-colors">
                  <div className="group-hover:translate-x-1 group-hover:animate-bounce transform transition-transform duration-500 ease-in-out">
                    <ArrowDownRight className="w-4 h-4" />
                  </div>
                </div>
              </Button>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-bold text-aq-blue text-xs uppercase tracking-[0.3em]">Only 200 Spots</span>
              <span className="font-serif text-muted-foreground text-sm italic">Takes 30 seconds</span>
            </div>
          </div>
        </div>

        {/* Golden Fraction (1) - Structured Negative Space / Interactive Element */}
        <div
          className="hidden relative lg:flex flex-col justify-center items-end h-full animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both"
        >
          {/* Typographic Art & Negative Space */}
          <div className="group relative flex flex-col justify-between shadow-2xl p-12 border border-white/5 rounded-[3rem] w-full max-w-[400px] aspect-[3/4] overflow-hidden glass-strong">

            <div className="absolute inset-0 bg-gradient-to-br from-aq-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="z-10 flex justify-between items-start w-full">
              <span className="font-mono text-muted-foreground/50 text-xs">SYS.01</span>
              <span className="font-mono text-muted-foreground/50 text-xs">AQ-CORE</span>
            </div>

            <div className="z-10 space-y-4">
              <h3 className="font-serif text-white/90 text-5xl italic leading-none">
                Fluid
                <br />
                <span className="bg-clip-text bg-gradient-to-r from-white to-white/50 font-display font-bold text-transparent text-4xl not-italic uppercase tracking-tighter">Reality</span>
              </h3>
              <div className="bg-aq-blue shadow-[0_0_10px_rgba(37,99,235,0.5)] w-12 h-[1px]" />
              <p className="max-w-[200px] font-light text-muted-foreground/70 text-sm tracking-wide">
                Physics-based lighting and structural fabric AI simulations.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
