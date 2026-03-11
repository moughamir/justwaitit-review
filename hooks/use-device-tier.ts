'use client';
import { useState, useEffect } from 'react';

export function useDeviceTier(): 'high' | 'mid' | 'low' {
  const [tier, setTier] = useState<'high' | 'mid' | 'low'>('high');

  useEffect(() => {
    // Only access navigator on client
    if (typeof window === 'undefined') return;

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
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTier('low');
    } else if (cores <= 4 || memory <= 2 || connection === '3g') {
      setTier('mid');
    } else {
      setTier('high');
    }
  }, []);

  return tier;
}
