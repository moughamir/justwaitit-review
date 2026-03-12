'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

import { AnaqioTypographyLogo } from '@/components/ui/anaqio-typography-logo';
import { useDeviceTier } from '@/hooks/use-device-tier';
import {
  getConnectionTier,
  getBytesDecoded,
  getBytesTransferred,
  getSafetyTimeout,
  resolveStage,
} from '@/lib/loading-stages';
import { ease } from '@/lib/motion';
import { cn } from '@/lib/utils';

// ─── Component ───────────────────────────────────────────────────────────────
export default function Loading() {
  const t = useTranslations('loading');
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const reduced = useReducedMotion();
  const tier = useDeviceTier();
  const animated = !reduced && tier !== 'low';
  const rafRef = useRef<number>(0);
  const current = useRef(0);

  useEffect(() => {
    const conn = getConnectionTier();
    const safetyMs = getSafetyTimeout(tier, conn);

    // lerp speed: faster connections feel snappier
    const lerpSpeed =
      conn === 'fast' ? 0.09 : conn === 'moderate' ? 0.07 : 0.05;

    // ── Smooth eased animation toward target ──────────────────────────────
    const animateTo = (to: number, onDone?: () => void) => {
      cancelAnimationFrame(rafRef.current);
      if (!animated) {
        current.current = to;
        setProgress(to);
        onDone?.();
        return;
      }
      const tick = () => {
        const gap = to - current.current;
        if (Math.abs(gap) > 0.15) {
          current.current += gap * lerpSpeed;
          setProgress(Math.round(current.current));
          rafRef.current = requestAnimationFrame(tick);
        } else {
          current.current = to;
          setProgress(to);
          onDone?.();
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    const complete = () =>
      animateTo(100, () => setTimeout(() => setVisible(false), 350));

    // ── Initial jump — faster for faster connections ───────────────────────
    const initialJump = conn === 'fast' ? 28 : conn === 'moderate' ? 18 : 10;
    animateTo(initialJump);

    // ── Real-time resource tracking via bytes ─────────────────────────────
    // We track decoded bytes (actual render weight) as a ratio of the
    // expected total. The expected total grows as more resources arrive.
    let expectedTotalBytes = 0;

    const updateFromResources = () => {
      const transferred = getBytesTransferred();
      const decoded = getBytesDecoded();

      // Keep a high-water mark of expected total
      expectedTotalBytes = Math.max(expectedTotalBytes, decoded, transferred);

      if (expectedTotalBytes > 0 && transferred > 0) {
        // Byte-ratio progress, capped at 85 to leave room for render work
        const ratio = Math.min(0.85, transferred / expectedTotalBytes);
        const byteProgress = Math.round(
          initialJump + ratio * (85 - initialJump)
        );
        if (byteProgress > current.current) animateTo(byteProgress);
      } else {
        // Fallback: count-based with connection-tuned baseline
        const baseline = conn === 'fast' ? 18 : conn === 'moderate' ? 12 : 8;
        const entries = performance.getEntriesByType('resource').length;
        const countProgress = Math.min(
          85,
          current.current + (entries / baseline) * 25
        );
        if (countProgress > current.current) animateTo(countProgress);
      }
    };

    let po: PerformanceObserver | null = null;
    try {
      po = new PerformanceObserver(() => updateFromResources());
      po.observe({ type: 'resource', buffered: true });
    } catch {
      // PerformanceObserver not supported
    }

    // ── DOM lifecycle milestones ──────────────────────────────────────────
    const onReadyState = () => {
      if (document.readyState === 'interactive' && current.current < 40)
        animateTo(40);
      if (document.readyState === 'complete') animateTo(90);
    };
    document.addEventListener('readystatechange', onReadyState);
    onReadyState();

    // ── Web fonts resolved (blocks first paint) ───────────────────────────
    document.fonts?.ready.then(() => {
      if (current.current < 85) animateTo(85);
    });

    // ── window.onload (all sub-resources including images) ────────────────
    if (document.readyState === 'complete') {
      complete();
    } else {
      window.addEventListener('load', complete, { once: true });
    }

    // ── Adaptive safety net ───────────────────────────────────────────────
    const safety = setTimeout(complete, safetyMs);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('readystatechange', onReadyState);
      clearTimeout(safety);
      po?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stage = resolveStage(progress);
  const connTier = getConnectionTier();

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
            {t('tagline')}
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

            {/* Stage label + connection dot + percentage */}
            <div className="flex w-full items-center justify-between">
              <AnimatePresence mode="wait">
                <motion.span
                  key={stage.key}
                  data-atom
                  className="font-label text-[0.58rem] uppercase tracking-label text-muted-foreground/35"
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.18 }}
                >
                  {t(`stages.${stage.key}`)}
                </motion.span>
              </AnimatePresence>

              <div className="flex items-center gap-1.5">
                {/* Connection quality dot — hidden on low-tier to save paint */}
                {tier !== 'low' && (
                  <span
                    aria-label={`Connection: ${connTier}`}
                    title={connTier}
                    className={cn(
                      'inline-block h-1 w-1 rounded-full transition-colors',
                      connTier === 'fast'
                        ? 'bg-emerald-500/60'
                        : connTier === 'moderate'
                          ? 'bg-amber-500/60'
                          : 'bg-red-500/60'
                    )}
                  />
                )}
                <span
                  data-atom
                  className="font-label text-[0.58rem] tabular-nums tracking-label text-muted-foreground/35"
                >
                  {progress}%
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
