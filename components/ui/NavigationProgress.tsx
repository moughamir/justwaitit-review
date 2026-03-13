'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { usePathname } from '@/i18n/routing';

/**
 * Dispatched on the window BEFORE router.push() is called so the bar can
 * start during the actual navigation wait (chunk fetch, server round-trip)
 * rather than after the route has already committed.
 *
 * Import and dispatch this from usePageTransition or any imperative
 * navigation call site.
 */
export const NAV_START_EVENT = 'anaqio:nav:start' as const;

/**
 * Thin gradient progress bar at the top of the viewport.
 *
 * Lifecycle:
 *  1. `anaqio:nav:start` event fires (navigation intent, before commit)
 *     → bar appears and eases to 80 %
 *  2. `usePathname()` changes (route committed, new page rendered)
 *     → bar completes to 100 %, then fades out
 *
 * This ensures users see feedback during the actual wait, not just a
 * post-render flash.
 */
export function NavigationProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number>(0);
  const currentRef = useRef(0);
  const prevPathname = useRef(pathname);
  const hideTimer = useRef<NodeJS.Timeout | undefined>(undefined);
  const isNavigating = useRef(false);

  // ── Helpers ──────────────────────────────────────────────────────────
  const animateTo = (target: number, onDone?: () => void) => {
    cancelAnimationFrame(rafRef.current);
    const tick = () => {
      const gap = target - currentRef.current;
      if (Math.abs(gap) > 0.4) {
        currentRef.current += gap * 0.11;
        setProgress(Math.round(currentRef.current));
        rafRef.current = requestAnimationFrame(tick);
      } else {
        currentRef.current = target;
        setProgress(target);
        onDone?.();
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const complete = () => {
    isNavigating.current = false;
    animateTo(100, () => {
      hideTimer.current = setTimeout(() => {
        setVisible(false);
        currentRef.current = 0;
        setProgress(0);
      }, 380);
    });
  };

  // ── Phase 1: listen for navigation intent (before route commit) ───────
  useEffect(() => {
    const onNavStart = () => {
      if (isNavigating.current) return; // already in progress
      isNavigating.current = true;

      cancelAnimationFrame(rafRef.current);
      clearTimeout(hideTimer.current);

      currentRef.current = 0;

      setProgress(0);

      setVisible(true);

      // Immediate jump + ease to 80 % (leaves room for completion)
      requestAnimationFrame(() => {
        currentRef.current = 25;
        setProgress(25);
        animateTo(80);
      });
    };

    window.addEventListener(NAV_START_EVENT, onNavStart);
    return () => window.removeEventListener(NAV_START_EVENT, onNavStart);
  }, []);

  // ── Phase 2: complete when the new route renders ───────────────────────
  useEffect(() => {
    if (pathname === prevPathname.current) return;
    prevPathname.current = pathname;

    if (isNavigating.current) {
      // Navigation was properly initiated — complete
      complete();
    } else {
      // Browser back/forward or programmatic push without event dispatch
      // (e.g. direct router.push call) — show a quick flash instead
      isNavigating.current = true;

      setVisible(true);
      currentRef.current = 60;

      setProgress(60);
      complete();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // ── Safety: clean up on unmount ───────────────────────────────────────
  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(hideTimer.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="nav-progress"
          aria-hidden="true"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          className="pointer-events-none fixed left-0 right-0 top-0 z-[300] h-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, delay: 0.15 } }}
        >
          {/* Glow */}
          <motion.div
            className="bg-brand-gradient absolute inset-y-0 left-0 h-[4px] -translate-y-px rounded-full opacity-60 blur-sm"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          />
          {/* Fill */}
          <motion.div
            className="bg-brand-gradient absolute inset-0 left-0 rounded-r-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          />
          {/* Leading shimmer dot */}
          <motion.div
            className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-aq-purple/80 blur-[3px]"
            animate={{ left: `${progress}%` }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
