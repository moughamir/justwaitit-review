'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { clipReveal, fadeIn, fadeUp, flipReveal } from '@/lib/motion';

/* ────────────────────────────────────────────────── */
/*  Data                                               */
/* ────────────────────────────────────────────────── */

const founders = [
  {
    name: 'Amal AIT OUKHARAZ',
    role: 'Founder',
    bio: 'Amal brings a deep understanding of fashion commerce and brand identity to Anaqio. Her vision for what AI can unlock for Moroccan fashion brands is at the heart of the product.',
    linkedin: 'https://www.linkedin.com/in/aitoukhraz/',
    photo: '/images/amal-founder.png',
    initials: 'AA',
  },
  {
    name: 'Mohamed MOUGHAMIR',
    role: 'Tech',
    bio: 'Mohamed is a full-stack developer and experience designer with 9+ years building intuitive digital products. He shapes the engineering and design direction from Bouskoura, Morocco.',
    linkedin: 'https://www.linkedin.com/in/moughamir/',
    github: 'https://github.com/moughamir',
    twitter: 'https://twitter.com/omnizya',
    photo: 'https://avatars.githubusercontent.com/u/8163598?v=4',
    initials: 'MM',
  },
];

/* ────────────────────────────────────────────────── */
/*  Component                                          */
/* ────────────────────────────────────────────────── */

