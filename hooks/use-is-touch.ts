'use client';

import { useSyncExternalStore } from 'react';

function subscribe(callback: () => void) {
  const mql = window.matchMedia('(pointer: coarse)');
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

function getSnapshot() {
  return window.matchMedia('(pointer: coarse)').matches;
}

function getServerSnapshot() {
  return false;
}

export function useIsTouch() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
