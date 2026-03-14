import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

import { useDeviceTier } from '../use-device-tier';

describe('useDeviceTier', () => {
  const originalHardwareConcurrency = navigator.hardwareConcurrency;
  const originalDeviceMemory = (navigator as any).deviceMemory;
  const originalConnection = (navigator as any).connection;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Restore original values
    Object.defineProperty(navigator, 'hardwareConcurrency', {
      value: originalHardwareConcurrency,
      writable: true,
    });
    Object.defineProperty(navigator, 'deviceMemory', {
      value: originalDeviceMemory,
      writable: true,
    });
    Object.defineProperty(navigator, 'connection', {
      value: originalConnection,
      writable: true,
    });
  });

  it('should return high tier for powerful devices', () => {
    // Mock powerful device
    Object.defineProperty(navigator, 'hardwareConcurrency', {
      value: 8,
      writable: true,
    });
    Object.defineProperty(navigator, 'deviceMemory', {
      value: 8,
      writable: true,
    });
    Object.defineProperty(navigator, 'connection', {
      value: { effectiveType: '4g' },
      writable: true,
    });

    const { result } = renderHook(() => useDeviceTier());

    expect(result.current).toBe('high');
  });

  it('should return mid tier for medium devices', () => {
    // Mock medium device
    Object.defineProperty(navigator, 'hardwareConcurrency', {
      value: 4,
      writable: true,
    });
    Object.defineProperty(navigator, 'deviceMemory', {
      value: 2,
      writable: true,
    });
    Object.defineProperty(navigator, 'connection', {
      value: { effectiveType: '3g' },
      writable: true,
    });

    const { result } = renderHook(() => useDeviceTier());

    expect(result.current).toBe('mid');
  });

  it('should return low tier for low-end devices with few cores', () => {
    Object.defineProperty(navigator, 'hardwareConcurrency', {
      value: 2,
      writable: true,
    });
    Object.defineProperty(navigator, 'deviceMemory', {
      value: 4,
      writable: true,
    });
    Object.defineProperty(navigator, 'connection', {
      value: { effectiveType: '4g' },
      writable: true,
    });

    const { result } = renderHook(() => useDeviceTier());

    expect(result.current).toBe('low');
  });

  it('should return low tier for low-end devices with low memory', () => {
    Object.defineProperty(navigator, 'hardwareConcurrency', {
      value: 4,
      writable: true,
    });
    Object.defineProperty(navigator, 'deviceMemory', {
      value: 1,
      writable: true,
    });
    Object.defineProperty(navigator, 'connection', {
      value: { effectiveType: '4g' },
      writable: true,
    });

    const { result } = renderHook(() => useDeviceTier());

    expect(result.current).toBe('low');
  });

  it('should return low tier for slow connection (2g)', () => {
    Object.defineProperty(navigator, 'hardwareConcurrency', {
      value: 8,
      writable: true,
    });
    Object.defineProperty(navigator, 'deviceMemory', {
      value: 8,
      writable: true,
    });
    Object.defineProperty(navigator, 'connection', {
      value: { effectiveType: '2g' },
      writable: true,
    });

    const { result } = renderHook(() => useDeviceTier());

    expect(result.current).toBe('low');
  });

  it('should return low tier for slow connection (slow-2g)', () => {
    Object.defineProperty(navigator, 'hardwareConcurrency', {
      value: 8,
      writable: true,
    });
    Object.defineProperty(navigator, 'deviceMemory', {
      value: 8,
      writable: true,
    });
    Object.defineProperty(navigator, 'connection', {
      value: { effectiveType: 'slow-2g' },
      writable: true,
    });

    const { result } = renderHook(() => useDeviceTier());

    expect(result.current).toBe('low');
  });

  it('should return mid tier for 3g connection', () => {
    Object.defineProperty(navigator, 'hardwareConcurrency', {
      value: 8,
      writable: true,
    });
    Object.defineProperty(navigator, 'deviceMemory', {
      value: 8,
      writable: true,
    });
    Object.defineProperty(navigator, 'connection', {
      value: { effectiveType: '3g' },
      writable: true,
    });

    const { result } = renderHook(() => useDeviceTier());

    expect(result.current).toBe('mid');
  });

  it('should use default values when navigator properties are undefined', () => {
    // Delete all properties to trigger defaults
    Object.defineProperty(navigator, 'hardwareConcurrency', {
      value: undefined,
      writable: true,
    });
    Object.defineProperty(navigator, 'deviceMemory', {
      value: undefined,
      writable: true,
    });
    Object.defineProperty(navigator, 'connection', {
      value: undefined,
      writable: true,
    });

    const { result } = renderHook(() => useDeviceTier());

    // Should default to high (4 cores, 4GB memory, 4g connection)
    expect(result.current).toBe('high');
  });
});
