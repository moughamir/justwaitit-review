import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — Anaqio",
  description:
    "Terms of Service for Anaqio, a virtual studio for fashion commerce.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body selection:bg-aq-blue/20">
      <Header />
      
      <main className="relative pt-32 pb-24 px-6 noise-overlay">
        <div className="max-w-3xl mx-auto">
          <header className="mb-16 pb-12 border-b border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-aq-blue" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-aq-blue">
                Legal Framework
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold font-display tracking-tight mb-6">
              Terms of Service
            </h1>
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs text-muted-foreground uppercase tracking-wider font-semibold">
              <span>Effective: Feb 21, 2026</span>
              <span>Version 1.0</span>
            </div>
          </header>

          <div className="bg-secondary/30 border-l-2 border-aq-blue p-6 mb-12 rounded-r-xl">
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong className="text-foreground">Moroccan Law Compliance.</strong> These Terms of Service are
              governed by and construed in accordance with Moroccan law, including{" "}
              <strong className="text-aq-blue">Law No. 53-05</strong> on Electronic Exchange of Legal Data,{" "}
              <strong className="text-aq-blue">Law No. 31-08</strong> on Consumer Protection Measures, and
              the <strong className="text-foreground">Dahir des Obligations et Contrats (DOC)</strong>.
            </p>
          </div>

          <nav className="bg-secondary/20 p-8 rounded-2xl mb-16 border border-border/50">
            <h2 className="text-sm uppercase tracking-widest font-bold text-foreground mb-6">Table of Contents</h2>
            <ol className="grid gap-3 text-sm">
              <li><a href="#acceptance" className="text-muted-foreground hover:text-aq-blue transition-colors">1. Acceptance of Terms</a></li>
              <li><a href="#definitions" className="text-muted-foreground hover:text-aq-blue transition-colors">2. Definitions</a></li>
              <li><a href="#service" className="text-muted-foreground hover:text-aq-blue transition-colors">3. Description of Service</a></li>
              <li><a href="#waitlist" className="text-muted-foreground hover:text-aq-blue transition-colors">4. Waitlist & Pre-Launch</a></li>
              <li><a href="#account" className="text-muted-foreground hover:text-aq-blue transition-colors">5. Account Registration & Security</a></li>
              <li><a href="#subscription" className="text-muted-foreground hover:text-aq-blue transition-colors">6. Subscription & Billing</a></li>
              <li><a href="#ip" className="text-muted-foreground hover:text-aq-blue transition-colors">7. Intellectual Property</a></li>
              <li><a href="#content" className="text-muted-foreground hover:text-aq-blue transition-colors">8. User Content & AI Outputs</a></li>
              <li><a href="#prohibited" className="text-muted-foreground hover:text-aq-blue transition-colors">9. Prohibited Uses</a></li>
              <li><a href="#warranties" className="text-muted-foreground hover:text-aq-blue transition-colors">10. Disclaimers & Warranties</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-aq-blue transition-colors">15. Contact</a></li>
            </ol>
          </nav>

          <article className="prose prose-invert prose-aq max-w-none space-y-16">
            <section id="acceptance">
              <h2 className="text-3xl font-bold font-display tracking-tight mb-6">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                By accessing or using Anaqio&apos;s website, platform, mobile
                application, or any associated services (collectively, the{" "}
                <strong className="text-foreground">&quot;Service&quot;</strong>), you confirm that you have
                read, understood, and agree to be bound by these Terms of Service (
                <strong className="text-foreground">&quot;Terms&quot;</strong>) and our{" "}
                <Link href="/privacy" className="text-aq-blue hover:underline">Privacy Policy</Link>.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                You must be at least <strong className="text-foreground">18 years of age</strong> to use Anaqio.
                By using the Service, you represent that you meet this minimum age
                requirement.
              </p>
            </section>

            <section id="definitions">
              <h2 className="text-3xl font-bold font-display tracking-tight mb-6 pt-16 border-t border-border/30">2. Definitions</h2>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <span className="text-aq-blue font-bold">01</span>
                  <p className="text-muted-foreground"><strong className="text-foreground">&quot;Anaqio&quot;</strong> refers to Anaqio SARL, operator of the platform.</p>
                </li>
                <li className="flex gap-4">
                  <span className="text-aq-blue font-bold">02</span>
                  <p className="text-muted-foreground"><strong className="text-foreground">&quot;AI Outputs&quot;</strong> means images, lookbooks, or other content generated by our models.</p>
                </li>
              </ul>
            </section>

            <section id="ip">
              <h2 className="text-3xl font-bold font-display tracking-tight mb-6 pt-16 border-t border-border/30">7. Intellectual Property</h2>
              <h3 className="text-xl font-semibold mb-4 italic text-aq-purple">7.1 Anaqio&apos;s IP</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                All rights, title, and interest in the Service — including but not
                limited to the software, AI models, algorithms, and design —
                are owned by or licensed to Anaqio.
              </p>
              <div className="bg-aq-blue/5 border border-aq-blue/20 p-6 rounded-xl">
                <h3 className="text-sm uppercase tracking-widest font-bold text-aq-blue mb-2">Commercial Rights</h3>
                <p className="text-sm text-muted-foreground">You may use AI Outputs for commercial purposes consistent with your subscription plan. Anaqio does not claim ownership over AI Outputs generated from your unique inputs.</p>
              </div>
            </section>

            <section id="contact">
              <h2 className="text-3xl font-bold font-display tracking-tight mb-6 pt-16 border-t border-border/30">15. Contact</h2>
              <div className="bg-secondary/50 p-8 rounded-2xl border border-border/50">
                <h3 className="text-xl font-bold font-display mb-4">Anaqio — Legal Department</h3>
                <p className="text-muted-foreground mb-2">Email: <a href="mailto:legal@anaqio.com" className="text-aq-blue hover:underline">legal@anaqio.com</a></p>
                <p className="text-muted-foreground mb-4">Address: Casablanca, Morocco</p>
                <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Response time: within 15 business days</p>
              </div>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
