'use client';

import { motion } from 'framer-motion';
import { ArrowDownRight, PiggyBank, Sparkles, Timer } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

import { Button } from '../ui/button';

const content = {
  headline: {
    pre: 'Visual Infrastructure',
    pro: 'for Fashion Commerce.',
  },
  subheadline: {
    lineA:
      'Transform garments into photorealistic compaign visuals in minutes  — not weeks.',
    libeB: 'Anaqio optmizes fashion art for scalable commerce.',
  },
  supportLine:
    'Built for designers, brands, and agencies who need consistent, brannd-safe visuals at scale.',
  cta: {
    act: 'Start Creating',
    learn: 'See How it Works',
  },
};
export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState(0);
  const [videoError, setVideoError] = useState(false);
  // Variant is derived from URL/localStorage to avoid setState in effects
  const searchParams = useSearchParams();

  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    []
  );

  const variant: 'A' | 'B' = useMemo(() => {
    if (typeof window === 'undefined') return 'A';
    try {
      const urlExp = searchParams.get('expHero') ?? searchParams.get('exp');
      const upper = urlExp?.toUpperCase();
      const stored = localStorage.getItem('exp_hero_v1');
      if (upper === 'A' || upper === 'B') return upper;
      if (stored === 'A' || stored === 'B') return stored;
      // Default deterministically to 'A' on first render; effect will persist a random choice for future visits
      return 'A';
    } catch {
      return 'A';
    }
  }, [searchParams]);

  // Persist a random variant once for future visits, without triggering state
  useEffect(() => {
    try {
      const urlExp = searchParams.get('expHero') ?? searchParams.get('exp');
      const upper = urlExp?.toUpperCase();
      const stored = localStorage.getItem('exp_hero_v1');
      if (!stored && !(upper === 'A' || upper === 'B')) {
        const decide = Math.random() < 0.5 ? 'A' : 'B';
        localStorage.setItem('exp_hero_v1', decide);
      }
    } catch {}
  }, [searchParams]);

  useEffect(() => {
    const onScroll = () => {
      const el = mediaRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const center = rect.top + rect.height / 2;
      const distanceFromCenter = center - vh / 2;
      const normalized = Math.max(
        -1,
        Math.min(1, distanceFromCenter / (vh / 2))
      );
      setParallax(normalized * 20); // max 20px translate
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const primaryCta = variant === 'A' ? content.cta.act : 'Join the Beta';
  const secondaryCta = variant === 'A' ? content.cta.learn : 'See Examples';
  const headlineA = (
    <>
      {content.headline.pre}
      <br />
      <span className="bg-gradient-to-r from-aq-blue via-purple-500 to-aq-blue bg-clip-text font-serif font-light italic text-transparent">
        {content.headline.pro}
      </span>
    </>
  );
  const headlineB = (
    <>
      Studio-Quality Imagery.
      <br />
      <span className="bg-gradient-to-r from-aq-blue via-purple-500 to-aq-blue bg-clip-text font-serif font-light italic text-transparent">
        Launch 10× Faster.
      </span>
    </>
  );

  return (
    <section
      ref={containerRef}
      className="relative z-20 flex min-h-screen flex-col overflow-hidden bg-background pb-16 pt-28 sm:px-12 lg:px-20"
    >
      {/* Decorative Background: soft radial + subtle gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_-10%,rgba(37,99,235,0.12)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(148,163,184,0.15),transparent_20%)]" />
      </div>

      <div className="relative z-20 mx-auto flex w-full max-w-[1400px] flex-col-reverse items-center justify-between gap-12 lg:flex-row lg:items-end">
        {/* Left Column: Badge, Headline, CTA */}
        <div className="flex w-full flex-col items-start gap-10 lg:w-1/2 lg:pb-24">
          {/* Eyebrow badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600 backdrop-blur-sm">
            <Sparkles className="h-3 w-3 text-aq-blue" /> Early Access Open
          </span>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <h1
              suppressHydrationWarning
              className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[6rem]"
            >
              {variant === 'A' ? headlineA : headlineB}
            </h1>

            <p className="max-w-md text-lg font-light leading-relaxed text-muted-foreground sm:text-xl md:text-2xl">
              Stop paying 5K–20K MAD for photoshoots. Anaqio's AI replaces
              expensive sets and models so you can launch your campaign today.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8"
          >
            <Button
              variant="brand"
              onClick={() =>
                document
                  .getElementById('waitlist')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="group flex h-14 items-center gap-4 rounded-xl px-8 text-sm font-bold uppercase tracking-[0.2em] transition-all duration-300"
            >
              <span suppressHydrationWarning>{primaryCta}</span>
              <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-white/20 transition-colors group-hover:bg-white/30">
                <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
              </div>
            </Button>

            <Button
              variant="ghost"
              className="h-14 rounded-xl px-6 text-sm font-semibold"
              onClick={() =>
                document
                  .getElementById('lookbook')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              aria-label="Scroll to Lookbook"
            >
              <span suppressHydrationWarning>{secondaryCta}</span>
            </Button>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-aq-blue">
                Limited to 200 Brands
              </span>
              <span className="font-serif text-sm italic text-muted-foreground">
                Join in 30 seconds
              </span>
            </div>
          </motion.div>

          {/* KPIs */}
          <div className="mt-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border/60 bg-white/40 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Timer className="h-4 w-4 text-aq-blue" /> 30-min Turnarounds
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Idea to lookbook before coffee cools.
              </p>
            </div>
            <div className="rounded-xl border border-border/60 bg-white/40 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <PiggyBank className="h-4 w-4 text-aq-blue" /> 15,000+ MAD Saved
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Cut studio, models, and set costs.
              </p>
            </div>
            <div className="rounded-xl border border-border/60 bg-white/40 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Sparkles className="h-4 w-4 text-aq-blue" /> Casablanca Private
                Beta
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Limited to 200 early brands.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full overflow-visible lg:w-1/2 lg:max-w-[600px]"
          ref={mediaRef}
          style={{ transform: `translateY(${parallax}px)` }}
        >
          {/* Gradient frame with subtle glow */}
          <div className="relative rounded-[2rem] p-[2px] shadow-xl shadow-aq-blue/10 ring-1 ring-white/30">
            <div className="absolute -inset-0.5 -z-10 rounded-[2rem] bg-[conic-gradient(from_180deg_at_50%_50%,rgba(37,99,235,0.4),rgba(124,58,237,0.35),rgba(37,99,235,0.4))] opacity-40 blur-xl" />

            {/* Aspect ratio container */}
            <div
              className="relative w-full rounded-[2rem]"
              style={{ paddingBottom: '125%' }}
            >
              {/* Animated grid overlay */}
              <div className="animated-grid pointer-events-none absolute inset-0 z-10 rounded-[2rem] opacity-20" />

              {/* Video with image fallback */}
              {!prefersReducedMotion && !videoError ? (
                <video
                  className="absolute inset-0 h-full w-full rounded-[2rem] object-cover object-center"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/images/hero-model.png"
                  onError={() => setVideoError(true)}
                >
                  <source src="/videos/hero.webm" type="video/webm" />
                  <source src="/videos/hero.mp4" type="video/mp4" />
                </video>
              ) : (
                <Image
                  src="/images/hero-model.png"
                  alt="Editorial fashion photography generated by Anaqio AI, featuring a model in a purple checkered suit"
                  fill
                  className="rounded-[2rem] object-cover object-center"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              )}

              {/* Gradient overlay to blend into the background */}
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-t from-background/40 to-transparent" />
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute left-4 top-4 z-10 flex items-center justify-between mix-blend-difference">
            <span className="font-mono text-xs tracking-widest text-white/70">
              AQ-AI-V1.0
            </span>
          </div>

          {/* Floating metric card */}
          <div className="absolute -bottom-6 left-6 z-10 w-[min(80%,280px)] rounded-2xl border border-white/20 bg-white/70 p-4 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <PiggyBank className="h-4 w-4 text-aq-blue" /> Save 15,000+ MAD
            </div>
            <p className="mt-1 text-xs text-slate-600">
              Per campaign vs. traditional shoots.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
