import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Anaqio",
  description:
    "Privacy Policy for Anaqio, a virtual studio for fashion commerce.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body selection:bg-aq-blue/20">
      <Header />
      
      <main className="relative pt-32 pb-24 px-6 noise-overlay">
        <div className="max-w-3xl mx-auto">
          <header className="mb-16 pb-12 border-b border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-aq-blue" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-aq-blue">
                Data Protection
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold font-display tracking-tight mb-6">
              Privacy Policy
            </h1>
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs text-muted-foreground uppercase tracking-wider font-semibold">
              <span>Effective: Feb 21, 2026</span>
              <span>Version 1.0</span>
            </div>
          </header>

          <div className="bg-secondary/30 border-l-2 border-aq-blue p-6 mb-12 rounded-r-xl">
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong className="text-foreground">Moroccan Law Compliance Notice.</strong> This Privacy
              Policy is governed by <strong className="text-aq-blue font-bold">Law No. 09-08</strong> on the Protection 
              of Individuals with regard to the Processing of Personal Data. Activities are declared to the <strong className="text-foreground">CNDP</strong>.
            </p>
          </div>

          <article className="prose prose-invert prose-aq max-w-none space-y-16">
            <section id="controller">
              <h2 className="text-3xl font-bold font-display tracking-tight mb-6">1. Data Controller</h2>
              <div className="bg-secondary/20 p-8 rounded-[2rem] border border-border/50 shadow-sm space-y-4">
                <h3 className="text-xl font-bold font-display text-foreground italic">Anaqio SARL</h3>
                <div className="grid gap-3 text-sm">
                  <p className="text-muted-foreground">Location: Casablanca, Morocco</p>
                  <p className="text-muted-foreground">Email: <a href="mailto:privacy@anaqio.com" className="text-aq-blue hover:underline">privacy@anaqio.com</a></p>
                  <p className="text-muted-foreground">CNDP Declaration: <span className="text-foreground font-mono">PENDING</span></p>
                </div>
              </div>
            </section>

            <section id="collection">
              <h2 className="text-3xl font-bold font-display tracking-tight mb-6 pt-16 border-t border-border/30">2. Personal Data We Collect</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-secondary/10 p-6 rounded-2xl border border-border/30">
                  <h3 className="text-sm uppercase tracking-widest font-bold text-aq-purple mb-4">Direct Data</h3>
                  <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                    <li>Waitlist email & names</li>
                    <li>Account credentials</li>
                    <li>Company information</li>
                    <li>Support communications</li>
                  </ul>
                </div>
                <div className="bg-secondary/10 p-6 rounded-2xl border border-border/30">
                  <h3 className="text-sm uppercase tracking-widest font-bold text-aq-blue mb-4">Automated Data</h3>
                  <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                    <li>IP Addresses & Device ID</li>
                    <li>Usage patterns & session info</li>
                    <li>Browser configurations</li>
                    <li>Error logs</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="rights">
              <h2 className="text-3xl font-bold font-display tracking-tight mb-6 pt-16 border-t border-border/30">3. Your Rights</h2>
              <p className="text-muted-foreground mb-8">Under Law 09-08, you hold the following fundamental rights:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  ["Right of Access", "Request a copy of all personal data we hold about you."],
                  ["Right to Rectification", "Request correction of inaccurate or incomplete data."],
                  ["Right to Erasure", "Request deletion of data no longer necessary for purposes."],
                  ["Right to Object", "Object to processing for marketing or legitimate interests."],
                ].map(([title, desc]) => (
                  <div key={title} className="p-6 bg-secondary/20 rounded-xl border border-border/50">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-foreground mb-2">{title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="contact">
              <h2 className="text-3xl font-bold font-display tracking-tight mb-6 pt-16 border-t border-border/30">14. Contact</h2>
              <div className="bg-secondary/50 p-8 rounded-2xl border border-border/50">
                <h3 className="text-xl font-bold font-display mb-4">Data Protection Officer</h3>
                <p className="text-muted-foreground mb-2">Email: <a href="mailto:privacy@anaqio.com" className="text-aq-blue hover:underline">privacy@anaqio.com</a></p>
                <p className="text-muted-foreground mb-4">Address: Casablanca, Morocco</p>
                <div className="bg-aq-blue/10 p-4 rounded-xl inline-block">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-aq-blue">
                    Regulated by CNDP — www.cndp.ma
                  </p>
                </div>
              </div>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}