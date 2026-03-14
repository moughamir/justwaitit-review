import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

import { useSectionObserver } from '../use-section-observer';

describe('useSectionObserver', () => {
  const mockIntersectionObserver = vi.fn();
  let originalIntersectionObserver: any;

  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = '';

    // Mock IntersectionObserver
    originalIntersectionObserver = window.IntersectionObserver;
    window.IntersectionObserver = class IntersectionObserver {
      constructor(callback: any) {
        mockIntersectionObserver(callback);
      }
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    } as any;
  });

  afterEach(() => {
    window.IntersectionObserver = originalIntersectionObserver;
    document.body.innerHTML = '';
  });

  const createMockSections = (ids: string[]) => {
    ids.forEach((id) => {
      const section = document.createElement('section');
      section.id = id;
      document.body.appendChild(section);
    });
  };

  it('should return activeIndex and visible', () => {
    createMockSections(['section1', 'section2', 'section3']);

    const { result } = renderHook(() =>
      useSectionObserver(['section1', 'section2', 'section3'] as const)
    );

    expect(result.current).toHaveProperty('activeIndex');
    expect(result.current).toHaveProperty('visible');
    expect(result.current.activeIndex).toBe(0);
    expect(result.current.visible).toBe(false);
  });

  it('should observe all provided section IDs', () => {
    createMockSections(['section1', 'section2', 'section3']);

    renderHook(() =>
      useSectionObserver(['section1', 'section2', 'section3'] as const)
    );

    expect(mockIntersectionObserver).toHaveBeenCalledTimes(2);
    const zoneObserverCallback = mockIntersectionObserver.mock.calls[0][0];
    const sentinelObserverCallback = mockIntersectionObserver.mock.calls[1][0];

    expect(zoneObserverCallback).toBeDefined();
    expect(sentinelObserverCallback).toBeDefined();
  });

  it('should update activeIndex when section enters viewport', () => {
    createMockSections(['section1', 'section2', 'section3']);

    const { result } = renderHook(() =>
      useSectionObserver(['section1', 'section2', 'section3'] as const)
    );

    // Simulate section2 entering the viewport
    const zoneObserverCallback = mockIntersectionObserver.mock.calls[0][0];
    act(() => {
      zoneObserverCallback([
        {
          isIntersecting: true,
          target: { id: 'section2' },
        },
      ]);
    });

    expect(result.current.activeIndex).toBe(1);
  });

  it('should set visible to true when first section is in viewport', () => {
    createMockSections(['section1', 'section2']);

    const { result } = renderHook(() =>
      useSectionObserver(['section1', 'section2'] as const)
    );

    // Simulate first section entering viewport
    const sentinelObserverCallback = mockIntersectionObserver.mock.calls[1][0];
    act(() => {
      sentinelObserverCallback([
        {
          isIntersecting: true,
        },
      ]);
    });

    expect(result.current.visible).toBe(true);
  });

  it('should set visible to true when first section has scrolled past', () => {
    createMockSections(['section1', 'section2']);

    const { result } = renderHook(() =>
      useSectionObserver(['section1', 'section2'] as const)
    );

    // Simulate first section scrolled past (boundingClientRect.top < 0)
    const sentinelObserverCallback = mockIntersectionObserver.mock.calls[1][0];
    act(() => {
      sentinelObserverCallback([
        {
          isIntersecting: false,
          boundingClientRect: { top: -100 },
        },
      ]);
    });

    expect(result.current.visible).toBe(true);
  });

  it('should handle non-existent section IDs gracefully', () => {
    // Don't create any sections
    expect(() => {
      renderHook(() =>
        useSectionObserver(['nonexistent1', 'nonexistent2'] as const)
      );
    }).not.toThrow();
  });

  it('should cleanup observers on unmount', () => {
    createMockSections(['section1', 'section2']);

    const { unmount } = renderHook(() =>
      useSectionObserver(['section1', 'section2'] as const)
    );

    const mockDisconnect = vi.fn();
    mockIntersectionObserver.mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: mockDisconnect,
    }));

    unmount();

    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('should handle multiple intersecting sections', () => {
    createMockSections(['section1', 'section2', 'section3']);

    const { result } = renderHook(() =>
      useSectionObserver(['section1', 'section2', 'section3'] as const)
    );

    // Simulate multiple sections intersecting
    const zoneObserverCallback = mockIntersectionObserver.mock.calls[0][0];
    act(() => {
      zoneObserverCallback([
        { isIntersecting: true, target: { id: 'section1' } },
        { isIntersecting: true, target: { id: 'section3' } },
      ]);
    });

    // Should update to the last intersecting section
    expect(result.current.activeIndex).toBe(2);
  });
});
