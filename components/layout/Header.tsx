'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

import { Button } from '@/components/ui/button';
import { StaticTypoLogo } from '@/components/ui/StaticTypoLogo';

export function Header() {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const scrollContainer = document.querySelector(
      '.lg\\:h-screen.lg\\:snap-y'
    ) as HTMLElement;

    if (!scrollContainer) return;

    const handleScroll = () => {
      const current = scrollContainer.scrollTop;
      const prev = lastScrollY;
      const isScrollingDown = current > prev && current > 80;

      setIsHidden(isScrollingDown);
      setLastScrollY(current);

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Show header after scroll stops
      if (isScrollingDown) {
        scrollTimeoutRef.current = setTimeout(() => {
          setIsHidden(false);
        }, 1000);
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [lastScrollY]);

  return (
    <header
      className={`pointer-events-none fixed left-0 right-0 top-0 z-50 px-4 py-4 transition-all duration-300 ease-in-out ${
        isHidden
          ? '-translate-y-[120px] opacity-0'
          : 'translate-y-0 opacity-100'
      } animate-in fade-in slide-in-from-top-full fill-mode-both`}
    >
      <nav
        aria-label="Main Navigation"
        className="glass-strong pointer-events-auto mx-auto flex max-w-5xl items-center justify-between rounded-2xl bg-neutral-100/25 px-4 py-3 backdrop-blur-sm sm:px-6"
      >
        <Link href="/" className="flex items-center" aria-label="Anaqio Home">
          <StaticTypoLogo className="h-5 w-auto sm:h-6" theme="light" />
          <span className="sr-only">anaqio</span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-8">
          <Button
            variant="ghost"
            className="backdrop-blur-xl"
            onClick={() =>
              document
                .getElementById('waitlist')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            aria-label="Scroll to Waitlist Section"
          >
            Join Waitlist
          </Button>
        </div>
      </nav>
    </header>
  );
}
