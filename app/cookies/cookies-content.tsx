'use client';

import { useState } from 'react';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export function CookiePolicyContent() {
  const [preferences, setPreferences] = useState({
    analytics: false,
    functional: false,
    marketing: false,
  });
  const [showConfirm, setShowConfirm] = useState(false);

  const savePreferences = () => {
    // eslint-disable-next-line no-console
    console.log('Cookie preferences saved:', preferences);
    setShowConfirm(true);
    setTimeout(() => setShowConfirm(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background font-body text-foreground selection:bg-aq-blue/20">
      <Header />

      <main className="noise-overlay relative px-6 pb-24 pt-32">
        <div className="mx-auto max-w-3xl">
          <header className="mb-16 border-b border-border/50 pb-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-8 bg-aq-blue" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-aq-blue">
                Transparency
              </span>
            </div>
            <h1 className="mb-6 font-display text-5xl font-bold tracking-tight sm:text-6xl">
              Cookie Policy
            </h1>
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <span>Effective: Feb 21, 2026</span>
              <span>Version 1.0</span>
            </div>
          </header>

          <div className="mb-12 rounded-r-xl border-l-2 border-aq-blue bg-secondary/30 p-6">
            <p className="font-body text-sm leading-relaxed text-muted-foreground">
              <strong className="text-foreground">Consent & Control.</strong>{' '}
              This policy complies with
              <strong className="text-aq-blue"> Law No. 09-08</strong>.
              Non-essential cookies are deployed only with your explicit
              consent.
            </p>
          </div>

          <article className="space-y-16">
            <section>
              <h2 className="mb-6 font-display text-3xl font-bold tracking-tight">
                1. What Are Cookies?
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                Cookies are small text files placed on your device to remember
                actions and preferences. They help us provide a seamless
                experience in the anaqio studio.
              </p>
            </section>

            <section className="rounded-[2rem] border border-border/50 bg-secondary/20 p-8 shadow-sm">
              <h2 className="mb-8 font-display text-2xl font-bold tracking-tight text-foreground">
                Preference Centre
              </h2>
              <div className="relative z-10 space-y-8">
                <div className="flex items-start justify-between gap-6 border-b border-border/30 pb-6">
                  <div className="space-y-1">
                    <Label className="text-sm font-bold uppercase tracking-widest text-foreground">
                      Strictly Necessary
                    </Label>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      Required for the platform to function. Cannot be disabled.
                    </p>
                  </div>
                  <Checkbox checked disabled className="mt-1" />
                </div>

                <div className="flex items-start justify-between gap-6 border-b border-border/30 pb-6">
                  <div className="space-y-1">
                    <Label className="text-sm font-bold uppercase tracking-widest text-foreground">
                      Analytics
                    </Label>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      Help us understand usage to improve the creative tools.
                    </p>
                  </div>
                  <Checkbox
                    checked={preferences.analytics}
                    onCheckedChange={(checked) =>
                      setPreferences({ ...preferences, analytics: !!checked })
                    }
                    className="mt-1"
                  />
                </div>

                <div className="flex items-start justify-between gap-6">
                  <div className="space-y-1">
                    <Label className="text-sm font-bold uppercase tracking-widest text-foreground">
                      Marketing
                    </Label>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      Used to share relevant updates about anaqio on other
                      platforms.
                    </p>
                  </div>
                  <Checkbox
                    checked={preferences.marketing}
                    onCheckedChange={(checked) =>
                      setPreferences({ ...preferences, marketing: !!checked })
                    }
                    className="mt-1"
                  />
                </div>

                <div className="flex flex-col items-center gap-4 pt-4">
                  <Button
                    variant="brand"
                    className="w-full px-12 sm:w-auto"
                    onClick={savePreferences}
                  >
                    Save Preferences
                  </Button>
                  {showConfirm && (
                    <p className="text-xs font-bold uppercase tracking-widest text-aq-blue animate-in fade-in slide-in-from-bottom-2">
                      ✦ Choices Persisted
                    </p>
                  )}
                </div>
              </div>
            </section>

            <section id="contact">
              <h2 className="mb-6 border-t border-border/30 pt-16 font-display text-3xl font-bold tracking-tight">
                Contact
              </h2>
              <div className="rounded-2xl border border-border/50 bg-secondary/50 p-8">
                <h3 className="mb-4 font-display text-xl font-bold italic text-aq-purple">
                  Privacy & Cookies Team
                </h3>
                <p className="mb-2 text-muted-foreground">
                  Email:{' '}
                  <a
                    href="mailto:privacy@anaqio.com"
                    className="text-aq-blue hover:underline"
                  >
                    privacy@anaqio.com
                  </a>
                </p>
                <p className="mb-4 text-muted-foreground">
                  Location: Casablanca, Morocco
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
