import dynamic from 'next/dynamic';

import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { PhilosophySection } from '@/components/sections/PhilosophySection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { SolutionSection } from '@/components/sections/SolutionSection';
import { VisionSection } from '@/components/sections/VisionSection';
import { WhoItsForSection } from '@/components/sections/WhoItsForSection';
import { WhyAnaqioSection } from '@/components/sections/WhyAnaqioSection';

const AbstractBackground = dynamic(
  () => import('@/components/ui/AbstractBackground').then((mod) => mod.default),
  {
    ssr: true,
  }
);

const WaitlistSection = dynamic(
  () =>
    import('@/components/sections/WaitlistSection').then(
      (mod) => mod.WaitlistSection
    ),
  {
    ssr: true,
  }
);
const Footer = dynamic(
  () => import('@/components/layout/Footer').then((mod) => mod.Footer),
  {
    ssr: true,
  }
);

export default function Home() {
  return (
    <main
      id="main-content"
      className="relative scroll-smooth bg-background text-foreground selection:bg-aq-blue/20"
    >
      <AbstractBackground />
      <Header />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <WhyAnaqioSection />
      <WhoItsForSection />
      <PhilosophySection />
      <VisionSection />
      <WaitlistSection />
      <Footer />
    </main>
  );
}
