'use client';
import { useState, useEffect } from 'react';

/**
 * Extended Navigator interface to include non-standard/experimental properties
 * used for device capability detection.
 */
interface NavigatorWithCapabilities extends Navigator {
  deviceMemory?: number;
  connection?: {
    effectiveType: string;
    saveData: boolean;
  };
}

export function useDeviceTier(): 'high' | 'mid' | 'low' {
  const [tier, setTier] = useState<'high' | 'mid' | 'low'>('high');

  useEffect(() => {
    // Only access navigator on client
    if (typeof window === 'undefined') return;

    const nav = navigator as NavigatorWithCapabilities;

    const cores = nav.hardwareConcurrency ?? 4;
    // deviceMemory is non-standard but useful in Chrome
    const memory = nav.deviceMemory ?? 4;
    // connection is non-standard
    const connection = nav.connection?.effectiveType ?? '4g';

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