export default function AboutContent() {
  const reduced = useReducedMotion();

  return (
    <>
      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 1 — HERO                            */}
      {/* ═══════════════════════════════════════════ */}
      <section
        id="about-hero"
        aria-labelledby="about-hero-heading"
        className="relative min-h-[92dvh] overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
      >
        <h1 id="about-hero-heading" className="sr-only">
          About Anaqio
        </h1>

        {/* Spotlight Effect */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-aq-blue/10 blur-[120px]"
          animate={
            reduced
              ? { opacity: 0.5 }
              : { opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }
          }
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Ambient gradient orbs */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-aq-blue/20 blur-[100px]"
          animate={
            reduced
              ? { opacity: 1 }
              : {
                  x: [0, 80, 0, -80, 0],
                  y: [0, 40, -40, 0, 0],
                  scale: [1, 1.1, 1, 0.9, 1],
                }
          }
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-aq-purple/20 blur-[100px]"
          animate={
            reduced
              ? { opacity: 1 }
              : {
                  x: [0, -80, 0, 80, 0],
                  y: [0, -40, 40, 0, 0],
                  scale: [1, 0.9, 1, 1.1, 1],
                }
          }
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center xl:gap-24">
          {/* Left column */}
          <motion.div className="flex-1" {...fadeUp(reduced)}>
            {/* Navigation Header */}
            <div className="mb-12 md:mb-16">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground no-underline transition-colors hover:text-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:-translate-x-1"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                Back to Home
              </Link>
            </div>

            <p className="font-label text-xs font-semibold uppercase tracking-[0.2em] text-aq-blue">
              ANAQIO &middot; AI Visual Studio
            </p>

            <h2
              aria-hidden="true"
              className="mt-6 font-display text-5xl font-light leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
            >
              Fashion,
              <br />
              <span className="font-medium">Reimagined.</span>
            </h2>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              The AI-powered visual studio giving Moroccan fashion brands the
              infrastructure to produce{' '}
              <strong className="font-medium text-foreground">
                studio-quality imagery
              </strong>
              &nbsp;&mdash; without a studio.
            </p>

            <hr className="my-8 border-white/10" />

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-muted-foreground/80">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                Est. 2026
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                Casablanca, Morocco
              </span>
              <span className="flex items-center gap-2 text-aq-blue">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aq-blue opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-aq-blue" />
                </span>
                Launching Q3 2026
              </span>
            </div>
          </motion.div>

          {/* Right column — hero image */}
          <motion.div
            className="relative mx-auto aspect-[3/4] w-full max-w-sm shrink-0 overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl lg:mx-0 lg:max-h-[640px] lg:max-w-md"
            {...fadeIn(reduced, 0.2)}
          >
            <Image
              src="/images/hero-model.png"
              alt="Fashion model showcasing Anaqio studio-quality imagery"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
              className="object-cover object-top"
              priority
            />
            {/* Bottom gradient fade */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent"
            />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 2 — THE STUDIO                      */}
      {/* ═══════════════════════════════════════════ */}
      <section
        id="about-solution"
        aria-labelledby="about-solution-heading"
        className="relative border-t border-white/5 bg-background px-4 py-32 sm:px-6 lg:px-8"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-aq-blue/5 via-background to-background" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            {...fadeUp(reduced)}
          >
            <p className="font-label text-xs font-semibold uppercase tracking-[0.2em] text-aq-blue">
              The Solution
            </p>
            <h2
              id="about-solution-heading"
              className="mt-6 font-display text-4xl font-light leading-tight sm:text-5xl"
            >
              One workspace.
              <br />
              <span className="font-medium text-foreground">
                Infinite looks.
              </span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Upload your garments, models, or brand assets. Anaqio generates
              studio-quality imagery in minutes&nbsp;&mdash; not weeks.
            </p>
          </motion.div>

          {/* Image mosaic */}
          <div className="mt-20 grid grid-cols-12 gap-4 lg:gap-6">
            <motion.div
              className="relative col-span-5 row-span-2 overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl ring-1 ring-white/5"
              style={{ aspectRatio: '2/3' }}
              {...clipReveal(reduced, 0)}
            >
              <Image
                src="/images/lookbook-1.png"
                alt="Lookbook image — editorial fashion composition"
                fill
                sizes="(max-width: 640px) 100vw, 42vw"
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />
            </motion.div>

            <motion.div
              className="relative col-span-7 overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl ring-1 ring-white/5"
              style={{ aspectRatio: '16/9' }}
              {...clipReveal(reduced, 0.15)}
            >
              <Image
                src="/images/lookbook-2.png"
                alt="Lookbook image — landscape fashion scene"
                fill
                sizes="(max-width: 640px) 100vw, 58vw"
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />
            </motion.div>

            <motion.div
              className="relative col-span-7 overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl ring-1 ring-white/5"
              style={{ aspectRatio: '16/9' }}
              {...clipReveal(reduced, 0.3)}
            >
              <Image
                src="/images/lookbook-3.png"
                alt="Lookbook image — styled product photography"
                fill
                sizes="(max-width: 640px) 100vw, 58vw"
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 4 — BUILT FOR MOROCCO               */}
      {/* ═══════════════════════════════════════════ */}
      <section
        id="about-morocco"
        aria-labelledby="about-morocco-heading"
        className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden border-y border-white/5 bg-background px-4 py-32 sm:px-6 lg:px-8"
      >
        <div className="bg-brand-diag absolute inset-0 opacity-[0.03]" />

        <h2 id="about-morocco-heading" className="sr-only">
          Built for Morocco
        </h2>

        <motion.blockquote
          className="relative z-10 mx-auto max-w-5xl text-center font-display text-4xl font-light italic leading-tight text-foreground sm:text-5xl lg:text-6xl"
          {...fadeUp(reduced)}
        >
          &ldquo;Morocco has one of the richest fashion cultures in the world.
          It deserves{' '}
          <span className="font-medium not-italic text-aq-blue">
            world-class tools.
          </span>
          &rdquo;
        </motion.blockquote>

        <motion.div
          className="relative z-10 mt-12 flex items-center justify-center gap-4"
          {...fadeIn(reduced, 0.2)}
        >
          <div className="h-px w-12 bg-white/20" />
          <p className="font-label text-sm uppercase tracking-[0.2em] text-muted-foreground/80">
            Anaqio, Casablanca 2026
          </p>
          <div className="h-px w-12 bg-white/20" />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 5 — FOUNDING TEAM                   */}
      {/* ═══════════════════════════════════════════ */}
      <section
        id="about-team"
        aria-labelledby="about-team-heading"
        className="bg-background px-4 py-32 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mx-auto flex max-w-3xl flex-col items-center text-center"
            {...fadeUp(reduced)}
          >
            <h2
              id="about-team-heading"
              className="font-display text-4xl font-light leading-tight sm:text-5xl"
            >
              Two founders,
              <br />
              <span className="font-medium">one mission.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Built by people who believe Moroccan fashion deserves the same
              creative infrastructure as the global luxury market.
            </p>
          </motion.div>

          <div className="mt-20 grid gap-8 sm:grid-cols-2">
            {founders.map((founder, i) => (
              <motion.div
                key={founder.name}
                className="glass flex flex-col gap-6 rounded-[2rem] p-10 transition-transform duration-500 hover:-translate-y-2"
                {...flipReveal(reduced, i)}
              >
                {/* Avatar + name */}
                <div className="flex items-center gap-5">
                  {founder.photo ? (
                    <Image
                      src={founder.photo}
                      alt={founder.name}
                      width={80}
                      height={80}
                      className="rounded-full object-cover ring-4 ring-white/5"
                      unoptimized
                    />
                  ) : (
                    <div
                      aria-label={founder.initials}
                      className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-aq-blue to-aq-purple text-2xl font-bold text-white ring-4 ring-white/5"
                    >
                      {founder.initials}
                    </div>
                  )}
                  <div>
                    <p className="font-display text-2xl font-semibold leading-tight text-foreground">
                      {founder.name}
                    </p>
                    <p className="mt-1 text-sm font-medium text-aq-blue">
                      {founder.role}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-base leading-relaxed text-muted-foreground/90">
                  {founder.bio}
                </p>

                {/* Links */}
                <div className="mt-auto flex flex-wrap gap-6 pt-4 font-label text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-white"
                  >
                    LinkedIn
                  </a>
                  {'github' in founder && founder.github && (
                    <a
                      href={founder.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-white"
                    >
                      GitHub
                    </a>
                  )}
                  {'twitter' in founder && founder.twitter && (
                    <a
                      href={founder.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-white"
                    >
                      X / Twitter
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 6 — CTA                             */}
      {/* ═══════════════════════════════════════════ */}
      <section
        id="about-cta"
        aria-labelledby="about-cta-heading"
        className="relative overflow-hidden border-t border-white/10 bg-background px-4 py-32 sm:px-6 lg:px-8"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-aq-blue/10 via-background to-background" />

        <motion.div
          className="glass-strong relative mx-auto max-w-4xl flex-col items-center justify-center rounded-[3rem] p-12 text-center md:p-20"
          {...fadeUp(reduced)}
        >
          <h2
            id="about-cta-heading"
            className="font-display text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl"
          >
            Join the first wave.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            We&rsquo;re onboarding select fashion brands ahead of our Q3 2026
            launch. Secure your access to the future of visual commerce.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button
              variant="brand"
              size="lg"
              className="h-14 rounded-full px-8 text-base"
              asChild
            >
              <Link href="/early-access">Reserve Access</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-14 rounded-full border-white/20 px-8 text-base hover:bg-white/5"
              asChild
            >
              <Link href="/contact">Partner with us</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </>
  );
}
