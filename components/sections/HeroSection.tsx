'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import heroModelImage from '@/public/images/hero-model.png';

import { Button } from '../ui/button';
import PerspectiveGrid from '../ui/PerspectiveGrid';

const content = {
  headline: {
    pre: 'Visual Infrastructure',
    pro: 'for Fashion Commerce',
  },
  subheadline: {
    lineA:
      'Transform garments into photorealistic campaign visuals in minutes — not weeks.',
    libeB: 'Anaqio optimizes fashion art for scalable commerce.',
  },
  supportLine: {
    words: ['designers', 'brands', 'agencies'],
  },
  cta: {
    act: 'Start Creating',
    learn: 'See How It Works',
  },
};
export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWordIndex(
        (prev) => (prev + 1) % content.supportLine.words.length
      );
    }, 2500);

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
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearInterval(wordInterval);
    };
  }, []);

  const primaryCta = content.cta.act;
  const secondaryCta = content.cta.learn;
  const headlineA = (
    <>
      {content.headline.pre}
      <br />
      <span className="text-brand-gradient animate-gradient w-full font-serif font-light italic">
        {content.headline.pro}.
      </span>
    </>
  );

  return (
    <section
      ref={containerRef}
      className="relative flex max-h-screen min-h-screen flex-col justify-center overflow-hidden pb-16 pt-28 sm:px-12 lg:px-20"
    >
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_-10%,rgba(37,99,235,0.12)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(148,163,184,0.15),transparent_20%)]" />
      </div>
      <div className="relative z-20 mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 flex w-full flex-col items-start gap-10 lg:order-1 lg:pb-24">
          {/**
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600 backdrop-blur-sm">
            <Sparkles className="h-3 w-3 text-aq-blue" /> Early Access Open
          </span>
           */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              suppressHydrationWarning
              className="leading font-display text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[6rem]"
            >
              {headlineA}
            </h1>

            <p className="max-w-xl text-lg font-light leading-relaxed text-muted-foreground sm:text-xl md:text-2xl">
              {content.subheadline.lineA}
              <br />
              {content.subheadline.libeB}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:items-center sm:gap-8"
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
              variant="secondary"
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
          </motion.div>

          <div className="text-shadow max-w-[85vw] text-justify text-xs font-bold leading-relaxed tracking-[0.2em] text-neutral-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] sm:max-w-2xl sm:text-xs">
            Built for{' '}
            <span className="relative inline-flex justify-center text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
              <span className="invisible">designers</span>
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={currentWordIndex}
                  initial={{ y: 15, opacity: 0, filter: 'blur(2px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -15, opacity: 0, filter: 'blur(2px)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="absolute left-0 top-0 w-full text-center"
                >
                  {content.supportLine.words[currentWordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>{' '}
            who need consistent, brand-safe visuals at scale.
          </div>
          {/**
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-3 mt-4 w-full">
            <div className="bg-white/40 backdrop-blur-sm p-4 border border-border/60 rounded-xl">
              <div className="flex items-center gap-2 font-semibold text-sm">
                <Timer className="w-4 h-4 text-aq-blue" /> 30-min Turnarounds
              </div>
              <p className="mt-1 text-muted-foreground text-xs">
                Idea to lookbook before coffee cools.
              </p>
            </div>
            <div className="bg-white/40 backdrop-blur-sm p-4 border border-border/60 rounded-xl">
              <div className="flex items-center gap-2 font-semibold text-sm">
                <PiggyBank className="w-4 h-4 text-aq-blue" /> 15,000+ MAD Saved
              </div>
              <p className="mt-1 text-muted-foreground text-xs">
                Cut studio, models, and set costs.
              </p>
            </div>
            <div className="bg-white/40 backdrop-blur-sm p-4 border border-border/60 rounded-xl">
              <div className="flex items-center gap-2 font-semibold text-sm">
                <Sparkles className="w-4 h-4 text-aq-blue" /> Casablanca Private
                Beta
              </div>
              <p className="mt-1 text-muted-foreground text-xs">
                Limited to 200 early brands.
              </p>
            </div>
          </div>
           */}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative order-1 mx-auto w-full max-w-[500px] overflow-visible lg:order-2 lg:max-w-[600px] xl:max-w-[700px]"
          ref={mediaRef}
          style={{ transform: `translateY(${parallax}px)` }}
        >
          {/* Aspect ratio container */}
          <div
            className="relative w-full"
            style={{ paddingBottom: '125%' /* 4:5 aspect ratio */ }}
          >
            <Image
              src={heroModelImage}
              alt="Editorial fashion photography generated by Anaqio AI, featuring a model in a purple checkered suit"
              fill
              className="object-cover object-center"
              priority
              placeholder="blur"
              quality={85}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Elegant overlay to blend the image into the light theme */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </div>

          <div className="absolute left-4 top-4 z-10 flex items-center justify-between mix-blend-difference">
            <span className="font-mono text-xs tracking-widest text-white/70 shadow-sm">
              AQ-AI-V1.0
            </span>
          </div>
        </motion.div>
      </div>
      <div className="bg-brand-diag pointer-events-none absolute inset-x-0 bottom-0 z-10 h-64 w-full bg-purple-500 font-semibold text-white shadow-md hover:shadow-lg">
        <PerspectiveGrid />
      </div>
    </section>
  );
}
