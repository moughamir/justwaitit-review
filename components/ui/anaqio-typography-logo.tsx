'use client';

import { motion } from 'framer-motion';
import * as React from 'react';

import { cn } from '@/lib/utils';

// ─── Animation Variant Types ────────────────────────────────────────────────
export type LogoAnimationVariant =
  | 'none'
  | 'stagger'
  | 'outline-fill'
  | 'spin'
  | 'spring-hover'
  | 'cinematic-reveal'
  | 'breathing'
  | 'lock-in';

export interface AnaqioTypographyLogoProps extends React.SVGProps<SVGSVGElement> {
  /** @deprecated Use `variant` instead */
  animated?: boolean;
  variant?: LogoAnimationVariant;
}

// ─── Letter Path Data ───────────────────────────────────────────────────────
const letterPaths = [
  {
    id: 'letter-e',
    gradientId: 'e',
    label: 'A',
    d: 'm118 357-41-99h16l10 26h46l12-26h14l-41 100h-6l-4 1zm8-14 19-47h-37z',
  },
  {
    id: 'letter-b',
    gradientId: 'b',
    label: 'N',
    d: 'M282 358v-76l-56 76h-13V258h15v76l56-76h13v99l-1 1z',
  },
  {
    id: 'letter-d',
    gradientId: 'd',
    label: 'A',
    d: 'M382 358h-6l-41-100h14l10 26h46l11-26h15l-40 98-6 2zm1-15 18-47h-37z',
  },
  {
    id: 'letter-a',
    gradientId: 'a',
    label: 'Q',
    d: 'M507 358c-56-3-62-86-9-99l-13-9 1-5 4 3q16 4 34-5c13-5 27-10 41-3l10 10q0 3-2 3l-8-6c-15-5-33 7-48 9h-14l4 1h7c68 7 60 101-2 101zm1-89c-42 4-42 72-2 77 28 3 41-17 41-38 0-20-12-39-35-39z',
  },
  { id: 'letter-f', gradientId: 'f', label: 'I', d: 'M606 358V258h13v100z' },
  {
    id: 'letter-c',
    gradientId: 'c',
    label: 'O',
    d: 'M667 288c12-33 59-42 83-17 26 26 16 76-22 86l-14 2c-35 0-60-35-47-71m44-19c-43 3-43 72-2 77 27 3 41-18 41-38s-12-39-36-39z',
  },
];

// ─── Gradient Definitions ───────────────────────────────────────────────────
const gradientConfigs: { id: string; transform: string }[] = [
  { id: 'a', transform: 'matrix(114 0 0 -114 461 298)' },
  { id: 'b', transform: 'matrix(83 0 0 -83 213 308)' },
  { id: 'c', transform: 'matrix(101 0 0 -101 664 308)' },
  { id: 'd', transform: 'matrix(96 0 0 -96 335 308)' },
  { id: 'e', transform: 'matrix(97 0 0 -97 77 308)' },
  { id: 'f', transform: 'matrix(13 0 0 -13 606 308)' },
];

const gradientStops = [
  { offset: '0', color: '#3f57af' },
  { offset: '.1', color: '#3f57af' },
  { offset: '.3', color: '#484da9' },
  { offset: '.4', color: '#484da9' },
  { offset: '.7', color: '#6049a8' },
  { offset: '1', color: '#6f47a7' },
];

// ─── Shared SVG Defs ────────────────────────────────────────────────────────
function LogoGradientDefs({ instanceId }: { instanceId: string }) {
  return (
    <>
      {gradientConfigs.map((g) => (
        <linearGradient
          key={g.id}
          id={`${instanceId}-${g.id}`}
          x1="0"
          x2="1"
          y1="0"
          y2="0"
          gradientTransform={g.transform}
          gradientUnits="userSpaceOnUse"
          spreadMethod="pad"
        >
          {gradientStops.map((s, i) => (
            <stop key={i} offset={s.offset} stopColor={s.color} />
          ))}
        </linearGradient>
      ))}
    </>
  );
}

// ─── Static Paths ───────────────────────────────────────────────────────────
function StaticLetters({ instanceId }: { instanceId: string }) {
  return (
    <>
      {letterPaths.map((l) => (
        <path
          key={l.id}
          fill={`url(#${instanceId}-${l.gradientId})`}
          d={l.d}
          transform="matrix(1 0 0 -1 0 794)"
        />
      ))}
    </>
  );
}

// ─── Variant: Stagger Fade-Up ───────────────────────────────────────────────
function StaggerLetters({ instanceId }: { instanceId: string }) {
  return (
    <>
      {letterPaths.map((l, i) => (
        <motion.g
          key={l.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
            delay: i * 0.08,
          }}
        >
          <path
            fill={`url(#${instanceId}-${l.gradientId})`}
            d={l.d}
            transform="matrix(1 0 0 -1 0 794)"
          />
        </motion.g>
      ))}
    </>
  );
}

