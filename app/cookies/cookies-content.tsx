"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export function CookiePolicyContent() {
  const [preferences, setPreferences] = useState({
    analytics: false,
    functional: false,
    marketing: false,
  });
  const [showConfirm, setShowConfirm] = useState(false);

  const savePreferences = () => {
    console.log("Cookie preferences saved:", preferences);
    setShowConfirm(true);
    setTimeout(() => setShowConfirm(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body selection:bg-aq-blue/20">
      <Header />
      
      <main className="relative pt-32 pb-24 px-6 noise-overlay">
        <div className="max-w-3xl mx-auto">
          <header className="mb-16 pb-12 border-b border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-aq-blue" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-aq-blue">
                Transparency
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold font-display tracking-tight mb-6">
              Cookie Policy
            </h1>
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs text-muted-foreground uppercase tracking-wider font-semibold">
              <span>Effective: Feb 21, 2026</span>
              <span>Version 1.0</span>
            </div>
          </header>

          <div className="bg-secondary/30 border-l-2 border-aq-blue p-6 mb-12 rounded-r-xl">
            <p className="text-sm leading-relaxed text-muted-foreground font-body">
              <strong className="text-foreground">Consent & Control.</strong> This policy complies with 
              <strong className="text-aq-blue"> Law No. 09-08</strong>. Non-essential cookies are deployed only with your explicit consent.
            </p>
          </div>

          <article className="space-y-16">
            <section>
              <h2 className="text-3xl font-bold font-display tracking-tight mb-6">1. What Are Cookies?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies are small text files placed on your device to remember actions and preferences. 
                They help us provide a seamless experience in the anaqio studio.
              </p>
            </section>

            <section className="bg-secondary/20 p-8 rounded-[2rem] border border-border/50 shadow-sm">
              <h2 className="text-2xl font-bold font-display tracking-tight text-foreground mb-8">Preference Centre</h2>
              <div className="space-y-8 relative z-10">
                <div className="flex items-start justify-between gap-6 pb-6 border-b border-border/30">
                  <div className="space-y-1">
                    <Label className="text-sm font-bold uppercase tracking-widest text-foreground">Strictly Necessary</Label>
                    <p className="text-xs text-muted-foreground leading-relaxed">Required for the platform to function. Cannot be disabled.</p>
                  </div>
                  <Checkbox checked disabled className="mt-1" />
                </div>

                <div className="flex items-start justify-between gap-6 pb-6 border-b border-border/30">
                  <div className="space-y-1">
                    <Label className="text-sm font-bold uppercase tracking-widest text-foreground">Analytics</Label>
                    <p className="text-xs text-muted-foreground leading-relaxed">Help us understand usage to improve the creative tools.</p>
                  </div>
                  <Checkbox 
                    checked={preferences.analytics} 
                    onCheckedChange={(checked) => setPreferences({...preferences, analytics: !!checked})} 
                    className="mt-1" 
                  />
                </div>

                <div className="flex items-start justify-between gap-6">
                  <div className="space-y-1">
                    <Label className="text-sm font-bold uppercase tracking-widest text-foreground">Marketing</Label>
                    <p className="text-xs text-muted-foreground leading-relaxed">Used to share relevant updates about anaqio on other platforms.</p>
                  </div>
                  <Checkbox 
                    checked={preferences.marketing} 
                    onCheckedChange={(checked) => setPreferences({...preferences, marketing: !!checked})} 
                    className="mt-1" 
                  />
                </div>

                <div className="pt-4 flex flex-col items-center gap-4">
                  <Button variant="brand" className="w-full sm:w-auto px-12" onClick={savePreferences}>
                    Save Preferences
                  </Button>
                  {showConfirm && (
                    <p className="text-xs font-bold text-aq-blue animate-in fade-in slide-in-from-bottom-2 uppercase tracking-widest">
                      ✦ Choices Persisted
                    </p>
                  )}
                </div>
              </div>
            </section>

            <section id="contact">
              <h2 className="text-3xl font-bold font-display tracking-tight mb-6 pt-16 border-t border-border/30">Contact</h2>
              <div className="bg-secondary/50 p-8 rounded-2xl border border-border/50">
                <h3 className="text-xl font-bold font-display mb-4 italic text-aq-purple">Privacy & Cookies Team</h3>
                <p className="text-muted-foreground mb-2">Email: <a href="mailto:privacy@anaqio.com" className="text-aq-blue hover:underline">privacy@anaqio.com</a></p>
                <p className="text-muted-foreground mb-4">Location: Casablanca, Morocco</p>
              </div>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
