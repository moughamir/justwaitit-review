import { type MetadataRoute } from 'next';

import { locales } from '@/i18n/config';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://anaqio.com';

  return {
    host: baseUrl.replace(/^https?:\/\//, ''),
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/auth/',
          '/protected/',
          '/playground',
          '/api/',
          '/_next/',
          '/legal-mentions',
        ],
      },
      {
        userAgent: ['Googlebot', 'Bingbot'],
        allow: [
          '/',
          '/brand',
          '/early-access',
          '/about',
          '/contact',
          '/terms',
          '/privacy',
          '/cookies',
        ],
        disallow: ['/auth/', '/protected/', '/playground', '/legal-mentions'],
      },
      {
        userAgent: ['Twitterbot', 'FacebookExternalHit', 'LinkedInBot'],
        allow: '/',
      },
    ],
    sitemap: locales.map((locale) => `${baseUrl}/${locale}/sitemap.xml`),
  };
}
