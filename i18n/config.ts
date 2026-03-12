export const locales = ['en-US', 'fr-FR', 'ar-MA'] as const;
export const defaultLocale = 'en-US' as const;
export type Locale = (typeof locales)[number];

export const rtlLocales: Locale[] = ['ar-MA'];
export const isRTL = (locale: Locale) => rtlLocales.includes(locale);

export const localeLabels: Record<Locale, string> = {
  'en-US': 'English',
  'fr-FR': 'Français',
  'ar-MA': 'العربية',
};
