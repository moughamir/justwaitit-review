'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

/**
 * Thin gradient progress bar that appears at the very top of the viewport
 * during client-side route transitions. Mirrors the design of the full-page
 * loading screen (brand gradient, glow layer) but is non-blocking.
 */
export function NavigationProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number>(0);
  const currentRef = useRef(0);
  const prevPathname = useRef(pathname);
  const doneTimer = useRef<NodeJS.Timeout | undefined>(undefined);
  const hideTimer = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    // Only fire when the path actually changes (ignore search/hash-only changes)
    if (pathname === prevPathname.current) return;
    prevPathname.current = pathname;

    // Cancel any in-flight animation
    cancelAnimationFrame(rafRef.current);
    clearTimeout(doneTimer.current);
    clearTimeout(hideTimer.current);

    // Reset and show
    currentRef.current = 0;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(0);

    setVisible(true);

    const animateTo = (target: number, onDone?: () => void) => {
      cancelAnimationFrame(rafRef.current);
      const tick = () => {
        const gap = target - currentRef.current;
        if (Math.abs(gap) > 0.4) {
          currentRef.current += gap * 0.12;
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

    // Jump to 30% immediately (page transition started)
    requestAnimationFrame(() => {
      currentRef.current = 30;
      setProgress(30);
      // Ease to 85% while Next.js fetches the new segment
      animateTo(85);
    });

    // pathname changing means the new page rendered — complete after a short
    // delay to let the animation feel intentional (not instant)
    doneTimer.current = setTimeout(() => {
      animateTo(100, () => {
        hideTimer.current = setTimeout(() => {
          setVisible(false);
          currentRef.current = 0;
          setProgress(0);
        }, 400);
      });
    }, 200);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(doneTimer.current);
      clearTimeout(hideTimer.current);
    };
  }, [pathname]);

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
          {/* Glow layer */}
          <motion.div
            className="bg-brand-gradient absolute inset-y-0 left-0 h-[4px] -translate-y-px rounded-full opacity-60 blur-sm"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          />
          {/* Sharp fill */}
          <motion.div
            className="bg-brand-gradient absolute inset-0 left-0 rounded-r-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          />
          {/* Leading edge shimmer dot */}
          <motion.div
            className="absolute right-0 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-aq-purple/80 blur-[3px]"
            animate={{ left: `${progress}%` }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
