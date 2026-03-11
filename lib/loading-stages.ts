// ─── Shared Loading Stages ──────────────────────────────────────────────────
// Used by both app/loading.tsx and components/sections/LoadingScreen.tsx
// to keep stage labels and thresholds consistent.

export const LOADING_STAGES = [
  { threshold: 0, label: 'Initializing' },
  { threshold: 25, label: 'Loading assets' },
  { threshold: 60, label: 'Rendering' },
  { threshold: 88, label: 'Preparing studio' },
  { threshold: 100, label: 'Ready' },
] as const;

export type LoadingStage = (typeof LOADING_STAGES)[number];
export type ConnectionTier = 'fast' | 'moderate' | 'slow';
export type DeviceTier = 'high' | 'mid' | 'low';

export function resolveStage(progress: number): LoadingStage {
  return (
    [...LOADING_STAGES].reverse().find((s) => progress >= s.threshold) ??
    LOADING_STAGES[0]
  );
}

/**
 * Classify connection quality using the Network Information API.
 * Falls back to 'moderate' when the API is unavailable (Firefox, Safari).
 */
export function getConnectionTier(): ConnectionTier {
  if (typeof navigator === 'undefined') return 'moderate';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const conn = (navigator as any).connection;
  if (!conn) return 'moderate';
  const { effectiveType, downlink } = conn as {
    effectiveType?: string;
    downlink?: number;
  };
  if (
    effectiveType === 'slow-2g' ||
    effectiveType === '2g' ||
    (downlink !== undefined && downlink < 1.5)
  )
    return 'slow';
  if (effectiveType === '3g' || (downlink !== undefined && downlink < 5))
    return 'moderate';
  return 'fast';
}

/**
 * Adaptive safety timeout (ms) so slow devices / connections never hang.
 * Device tier × connection tier compound to determine the ceiling.
 */
export function getSafetyTimeout(
  deviceTier: DeviceTier,
  conn: ConnectionTier
): number {
  const base: Record<ConnectionTier, number> = {
    fast: 4000,
    moderate: 6500,
    slow: 12000,
  };
  const multiplier: Record<DeviceTier, number> = {
    high: 1,
    mid: 1.3,
    low: 1.8,
  };
  return base[conn] * multiplier[deviceTier];
}

/**
 * Sum actual bytes transferred from PerformanceResourceTiming entries.
 * Returns 0 when the API is unavailable.
 */
export function getBytesTransferred(): number {
  if (typeof performance === 'undefined') return 0;
  return (
    performance.getEntriesByType('resource') as PerformanceResourceTiming[]
  ).reduce((acc, e) => acc + (e.transferSize ?? 0), 0);
}

/**
 * Sum decoded (uncompressed) body sizes — a better proxy for render work.
 */
export function getBytesDecoded(): number {
  if (typeof performance === 'undefined') return 0;
  return (
    performance.getEntriesByType('resource') as PerformanceResourceTiming[]
  ).reduce((acc, e) => acc + (e.decodedBodySize ?? 0), 0);
}
