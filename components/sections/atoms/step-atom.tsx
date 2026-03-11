import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

import { ease } from '@/lib/motion';

export function StepAtom({
  step,
  index,
  animated,
}: {
  step: { num: string; title: string; body: string };
  index: number;
  animated: boolean;
}) {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: `0px 0px -${10 + (index % 4) * 5}% 0px` as NonNullable<
      Parameters<typeof useInView>[1]
    >['margin'],
  });

  return (
    <motion.div
      ref={ref}
      data-atom
      animate={
        animated && !inView
          ? { opacity: 0.15, filter: 'blur(6px)', y: 20 }
          : { opacity: 1, filter: 'blur(0px)', y: 0 }
      }
      transition={{ duration: 0.7, ease }}
      className="flex flex-col gap-5 sm:max-w-[280px]"
    >
      <motion.span
        animate={
          animated && inView
            ? { boxShadow: '0 0 0 8px hsl(var(--primary) / 0)' }
            : {}
        }
        transition={{ duration: 1, ease: 'easeOut' }}
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-aq-blue/10 font-display font-light text-aq-blue ring-1 ring-border"
        style={{ fontSize: 'clamp(1.5rem, 2.5vw, 1.8rem)' }}
      >
        {step.num}
      </motion.span>

      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <h3 className="font-display text-[clamp(1.4rem,2.5vw,1.8rem)] font-light text-foreground">
            {step.title}
          </h3>
          <p className="font-body text-[0.95rem] leading-relaxed text-muted-foreground">
            {step.body}
          </p>
        </div>

        {/* Abstract UI Representations */}
        <div className="relative mt-4 flex h-48 w-full items-center justify-center overflow-hidden rounded-2xl border border-border/10 bg-card/5 backdrop-blur-md">
          {index === 0 && (
            <div className="flex flex-col items-center gap-3 opacity-60">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-dashed border-aq-blue/40 bg-aq-blue/5">
                <div className="h-4 w-4 rounded-sm bg-aq-blue/50" />
              </div>
              <div className="h-1.5 w-20 rounded-full bg-foreground/20" />
              <div className="h-1.5 w-12 rounded-full bg-foreground/10" />
            </div>
          )}
          {index === 1 && (
            <div className="flex w-full flex-col gap-4 px-8 opacity-60">
              <div className="h-2 w-full rounded-full bg-foreground/10">
                <div className="h-full w-2/3 rounded-full bg-aq-blue/50" />
              </div>
              <div className="h-2 w-full rounded-full bg-foreground/10">
                <div className="h-full w-1/3 rounded-full bg-aq-purple/50" />
              </div>
              <div className="flex gap-2">
                <div className="h-6 w-6 rounded-md bg-foreground/10" />
                <div className="h-6 w-6 rounded-md bg-foreground/10" />
                <div className="h-6 w-6 rounded-md border border-aq-blue/30 bg-aq-blue/10" />
              </div>
            </div>
          )}
          {index === 2 && (
            <div className="relative flex h-full w-full items-center justify-center">
              <div className="absolute h-24 w-24 animate-pulse rounded-full bg-aq-blue/20 blur-2xl" />
              <div className="z-10 h-16 w-16 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-tr from-aq-blue/20 to-aq-purple/20 backdrop-blur-xl" />
            </div>
          )}
          {index === 3 && (
            <div className="relative flex h-full w-full items-center justify-center">
              <div className="absolute left-1/2 top-1/2 h-20 w-16 -translate-x-[70%] -translate-y-[60%] rotate-[-10deg] rounded-lg border border-white/5 bg-card/40 backdrop-blur-md" />
              <div className="absolute left-1/2 top-1/2 h-20 w-16 -translate-x-[30%] -translate-y-[40%] rotate-[10deg] rounded-lg border border-white/5 bg-card/60 backdrop-blur-md" />
              <div className="absolute left-1/2 top-1/2 z-10 h-24 w-20 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-white/10 bg-card/80 shadow-2xl backdrop-blur-xl" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
