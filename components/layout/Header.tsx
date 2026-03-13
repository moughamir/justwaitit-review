'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';

import { LocaleSwitcher } from '@/components/locale-switcher';
import { AnaqioTypographyLogo } from '@/components/ui/anaqio-typography-logo';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

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

  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverKey, setHoverKey] = useState(0);
  const lastScrollYRef = useRef(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const legalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      const prev = lastScrollYRef.current;
      const isScrollingDown = current > prev && current > 80;

      setIsHidden(isScrollingDown);
      setIsScrolled(current > 40);
      lastScrollYRef.current = current;

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      if (isScrollingDown) {
        scrollTimeoutRef.current = setTimeout(() => {
          setIsHidden(false);
        }, 1000);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

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

  const linkClass = cn(
    'transition-all duration-500 hover:text-aq-blue',
    isScrolled ? 'text-xs' : 'text-sm'
  );

  return (
    <header
      className={cn(
        'ease-smooth pointer-events-none fixed left-0 right-0 top-0 z-50 p-2 transition-all duration-500',
        'animate-in fade-in slide-in-from-top-full fill-mode-both',
        isHidden
          ? '-translate-y-[120px] opacity-0'
          : 'translate-y-0 opacity-100',
        isScrolled ? 'py-2' : 'py-4'
      )}
      style={{ viewTransitionName: 'site-header' }}
    >
      <nav
        aria-label="Main Navigation"
        className={cn(
          'ease-smooth pointer-events-auto mx-auto flex max-w-5xl items-center justify-between rounded-xl border border-border/40 bg-background/40 shadow-md backdrop-blur-xl backdrop-saturate-150 transition-[padding,opacity,transform,box-shadow] duration-500',
          isScrolled ? 'px-3 py-2 sm:px-5' : 'px-4 py-3 sm:px-6'
        )}
        style={{ touchAction: 'manipulation' }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center"
          aria-label={t('logo.aria')}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ viewTransitionName: 'site-logo' }}
        >
          <AnaqioTypographyLogo
            key={hoverKey}
            className={cn(
              'ease-smooth transition-all duration-500',
              isScrolled ? 'w-24' : 'w-32'
            )}
            variant={isHovered ? 'outline-fill' : 'none'}
          />
          <span className="sr-only">anaqio</span>
        </Link>

        {/* Desktop links */}
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden items-center gap-4 text-sm font-medium text-foreground/70 md:flex">
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={href} href={href} className={linkClass}>
                {label}
              </Link>
            ))}

            {/* Legal dropdown */}
            <div ref={legalRef} className="relative">
              <button
                onClick={() => setIsLegalOpen((v) => !v)}
                aria-expanded={isLegalOpen}
                aria-haspopup="menu"
                className={cn(
                  'flex items-center gap-1 transition-all duration-500 hover:text-aq-blue',
                  isScrolled ? 'text-xs' : 'text-sm',
                  isLegalOpen && 'text-aq-blue'
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
                {isLegalOpen && (
                  <motion.div
                    role="menu"
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-[180px] rounded-xl border border-border/40 bg-background/95 py-2 shadow-xl backdrop-blur-xl"
                  >
                    {LEGAL_LINKS.map(({ label, href }) => (
                      <Link
                        key={href}
                        href={href}
                        role="menuitem"
                        onClick={() => setIsLegalOpen(false)}
                        className="block px-4 py-2 text-xs text-foreground/70 transition-colors hover:bg-secondary/40 hover:text-aq-blue"
                      >
                        {label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <Button
            variant="brand"
            className={cn(
              'mr-1 rounded backdrop-blur-xl transition-all duration-500 sm:mr-2',
              isScrolled ? 'text-xs' : 'text-sm'
            )}
            onClick={() => {
              document
                .getElementById('waitlist')
                ?.scrollIntoView({ behavior: 'smooth' });
              setIsMobileMenuOpen(false);
            }}
            aria-label={t('button.waitlist')}
          >
            {t('button.waitlist')}
          </Button>

          <LocaleSwitcher />

          <button
            className="flex items-center justify-center p-1 text-foreground/70 transition-colors hover:text-aq-blue md:hidden"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={t('menu.aria')}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto absolute left-4 right-4 top-[calc(100%+0.5rem)] rounded-xl border border-border/40 bg-background/95 p-4 shadow-xl backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 text-sm font-medium text-foreground/70">
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-lg px-3 py-2 transition-colors hover:bg-secondary/40 hover:text-aq-blue"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}

              {/* Legal section */}
              <div className="mt-2 border-t border-border/30 pt-2">
                <p className="mb-1 px-3 text-[10px] uppercase tracking-widest text-muted-foreground">
                  {t('nav.legal')}
                </p>
                {LEGAL_LINKS.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="block rounded-lg px-3 py-2 text-xs transition-colors hover:bg-secondary/40 hover:text-aq-blue"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
