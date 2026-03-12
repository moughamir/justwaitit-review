---
title: Use GPU-Accelerated Transform Properties
impact: LOW-MEDIUM
impactDescription: 60fps animations, avoids layout thrashing
tags: anim, gpu, transform, performance, compositing
---

## Use GPU-Accelerated Transform Properties

Animate `transform` and `opacity` properties instead of layout-triggering properties like `width`, `height`, `top`, or `left`. GPU-accelerated properties don't trigger layout recalculation.

**Incorrect (layout-triggering animation):**

```html
<div class="w-20 transition-all duration-300 hover:w-40">
  <!-- Animating width triggers layout on every frame -->
</div>

<div class="absolute top-0 transition-all hover:top-10">
  <!-- Animating top triggers layout recalculation -->
</div>
```

**Correct (GPU-accelerated animation):**

```html
<div class="scale-100 transition-transform duration-300 hover:scale-x-150">
  <!-- Transform is GPU-accelerated, no layout triggers -->
</div>

<div class="absolute transition-transform hover:translate-y-10">
  <!-- Translate is GPU-accelerated -->
</div>
```

**GPU-accelerated properties:**

- `transform` (translate, rotate, scale, skew)
- `opacity`
- `filter` (blur, brightness, etc.)

**Layout-triggering properties (avoid animating):**

- `width`, `height`
- `top`, `right`, `bottom`, `left`
- `margin`, `padding`
- `font-size`

Reference: [Tailwind CSS v4.0 Release](https://tailwindcss.com/blog/tailwindcss-v4)
