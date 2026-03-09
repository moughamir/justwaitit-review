'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Store, Palette, Briefcase, LayoutGrid } from 'lucide-react';

import { FeatureCard } from '@/components/ui/feature-card';
import { Section, SectionContainer } from '@/components/ui/section';
import { GradientText, SectionHeader } from '@/components/ui/section-header';
import { fadeIn } from '@/lib/motion';

const audiences = [
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
];

export function WhoItsForSection() {
  const reduced = useReducedMotion();

  return (
    <Section id="who-its-for">
      <SectionContainer>
        <SectionHeader eyebrow="Who It's For">
          Built for the Fashion <GradientText>Ecosystem</GradientText>
        </SectionHeader>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a, i) => (
            <FeatureCard
              key={a.title}
              icon={a.icon}
              title={a.title}
              body={a.body}
              index={i}
            />
          ))}
        </div>

        <motion.p
          {...fadeIn(reduced, 0.4)}
          className="mt-8 text-sm text-muted-foreground"
        >
          Anyone producing fashion visuals at scale.
        </motion.p>
      </SectionContainer>
    </Section>
  );
}
