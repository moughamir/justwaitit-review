import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Legal Mentions — Anaqio",
  description: "Legal Mentions for Anaqio, a virtual studio for fashion commerce.",
};

export default function LegalMentionsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body selection:bg-aq-blue/20">
      <Header />
      
      <main className="relative pt-32 pb-24 px-6 noise-overlay">
        <div className="max-w-3xl mx-auto">
          <header className="mb-16 pb-12 border-b border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-aq-blue" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-aq-blue">
                Corporate Identity
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold font-display tracking-tight mb-4">
              Legal Mentions
            </h1>
            <p className="text-xl font-display italic text-muted-foreground mb-6">Mentions Légales</p>
            <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
              Last Updated: Feb 21, 2026
            </div>
          </header>

          <div className="bg-secondary/30 border-l-2 border-aq-blue p-6 mb-12 rounded-r-xl">
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong className="text-foreground font-bold">Mandatory Disclosure.</strong> In accordance with{" "}
              <strong className="text-aq-blue">Law No. 53-05</strong> on the Electronic Exchange of Legal
              Data and applicable Moroccan commercial legislation, the following
              information is published for all users of this platform.
            </p>
          </div>

          <article className="space-y-12">
            <section className="bg-secondary/20 p-8 rounded-[2rem] border border-border/50 space-y-6 shadow-sm">
              <h2 className="text-2xl font-bold font-display tracking-tight text-foreground border-b border-border/30 pb-4">
                1. Publisher / Éditeur
              </h2>
              <div className="grid gap-4 text-sm">
                {[
                  ["Company", "Anaqio Studio"],
                  ["Structure", "SARL au capital de 10,000 MAD"],
                  ["Headquarters", "Casablanca, Morocco"],
                  ["Registration", "RC Casablanca n° PENDING"],
                  ["Tax ID / IF", "n° PENDING"],
                  ["ICE", "PENDING"],
                  ["CNSS", "PENDING"],
                ].map(([label, value]) => (
                  <div key={label} className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-2 sm:gap-8">
                    <span className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold pt-1">{label}</span>
                    <span className="text-foreground font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-secondary/20 p-8 rounded-[2rem] border border-border/50 space-y-6 shadow-sm">
              <h2 className="text-2xl font-bold font-display tracking-tight text-foreground border-b border-border/30 pb-4">
                2. Responsibility
              </h2>
              <div className="grid gap-4 text-sm">
                {[
                  ["Director", "Amal Ait Oukharaz"],
                  ["Contact", "legal@anaqio.com"],
                ].map(([label, value]) => (
                  <div key={label} className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-2 sm:gap-8">
                    <span className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold pt-1">{label}</span>
                    <span className={label === "Contact" ? "text-aq-blue font-bold" : "text-foreground font-semibold"}>{value}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-secondary/20 p-8 rounded-[2rem] border border-border/50 space-y-6 shadow-sm">
              <h2 className="text-2xl font-bold font-display tracking-tight text-foreground border-b border-border/30 pb-4">
                3. Hosting / Hébergement
              </h2>
              <div className="grid gap-4 text-sm">
                {[
                  ["Provider", "Vercel Inc."],
                  ["Address", "440 N Barranca Ave #4133, Covina, CA 91723"],
                  ["Website", "www.vercel.com"],
                ].map(([label, value]) => (
                  <div key={label} className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-2 sm:gap-8">
                    <span className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold pt-1">{label}</span>
                    <span className="text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="p-8 space-y-6">
              <h2 className="text-3xl font-bold font-display tracking-tight text-foreground">
                4. Intellectual Property
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                The entire content of this site — including but not limited to
                graphics, images, texts, videos, and AI models — is the exclusive property of
                <strong className="text-foreground"> Anaqio Studio</strong>. Any reproduction, distribution, or 
                publication, even partial, is strictly prohibited without express written consent.
              </p>
              <div className="bg-aq-blue/5 border border-aq-blue/20 p-6 rounded-2xl">
                <p className="text-xs text-muted-foreground font-medium leading-relaxed italic">
                  For legal inquiries or notification of illicit content, please contact the legal department at legal@anaqio.com.
                </p>
              </div>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}