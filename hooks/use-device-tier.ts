'use client';

import { useSyncExternalStore } from 'react';

type Tier = 'high' | 'mid' | 'low';

function subscribe() {
  // Device properties typically don't change during a session
  return () => {};
}

function getSnapshot(): Tier {
  if (typeof window === 'undefined') return 'high';

  const cores = navigator.hardwareConcurrency ?? 4;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - deviceMemory is non-standard but useful in Chrome
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const memory = (navigator as any).deviceMemory ?? 4;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - connection is non-standard
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const connection = (navigator as any).connection?.effectiveType ?? '4g';

  if (
    cores <= 2 ||
    memory <= 1 ||
    connection === '2g' ||
    connection === 'slow-2g'
  ) {
    return 'low';
  } else if (cores <= 4 || memory <= 2 || connection === '3g') {
    return 'mid';
  } else {
    return 'high';
  }
}

function getServerSnapshot(): Tier {
  return 'high';
}

export function useDeviceTier(): Tier {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
