'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';

import { LocaleSwitcher } from '@/components/locale-switcher';
import { AnaqioTypographyLogo } from '@/components/ui/anaqio-typography-logo';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

/* CodePen-matched cubic-bezier for the collapsing pill */
const EASE_PILL = 'cubic-bezier(0.075, 0.82, 0.165, 1)';

export function Header() {
  const t = useTranslations('header');

  const NAV_LINKS = [
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.brand'), href: '/brand' },
    { label: t('nav.contact'), href: '/contact' },
  ] as const;

  const LEGAL_LINKS = [
    { label: t('nav.terms'), href: '/terms' },
    { label: t('nav.privacy'), href: '/privacy' },
    { label: t('nav.cookies'), href: '/cookies' },
    { label: t('nav.legalMentions'), href: '/legal-mentions' },
  ] as const;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverKey, setHoverKey] = useState(0);
  const lastScrollYRef = useRef(0);
  const legalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setIsScrolled(current > 100);
      lastScrollYRef.current = current;

      // Close menu on scroll (matches CodePen behavior)
      if (isMenuOpen) setIsMenuOpen(false);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMenuOpen]);

  /* Close legal dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (legalRef.current && !legalRef.current.contains(e.target as Node)) {
        setIsLegalOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    setHoverKey((k) => k + 1);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleHamburgerClick = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  return (
    <header className="pointer-events-none fixed left-0 right-0 top-0 z-[9999]">
      {/* ─── Logo: centered above the pill, fades on scroll ─── */}
      <div className="flex justify-center">
        <Link
          href="/"
          className="pointer-events-auto"
          aria-label={t('logo.aria')}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            viewTransitionName: 'site-logo',
            transition: `0.3s all ${EASE_PILL}`,
            transitionDelay: isScrolled ? '0.5s' : '0.6s',
          }}
        >
          <AnaqioTypographyLogo
            key={hoverKey}
            className={cn(
              'transition-all duration-300',
              isScrolled
                ? 'mt-0 w-20 scale-[0.8] opacity-0'
                : 'mt-7 w-24 opacity-100'
            )}
            variant={isHovered ? 'outline-fill' : 'none'}
          />
          <span className="sr-only">anaqio</span>
        </Link>
      </div>

      {/* ─── Desktop: collapsing pill nav ─── */}
      <nav
        aria-label="Main Navigation"
        className={cn(
          'pointer-events-auto relative mx-auto hidden items-center justify-center overflow-hidden md:flex',
          'rounded-full border border-white/[0.06] bg-white/[0.05] shadow-lg backdrop-blur-md'
        )}
        style={{
          transition: `1s all ${EASE_PILL}`,
          transitionDelay: isScrolled ? '0.5s' : '0.2s',
          width: isScrolled ? '72px' : '520px',
          height: isScrolled ? '72px' : '72px',
          marginTop: isScrolled ? '20px' : '8px',
          touchAction: 'manipulation',
        }}
      >
        {/* Nav links — fade out when collapsed */}
        {NAV_LINKS.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'whitespace-nowrap text-[15px] font-bold lowercase tracking-wider text-white',
              isScrolled && 'pointer-events-none'
            )}
            style={{
              transition: `0.3s all ${EASE_PILL}`,
              transitionDelay: isScrolled ? '0.2s' : '0.6s',
              padding: isScrolled ? '0' : '10px 20px',
              opacity: isScrolled ? 0 : 1,
              letterSpacing: isScrolled ? '0' : '2px',
              transform: isScrolled ? 'scale(0.3)' : 'scale(1)',
            }}
          >
            {label}
          </Link>
        ))}

        {/* Legal dropdown — also fades */}
        <div
          ref={legalRef}
          className={cn('relative', isScrolled && 'pointer-events-none')}
          style={{
            transition: `0.3s all ${EASE_PILL}`,
            transitionDelay: isScrolled ? '0.2s' : '0.6s',
            opacity: isScrolled ? 0 : 1,
            transform: isScrolled ? 'scale(0.3)' : 'scale(1)',
          }}
        >
          <button
            onClick={() => setIsLegalOpen((v) => !v)}
            aria-expanded={isLegalOpen}
            aria-haspopup="menu"
            className={cn(
              'flex items-center gap-1 whitespace-nowrap px-5 py-2.5 text-[15px] font-bold lowercase tracking-wider text-white transition-colors hover:text-foreground',
              isLegalOpen && 'text-foreground'
            )}
          >
            {t('nav.legal')}
            <ChevronDown
              size={12}
              className={cn(
                'transition-transform duration-200',
                isLegalOpen && 'rotate-180'
              )}
            />
          </button>

          <AnimatePresence>
            {isLegalOpen && !isScrolled && (
              <motion.div
                role="menu"
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute end-0 top-[calc(100%+0.75rem)] z-50 min-w-[180px] rounded-xl border border-white/[0.08] bg-background/95 py-2 shadow-xl backdrop-blur-xl"
              >
                {LEGAL_LINKS.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    role="menuitem"
                    onClick={() => setIsLegalOpen(false)}
                    className="block px-4 py-2 text-xs text-foreground/70 transition-colors hover:bg-secondary/40 hover:text-foreground"
                  >
                    {label}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider — fades with links */}
        <div
          className="h-5 w-px bg-white/10"
          style={{
            transition: `0.3s all ${EASE_PILL}`,
            transitionDelay: isScrolled ? '0.2s' : '0.6s',
            opacity: isScrolled ? 0 : 1,
            transform: isScrolled ? 'scale(0)' : 'scale(1)',
          }}
        />

        {/* Locale switcher — fades with links */}
        <div
          className={isScrolled ? 'pointer-events-none' : ''}
          style={{
            transition: `0.3s all ${EASE_PILL}`,
            transitionDelay: isScrolled ? '0.2s' : '0.6s',
            opacity: isScrolled ? 0 : 1,
            transform: isScrolled ? 'scale(0.3)' : 'scale(1)',
          }}
        >
          <LocaleSwitcher />
        </div>

        {/* Hamburger button — centered inside pill, scales in when collapsed */}
        <button
          className={cn(
            'absolute inset-0 m-auto flex items-center justify-center rounded-full',
            'bg-black/30 backdrop-blur-md',
            'border border-white/[0.1] outline-none',
            'cursor-pointer',
            !isScrolled && 'pointer-events-none'
          )}
          style={{
            width: '56px',
            height: '56px',
            transition: `0.3s all ${EASE_PILL}`,
            transitionDelay: isScrolled ? '0.6s' : '0.2s',
            transform: isScrolled ? 'scale(1)' : 'scale(0)',
          }}
          onClick={handleHamburgerClick}
          aria-label={t('menu.aria')}
          aria-expanded={isMenuOpen}
        >
          <div className="flex flex-col gap-[5px]">
            <span
              className="mx-auto block h-[2px] w-5 bg-white"
              style={{
                transition: `0.6s transform ${EASE_PILL}`,
                transitionDelay: isScrolled ? '0.8s' : '0s',
                transform: isScrolled ? 'scaleX(1)' : 'scaleX(0)',
              }}
            />
            <span
              className="mx-auto block h-[2px] w-5 bg-white"
              style={{
                transition: `0.6s transform ${EASE_PILL}`,
                transitionDelay: isScrolled ? '0.8s' : '0s',
                transform: isScrolled ? 'scaleX(1)' : 'scaleX(0)',
              }}
            />
          </div>
        </button>
      </nav>

      {/* ─── Mobile: always-visible circular glass hamburger ─── */}
      <button
        className={cn(
          'pointer-events-auto absolute end-4 top-5 flex h-11 w-11 items-center justify-center md:hidden',
          'rounded-full border border-white/[0.06] bg-white/[0.05] shadow-lg backdrop-blur-md',
          'text-foreground/60 transition-all duration-300 hover:border-white/20 hover:text-foreground'
        )}
        onClick={handleHamburgerClick}
        aria-label={t('menu.aria')}
        aria-expanded={isMenuOpen}
      >
        <div className="flex flex-col gap-[5px]">
          <span
            className={cn(
              'mx-auto block h-[2px] w-4 bg-white transition-all duration-300',
              isMenuOpen && 'translate-y-[3.5px] rotate-45'
            )}
          />
          <span
            className={cn(
              'mx-auto block h-[2px] w-4 bg-white transition-all duration-300',
              isMenuOpen && '-translate-y-[3.5px] -rotate-45'
            )}
          />
        </div>
      </button>

      {/* ─── Dropdown menu (shared for mobile + desktop-scrolled hamburger) ─── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto mx-auto mt-3 max-w-sm rounded-2xl border border-white/[0.08] bg-background/95 p-4 shadow-xl backdrop-blur-xl md:mt-3"
          >
            <div className="flex flex-col gap-1 text-sm font-medium text-foreground/70">
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-lg px-3 py-2 transition-colors hover:bg-secondary/40 hover:text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}

              <Button
                variant="brand"
                className="mt-2 rounded-lg text-sm"
                onClick={() => {
                  document
                    .getElementById('waitlist')
                    ?.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
                aria-label={t('button.waitlist')}
              >
                {t('button.waitlist')}
              </Button>

              {/* Legal section */}
              <div className="mt-2 border-t border-border/30 pt-2">
                <p className="mb-1 px-3 text-[10px] uppercase tracking-widest text-muted-foreground">
                  {t('nav.legal')}
                </p>
                {LEGAL_LINKS.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="block rounded-lg px-3 py-2 text-xs transition-colors hover:bg-secondary/40 hover:text-foreground"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>

              {/* Locale switcher in dropdown */}
              <div className="mt-2 flex justify-center border-t border-border/30 pt-3">
                <LocaleSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
