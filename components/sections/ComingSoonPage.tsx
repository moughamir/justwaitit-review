'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { SocialLinks } from '../layout/SocialLinks';

import { LoadingScreen } from '@/components/sections/LoadingScreen';
import AbstractBackground from '@/components/ui/AbstractBackground';
import { AnaqioTypographyLogo } from '@/components/ui/anaqio-typography-logo';
import { useDeviceTier } from '@/hooks/use-device-tier';
import { notifyMe } from '@/lib/actions/notify';
import { ease, fadeIn, fadeUp } from '@/lib/motion';

// ─── Phase State ─────────────────────────────────────────────────────────────

type Phase = 'loading' | 'reveal';

// ─── Notify Form ─────────────────────────────────────────────────────────────

// UTM param keys collected from the landing URL
const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const;

type UtmParams = Partial<
  Record<(typeof UTM_KEYS)[number] | 'referrer', string>
>;

function NotifyForm({ animated }: { animated: boolean }) {
  const reduced = useReducedMotion();
  const [status, setStatus] = useState<
    'idle' | 'pending' | 'success' | 'error'
  >('idle');
  const [message, setMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const [utm, setUtm] = useState<UtmParams>({});

  // Capture UTM params + referrer once on mount (client-only)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const collected: UtmParams = {};
    for (const key of UTM_KEYS) {
      const val = params.get(key);
      if (val) collected[key] = val;
    }
    if (document.referrer) collected.referrer = document.referrer.slice(0, 500);
    // Use requestAnimationFrame to avoid setState in render
    requestAnimationFrame(() => {
      setUtm(collected);
    });
  }, []);

  const handleSubmit = useCallback(
    async (formData: FormData) => {
      // Append UTM attribution to the server action payload
      for (const [key, val] of Object.entries(utm)) {
        formData.set(key, val);
      }
      setStatus('pending');
      const result = await notifyMe(formData);
      if (result.success) {
        setStatus('success');
        setMessage(result.message);
        formRef.current?.reset();
      } else {
        setStatus('error');
        setMessage(result.message);
      }
    },
    [utm]
  );

  if (status === 'success') {
    return (
      <motion.div
        data-atom
        className="flex items-center gap-2 font-body text-sm text-aq-blue"
        initial={animated ? { opacity: 0, y: 10 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        <Check className="h-4 w-4" />
        <span>{message}</span>
      </motion.div>
    );
  }

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
    >
      <motion.div className="relative flex-1" {...fadeIn(reduced, 0.1)}>
        <input
          type="email"
          name="email"
          required
          placeholder="Enter your email"
          aria-label="Email address"
          disabled={status === 'pending'}
          className="h-12 w-full rounded-lg border border-border/30 bg-card/40 px-4 font-body text-sm text-foreground backdrop-blur-lg transition-colors placeholder:text-muted-foreground/60 focus:border-aq-blue/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-aq-blue disabled:opacity-50"
        />
      </motion.div>
      <motion.button
        data-atom
        type="submit"
        disabled={status === 'pending'}
        className="group z-30 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-aq-blue px-6 font-ui text-sm font-medium text-foreground transition-colors hover:bg-aq-blue/90 focus-visible:ring-2 focus-visible:ring-aq-blue disabled:opacity-50"
        {...fadeIn(reduced, 0.15)}
      >
        {status === 'pending' ? (
          'Sending...'
        ) : (
          <>
            Notify me
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </motion.button>
      {status === 'error' && message && (
        <p className="font-body text-xs text-destructive sm:col-span-2">
          {message}
        </p>
      )}
    </form>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function ComingSoonPage() {
  const reduced = useReducedMotion();
  const tier = useDeviceTier();
  const animated = !reduced && tier !== 'low';

  const [phase, setPhase] = useState<Phase>('loading');

  const handleLoadingComplete = useCallback(() => {
    setPhase('reveal');
  }, []);

  return (
    <>
      {/* Ambient background — z-0 */}
      <div
        data-atom
        data-decorative
        aria-hidden="true"
        className="fixed inset-0 z-0"
      >
        <AbstractBackground />
      </div>

      {/* Hero gradient overlay — z-0 */}
      <div
        data-atom
        data-decorative
        aria-hidden="true"
        className="hero-gradient fixed inset-0 z-0"
      />

      <AnimatePresence mode="wait">
        {phase === 'loading' && (
          <LoadingScreen
            key="loader"
            onComplete={handleLoadingComplete}
            animated={animated}
          />
        )}
      </AnimatePresence>

      {/* Main coming soon content */}
      <AnimatePresence>
        {phase === 'reveal' && (
          <motion.main
            id="main-content"
            key="coming-soon"
            initial={animated ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease }}
            className="relative z-20 flex h-[calc(100vh-4rem)] min-h-[100dvh] flex-col items-center justify-center px-6 py-20"
          >
            {/* SEO backbone */}
            <h1 className="sr-only">ANAQIO — AI Fashion Studio Coming Soon</h1>

            {/* Logo wordmark — top center */}
            <motion.div
              data-atom
              className="z-20 mb-12 w-[min(80vw,600px)]"
              {...fadeUp(reduced)}
            >
              <AnaqioTypographyLogo variant="none" aria-label="ANAQIO" />
            </motion.div>
            {/* Teaser copy */}
            <motion.p
              data-atom
              className="relative z-20 mt-8 max-w-[46ch] text-justify font-body text-base leading-relaxed text-muted-foreground sm:text-lg"
              {...fadeUp(reduced, 0.1)}
            >
              <span className="text-lg font-bold">
                ANAQIO is an AI-Driven Virtual built for Fashion Commerce.
              </span>
              <br />
              <i className="text-base">
                Generate lookbooks, swap backgrounds, adjust lighting, and
                produce cinematic collections.
              </i>
              <br />
              <span className="absolute right-0 text-right text-base italic">
                — all from a single shot.
              </span>
            </motion.p>

            {/* Notify me form */}
            <motion.div
              data-atom
              className="z-30 mt-10 w-full max-w-md"
              {...fadeUp(reduced, 0.15)}
            >
              <NotifyForm animated={animated} />
              {/* ── Social media links ────────────────────────────── */}
              <motion.div
                data-atom
                className="relative z-10 mt-10"
                initial={animated ? { opacity: 0 } : false}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <SocialLinks />
              </motion.div>
            </motion.div>

            {/* Decorative ruled line */}
            <footer className="absolute bottom-8">
              <motion.div
                data-atom
                data-decorative
                aria-hidden="true"
                className="z-10 mt-16 h-px w-16 bg-aq-blue/30"
                {...fadeIn(reduced, 0.2)}
              />

              {/* Footer note */}
              <motion.p
                data-atom
                className="z-20 mt-6 font-label text-xs uppercase tracking-label text-muted-foreground/50"
                {...fadeIn(reduced, 0.25)}
              >
                Launching 2026 &middot; Casablanca
              </motion.p>
            </footer>
            {/* Atmospheric Text — PINNED, purely decorative */}
            <span
              data-atom
              data-decorative
              aria-hidden="true"
              className="pointer-events-none absolute right-[6%] top-0 z-10 select-none font-display font-light text-foreground/[0.02] opacity-30"
              style={{ fontSize: 'clamp(12rem, 28vw, 34rem)' }}
            >
              Coming Soon
            </span>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
