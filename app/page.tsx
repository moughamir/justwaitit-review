import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ProductPreviewSection } from "@/components/sections/ProductPreviewSection";
import { DemoSection } from "@/components/sections/DemoSection";
import { ComingSoonSection } from "@/components/sections/ComingSoonSection";
import { SocialProofSection } from "@/components/sections/SocialProofSection";
import { WaitlistSection } from "@/components/sections/WaitlistSection";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import AbstractBackground from "@/components/ui/AbstractBackground";

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
