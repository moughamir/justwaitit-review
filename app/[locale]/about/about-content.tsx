'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Link } from '@/i18n/routing';
import { clipReveal, fadeIn, fadeUp, flipReveal } from '@/lib/motion';

export default function AboutContent() {
  const t = useTranslations('about');
  const tMeta = useTranslations('meta');
  const reduced = useReducedMotion();

  const team = [
    {
      name: 'Amal AIT OUKHARAZ',
      role: t('founder.amal.role'),
      bio: t('founder.amal.bio'),
      linkedin: 'https://www.linkedin.com/in/aitoukhraz/',
      photo: '/images/amal-founder.png',
      initials: 'AA',
    },
    {
      name: 'Mohamed MOUGHAMIR',
      role: t('founder.mo.role'),
      bio: t('founder.mo.bio'),
      linkedin: 'https://www.linkedin.com/in/moughamir/',
      github: 'https://github.com/moughamir',
      twitter: 'https://twitter.com/omnizya',
      photo: 'https://avatars.githubusercontent.com/u/8163598?v=4',
      initials: 'MM',
    },
    {
      name: 'Zahir CHAIMAE',
      role: t('founder.chaimae.role'),
      bio: t('founder.chaimae.bio'),
      linkedin: 'https://shazo.anaqio.com',
      email: 'marketing@anaqio.com',
      photo: null,
      initials: 'ZC',
    },
  ];

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
          {tMeta('about.title')}
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
                  className="transition-transform group-hover:-translate-x-1 rtl:rotate-180"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                {t('hero.back')}
              </Link>
            </div>

            <p className="font-label text-xs font-semibold uppercase tracking-[0.2em] text-aq-blue">
              {t('hero.label')}
            </p>

            <h2
              aria-hidden="true"
              className="mt-6 font-display text-5xl font-light leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
            >
              {t('hero.titleLine1')}
              <br />
              <span className="font-medium">{t('hero.titleLine2')}</span>
            </h2>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {t('hero.desc')}
            </p>

            <hr className="my-8 border-white/10" />

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-muted-foreground/80">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                {t('hero.founded')}
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                {t('hero.location')}
              </span>
              <span className="flex items-center gap-2 text-aq-blue">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aq-blue opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-aq-blue" />
                </span>
                {t('hero.launch')}
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
              alt={t('hero.imageAlt')}
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
              {t('solution.overline')}
            </p>
            <h2
              id="about-solution-heading"
              className="mt-6 font-display text-4xl font-light leading-tight sm:text-5xl"
            >
              {t('solution.titleLine1')}
              <br />
              <span className="font-medium text-foreground">
                {t('solution.titleLine2')}
              </span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {t('solution.desc')}
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
                alt={t('lookbook.1alt')}
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
                alt={t('lookbook.2alt')}
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
                alt={t('lookbook.3alt')}
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
          {t('morocco.srLabel')}
        </h2>

        <motion.blockquote
          className="relative z-10 mx-auto max-w-5xl text-center font-display text-4xl font-light italic leading-tight text-foreground sm:text-5xl lg:text-6xl"
          {...fadeUp(reduced)}
        >
          &ldquo;{t('morocco.quote')}{' '}
          <span className="font-medium not-italic text-aq-blue">
            {t('morocco.quoteAccent')}
          </span>
          &rdquo;
        </motion.blockquote>

        <motion.div
          className="relative z-10 mt-12 flex items-center justify-center gap-4"
          {...fadeIn(reduced, 0.2)}
        >
          <div className="h-px w-12 bg-white/20" />
          <p className="font-label text-sm uppercase tracking-[0.2em] text-muted-foreground/80">
            {t('morocco.attr')}
          </p>
          <div className="h-px w-12 bg-white/20" />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 5 — THE TEAM                        */}
      {/* ═══════════════════════════════════════════ */}
      <section
        id="about-team"
        aria-labelledby="about-team-heading"
        className="relative overflow-hidden bg-background px-4 py-32 sm:px-6 lg:px-8"
      >
        {/* Atmospheric grid behind team */}
        <div className="animated-grid absolute inset-0 opacity-[0.03]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            className="mx-auto flex max-w-3xl flex-col items-center text-center"
            {...fadeUp(reduced)}
          >
            <p className="text-aq-gold/80 font-label text-xs font-semibold uppercase tracking-[0.3em]">
              {t('team.overline')}
            </p>
            <h2
              id="about-team-heading"
              className="mt-6 font-display text-4xl font-light leading-tight sm:text-5xl lg:text-6xl"
            >
              {t('team.titleLine1')}
              <br />
              <span className="text-brand-gradient italic">
                {t('team.titleLine2')}
              </span>
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
              {t('team.desc')}
            </p>
          </motion.div>

          <div className="mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                className="hover:border-aq-gold/20 group relative flex flex-col gap-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-10 backdrop-blur-md transition-all duration-500 hover:bg-white/[0.04]"
                {...flipReveal(reduced, i)}
              >
                {/* Visual Accent */}
                <div className="absolute right-8 top-8 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="bg-aq-gold h-2 w-2 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
                </div>

                {/* Avatar + name */}
                <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
                  <div className="relative h-24 w-24 overflow-hidden rounded-2xl ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-105">
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div
                        aria-label={member.initials}
                        className="from-aq-indigo flex h-full w-full items-center justify-center bg-gradient-to-br to-aq-blue text-2xl font-bold text-white"
                      >
                        {member.initials}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-display text-2xl font-medium tracking-tight text-foreground">
                      {member.name}
                    </p>
                    <p className="text-aq-gold mt-1 font-label text-[0.65rem] font-bold uppercase tracking-widest">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm leading-[1.8] text-muted-foreground/80">
                  {member.bio}
                </p>

                {/* Links */}
                <div className="mt-auto flex flex-wrap justify-center gap-6 pt-6 font-label text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground lg:justify-start">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-aq-gold transition-colors"
                  >
                    {t('founder.linkedin')}
                  </a>
                  {'github' in member && member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-aq-gold transition-colors"
                    >
                      {t('founder.github')}
                    </a>
                  )}
                  {'email' in member && member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="hover:text-aq-gold transition-colors"
                    >
                      Email
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
        className="relative overflow-hidden border-t border-white/5 bg-background px-4 py-32 sm:px-6 lg:px-8"
      >
        <div className="from-aq-indigo/10 absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] via-background to-background" />

        <motion.div
          className="glass-strong relative mx-auto max-w-4xl flex-col items-center justify-center rounded-[3rem] p-12 text-center md:p-20"
          {...fadeUp(reduced)}
        >
          <h2
            id="about-cta-heading"
            className="font-display text-4xl font-light tracking-tight sm:text-5xl lg:text-6xl"
          >
            {t('cta.title')}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t('cta.desc')}
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <MagneticButton strength={0.2}>
              <Button
                variant="brand"
                size="lg"
                className="h-14 rounded-full px-10 text-[0.7rem] font-bold uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(212,175,55,0.2)]"
                asChild
              >
                <Link href="/early-access">{t('cta.primary')}</Link>
              </Button>
            </MagneticButton>
            <Button
              variant="heroOutline"
              size="lg"
              className="h-14 rounded-full border-white/10 px-10 text-[0.7rem] font-bold uppercase tracking-[0.2em] hover:bg-white/5"
              asChild
            >
              <Link href="/contact">{t('cta.secondary')}</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </>
  );
}
