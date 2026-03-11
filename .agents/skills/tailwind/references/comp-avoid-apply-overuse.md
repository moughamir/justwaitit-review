---
title: Avoid Overusing @apply
impact: MEDIUM-HIGH
impactDescription: prevents CSS bloat, maintains utility-first benefits
tags: comp, apply, abstraction, maintainability, css
---

## Avoid Overusing @apply

While `@apply` extracts utility patterns into custom classes, overuse defeats the purpose of utility-first CSS. Use it sparingly for small, highly reusable patterns.

**Incorrect (over-abstraction):**

```css
/* Recreating traditional CSS with extra steps */
@utility card {
  @apply rounded-lg border border-gray-200 bg-white p-6 shadow-md;
}

@utility card-header {
  @apply mb-4 text-xl font-bold text-gray-900;
}

@utility card-body {
  @apply leading-relaxed text-gray-600;
}

@utility card-footer {
  @apply mt-4 flex justify-end gap-2 border-t border-gray-200 pt-4;
}
/* Now you have to manage class names AND jump between files */
```

**Correct (utility-first with components):**

```tsx
// Card.tsx - Component handles abstraction
function Card({ children, className }) {
  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white p-6 shadow-md ${className}`}
    >
      {children}
    </div>
  );
}

// Usage
<Card className="hover:shadow-lg">
  <h2 className="mb-4 text-xl font-bold text-gray-900">Title</h2>
  <p className="leading-relaxed text-gray-600">Content</p>
</Card>;
```

**When @apply is appropriate:**

- Tiny, repeated patterns (buttons, badges)
- Third-party component styling you can't control
- Base form element resets

Reference: [Tailwind CSS Reusing Styles](https://tailwindcss.com/docs/reusing-styles)
