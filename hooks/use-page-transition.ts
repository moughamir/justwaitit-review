'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useTransition } from 'react';

/**
 * Wraps Next.js navigation in React's `startTransition` so the current page
 * stays interactive while the new page loads (no blocking UI freeze).
 *
 * Also opts into the View Transition API when available, enabling the
 * CSS-based slide/crossfade animations defined in globals.css.
 *
 * Usage:
 *   const { navigate, isPending, prefetch } = usePageTransition();
 *   <button onClick={() => navigate('/about')}>About</button>
 */
export function usePageTransition() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const navigate = useCallback(
    (href: string) => {
      if (
        typeof document !== 'undefined' &&
        'startViewTransition' in document
      ) {
        // View Transition API: animates between old and new DOM states using
        // the keyframes registered in globals.css (vt-slide-out / vt-slide-in)
        (
          document as Document & {
            startViewTransition: (cb: () => void) => void;
          }
        ).startViewTransition(() => {
          startTransition(() => {
            router.push(href);
          });
        });
      } else {
        startTransition(() => {
          router.push(href);
        });
      }
    },

    [router]
  );

  const prefetch = useCallback(
    (href: string) => router.prefetch(href),
    [router]
  );

  return { navigate, isPending, prefetch };
}
