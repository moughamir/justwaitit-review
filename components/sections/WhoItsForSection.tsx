'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

import { useDeviceTier } from '@/hooks/use-device-tier';
import { useInterval } from '@/hooks/use-interval';
import { WhoItsForSectionText } from '@/lib/content/who-its-for';
import { slideInLeft, ease } from '@/lib/motion';

export function WhoItsForSection() {
  const { eyebrow, headline, audiences } = WhoItsForSectionText;
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const reduced = useReducedMotion();
  const tier = useDeviceTier();
  const animated = !reduced && tier !== 'low';

  useInterval(() => {
    if (!isHovered) setActive((a) => (a + 1) % audiences.length);
  }, 4000);

  const audience = audiences[active];
  const CurrentIcon = audience.icon;

  const { features } = WhoItsForSectionText;

  return (
    <section
      id="who-its-for"
      aria-labelledby="who-heading"
      className="relative flex min-h-screen flex-col justify-center px-4 pb-24 pt-32 sm:px-16 lg:pt-48"
    >
      <h2 id="who-heading" className="sr-only">
        {eyebrow}: {headline.pre} {headline.gradient}
      </h2>

      <div className="mx-auto w-full max-w-6xl">
        <p
          data-atom
          className="mb-6 font-label text-[0.65rem] uppercase tracking-label text-muted-foreground"
        >
          {eyebrow}
        </p>

        <p
          data-atom
          aria-hidden="true"
          className="mb-16 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-tight"
        >
          {headline.pre}{' '}
          <em className="text-brand-gradient not-italic">
            {headline.gradient}
          </em>
        </p>

        {/* Tab Nav */}
        <div
          role="tablist"
          className="mb-12 flex flex-wrap gap-8 border-b border-border/40"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {audiences.map((a, i) => (
            <button
              key={a.title}
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className="relative pb-4 font-label text-xs uppercase tracking-label text-muted-foreground transition-colors hover:text-foreground/80 aria-selected:text-foreground"
            >
              {a.title}
              {active === i && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 h-[2px] w-full bg-aq-blue"
                  transition={{ duration: 0.3, ease }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Canvas Panel */}
        <div
          className="relative min-h-[400px] w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={animated ? { opacity: 0, x: 40 } : false}
              animate={{ opacity: 1, x: 0 }}
              exit={animated ? { opacity: 0, x: -40 } : {}}
              transition={{ duration: 0.35, ease }}
              className="relative rounded-3xl border border-border/10 bg-card/20 p-8 sm:p-12 md:w-[70%]"
            >
              {/* Atmospheric Icon Atom - PINNED Right */}
              <motion.div
                aria-hidden="true"
                data-atom
                data-decorative
                initial={
                  animated ? { scale: 0.8, opacity: 0, rotate: -10 } : false
                }
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.6, ease }}
                className="absolute right-[-10%] top-[-20%] z-0 hidden text-aq-blue/[0.04] md:block"
                style={{ fontSize: 'clamp(8rem, 18vw, 16rem)' }}
              >
                <CurrentIcon />
              </motion.div>

              <div className="relative z-10">
                <h3
                  data-atom
                  className="mb-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-light text-foreground/90"
                >
                  {audience.title}
                </h3>
                <p
                  data-atom
                  className="mb-8 max-w-[44ch] font-body text-[0.95rem] leading-relaxed text-muted-foreground"
                >
                  {audience.body}
                </p>

                {/* Staggered Features List */}
                <div className="flex flex-col gap-4">
                  {features.map((f, i) => (
                    <motion.div
                      key={f}
                      data-atom
                      {...(animated ? slideInLeft(reduced, i) : {})}
                      className="flex items-center gap-3"
                    >
                      <div
                        className="h-1.5 w-1.5 rounded-full bg-aq-blue"
                        aria-hidden="true"
                      />
                      <span className="font-label text-xs uppercase tracking-label text-foreground/70">
                        {f}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
