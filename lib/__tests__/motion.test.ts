import { describe, expect, it } from 'vitest';

import {
  ease,
  fadeUp,
  fadeUpCard,
  fadeIn,
  slideInLeft,
  clipReveal,
  flipReveal,
  charReveal,
  scatterIn,
} from '../motion';

describe('motion utilities', () => {
  describe('ease', () => {
    it('should be an array with 4 elements', () => {
      expect(ease).toHaveLength(4);
    });

    it('should have correct easing values', () => {
      expect(ease).toEqual([0.16, 1, 0.3, 1]);
    });
  });

  describe('fadeUp', () => {
    it('should return reduced motion variant when reduced is true', () => {
      const result = fadeUp(true);
      expect(result.initial).toBe(false);
    });

    it('should return full animation when reduced is false', () => {
      const result = fadeUp(false);
      expect(result.initial).toEqual({ opacity: 0, y: 20 });
      expect(result.whileInView).toEqual({ opacity: 1, y: 0 });
    });

    it('should accept custom delay', () => {
      const result = fadeUp(false, 0.5);
      expect(result.transition.delay).toBe(0.5);
    });

    it('should have correct viewport settings', () => {
      const result = fadeUp(false);
      expect(result.viewport).toEqual({
        once: true,
        margin: '-80px',
      });
    });

    it('should have correct transition duration', () => {
      const result = fadeUp(false);
      expect(result.transition.duration).toBe(0.7);
    });
  });

  describe('fadeUpCard', () => {
    it('should return reduced motion variant when reduced is true', () => {
      const result = fadeUpCard(true);
      expect(result.initial).toBe(false);
    });

    it('should return full animation when reduced is false', () => {
      const result = fadeUpCard(false);
      expect(result.initial).toEqual({ opacity: 0, y: 24 });
      expect(result.whileInView).toEqual({ opacity: 1, y: 0 });
    });

    it('should accept custom index for stagger', () => {
      const result = fadeUpCard(false, 3);
      expect(result.transition.delay).toBeCloseTo(0.3);
    });

    it('should have correct viewport settings', () => {
      const result = fadeUpCard(false);
      expect(result.viewport).toEqual({
        once: true,
        margin: '-60px',
      });
    });

    it('should have correct transition duration', () => {
      const result = fadeUpCard(false);
      expect(result.transition.duration).toBe(0.5);
    });
  });

  describe('fadeIn', () => {
    it('should return reduced motion variant when reduced is true', () => {
      const result = fadeIn(true);
      expect(result.initial).toBe(false);
    });

    it('should return opacity-only animation when reduced is false', () => {
      const result = fadeIn(false);
      expect(result.initial).toEqual({ opacity: 0 });
      expect(result.whileInView).toEqual({ opacity: 1 });
    });

    it('should accept custom delay', () => {
      const result = fadeIn(false, 0.3);
      expect(result.transition.delay).toBe(0.3);
    });
  });

  describe('slideInLeft', () => {
    it('should return reduced motion variant when reduced is true', () => {
      const result = slideInLeft(true);
      expect(result.initial).toBe(false);
    });

    it('should return slide animation when reduced is false', () => {
      const result = slideInLeft(false);
      expect(result.initial).toEqual({ opacity: 0, x: -16 });
      expect(result.whileInView).toEqual({ opacity: 1, x: 0 });
    });

    it('should accept custom index for stagger', () => {
      const result = slideInLeft(false, 2);
      expect(result.transition.delay).toBe(0.2);
    });
  });

  describe('clipReveal', () => {
    it('should return reduced motion variant when reduced is true', () => {
      const result = clipReveal(true);
      expect(result.initial).toBe(false);
    });

    it('should return clip-path animation when reduced is false', () => {
      const result = clipReveal(false);
      expect(result.initial).toEqual({
        clipPath: 'inset(0 100% 0 0)',
        opacity: 0,
      });
      expect(result.whileInView).toEqual({
        clipPath: 'inset(0 0% 0 0)',
        opacity: 1,
      });
    });

    it('should have correct duration', () => {
      const result = clipReveal(false);
      expect(result.transition.duration).toBe(0.9);
    });
  });

  describe('flipReveal', () => {
    it('should return reduced motion variant when reduced is true', () => {
      const result = flipReveal(true);
      expect(result.initial).toBe(false);
    });

    it('should return 3D flip animation when reduced is false', () => {
      const result = flipReveal(false);
      expect(result.initial).toEqual({
        rotateY: 20,
        opacity: 0,
        scale: 0.97,
      });
      expect(result.whileInView).toEqual({
        rotateY: 0,
        opacity: 1,
        scale: 1,
      });
    });

    it('should have perspective style', () => {
      const result = flipReveal(false);
      expect(result.style?.perspective).toBe('1200px');
    });

    it('should accept custom index for stagger', () => {
      const result = flipReveal(false, 2);
      expect(result.transition.delay).toBe(0.24);
    });
  });

  describe('charReveal', () => {
    it('should return reduced motion variant when reduced is true', () => {
      const result = charReveal(true);
      expect(result.initial).toBe(false);
    });

    it('should return character animation when reduced is false', () => {
      const result = charReveal(false);
      expect(result.initial).toEqual({
        rotateX: 80,
        opacity: 0,
        y: 12,
      });
      expect(result.animate).toEqual({
        rotateX: 0,
        opacity: 1,
        y: 0,
      });
    });

    it('should have correct style properties', () => {
      const result = charReveal(false);
      expect(result.style?.display).toBe('inline-block');
      expect(result.style?.transformOrigin).toBe('bottom center');
      expect(result.style?.perspective).toBe('600px');
    });

    it('should accept custom index for stagger', () => {
      const result = charReveal(false, 5);
      expect(result.transition.delay).toBeCloseTo(0.225);
    });
  });

  describe('scatterIn', () => {
    it('should return reduced motion variant when reduced is true', () => {
      const result = scatterIn(true);
      expect(result.initial).toBe(false);
    });

    it('should return scatter animation with default values', () => {
      const result = scatterIn(false);
      expect(result.initial).toEqual({ x: 0, y: 60, opacity: 0 });
      expect(result.whileInView).toEqual({ x: 0, y: 0, opacity: 1 });
    });

    it('should accept custom x and y offsets', () => {
      const result = scatterIn(false, 30, 40);
      expect(result.initial).toEqual({ x: 30, y: 40, opacity: 0 });
    });

    it('should accept custom delay', () => {
      const result = scatterIn(false, 0, 60, 0.5);
      expect(result.transition.delay).toBe(0.5);
    });

    it('should have correct duration', () => {
      const result = scatterIn(false);
      expect(result.transition.duration).toBe(0.8);
    });
  });
});
