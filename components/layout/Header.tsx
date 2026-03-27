'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';

import { LocaleSwitcher } from '@/components/locale-switcher';
import { AnaqioTypographyLogo } from '@/components/ui/anaqio-typography-logo';
import { ScrollLink } from '@/components/ui/scroll-link';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

/* CodePen-matched cubic-bezier for the collapsing pill */
const EASE_PILL = 'cubic-bezier(0.075, 0.82, 0.165, 1)';

/* Shared fade style for pill children */
const pillChildStyle = (collapsed: boolean) => ({
  transition: `0.3s all ${EASE_PILL}`,
  transitionDelay: collapsed ? '0.2s' : '0.6s',
  opacity: collapsed ? 0 : 1,
  transform: collapsed ? 'scale(0.3)' : 'scale(1)',
});

export function Header() {
  const t = useTranslations('header');

  /* ─── Navigation data ─── */
  const SECTION_LINKS = [
    { label: t('nav.solution'), targetId: 'solution' },
    { label: t('nav.howItWorks'), targetId: 'how-it-works' },
    { label: t('nav.whyAnaqio'), targetId: 'why-anaqio' },
    { label: t('nav.vision'), targetId: 'vision' },
  ] as const;

  const PAGE_LINKS = [
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

  /* ─── State ─── */
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPillForced, setIsPillForced] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverKey, setHoverKey] = useState(0);
  const lastScrollYRef = useRef(0);
  const moreRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  /*
   * Desktop: pill is "collapsed" only when scrolled AND not force-expanded.
   * Mobile: isMenuOpen controls the dropdown independently.
   */
  const pillCollapsed = isScrolled && !isPillForced;

  /* ─── Scroll: collapse pill at 100px, close forced pill & mobile menu ─── */
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setIsScrolled(current > 100);
      lastScrollYRef.current = current;
      if (isPillForced) setIsPillForced(false);
      if (isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isPillForced, isMenuOpen]);

  /* ─── Outside click: close forced pill & "More" dropdown ─── */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setIsMoreOpen(false);
      }
      if (
        isPillForced &&
        navRef.current &&
        !navRef.current.contains(e.target as Node)
      ) {
        setIsPillForced(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isPillForced]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    setHoverKey((k) => k + 1);
  }, []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  /* Desktop hamburger: toggle pill expansion */
  const handleDesktopHamburger = useCallback(() => {
    setIsPillForced((prev) => !prev);
    setIsMoreOpen(false);
  }, []);

  /* Mobile hamburger: toggle dropdown menu */
  const handleMobileHamburger = useCallback(
    () => setIsMenuOpen((prev) => !prev),
    []
  );

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
    setIsMoreOpen(false);
    setIsPillForced(false);
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
            transitionDelay: pillCollapsed ? '0.5s' : '0.6s',
          }}
        >
          <AnaqioTypographyLogo
            key={hoverKey}
            instanceId="anaqio-header-logo"
            className={cn(
              'transition-all duration-300',
              pillCollapsed
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
        ref={navRef}
        aria-label="Main Navigation"
        className={cn(
          'pointer-events-auto relative mx-auto hidden items-center justify-center overflow-visible md:flex',
          'rounded-full border border-white/[0.06] bg-[#131b2e]/70 shadow-lg backdrop-blur-[20px]'
        )}
        style={{
          transition: `1s all ${EASE_PILL}`,
          transitionDelay: pillCollapsed ? '0.5s' : '0.2s',
          width: pillCollapsed ? '72px' : '640px',
          height: '72px',
          marginTop: pillCollapsed ? '20px' : '8px',
          touchAction: 'manipulation',
        }}
      >
        {/* Section scroll links — fade out when collapsed */}
        {SECTION_LINKS.map(({ label, targetId }) => (
          <ScrollLink
            key={targetId}
            targetId={targetId}
            className={cn(
              'whitespace-nowrap text-[13px] font-medium uppercase tracking-wider text-white/80 transition-colors hover:text-aq-gold',
              pillCollapsed && 'pointer-events-none'
            )}
            style={{
              ...pillChildStyle(pillCollapsed),
              padding: pillCollapsed ? '0' : '10px 16px',
            }}
          >
            {label}
          </ScrollLink>
        ))}

        {/* "More" dropdown — page links + legal */}
        <div
          ref={moreRef}
          className={cn('relative', pillCollapsed && 'pointer-events-none')}
          style={pillChildStyle(pillCollapsed)}
        >
          <button
            onClick={() => setIsMoreOpen((v) => !v)}
            aria-expanded={isMoreOpen}
            aria-haspopup="menu"
            className={cn(
              'flex items-center gap-1 whitespace-nowrap px-4 py-2.5 text-[13px] font-medium uppercase tracking-wider text-white/80 transition-colors hover:text-aq-gold',
              isMoreOpen && 'text-aq-gold'
            )}
          >
            {t('nav.more')}
            <ChevronDown
              size={11}
              className={cn(
                'transition-transform duration-200',
                isMoreOpen && 'rotate-180'
              )}
            />
          </button>

          <AnimatePresence>
            {isMoreOpen && !pillCollapsed && (
              <motion.div
                role="menu"
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute end-0 top-[calc(100%+0.75rem)] z-50 min-w-[200px] rounded-2xl bg-[#131b2e]/95 py-3 shadow-[0_16px_48px_rgba(0,0,0,0.4)] backdrop-blur-[20px]"
              >
                {PAGE_LINKS.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    role="menuitem"
                    onClick={() => setIsMoreOpen(false)}
                    className="block px-5 py-2 text-sm text-white/70 transition-colors hover:text-aq-gold"
                  >
                    {label}
                  </Link>
                ))}

                <div className="mt-2 pt-2">
                  <p className="mb-1 px-5 text-[10px] font-medium uppercase tracking-[0.2em] text-white/30">
                    {t('nav.legal')}
                  </p>
                  {LEGAL_LINKS.map(({ label, href }) => (
                    <Link
                      key={href}
                      href={href}
                      role="menuitem"
                      onClick={() => setIsMoreOpen(false)}
                      className="block px-5 py-1.5 text-xs text-white/50 transition-colors hover:text-aq-gold"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div
          className="h-5 w-px bg-white/10"
          style={{
            ...pillChildStyle(pillCollapsed),
            transform: pillCollapsed ? 'scale(0)' : 'scale(1)',
          }}
        />

        {/* Locale switcher */}
        <div
          className={pillCollapsed ? 'pointer-events-none' : ''}
          style={pillChildStyle(pillCollapsed)}
        >
          <LocaleSwitcher />
        </div>

        {/* Hamburger — centered inside pill, scales in when collapsed */}
        <button
          className={cn(
            'absolute inset-0 m-auto flex items-center justify-center rounded-full',
            'bg-[#131b2e]/80 backdrop-blur-[20px]',
            'outline-none',
            'cursor-pointer',
            !pillCollapsed && 'pointer-events-none'
          )}
          style={{
            width: '56px',
            height: '56px',
            transition: `0.3s all ${EASE_PILL}`,
            transitionDelay: pillCollapsed ? '0.6s' : '0.2s',
            transform: pillCollapsed ? 'scale(1)' : 'scale(0)',
          }}
          onClick={handleDesktopHamburger}
          aria-label={t('menu.aria')}
          aria-expanded={isPillForced}
        >
          <div className="flex flex-col gap-[5px]">
            <span
              className="mx-auto block h-[2px] w-5 bg-white"
              style={{
                transition: `0.6s transform ${EASE_PILL}`,
                transitionDelay: pillCollapsed ? '0.8s' : '0s',
                transform: pillCollapsed ? 'scaleX(1)' : 'scaleX(0)',
              }}
            />
            <span
              className="mx-auto block h-[2px] w-5 bg-white"
              style={{
                transition: `0.6s transform ${EASE_PILL}`,
                transitionDelay: pillCollapsed ? '0.8s' : '0s',
                transform: pillCollapsed ? 'scaleX(1)' : 'scaleX(0)',
              }}
            />
          </div>
        </button>
      </nav>

      {/* ─── Mobile: glass hamburger ─── */}
      <button
        className={cn(
          'pointer-events-auto absolute end-4 top-5 flex h-11 w-11 items-center justify-center md:hidden',
          'rounded-full bg-[#131b2e]/70 shadow-lg backdrop-blur-[20px]',
          'text-white/60 transition-all duration-300 hover:text-white'
        )}
        onClick={handleMobileHamburger}
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

      {/* ─── Mobile dropdown menu ─── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto mx-auto mt-3 max-w-sm rounded-2xl bg-[#131b2e]/95 p-5 shadow-[0_16px_48px_rgba(0,0,0,0.4)] backdrop-blur-[20px] md:hidden"
          >
            <div className="flex flex-col gap-1 text-sm font-medium">
              {/* Section scroll links */}
              {SECTION_LINKS.map(({ label, targetId }) => (
                <a
                  key={targetId}
                  href={`#${targetId}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(targetId);
                  }}
                  className="rounded-xl px-4 py-2.5 text-white/70 transition-colors hover:bg-white/[0.05] hover:text-aq-gold"
                >
                  {label}
                </a>
              ))}

              {/* Lime CTA */}
              <button
                className="mt-3 w-full rounded-full bg-gradient-to-r from-aq-lime to-[#a8d700] py-3 text-sm font-bold uppercase tracking-wider text-aq-ink transition-opacity hover:opacity-90"
                onClick={() => scrollTo('final-cta')}
                aria-label={t('button.waitlist')}
              >
                {t('button.waitlist')}
              </button>

              {/* Page links */}
              <div className="mt-3 pt-3">
                {PAGE_LINKS.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="block rounded-xl px-4 py-2.5 text-white/70 transition-colors hover:bg-white/[0.05] hover:text-aq-gold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>

              {/* Legal */}
              <div className="mt-2 pt-2">
                <p className="mb-1 px-4 text-[10px] font-medium uppercase tracking-[0.2em] text-white/25">
                  {t('nav.legal')}
                </p>
                {LEGAL_LINKS.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="block rounded-xl px-4 py-2 text-xs text-white/40 transition-colors hover:bg-white/[0.05] hover:text-aq-gold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>

              {/* Locale */}
              <div className="mt-3 flex justify-center pt-3">
                <LocaleSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
