# Bugfix Design Document

## Overview

This document specifies the technical approach to fix critical performance issues on the Anaqio landing page. The bug manifests as severe main thread blocking (10,350ms TBT), slow First Contentful Paint (6.3s), and slow Largest Contentful Paint (11.1s), caused by heavy client-side JavaScript execution, expensive canvas rendering, synchronous font loading, and lack of code splitting.

## Bug Condition Specification

### Fault Condition

The bug occurs when the landing page loads with performance-degrading patterns. The fault condition identifies inputs (page load scenarios) that trigger performance defects:

```pseudocode
isBugCondition(pageLoad) =
  (pageLoad.hasAbstractBackgroundCanvas = true AND
   pageLoad.canvasUsesExpensivePixelManipulation = true) OR

  (pageLoad.fontLoadingStrategy = "synchronous" AND
   pageLoad.fontFamilyCount >= 4) OR

  (pageLoad.hasFramerMotionAnimations = true AND
   pageLoad.framerMotionCodeSplitting = false AND
   pageLoad.animationsExecuteBeforeContentVisible = true) OR

  (pageLoad.heroSectionUsesHeavyBlurFilters = true AND
   pageLoad.heroSectionUsesJavaScriptAnimations = true)
```

### Expected Behavior Properties

When the bug condition is satisfied, the system should exhibit the following performance characteristics:

```pseudocode
expectedBehavior(metrics) =
  metrics.totalBlockingTime < 200 AND
  metrics.firstContentfulPaint < 1800 AND
  metrics.largestContentfulPaint < 2500 AND
  metrics.mainThreadIdleTime > 0.8 * metrics.totalLoadTime
```

## Preservation Requirements

The fix must preserve existing functionality and user experience for non-buggy aspects:

### Visual Preservation

```pseudocode
preserveVisuals(page) =
  page.heroSection.hasGradientText = true AND
  page.heroSection.hasCTAButton = true AND
  page.colorScheme = {blue: "#2563EB", purple: "#7C3AED"} AND
  page.layout.desktop = "golden-ratio-with-typographic-card"
```

### Functional Preservation

```pseudocode
preserveFunctionality(page) =
  page.waitlistForm.validatesInputs = true AND
  page.waitlistForm.submitsData = true AND
  page.sections.hasSmooth Transitions = true AND
  page.snapScrolling.enabled = true (on large screens)
```

### Accessibility Preservation

```pseudocode
preserveAccessibility(page) =
  page.hasSemanticHTML = true AND
  page.hasARIALabels = true AND
  page.respectsMotionPreferences = true
```

## Technical Approach

### 1. AbstractBackground Optimization

**Problem**: Expensive canvas pixel manipulation on every animation frame

**Solution**:

- Replace canvas-based effects with CSS gradients and transforms
- Use `will-change` CSS property for GPU acceleration
- Implement `requestIdleCallback` for any remaining canvas operations

**Files to modify**:

- `components/brand/abstract-background.tsx`

### 2. Font Loading Optimization

**Problem**: 4 Google Font families loading synchronously

**Solution**:

- Add `font-display: swap` to all font declarations
- Preload critical fonts (Space Grotesk, Inter) in `app/layout.tsx`
- Defer non-critical fonts (Instrument Serif, JetBrains Mono)
- Use `next/font/google` for automatic optimization

**Files to modify**:

- `app/layout.tsx`
- `tailwind.config.ts`

### 3. Framer Motion Code Splitting

**Problem**: All Framer Motion JavaScript loads upfront

**Solution**:

- Lazy load below-the-fold components with `next/dynamic`
- Defer Framer Motion imports for non-critical animations
- Replace simple animations with CSS transitions

**Files to modify**:

- `app/page.tsx`
- `components/sections/hero-section.tsx`
- `components/sections/problem-section.tsx`
- `components/sections/waitlist-section.tsx`

### 4. Hero Section Animation Optimization

**Problem**: Heavy blur filters and JavaScript-based scroll animations

**Solution**:

- Replace Framer Motion scroll transforms with CSS `transform` and `opacity`
- Remove or reduce blur filter intensity
- Use `transform: translateZ(0)` for GPU acceleration
- Defer animation initialization until after FCP

**Files to modify**:

- `components/sections/hero-section.tsx`

### 5. Content Prioritization

**Problem**: Animation calculations execute before content visible

**Solution**:

- Render static HTML first
- Hydrate animations after LCP
- Use `priority` prop on critical images
- Implement progressive enhancement pattern

**Files to modify**:

- `app/page.tsx`
- `components/sections/hero-section.tsx`

## Implementation Strategy

1. **Exploration Phase**: Write property-based tests that verify performance metrics on unfixed code (tests will fail)
2. **Preservation Phase**: Write tests that capture current visual and functional behavior (tests will pass)
3. **Implementation Phase**: Apply optimizations while ensuring exploration tests pass and preservation tests continue passing
4. **Validation Phase**: Verify all performance targets met and no regressions introduced

## Success Criteria

- Total Blocking Time < 200ms
- First Contentful Paint < 1.8s
- Largest Contentful Paint < 2.5s
- All visual elements render correctly
- All interactive features work as before
- Accessibility maintained
- Motion preferences respected
