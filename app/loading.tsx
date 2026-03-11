'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { AnaqioTypographyLogo } from '@/components/ui/anaqio-typography-logo';
import { useDeviceTier } from '@/hooks/use-device-tier';
import { resolveStage } from '@/lib/loading-stages';
import { ease } from '@/lib/motion';

// ─── Component ───────────────────────────────────────────────────────────────
export default function Loading() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const reduced = useReducedMotion();
  const tier = useDeviceTier();
  const animated = !reduced && tier !== 'low';
  const raf = useRef<number>(0);
  const current = useRef(0);

  useEffect(() => {
    // Smooth easing toward a target value
    const animateTo = (to: number, onDone?: () => void) => {
      cancelAnimationFrame(raf.current);
      if (!animated) {
        current.current = to;
        setProgress(to);
        onDone?.();
        return;
      }
      const tick = () => {
        const gap = to - current.current;
        if (Math.abs(gap) > 0.15) {
          current.current += gap * 0.07;
          setProgress(Math.round(current.current));
          raf.current = requestAnimationFrame(tick);
        } else {
          current.current = to;
          setProgress(to);
          onDone?.();
        }
      };
      raf.current = requestAnimationFrame(tick);
    };

    const complete = () =>
      animateTo(100, () => setTimeout(() => setVisible(false), 350));

    // Initial jump to feel immediately responsive
    animateTo(20);

    // DOM interactive (HTML parsed, sub-resources not yet loaded)
    const onReadyState = () => {
      if (document.readyState === 'interactive') animateTo(60);
      if (document.readyState === 'complete') animateTo(90);
    };
    document.addEventListener('readystatechange', onReadyState);
    onReadyState();

    // Web fonts resolved
    document.fonts?.ready.then(() => {
      if (current.current < 85) animateTo(85);
    });

    // All resources (images, scripts, styles) loaded
    if (document.readyState === 'complete') {
      complete();
    } else {
      window.addEventListener('load', complete, { once: true });
    }

    // Safety net — never hang longer than 6 s
    const safety = setTimeout(complete, 6000);

    return () => {
      cancelAnimationFrame(raf.current);
      document.removeEventListener('readystatechange', onReadyState);
      clearTimeout(safety);
    };
    // TODO: Remove this eslint-disable and update the dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stage = resolveStage(progress);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-aq-ink"
          initial={{ opacity: 1 }}
          exit={
            animated
              ? {
                  opacity: 0,
                  scale: 1.03,
                  filter: 'blur(8px)',
                  transition: { duration: 0.65, ease },
                }
              : { opacity: 0, transition: { duration: 0.3 } }
          }
        >
          {/* ── Atmospheric glows (skip on low-tier) ──────────── */}
          {tier !== 'low' && (
            <div
              data-atom
              data-decorative
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              <div className="absolute left-0 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-aq-blue/[0.06] blur-[100px]" />
              <div className="absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-aq-purple/[0.06] blur-[100px]" />
            </div>
          )}

          {/* ── Eyebrow ────────────────────────────────────────── */}
          <motion.p
            data-atom
            className="relative z-10 mb-10 font-label text-[0.6rem] uppercase tracking-label text-muted-foreground/30"
            initial={animated ? { opacity: 0, y: 8 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Digital Atelier
          </motion.p>

          {/* ── Logo with outline-fill animation ─────────────── */}
          <motion.div
            data-atom
            className="relative z-10"
            initial={animated ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <AnaqioTypographyLogo
              variant={animated ? 'outline-fill' : 'none'}
              progress={progress}
              className="min-w-screen/2 max-w-1/2 w-[80dvw] sm:w-72"
            />
          </motion.div>

          {/* ── Progress bar + stage labels ───────────────────── */}
          <motion.div
            data-atom
            className="relative z-10 mt-12 flex w-56 flex-col items-center gap-2.5 sm:w-72"
            initial={animated ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* Track */}
            <div className="relative h-px w-full overflow-hidden rounded-full bg-border/10">
              {/* Glow layer */}
              {tier !== 'low' && (
                <motion.div
                  data-atom
                  data-decorative
                  aria-hidden="true"
                  className="bg-brand-gradient absolute -top-0.5 bottom-0 left-0 h-[3px] rounded-full blur-sm"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  style={{ opacity: 0.5 }}
                />
              )}
              {/* Sharp fill */}
              <motion.div
                data-atom
                className="bg-brand-gradient absolute inset-y-0 left-0 rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              />
            </div>

            {/* Stage label + percentage */}
            <div className="flex w-full items-center justify-between">
              <AnimatePresence mode="wait">
                <motion.span
                  key={stage.label}
                  data-atom
                  className="font-label text-[0.58rem] uppercase tracking-label text-muted-foreground/35"
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.18 }}
                >
                  {stage.label}
                </motion.span>
              </AnimatePresence>

              <span
                data-atom
                className="font-label text-[0.58rem] tabular-nums tracking-label text-muted-foreground/35"
              >
                {progress}%
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
