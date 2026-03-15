'use client';

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { ArrowDownRight, ChevronDown, Play } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ScrollLink } from '@/components/ui/scroll-link';
import { useDeviceTier } from '@/hooks/use-device-tier';
import { useLazyVideo } from '@/hooks/use-lazy-video';
import { charReveal, ease } from '@/lib/motion';
import { cn } from '@/lib/utils';

/**
 * New HeroSection with 16:9 video on the right side
 * Features:
 * - Lazy-loaded video with intersection observer
 * - Deferred loading for optimal FCP
 * - Muted autoplay with optional user-initiated sound
 * - Responsive layout with video on right (desktop) / bottom (mobile)
 */
export function VideoHeroSection() {
  const t = useTranslations('landing.hero');
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const tier = useDeviceTier();
  const animated = !reduced && tier !== 'low';

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const headlineY = useTransform(scrollYProgress, [0, 1], ['0px', '-40px']);

  const subheadlineWords = t('subheadline.a').split(' ');
  const proWords = t('headline.pro').split(' ');

  // Video state
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(false);

  // Lazy video hook - loads when 10% visible with 200px margin
  const { videoRef, shouldLoad, hasLoaded } = useLazyVideo({
    threshold: 0.1,
    rootMargin: '200px',
    eager: false,
  });

  const toggleMute = () => setIsMuted(!isMuted);
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-background"
    >
      {/* Semantic duplicate for screen readers / SEO */}
      <h1 id="hero-heading" className="sr-only">
        ANAQIO — {t('headline.pre')} {t('headline.pro')}
      </h1>

      {/* Layer 0: Background */}
      <div
        data-atom
        data-decorative
        aria-hidden="true"
        className="hero-gradient pointer-events-none absolute inset-0 z-0"
      />
      <div
        data-atom
        data-decorative
        aria-hidden="true"
        className="animated-grid pointer-events-none absolute inset-0 z-0 opacity-25"
      />

      {/* Layer 1: Perspective Grid Overlay */}
      <div
        data-atom
        data-decorative
        aria-hidden="true"
        className="absolute inset-0 z-10 overflow-hidden"
      >
        <div className="perspective-grid mx-auto h-[160%] w-[120%]" />
      </div>

      {/* Layer 2: Content - Two Column Layout */}
      <div className="relative z-20 mx-auto flex w-full flex-1 flex-col items-center justify-center px-6 pt-20 sm:px-12 lg:flex-row lg:items-start lg:gap-16 lg:pt-24">
        {/* Left Column: Text Content */}
        <div className="flex w-full max-w-3xl flex-col items-center text-center lg:w-1/2 lg:items-start lg:text-left">
          {/* Eyebrow atom */}
          <motion.div
            data-atom
            initial={animated ? { opacity: 0, x: -24 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
            className="flex items-center justify-center gap-4 lg:justify-start"
          >
            <div className="h-px w-10 bg-muted-foreground/40" />
            <span className="font-label text-[0.65rem] font-medium uppercase tracking-label text-muted-foreground">
              {t('eyebrow')}
            </span>
            <div className="h-px w-10 bg-muted-foreground/40" />
          </motion.div>

          {/* Atom A: pre — charReveal per character */}
          <motion.p
            data-atom
            aria-hidden="true"
            style={animated ? { y: headlineY } : {}}
            className="mt-6 flex flex-wrap justify-center font-display font-light text-foreground lg:justify-start"
          >
            {t('headline.pre')
              .split('')
              .map((char, i) => (
                <motion.span
                  key={`pre-${char}-${i}`}
                  data-atom
                  aria-hidden="true"
                  {...(animated ? charReveal(reduced, i) : {})}
                  className="inline-block"
                  style={{
                    fontSize: 'clamp(2.5rem, 6vw, 6rem)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
          </motion.p>

          {/* Atom B: pro — word-by-word */}
          <p
            data-atom
            aria-hidden="true"
            className="flex flex-wrap justify-center font-display font-light italic lg:justify-start"
          >
            {proWords.map((word, i) => (
              <motion.span
                key={`pro-${word}-${i}`}
                data-atom
                aria-hidden="true"
                initial={animated ? { y: 20, opacity: 0 } : false}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.55, delay: 0.72 + i * 0.07, ease }}
                className="text-brand-gradient mr-[0.25em] inline-block"
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 3rem)',
                  letterSpacing: '-0.01em',
                }}
              >
                {word}
              </motion.span>
            ))}
          </p>

          <p
            className="mt-6 max-w-xl text-sm leading-[1.8] text-muted-foreground sm:text-[0.93rem]"
            aria-hidden="true"
          >
            {subheadlineWords.map((word, i) => (
              <motion.span
                key={`sub-${word}-${i}`}
                data-atom
                initial={animated ? { y: 16, opacity: 0 } : false}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.45, delay: 1.0 + i * 0.055, ease }}
                className="mr-[0.3em] inline-block"
              >
                {word}
              </motion.span>
            ))}
          </p>

          {/* CTA Buttons */}
          <motion.div
            data-atom
            initial={animated ? { y: 20, opacity: 0 } : false}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1, ease }}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
          >
            <MagneticButton strength={tier === 'high' ? 0.35 : 0}>
              <Button
                variant="brand"
                asChild
                className="group h-12 gap-3 rounded-xl px-8 text-[0.7rem] font-semibold uppercase tracking-[0.18em]"
              >
                <ScrollLink targetId="waitlist">
                  <span>{t('cta.act')}</span>
                  <ArrowDownRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                </ScrollLink>
              </Button>
            </MagneticButton>
            <Button
              variant="heroOutline"
              asChild
              className="h-11 gap-2 rounded-xl px-7 text-[0.7rem] font-medium uppercase tracking-[0.18em]"
            >
              <ScrollLink targetId="how-it-works">{t('cta.learn')}</ScrollLink>
            </Button>
          </motion.div>
        </div>

        {/* Right Column: 16:9 Video */}
        <div className="relative mt-12 w-full max-w-3xl lg:mt-0 lg:w-1/2">
          <div
            className={cn(
              'relative aspect-video w-full overflow-hidden rounded-2xl',
              'bg-gradient-to-br from-white/5 to-white/[0.02]',
              'border border-white/10 shadow-2xl shadow-black/50',
              'transition-all duration-700',
              !shouldLoad && 'animate-pulse bg-white/[0.02]',
              hasLoaded && 'shadow-black/70'
            )}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            {/* Loading placeholder */}
            {!shouldLoad && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3 text-muted-foreground/40">
                  <Play className="h-12 w-12" />
                  <span className="text-xs uppercase tracking-widest">
                    Loading Video
                  </span>
                </div>
              </div>
            )}

            {/* Video element with lazy loading */}
            {shouldLoad && (
              <>
                <video
                  ref={videoRef}
                  className="h-full w-full object-cover"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  preload="auto"
                  onLoadedData={() => {}}
                  poster="/images/hero-video-poster.webp"
                >
                  {/* Multiple sources for browser compatibility */}
                  <source src="/videos/hero-showcase.mp4" type="video/mp4" />
                  <source src="/videos/hero-showcase.webm" type="video/webm" />
                  Your browser does not support the video tag.
                </video>

                {/* Video overlay controls */}
                <div
                  className={cn(
                    'absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20',
                    'transition-opacity duration-300',
                    showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
                  )}
                >
                  {/* Top right controls */}
                  <div className="absolute right-4 top-4 flex gap-2">
                    <button
                      onClick={toggleMute}
                      className="rounded-full bg-black/40 p-2 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/60 hover:text-white"
                      aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                    >
                      {isMuted ? (
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                          />
                        </svg>
                      )}
                    </button>
                    <button
                      onClick={togglePlay}
                      className="rounded-full bg-black/40 p-2 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/60 hover:text-white"
                      aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    >
                      {isPlaying ? (
                        <svg
                          className="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Play button overlay (center, when paused) */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={togglePlay}
                      className="group rounded-full bg-white/20 p-5 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/30"
                      aria-label="Play video"
                    >
                      <Play className="h-8 w-8 fill-white transition-transform duration-300 group-hover:scale-110" />
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Decorative border glow */}
            <div
              className={cn(
                'pointer-events-none absolute inset-0 rounded-2xl',
                'border border-white/10',
                'transition-opacity duration-700',
                hasLoaded ? 'opacity-100' : 'opacity-0'
              )}
            />
          </div>

          {/* Video caption */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="mt-4 text-center text-xs text-muted-foreground/60 lg:text-left"
          >
            AI-powered fashion photography redefined
          </motion.p>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        data-atom
        data-decorative
        aria-hidden="true"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-muted-foreground/40"
      >
        <ChevronDown className="h-5 w-5" />
      </motion.div>
    </section>
  );
}
