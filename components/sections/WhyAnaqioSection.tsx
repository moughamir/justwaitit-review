'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Ruler, Move3D, Sun, Zap, ShieldCheck } from 'lucide-react';

import { FeatureCard } from '@/components/ui/feature-card';
import { Section, SectionContainer } from '@/components/ui/section';
import { GradientText, SectionHeader } from '@/components/ui/section-header';
import { fadeIn } from '@/lib/motion';

const points = [
  {
    title: 'Garment Precision',
    body: 'Faithful reproduction of textures, cuts, colors, and brand details.',
    icon: Ruler,
  },
  {
    title: 'Controlled Poses',
    body: 'Consistent positioning across product collections.',
    icon: Move3D,
  },
  {
    title: 'Lighting Consistency',
    body: 'Uniform lighting that preserves accurate color representation.',
    icon: Sun,
  },
  {
    title: 'Scalable Production',
    body: 'Generate hundreds of visuals without increasing production costs.',
    icon: Zap,
  },
  {
    title: 'Brand-Safe Outputs',
    body: 'Structured AI pipelines designed for fashion brands — not experimental image generation.',
    icon: ShieldCheck,
  },
];

export function WhyAnaqioSection() {
  const reduced = useReducedMotion();

  return (
    <Section id="why-anaqio" className="bg-background">
      <SectionContainer>
        <SectionHeader eyebrow="Product Benefits">
          Why <GradientText>Anaqio</GradientText> is Better?
        </SectionHeader>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {points.map((p, i) => (
            <FeatureCard
              key={p.title}
              icon={p.icon}
              title={p.title}
              body={p.body}
              index={i}
            />
          ))}
        </div>

        <motion.p
          {...fadeIn(reduced, 0.5)}
          className="mt-8 text-sm text-muted-foreground"
        >
          Anaqio is built for reliability, consistency, and scale.
        </motion.p>
      </SectionContainer>
    </Section>
  );
}
