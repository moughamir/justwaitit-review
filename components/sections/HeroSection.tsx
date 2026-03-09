'use client';

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { Button } from '../ui/button';

import heroModelImage from '@/public/images/model-t.png';

const content = {
  eyebrow: 'Visual AI for Fashion',
  headline: {
    pre: 'Visual Infrastructure',
    pro: 'for Fashion Commerce',
  },
  subheadline: {
    a: 'Transform garments into photorealistic campaign visuals in minutes — not weeks.',
    b: 'Anaqio optimizes fashion art for scalable commerce.',
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
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Image drifts up at ~60% of scroll speed → parallax depth
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWordIndex(
        (prev) => (prev + 1) % content.supportLine.words.length
      );
    }, 2500);
    return () => clearInterval(wordInterval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen flex-col overflow-hidden bg-background"
    >
      {/* ── Atmospheric background ── */}
      <div className="hero-gradient pointer-events-none absolute inset-0 z-0" />
      <div className="animated-grid pointer-events-none absolute inset-0 z-0 opacity-25" />

      {/* ── Model — absolute background layer, behind text ── */}
      <motion.div
        style={{ y: imageY }}
        className="pointer-events-none absolute inset-y-0 bottom-0 right-0 z-0 w-[57%] select-none"
        aria-hidden
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={heroModelImage}
            alt=""
            fill
            className="object-contain object-right-bottom"
            draggable={false}
            priority
            placeholder="blur"
            quality={75}
            sizes="57vw"
          />
          {/* Left-edge fade — model blends into text area */}
          <div className="absolute inset-y-0 left-0 w-[65%] bg-gradient-to-r from-background via-background/70 to-transparent" />
          {/* Bottom fade into grid band */}
          <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-background/30 to-transparent" />
        </motion.div>
      </motion.div>

      {/* ── Left editorial accent line (desktop only) ── */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ originY: 0 }}
        className="absolute left-6 top-[18%] z-10 hidden h-[40%] w-px bg-gradient-to-b from-transparent via-border to-transparent sm:left-12 lg:block"
      />

      {/* ── Text content — in front of image ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-6 pt-24 sm:px-12 lg:pl-24 lg:pr-16">
        <div className="flex max-w-[620px] flex-col gap-6">
          {/* Eyebrow — editorial line + label */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4"
          >
            <div className="h-px w-10 bg-muted-foreground/40" />
            <span className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-muted-foreground">
              {content.eyebrow}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              className="font-display leading-[1.04] tracking-tight text-foreground"
              style={{ fontSize: 'clamp(2.9rem, 5.2vw, 5.8rem)' }}
            >
              <span className="block whitespace-nowrap font-semibold">
                {content.headline.pre}
              </span>
              <span className="text-brand-gradient animate-gradient block whitespace-nowrap font-serif font-light italic">
                {content.headline.pro}.
              </span>
            </h1>
            {/* Decorative rule under headline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ originX: 0 }}
              className="mt-4 h-px w-20 bg-gradient-to-r from-border to-transparent"
            />
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[370px] text-sm leading-[1.8] text-muted-foreground sm:text-[0.93rem]"
          >
            {content.subheadline.a}
            <span className="mt-1 block opacity-75">
              {content.subheadline.b}
            </span>
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <Button
              variant="brand"
              onClick={() =>
                document
                  .getElementById('waitlist')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="group flex h-11 items-center gap-2.5 rounded-full px-7 text-[0.68rem] font-bold uppercase tracking-[0.2em]"
            >
              <span>{content.cta.act}</span>
              <ArrowDownRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </Button>
            <button
              onClick={() =>
                document
                  .getElementById('lookbook')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="group flex h-11 items-center text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="border-b border-current pb-px transition-colors">
                {content.cta.learn}
              </span>
            </button>
          </motion.div>

          {/* Animated tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/60"
          >
            Built for{' '}
            <span className="relative inline-flex justify-center">
              <span className="invisible" aria-hidden>
                agencies
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWordIndex}
                  initial={{ y: 8, opacity: 0, filter: 'blur(2px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -8, opacity: 0, filter: 'blur(2px)' }}
                  transition={{ duration: 0.22, ease: 'easeInOut' }}
                  className="text-brand-gradient absolute left-0 top-0 w-full text-center italic"
                >
                  {content.supportLine.words[currentWordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>{' '}
            who need consistent, brand-safe visuals at scale.
          </motion.p>
        </div>
      </div>

      {/* ── Bottom: brand gradient + perspective grid ── */}
      <aside className="relative z-20 h-40 w-full overflow-hidden sm:h-48">
        <div className="absolute inset-0 bg-gradient-to-r from-aq-grad-start via-aq-grad-mid2 to-aq-grad-end" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="perspective-grid mx-auto h-[160%] w-[120%]" />
        </div>
        <div className="grid-shimmer pointer-events-none absolute inset-0 opacity-20" />
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background to-transparent" />
      </aside>
    </section>
  );
}
