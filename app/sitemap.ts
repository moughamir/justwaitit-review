import { type MetadataRoute } from 'next';

import { locales } from '@/i18n/config';

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'https://anaqio.com';
};

const ROUTES = [
  { path: '', changeFrequency: 'daily' as const, priority: 1.0 },
  { path: '/early-access', changeFrequency: 'weekly' as const, priority: 0.9 },
  { path: '/brand', changeFrequency: 'monthly' as const, priority: 0.8 },
  { path: '/about', changeFrequency: 'monthly' as const, priority: 0.7 },
  { path: '/contact', changeFrequency: 'monthly' as const, priority: 0.6 },
  { path: '/terms', changeFrequency: 'yearly' as const, priority: 0.3 },
  { path: '/privacy', changeFrequency: 'yearly' as const, priority: 0.3 },
  { path: '/cookies', changeFrequency: 'yearly' as const, priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const lastModified = new Date();

  return locales.flatMap((locale) =>
    ROUTES.map(({ path, changeFrequency, priority }) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified,
      changeFrequency,
      priority,
    }))
  );
}
