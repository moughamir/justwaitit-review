import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Anaqio — AI Visual Studio for Fashion Commerce',
    short_name: 'Anaqio',
    description: 'AI Visual Studio empowering fashion brands with cutting-edge digital tools.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F8FAFC',
    theme_color: '#2563EB',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
