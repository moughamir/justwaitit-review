import { Briefcase, LayoutGrid, Palette, Store } from 'lucide-react';

export const WhoItsForSectionText = {
  eyebrow: "Who It's For",
  headline: { pre: 'Built for the Fashion', gradient: 'Ecosystem' },
  footer: 'Anyone producing fashion visuals at scale.',
  audiences: [
    {
      title: 'Fashion Brands',
      body: 'Scale product visuals for e-commerce and marketing campaigns.',
      icon: Store,
    },
    {
      title: 'Emerging Designers',
      body: 'Create professional visuals without expensive photoshoots.',
      icon: Palette,
    },
    {
      title: 'Creative Studios',
      body: 'Accelerate production for client campaigns.',
      icon: Briefcase,
    },
    {
      title: 'Marketplaces',
      body: 'Standardize visual quality across large product inventories.',
      icon: LayoutGrid,
    },
  ],
} as const;
