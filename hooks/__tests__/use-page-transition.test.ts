import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

import { usePageTransition } from '../use-page-transition';

import { NAV_START_EVENT } from '@/components/ui/NavigationProgress';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    prefetch: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
}));

describe('usePageTransition', () => {
  let originalStartViewTransition: any;

  beforeEach(() => {
    vi.clearAllMocks();
    originalStartViewTransition = document.startViewTransition;
  });

  afterEach(() => {
    document.startViewTransition = originalStartViewTransition;
  });

  it('should return navigate, isPending, and prefetch functions', () => {
    const { result } = renderHook(() => usePageTransition());

    expect(result.current.navigate).toBeDefined();
    expect(result.current.isPending).toBeDefined();
    expect(result.current.prefetch).toBeDefined();
    expect(typeof result.current.navigate).toBe('function');
    expect(typeof result.current.prefetch).toBe('function');
  });

  it('should dispatch NAV_START_EVENT before navigation', () => {
    const { result } = renderHook(() => usePageTransition());
    const eventDispatcherSpy = vi.spyOn(
      window,
      'dispatchEvent' as keyof Window
    );

    act(() => {
      result.current.navigate('/test-page');
    });

    expect(eventDispatcherSpy).toHaveBeenCalled();
    const dispatchedEvent = eventDispatcherSpy.mock.calls[0][0];
    expect(dispatchedEvent.type).toBe(NAV_START_EVENT);
  });

  it('should call router.push with the correct href', async () => {
    const { result } = renderHook(() => usePageTransition());

    act(() => {
      result.current.navigate('/about');
    });

    const { useRouter } = await import('next/navigation');
    const mockRouter = useRouter();
    expect(mockRouter.push).toHaveBeenCalledWith('/about');
  });

  it('should use startViewTransition when available', () => {
    const mockStartViewTransition = vi.fn((cb) => cb());
    document.startViewTransition = mockStartViewTransition as any;

    const { result } = renderHook(() => usePageTransition());

    act(() => {
      result.current.navigate('/new-page');
    });

    expect(mockStartViewTransition).toHaveBeenCalled();
  });

  it('should work without startViewTransition when not available', () => {
    // @ts-expect-error - simulate browser without View Transition API
    delete document.startViewTransition;

    const { result } = renderHook(() => usePageTransition());

    act(() => {
      result.current.navigate('/fallback-page');
    });

    const { useRouter } = await import('next/navigation');
    const mockRouter = useRouter();
    expect(mockRouter.push).toHaveBeenCalledWith('/fallback-page');
  });

  it('should call router.prefetch with the correct href', async () => {
    const { result } = renderHook(() => usePageTransition());

    act(() => {
      result.current.prefetch('/preloaded-page');
    });

    const { useRouter } = await import('next/navigation');
    const mockRouter = useRouter();
    expect(mockRouter.prefetch).toHaveBeenCalledWith('/preloaded-page');
  });

  it('should handle navigation on server-side gracefully', () => {
    // Simulate server-side environment
    const originalWindow = global.window;
    // @ts-expect-error - window is undefined in server-side environment
    delete global.window;

    const { result } = renderHook(() => usePageTransition());

    // Should not throw
    expect(() => {
      act(() => {
        result.current.navigate('/server-page');
      });
    }).not.toThrow();

    // Restore window
    global.window = originalWindow;
  });
});