// ─── Variant: Outline → Fill (Mask Wipe) ────────────────────────────────────
function OutlineFillLetters({ instanceId }: { instanceId: string }) {
  const maskId = `${instanceId}-fill-mask`;
  return (
    <>
      {/* Animated mask: rectangle slides left→right revealing gradient fill */}
      <defs>
        <mask id={maskId}>
          <motion.rect
            x="0"
            y="0"
            width="1123"
            height="794"
            fill="white"
            initial={{ x: -1123 }}
            animate={{ x: 0 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          />
        </mask>
      </defs>

      {/* 1. Outline layer: draws on first */}
      {letterPaths.map((l, i) => (
        <motion.path
          key={`outline-${l.id}`}
          d={l.d}
          transform="matrix(1 0 0 -1 0 794)"
          fill="none"
          stroke="#484da9"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: {
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
              delay: i * 0.06,
            },
            opacity: { duration: 0.3, delay: i * 0.06 },
          }}
        />
      ))}

      {/* 2. Fill layer: revealed by mask wipe */}
      <g mask={`url(#${maskId})`}>
        {letterPaths.map((l) => (
          <path
            key={`fill-${l.id}`}
            fill={`url(#${instanceId}-${l.gradientId})`}
            d={l.d}
            transform="matrix(1 0 0 -1 0 794)"
          />
        ))}
      </g>
    </>
  );
}

// ─── Variant: Slow Continuous Spin ──────────────────────────────────────────
function SpinLetters({ instanceId }: { instanceId: string }) {
  return (
    <motion.g
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 10, ease: 'linear', repeat: Infinity }}
      style={{ transformOrigin: '50% 50%' }}
    >
      <StaticLetters instanceId={instanceId} />
    </motion.g>
  );
}

// ─── Variant: Spring Bounce on Hover ────────────────────────────────────────
function SpringHoverLetters({ instanceId }: { instanceId: string }) {
  return (
    <motion.g
      whileHover={{ scale: 1.06 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      style={{ transformOrigin: '50% 50%' }}
    >
      {letterPaths.map((l, i) => (
        <motion.g
          key={l.id}
          whileHover={{ y: -8 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 12,
            delay: i * 0.03,
          }}
        >
          <path
            fill={`url(#${instanceId}-${l.gradientId})`}
            d={l.d}
            transform="matrix(1 0 0 -1 0 794)"
          />
        </motion.g>
      ))}
    </motion.g>
  );
}

// ─── Variant: Cinematic Reveal ──────────────────────────────────────────────
function CinematicRevealLetters({ instanceId }: { instanceId: string }) {
  return (
    <>
      {letterPaths.map((l, i) => (
        <motion.g
          key={l.id}
          initial={{ opacity: 0, x: -40, filter: 'blur(8px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.3 + i * 0.1,
          }}
        >
          <path
            fill={`url(#${instanceId}-${l.gradientId})`}
            d={l.d}
            transform="matrix(1 0 0 -1 0 794)"
          />
        </motion.g>
      ))}
    </>
  );
}

// ─── Variant: Breathing Scale ───────────────────────────────────────────────
function BreathingLetters({ instanceId }: { instanceId: string }) {
  return (
    <motion.g
      animate={{ scale: [1, 1.04, 1] }}
      transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
      style={{ transformOrigin: '50% 50%' }}
    >
      <StaticLetters instanceId={instanceId} />
    </motion.g>
  );
}

// ─── Variant: Lock-In Snap ──────────────────────────────────────────────────
function LockInLetters({ instanceId }: { instanceId: string }) {
  return (
    <>
      {letterPaths.map((l, i) => (
        <motion.g
          key={l.id}
          initial={{ opacity: 0, scale: 1.5, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 20,
            delay: 0.15 + i * 0.07,
          }}
          style={{ transformOrigin: '50% 50%' }}
        >
          <path
            fill={`url(#${instanceId}-${l.gradientId})`}
            d={l.d}
            transform="matrix(1 0 0 -1 0 794)"
          />
        </motion.g>
      ))}
    </>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────
export function AnaqioTypographyLogo({
  animated = false,
  variant,
  className,
  ...props
}: AnaqioTypographyLogoProps) {
  // Backwards compat: `animated` maps to 'stagger'
  const resolvedVariant: LogoAnimationVariant =
    variant ?? (animated ? 'stagger' : 'none');

  // Unique instance id so multiple logos on a page don't clash gradient ids
  const instanceId = React.useId().replace(/:/g, '');

  const renderLetters = () => {
    switch (resolvedVariant) {
      case 'stagger':
        return <StaggerLetters instanceId={instanceId} />;
      case 'outline-fill':
        return <OutlineFillLetters instanceId={instanceId} />;
      case 'spin':
        return <SpinLetters instanceId={instanceId} />;
      case 'spring-hover':
        return <SpringHoverLetters instanceId={instanceId} />;
      case 'cinematic-reveal':
        return <CinematicRevealLetters instanceId={instanceId} />;
      case 'breathing':
        return <BreathingLetters instanceId={instanceId} />;
      case 'lock-in':
        return <LockInLetters instanceId={instanceId} />;
      default:
        return <StaticLetters instanceId={instanceId} />;
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="60 380 720 200"
      className={cn('h-auto w-full', className)}
      role="img"
      aria-label="ANAQIO"
      {...props}
    >
      <defs>
        <LogoGradientDefs instanceId={instanceId} />
      </defs>
      {renderLetters()}
    </svg>
  );
}
