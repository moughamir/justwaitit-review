'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Camera, Share2, ShoppingBag, LayoutList } from 'lucide-react';

import { Section, SectionContainer } from '@/components/ui/section';
import { GradientText, SectionHeader } from '@/components/ui/section-header';
import { fadeUp, fadeUpCard } from '@/lib/motion';

const painPoints = [
  { text: 'Product launches.', icon: Camera },
  { text: 'Social media campaigns.', icon: Share2 },
  { text: 'E-commerce catalogs.', icon: ShoppingBag },
  { text: 'Marketplace listings.', icon: LayoutList },
];

export function ProblemSection() {
  const reduced = useReducedMotion();

  return (
    <Section id="problem">
      <SectionContainer>
        <SectionHeader eyebrow="The Challenge" className="text-center">
          Fashion Content Demand.
          <br /> Is <GradientText>Exploding</GradientText>.
        </SectionHeader>

        <div className="mt-8 grid gap-8 text-muted-foreground sm:grid-cols-2">
          <motion.div {...fadeUp(reduced)} className="space-y-4">
            <p className="text-lg leading-relaxed">
              Fashion brands today need an enormous volume of visuals.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {painPoints.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.text}
                    {...fadeUpCard(reduced, i)}
                    className="flex items-center gap-3 rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-3 backdrop-blur-sm transition-all duration-300 hover:border-aq-blue/20 hover:bg-white/[0.07]"
                  >
                    <Icon
                      className="h-4 w-4 flex-shrink-0 text-aq-blue"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium text-foreground">
                      {item.text}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div {...fadeUp(reduced, 0.15)} className="space-y-4">
            <p className="text-lg leading-relaxed">
              But traditional production wasn&apos;t built for this speed.
            </p>
            <p className="text-sm leading-7">
              Photoshoots require studios, models, logistics, and
              post-production — making them expensive, slow, and difficult to
              scale. For emerging designers and growing brands, this creates a
              bottleneck between creative vision and commercial growth.
            </p>
            <p className="border-l-2 border-aq-blue/25 pl-4 font-serif text-sm italic">
              Fashion is art. Commerce requires optimization.
            </p>
          </motion.div>
        </div>
      </SectionContainer>
    </Section>
  );
}
