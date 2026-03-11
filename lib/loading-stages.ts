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

export function resolveStage(progress: number): LoadingStage {
  return (
    [...LOADING_STAGES].reverse().find((s) => progress >= s.threshold) ??
    LOADING_STAGES[0]
  );
}
