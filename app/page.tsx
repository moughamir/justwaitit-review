import dynamic from 'next/dynamic';

import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import AbstractBackground from '@/components/ui/AbstractBackground';

const ProblemSection = dynamic(
  () =>
    import('@/components/sections/ProblemSection').then(
      (mod) => mod.ProblemSection
    ),
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
    <main className="relative bg-background text-foreground selection:bg-aq-blue/20">
      <AbstractBackground />
      <Header />
      <div className="overflow-y-auto scroll-smooth lg:h-screen lg:snap-y lg:snap-mandatory">
        <div className="lg:snap-start">
          <HeroSection />
        </div>
        <div className="lg:snap-start">
          <ProblemSection />
        </div>
        {/*
        <div className="lg:snap-start">
          <ProductPreviewSection />
        </div>
        <div className="lg:snap-start">
          <DemoSection />
        </div>
        <div className="lg:snap-start">
          <ComingSoonSection />
        </div>
        <div className="lg:snap-start">
          <SocialProofSection />
        </div> 
        */}
        <div className="lg:snap-start">
          <WaitlistSection />
        </div>
        <Footer />
      </div>
    </main>
  );
}
