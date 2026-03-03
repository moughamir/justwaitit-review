import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/HeroSection";
import { Header } from "@/components/layout/Header";
import AbstractBackground from "@/components/ui/AbstractBackground";

const ProblemSection = dynamic(() => import("@/components/sections/ProblemSection").then((mod) => mod.ProblemSection), {
  ssr: true,
});
const WaitlistSection = dynamic(() => import("@/components/sections/WaitlistSection").then((mod) => mod.WaitlistSection), {
  ssr: true,
});
const Footer = dynamic(() => import("@/components/layout/Footer").then((mod) => mod.Footer), {
  ssr: true,
});

export default function Home() {
  return (
    <main className="relative bg-background selection:bg-aq-blue/20 text-foreground">
      <AbstractBackground />
      <Header />
      <div className="lg:h-screen overflow-y-auto scroll-smooth lg:snap-mandatory lg:snap-y">
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
