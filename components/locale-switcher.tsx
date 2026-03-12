'use client';

import { useLocale } from 'next-intl';

import { isRTL, localeLabels, locales, type Locale } from '@/i18n/config';
import { usePathname, useRouter } from '@/i18n/routing';

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2 rtl:flex-row-reverse">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => router.replace(pathname, { locale: loc })}
          aria-current={loc === locale ? 'true' : undefined}
          dir={isRTL(loc as Locale) ? 'rtl' : 'ltr'}
          className={
            loc === locale
              ? 'text-xs font-semibold text-aq-blue'
              : 'text-xs text-muted-foreground transition-colors hover:text-foreground'
          }
        >
          {localeLabels[loc]}
        </button>
      ))}
    </div>
  );
}
