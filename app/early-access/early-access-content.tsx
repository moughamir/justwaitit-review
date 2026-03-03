"use client";

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WaitlistForm } from "@/components/sections/waitlist-form";

export function EarlyAccessContent() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body selection:bg-aq-blue/20">
      <Header />
      
      <main className="noise-overlay">
        {/* HERO */}
        <section className="relative min-h-screen flex items-center px-6 pt-20 overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 relative z-10">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-aq-blue" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-aq-blue">
                  Early Access · 2026
                </span>
              </div>
              
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold font-display tracking-tight leading-[0.9]">
                Fashion&apos;s <br />
                <span className="text-brand-gradient">Virtual Studio</span> <br />
                <span className="italic font-normal">powered by AI.</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-md leading-relaxed font-body">
                Anaqio provides a professional AI-driven workspace to create, 
                stage, and sell fashion — without traditional production overhead.
              </p>

              <div className="max-w-md relative">
                <WaitlistForm source="early-access-hero" variant="simple" />
                <p className="mt-4 text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
                  By joining you agree to our <Link href="/privacy" className="text-foreground underline">Privacy</Link> & <Link href="/terms" className="text-foreground underline">Terms</Link>
                </p>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="aspect-[4/5] bg-secondary/20 rounded-[3rem] border border-white/5 relative overflow-hidden group shadow-2xl">
                <div className="absolute inset-0 bg-brand-gradient opacity-10 group-hover:opacity-20 transition-opacity duration-700" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border border-aq-blue/20 flex items-center justify-center animate-glow">
                    <div className="w-24 h-24 rounded-full border border-aq-purple/20 animate-pulse flex items-center justify-center font-display font-bold text-[10px] text-center tracking-widest uppercase text-aq-blue">
                      Studio<br/>Layer
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-12 left-12 space-y-2">
                  <div className="h-px w-12 bg-white/20" />
                  <p className="text-xs uppercase tracking-[0.4em] font-bold text-white/40">Visual Engine v1.0</p>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-aq-ink border border-white/10 flex items-center justify-center shadow-xl animate-float">
                <span className="font-display font-bold text-aq-blue text-xs tracking-tighter">AI-D</span>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="py-24 border-y border-border/50">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              ["10×", "Faster Content Creation"],
              ["90%", "Lower Production Cost"],
              ["∞", "Creative Freedom"],
              ["01", "Unified Studio Platform"],
            ].map(([num, label]) => (
              <div key={label} className="space-y-2">
                <div className="text-5xl font-bold font-display tracking-tighter text-foreground">{num}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-aq-blue">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto bg-aq-ink rounded-[3rem] p-12 lg:p-24 border border-white/5 shadow-2xl relative overflow-hidden text-center space-y-12">
            <div className="absolute inset-0 bg-brand-gradient opacity-5 pointer-events-none" />
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight leading-tight relative z-10">
              Be first to enter <br />
              the <span className="text-brand-gradient">future of fashion</span>.
            </h2>
            
            <div className="max-w-md mx-auto relative z-10 space-y-6">
              <WaitlistForm source="early-access-cta" variant="simple" className="flex-col sm:flex-row" />
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Limited slots available for v1.0</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
