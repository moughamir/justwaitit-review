'use client';

import { useTranslations } from 'next-intl';

import { SocialLinks } from './SocialLinks';

import { Link } from '@/i18n/routing';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="border-t border-white/[0.06] px-4 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8">
        {/*
          <Link href="/" aria-label="Anaqio Home">
            <AnaqioTypographyLogo className="w-20 opacity-60" variant="none" />
          </Link>
          Logo */}

        {/* Tagline */}
        <p className="max-w-md text-center font-serif text-sm/6 text-white/40">
          {t('desc')}
        </p>

        {/* Social links */}
        <SocialLinks />

        {/* Legal links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-white/30">
          <Link
            href="/privacy"
            className="transition-colors hover:text-white/60"
          >
            {t('company.privacy')}
          </Link>
          <Link href="/terms" className="transition-colors hover:text-white/60">
            {t('company.terms')}
          </Link>
          <Link
            href="/legal-mentions"
            className="transition-colors hover:text-white/60"
          >
            {t('company.legal')}
          </Link>
          <Link
            href="/cookies"
            className="transition-colors hover:text-white/60"
          >
            {t('company.cookies')}
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-xs text-white/20">
          {t('copyright')} · {t('rights')}
        </div>
      </div>
    </footer>
  );
}
