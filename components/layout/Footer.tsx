import { getTranslations } from 'next-intl/server';

import { SocialLinks } from './SocialLinks';

import { AnaqioTypographyLogo } from '@/components/ui/anaqio-typography-logo';
import { AnaqioLogo } from '@/components/ui/AnaqioLogo';
import { Link } from '@/i18n/routing';

export async function Footer() {
  const t = await getTranslations('footer');

  const footerColumns = [
    {
      titleKey: 'platform.title',
      links: [
        { labelKey: 'platform.studio', href: '/early-access' },
        { labelKey: 'platform.lookbook', href: '/early-access' },
        { labelKey: 'platform.tryon', href: '/early-access' },
        { labelKey: 'platform.pricing', href: '/early-access' },
      ],
    },
    {
      titleKey: 'resources.title',
      links: [
        { labelKey: 'resources.brand', href: '/brand' },
        { labelKey: 'resources.blog', href: '/blog' },
        { labelKey: 'resources.help', href: '/help' },
      ],
    },
    {
      titleKey: 'company.title',
      links: [
        { labelKey: 'company.about', href: '/about' },
        {
          labelKey: 'company.early',
          href: '/early-access',
          badgeKey: 'company.badge',
        },
        { labelKey: 'company.privacy', href: '/privacy' },
        { labelKey: 'company.terms', href: '/terms' },
        { labelKey: 'company.legal', href: '/legal-mentions' },
        { labelKey: 'company.cookies', href: '/cookies' },
      ],
    },
  ];

  return (
    <div className="px-4 pt-20">
      <footer className="bg-brand-gradient mx-auto w-full max-w-[1350px] overflow-x-hidden rounded-tl-3xl rounded-tr-3xl px-4 pt-8 text-aq-white backdrop-blur-sm sm:px-8 md:px-16 lg:px-28 lg:pt-12">
        {/* ── Top Section ─────────────────────────────────────── */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:gap-12 lg:grid-cols-6">
          {/* Brand Column */}
          <div className="space-y-6 lg:col-span-3">
            <Link href="/" aria-label="Anaqio — AI Fashion Studio Home" className="block group">
              <div className="transition-transform duration-300 group-hover:scale-105">
                <AnaqioLogo theme="dark" className="w-48" />
              </div>
            </Link>

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-aq-blue/80">
                AI Fashion Studio
              </p>
              <p className="max-w-96 font-serif text-sm/6 text-neutral-400">
                {t('desc')}
              </p>
            </div>

            <SocialLinks />
          </div>

          {/* Link Columns */}
          <div className="grid grid-cols-2 items-start gap-8 md:grid-cols-3 md:gap-12 lg:col-span-3 lg:gap-16">
            {footerColumns.map((col) => (
              <div key={col.titleKey}>
                <h3 className="mb-4 text-sm font-medium">
                  {t(col.titleKey as never)}
                </h3>
                <ul className="space-y-3 text-sm text-neutral-300">
                  {col.links.map((link) => (
                    <li key={link.labelKey} className="flex items-center gap-2">
                      <Link
                        href={link.href}
                        className="transition-colors duration-200 hover:text-neutral-100"
                      >
                        {t(link.labelKey as never)}
                      </Link>
                      {link.badgeKey && (
                        <span className="rounded-full border border-aq-blue/40 bg-aq-blue/5 px-2 py-0.5 text-[11px] text-aq-blue">
                          {t(link.badgeKey as never)}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom Bar + Giant Outlined Brand Text ──────────── */}
        <div className="relative mx-auto mt-12 max-w-7xl pb-36 pt-4">
          {/* Giant Outlined Brand Text — decorative watermark behind copyright */}
          <AnaqioTypographyLogo
            variant="outline"
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-0 mx-auto w-1/2 select-none opacity-[0.07] [user-drag:none]"
          />

          {/* Copyright bar */}
          <div className="relative z-10 flex flex-col items-start gap-2 border-t border-white/10 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-neutral-400">{t('copyright')}</p>
            <p className="text-sm text-neutral-400">{t('rights')}</p>
            <p className="text-[11px] text-neutral-500">Crafted with precision in Casablanca 🇲🇦</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
