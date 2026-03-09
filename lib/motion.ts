/**
 * Shared Framer Motion animation helpers.
 *
 * Each function accepts the result of `useReducedMotion()` as its first
 * argument so that animations are disabled automatically for users who
 * prefer reduced motion.  Spread the return value directly onto any
 * `motion.*` element:
 *
 *   const reduced = useReducedMotion();
 *   <motion.div {...fadeUp(reduced)}>…</motion.div>
 */

export const ease = [0.16, 1, 0.3, 1] as const;

type Reduced = boolean | null;

/** Fade-up for section headings and large blocks. */
export const fadeUp = (reduced: Reduced, delay = 0) => ({
  initial: reduced ? false : { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, delay, ease },
});

/** Staggered fade-up for grid cards and list items. */
export const fadeUpCard = (reduced: Reduced, index = 0) => ({
  initial: reduced ? false : { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, delay: index * 0.1, ease },
});

/** Opacity-only fade for footnotes and subtle reveals. */
export const fadeIn = (reduced: Reduced, delay = 0) => ({
  initial: reduced ? false : { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease },
});

/** Horizontal slide-in for list rows (e.g. vision points). */
export const slideInLeft = (reduced: Reduced, index = 0) => ({
  initial: reduced ? false : { opacity: 0, x: -16 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, delay: index * 0.1, ease },
});
