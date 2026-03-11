import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-aq-blue/5 blur-[100px]" />

      <div className="glass-strong animate-border-glitch ease-smooth relative w-full max-w-md space-y-8 rounded-[2.5rem] border border-white/5 p-12 text-center duration-700 animate-in fade-in slide-in-from-bottom-8">
        {/* Animated 404 Number with Glitch Effect */}
        <div className="relative z-10 mx-auto w-fit select-none">
          <div className="relative inline-block">
            {/* Main Text */}
            <span className="text-brand-gradient relative z-10 font-display text-[8rem] font-black leading-none tracking-tighter">
              404
            </span>
            {/* Glitch Layer 1 */}
            <span
              className="text-brand-gradient absolute inset-0 z-20 font-display text-[8rem] font-black leading-none tracking-tighter opacity-80 mix-blend-screen"
              style={{
                animation: 'glitch-1 2.5s infinite linear alternate-reverse',
              }}
              aria-hidden="true"
            >
              404
            </span>
            {/* Glitch Layer 2 */}
            <span
              className="text-brand-gradient absolute inset-0 z-20 font-display text-[8rem] font-black leading-none tracking-tighter opacity-80 mix-blend-screen"
              style={{
                animation: 'glitch-2 3s infinite linear alternate-reverse',
              }}
              aria-hidden="true"
            >
              404
            </span>
          </div>
          {/* Enhanced Glow */}
          <div className="animate-hero-glow pointer-events-none absolute inset-0 rounded-full bg-aq-blue/20 mix-blend-screen blur-[3rem]" />
        </div>

        <div className="relative z-10 space-y-3">
          <h1 className="font-display text-3xl font-bold italic tracking-tight text-foreground">
            System Anomaly
          </h1>
          <p className="text-sm font-medium leading-relaxed text-muted-foreground/80">
            This space does not exist in our current simulation. It may have
            been moved, renamed, or is still rendering in the void.
          </p>
        </div>

        <div className="relative z-10 flex flex-col gap-3 pt-4">
          <Button
            asChild
            variant="brand"
            className="h-12 rounded-xl font-bold transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_2rem_-0.5rem_rgba(37,99,235,0.4)]"
          >
            <Link href="/">Return to Reality</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="text-xs font-bold uppercase tracking-widest text-muted-foreground transition-all hover:text-foreground"
          >
            <Link href="/#waitlist">Access Waitlist</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
