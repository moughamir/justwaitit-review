---
name: tailwindcss-animations
description: Tailwind CSS animations and transitions including built-in utilities and custom animation patterns
---

# Tailwind CSS Animations & Transitions

## Built-in Animations

### Spin

Continuous rotation for loading indicators:

```html
<svg class="h-5 w-5 animate-spin text-blue-500" viewBox="0 0 24 24">
  <circle
    class="opacity-25"
    cx="12"
    cy="12"
    r="10"
    stroke="currentColor"
    stroke-width="4"
  />
  <path
    class="opacity-75"
    fill="currentColor"
    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
  />
</svg>
```

### Ping

Radar-style pulse for notifications:

```html
<span class="relative flex h-3 w-3">
  <span
    class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"
  ></span>
  <span class="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
</span>
```

### Pulse

Subtle fade for skeleton loaders:

```html
<div class="flex animate-pulse space-x-4">
  <div class="h-10 w-10 rounded-full bg-slate-200"></div>
  <div class="flex-1 space-y-2 py-1">
    <div class="h-2 rounded bg-slate-200"></div>
    <div class="h-2 w-5/6 rounded bg-slate-200"></div>
  </div>
</div>
```

### Bounce

Attention-grabbing vertical bounce:

```html
<svg
  class="h-6 w-6 animate-bounce text-blue-500"
  fill="none"
  viewBox="0 0 24 24"
>
  <path
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    d="M19 14l-7 7m0 0l-7-7m7 7V3"
  />
</svg>
```

## Transitions

### Transition Properties

| Class                  | CSS Property      |
| ---------------------- | ----------------- |
| `transition-none`      | None              |
| `transition-all`       | All properties    |
| `transition`           | Common properties |
| `transition-colors`    | Colors only       |
| `transition-opacity`   | Opacity only      |
| `transition-shadow`    | Shadow only       |
| `transition-transform` | Transform only    |

### Transition Duration

| Class           | Duration |
| --------------- | -------- |
| `duration-75`   | 75ms     |
| `duration-100`  | 100ms    |
| `duration-150`  | 150ms    |
| `duration-200`  | 200ms    |
| `duration-300`  | 300ms    |
| `duration-500`  | 500ms    |
| `duration-700`  | 700ms    |
| `duration-1000` | 1000ms   |

### Transition Timing Functions

| Class         | Easing                     |
| ------------- | -------------------------- |
| `ease-linear` | Linear                     |
| `ease-in`     | Accelerate                 |
| `ease-out`    | Decelerate                 |
| `ease-in-out` | Accelerate then decelerate |

### Transition Delay

| Class       | Delay |
| ----------- | ----- |
| `delay-75`  | 75ms  |
| `delay-100` | 100ms |
| `delay-150` | 150ms |
| `delay-200` | 200ms |
| `delay-300` | 300ms |
| `delay-500` | 500ms |

### Basic Transition Examples

```html
<!-- Color transition -->
<button class="bg-blue-500 transition-colors duration-200 hover:bg-blue-700">
  Hover me
</button>

<!-- Scale on hover -->
<div class="transform transition-transform duration-200 hover:scale-105">
  Card
</div>

<!-- Opacity transition -->
<div class="opacity-100 transition-opacity duration-150 hover:opacity-75">
  Fade
</div>

<!-- Multiple properties -->
<button
  class="transform bg-blue-500 shadow-md transition-all duration-200 hover:scale-105 hover:bg-blue-700 hover:shadow-lg"
>
  Full transition
</button>
```

## Transform Utilities

### Scale

```html
<div class="scale-100 transform transition-transform hover:scale-110">
  Scale up
</div>

<div class="scale-100 transform transition-transform hover:scale-90">
  Scale down
</div>

<!-- Specific axes -->
<div class="transform hover:scale-x-110">Horizontal</div>
<div class="transform hover:scale-y-110">Vertical</div>
```

### Rotate

```html
<div class="transform transition-transform hover:rotate-12">Rotate right</div>

<div class="transform transition-transform hover:-rotate-12">Rotate left</div>

<div class="transform transition-transform duration-500 hover:rotate-180">
  Flip
</div>
```

### Translate

```html
<div class="transform transition-transform hover:translate-x-2">Move right</div>

<div class="transform transition-transform hover:-translate-y-2">Move up</div>
```

### Skew

```html
<div class="transform transition-transform hover:skew-x-3">Skew horizontal</div>

<div class="transform transition-transform hover:skew-y-3">Skew vertical</div>
```

### Transform Origin

