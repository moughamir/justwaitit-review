import { type MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'Anaqio — AI Visual Studio for Fashion Commerce',
    short_name: 'Anaqio',
    description:
      'AI Visual Studio empowering fashion brands with cutting-edge digital tools.',
    lang: 'en',
    dir: 'ltr',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#F8FAFC',
    theme_color: '#2563EB',
    categories: ['art', 'design', 'photo', 'productivity', 'business'],
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      // Optional: add PNG icons when available under /public/icons
      // { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      // { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      // { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
    ],
    shortcuts: [
      {
        name: 'Join Waitlist',
        short_name: 'Waitlist',
        description: 'Jump to the early-access waitlist form',
        url: '/#waitlist',
      },
      {
        name: 'Brand',
        short_name: 'Brand',
        description: 'Explore brand guidelines and assets',
        url: '/brand',
      },
      {
        name: 'Early Access',
        short_name: 'Early',
        description: 'Learn about the private beta',
        url: '/early-access',
      },
    ],
    screenshots: [
      {
        src: '/opengraph-image.png',
        sizes: '1200x630',
        type: 'image/png',
        form_factor: 'wide',
      },
    ],
  };
}
