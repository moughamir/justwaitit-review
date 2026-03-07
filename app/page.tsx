import dynamic from 'next/dynamic';

import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/sections/HeroSection';

const AbstractBackground = dynamic(
  () => import('@/components/ui/AbstractBackground').then((mod) => mod.default),
  {
    ssr: true,
  }
);

const LookbookSection = dynamic(
  () =>
    import('@/components/sections/LookbookSection').then(
      (mod) => mod.LookbookSection
    ),
  {
    ssr: true,
  }
);
const CodepenInspirationSection = dynamic(
  () =>
    import('@/components/sections/CodepenInspirationSection').then(
      (mod) => mod.CodepenInspirationSection
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
    <main
      id="main-content"
      className="relative scroll-smooth bg-background text-foreground selection:bg-aq-blue/20"
    >
      <AbstractBackground />
      <Header />
      <HeroSection />
      <LookbookSection />
      <CodepenInspirationSection />
      <WaitlistSection />
      <Footer />
    </main>
  );
}