```html
<div class="origin-center transform hover:rotate-45">Center (default)</div>
<div class="origin-top-left transform hover:rotate-45">Top left</div>
<div class="origin-bottom-right transform hover:rotate-45">Bottom right</div>
```

## Custom Animations (v4)

### Define in @theme

```css
@theme {
  /* Custom keyframes */
  --animate-fade-in: fade-in 0.5s ease-out;
  --animate-slide-up: slide-up 0.3s ease-out;
  --animate-shake: shake 0.5s ease-in-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}
```

### Usage

```html
<div class="animate-fade-in">Fades in</div>
<div class="animate-slide-up">Slides up</div>
<div class="animate-shake">Shakes on error</div>
```

### Custom Easing

```css
@theme {
  --ease-in-expo: cubic-bezier(0.95, 0.05, 0.795, 0.035);
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

```html
<div class="ease-bounce transition-transform duration-300 hover:scale-110">
  Bouncy scale
</div>
```

## Accessibility: Reduced Motion

### motion-safe / motion-reduce

```html
<!-- Only animate if user prefers motion -->
<div class="motion-safe:animate-bounce motion-reduce:animate-none">
  Respects preferences
</div>

<!-- Alternative: reduced animation -->
<button
  class="hover:bg-blue-600 motion-safe:transition-all motion-safe:duration-200 motion-reduce:transition-none"
>
  Accessible button
</button>
```

### Reduced Motion Pattern

```css
/* Apply globally */
@media (prefers-reduced-motion: reduce) {
  *,
  ::before,
  ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Common Animation Patterns

### Hover Card Lift

```html
<div
  class="transform rounded-lg bg-white p-6 shadow transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
>
  Card content
</div>
```

### Button Press Effect

```html
<button
  class="transform rounded bg-blue-500 px-4 py-2 text-white transition-transform duration-100 active:scale-95"
>
  Click me
</button>
```

### Loading Dots

```html
<div class="flex space-x-1">
  <div
    class="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.3s]"
  ></div>
  <div
    class="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.15s]"
  ></div>
  <div class="h-2 w-2 animate-bounce rounded-full bg-blue-500"></div>
</div>
```

### Fade In on Scroll (with JS)

```html
<div class="translate-y-4 opacity-0 transition-all duration-500" data-animate>
  Content that fades in
</div>
```

```javascript
// Intersection Observer to trigger animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('opacity-0', 'translate-y-4');
    }
  });
});

document
  .querySelectorAll('[data-animate]')
  .forEach((el) => observer.observe(el));
```

### Skeleton Loader

```html
<div class="animate-pulse">
  <div class="mb-4 h-4 w-3/4 rounded bg-gray-200"></div>
  <div class="mb-4 h-4 w-1/2 rounded bg-gray-200"></div>
  <div class="h-4 w-5/6 rounded bg-gray-200"></div>
</div>
```

### Hamburger to X Animation

```html
<button class="group" aria-label="Toggle menu">
  <span
    class="block h-0.5 w-6 bg-black transition-all duration-200 group-open:translate-y-1.5 group-open:rotate-45"
  ></span>
  <span
    class="mt-1 block h-0.5 w-6 bg-black transition-opacity duration-200 group-open:opacity-0"
  ></span>
  <span
    class="mt-1 block h-0.5 w-6 bg-black transition-all duration-200 group-open:-translate-y-1.5 group-open:-rotate-45"
  ></span>
</button>
```

## Transition on Enter/Leave (with JS)

For complex enter/leave transitions, use a library like Headless UI:

```jsx
import { Transition } from '@headlessui/react';

function Modal({ isOpen, children }) {
  return (
    <Transition
      show={isOpen}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition>
  );
}
```

## Performance Tips

### 1. Prefer GPU-Accelerated Properties

```html
<!-- GOOD - GPU accelerated -->
<div class="transform transition-transform hover:translate-x-2">
  <!-- AVOID - May cause repaints -->
  <div class="transition-all hover:left-2"></div>
</div>
```

### 2. Use Specific Transitions

```html
<!-- GOOD - Only transitions what changes -->
<div class="transition-colors duration-200 hover:bg-blue-500">
  <!-- AVOID - Transitions everything -->
  <div class="transition-all duration-200 hover:bg-blue-500"></div>
</div>
```

### 3. Keep Animations Short

```html
<!-- GOOD - Snappy feedback -->
<button class="transition-colors duration-150">
  <!-- AVOID - Too slow for UI feedback -->
  <button class="transition-colors duration-1000"></button>
</button>
```

### 4. Use will-change Sparingly

```html
<!-- Only for complex, frequently animated elements -->
<div class="animate-spin will-change-transform">Loading spinner</div>
```
