import { useEffect, useRef, useState } from 'react';

interface UseLazyVideoOptions {
  /** Threshold for intersection observer (0-1) */
  threshold?: number;
  /** Root margin for intersection observer */
  rootMargin?: string;
  /** Skip lazy loading (always load immediately) */
  eager?: boolean;
}

/**
 * Custom hook for lazy-loading videos with intersection observer
 * Optimizes FCP by deferring video loading until visible
 */
export function useLazyVideo({
  threshold = 0.1,
  rootMargin = '200px',
  eager = false,
}: UseLazyVideoOptions = {}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(eager);
  const [isInView, setIsInView] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // If eager loading, skip intersection observer
    if (eager) {
      // Use requestAnimationFrame to avoid setState in effect
      requestAnimationFrame(() => setShouldLoad(true));
      return;
    }

    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
          if (entry.isIntersecting) {
            setShouldLoad(true);
            // Stop observing once loaded
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(videoElement);

    return () => {
      observer.disconnect();
    };
  }, [eager, rootMargin, threshold]);

  // Track when video has loaded metadata
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleLoadedData = () => {
      requestAnimationFrame(() => setHasLoaded(true));
    };

    if (videoElement.readyState >= 3) {
      requestAnimationFrame(() => setHasLoaded(true));
    } else {
      videoElement.addEventListener('loadeddata', handleLoadedData);
      return () => {
        videoElement.removeEventListener('loadeddata', handleLoadedData);
      };
    }
  }, []);

  return {
    videoRef,
    shouldLoad,
    // isInView - removed as it's not currently used
    hasLoaded,
  };
}
