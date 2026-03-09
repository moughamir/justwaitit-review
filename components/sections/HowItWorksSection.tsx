import { FeatureCard } from '@/components/ui/feature-card';
import { Section, SectionContainer } from '@/components/ui/section';
import { GradientText, SectionHeader } from '@/components/ui/section-header';

const steps = [
  {
    num: '01',
    title: 'Upload Your Garment',
    body: 'Upload a flat lay or ghost mannequin image.',
  },
  {
    num: '02',
    title: 'Define the Visual Style',
    body: 'Choose poses, lighting, and environments designed for fashion campaigns.',
  },
  {
    num: '03',
    title: 'Generate Photorealistic Output',
    body: 'Our AI pipeline transforms the garment into high-quality visuals ready for e-commerce, campaigns, and social media.',
  },
  {
    num: '04',
    title: 'Scale Instantly',
    body: 'Generate multiple variations for different markets, campaigns, or product launches. Minutes — not weeks.',
  },
];

export function HowItWorksSection() {
  return (
    <Section id="how-it-works">
      <SectionContainer>
        <SectionHeader eyebrow="How It Works">
          Four Steps to <GradientText>Campaign-Ready</GradientText> Visuals
        </SectionHeader>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <FeatureCard
              key={s.num}
              label={s.num}
              title={s.title}
              body={s.body}
              index={i}
              variant="glass"
            />
          ))}
        </div>
      </SectionContainer>
    </Section>
  );
}
