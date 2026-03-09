import { FeatureCard } from '@/components/ui/feature-card';
import { Section, SectionContainer } from '@/components/ui/section';
import { GradientText, SectionHeader } from '@/components/ui/section-header';
import { HowItWorksSectionText } from '@/lib/content/how-it-works';

export function HowItWorksSection() {
  const { eyebrow, headline, steps } = HowItWorksSectionText;

  return (
    <Section id="how-it-works">
      <SectionContainer>
        <SectionHeader eyebrow={eyebrow}>
          {headline.pre} <GradientText>{headline.gradient}</GradientText>{' '}
          {headline.post}
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
