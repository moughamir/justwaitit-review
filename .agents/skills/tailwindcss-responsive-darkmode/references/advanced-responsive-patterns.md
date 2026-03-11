# Advanced Responsive Patterns (2025/2026)

## Container Queries - The 2025 Game-Changer

Container queries allow components to respond to their parent container's size rather than the viewport. This is essential for reusable component design in modern applications.

### Setup

```css
@import 'tailwindcss';
@plugin '@tailwindcss/container-queries';
```

### Basic Container Query

```html
<div class="@container">
  <article class="@md:flex-row @md:items-center flex flex-col gap-4">
    <img class="@md:w-48 aspect-video w-full rounded-lg object-cover" />
    <div>
      <h3 class="@lg:text-xl text-lg font-semibold">Title</h3>
      <p class="@md:text-base text-sm text-gray-600">Description</p>
    </div>
  </article>
</div>
```

### Named Containers

```html
<div class="@container/sidebar">
  <nav class="@lg/sidebar:flex-row flex flex-col">
    <!-- Responds to sidebar container width -->
  </nav>
</div>

<div class="@container/main">
  <section class="@xl/main:grid-cols-3 grid grid-cols-1">
    <!-- Responds to main container width -->
  </section>
</div>
```

### Container Query Breakpoints

| Class  | Min-width     |
| ------ | ------------- |
| `@xs`  | 20rem (320px) |
| `@sm`  | 24rem (384px) |
| `@md`  | 28rem (448px) |
| `@lg`  | 32rem (512px) |
| `@xl`  | 36rem (576px) |
| `@2xl` | 42rem (672px) |
| `@3xl` | 48rem (768px) |

### Custom Container Breakpoints

```css
@theme {
  --container-3xs: 16rem;
  --container-2xs: 18rem;
  --container-4xl: 56rem;
}
```

## Advanced Breakpoint Patterns

### Between Breakpoints

```html
<!-- Only between sm and md -->
<div class="hidden sm:block md:hidden">Tablet only content</div>

<!-- Only on large screens (not xl+) -->
<div class="hidden lg:flex xl:hidden">Large but not extra-large</div>
```

### Max-Width Breakpoints

```css
/* Custom max-width variant */
@custom-variant max-sm (media(width < 640px));
@custom-variant max-md (media(width < 768px));
@custom-variant max-lg (media(width < 1024px));
```

```html
<div class="flex flex-row max-md:flex-col">
  Column on mobile, row on tablet+
</div>
```

### Orientation Variants

```html
<div class="flex portrait:flex-col landscape:flex-row">
  Adapts to device orientation
</div>
```

### Print Styles

```html
<div class="print:hidden">Hidden when printing</div>

<div class="hidden print:block">Only visible when printing</div>

<nav class="bg-blue-600 print:bg-transparent print:text-black">
  Printer-friendly navigation
</nav>
```

## Fluid Typography

### Using clamp()

```css
@theme {
  --text-fluid-sm: clamp(0.875rem, 0.8rem + 0.25vw, 1rem);
  --text-fluid-base: clamp(1rem, 0.9rem + 0.5vw, 1.25rem);
  --text-fluid-lg: clamp(1.25rem, 1rem + 1vw, 1.75rem);
  --text-fluid-xl: clamp(1.5rem, 1rem + 2vw, 2.5rem);
  --text-fluid-2xl: clamp(2rem, 1rem + 3vw, 4rem);
}
```

```html
<h1 class="text-fluid-2xl font-bold">Responsive Heading</h1>
<p class="text-fluid-base">Paragraph that scales smoothly</p>
```

### Fluid Spacing

```css
@theme {
  --spacing-fluid-sm: clamp(0.5rem, 0.25rem + 1vw, 1rem);
  --spacing-fluid-md: clamp(1rem, 0.5rem + 2vw, 2rem);
  --spacing-fluid-lg: clamp(2rem, 1rem + 3vw, 4rem);
}
```

```html
<section class="py-fluid-lg px-fluid-md">
  Fluid padding that scales with viewport
</section>
```

## Responsive Grid Systems

### Auto-Fit Grid

```html
<!-- Cards auto-fit with minimum 280px -->
<div class="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
  <Card />
  <Card />
  <Card />
</div>
```

### Responsive Sidebar Layout

```html
<div class="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
  <aside class="hidden lg:block">Sidebar</aside>
  <main>Content</main>
</div>

<!-- With collapsible sidebar -->
<div class="grid grid-cols-1 gap-6 lg:grid-cols-[auto_1fr]">
  <aside class="w-16 transition-all duration-300 lg:w-64">
    <span class="hidden lg:inline">Full text</span>
    <span class="lg:hidden">Icon</span>
  </aside>
  <main>Content</main>
</div>
```

### Holy Grail Layout

```html
<div class="grid min-h-screen grid-rows-[auto_1fr_auto]">
  <header class="h-16 border-b bg-white">Header</header>

  <div
    class="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[200px_1fr_200px]"
  >
    <nav class="hidden bg-gray-50 p-4 md:block">Navigation</nav>
    <main class="p-6">Main Content</main>
    <aside class="hidden bg-gray-50 p-4 lg:block">Sidebar</aside>
  </div>

  <footer class="h-16 bg-gray-900 text-white">Footer</footer>
</div>
```

## Responsive Component Patterns

### Responsive Navigation

```html
<nav class="flex items-center justify-between p-4">
  <Logo />

  <!-- Desktop nav -->
  <ul class="hidden items-center gap-6 md:flex">
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Services</a></li>
    <li><a href="#">Contact</a></li>
  </ul>

  <!-- Mobile menu button -->
  <button class="p-2 md:hidden">
    <MenuIcon />
  </button>
</nav>

<!-- Mobile nav (shown when open) -->
<div class="fixed inset-0 z-50 bg-white md:hidden">
  <ul class="flex flex-col gap-4 p-4">
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Services</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</div>
```

### Responsive Table

```html
<!-- Stack on mobile, table on desktop -->
<div class="overflow-x-auto">
  <table class="w-full">
    <thead class="hidden md:table-header-group">
      <tr class="border-b">
        <th class="p-3 text-left">Name</th>
        <th class="p-3 text-left">Email</th>
        <th class="p-3 text-left">Role</th>
        <th class="p-3 text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr class="flex flex-col border-b py-4 md:table-row md:py-0">
        <td class="p-3" data-label="Name">
          <span class="font-medium md:hidden">Name: </span>
          John Doe
        </td>
        <td class="p-3" data-label="Email">
          <span class="font-medium md:hidden">Email: </span>
          john@example.com
        </td>
        <td class="p-3" data-label="Role">
          <span class="font-medium md:hidden">Role: </span>
          Admin
        </td>
        <td class="p-3">
          <button size="sm">Edit</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

### Responsive Cards

```html
<!-- Card that changes layout at container breakpoint -->
<div class="@container">
  <article
    class="@sm:flex-row flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm"
  >
    <img
      src="..."
      class="@sm:w-32 @md:w-48 @sm:aspect-square aspect-video w-full rounded-lg object-cover"
    />
    <div class="flex-1">
      <h3 class="@md:text-xl text-lg font-semibold">Card Title</h3>
      <p class="@md:line-clamp-3 mt-2 line-clamp-2 text-gray-600">
        Description text that adapts to available space...
      </p>
      <div class="mt-4 flex flex-wrap gap-2">
        <Badge>Tag 1</Badge>
        <Badge>Tag 2</Badge>
      </div>
    </div>
  </article>
</div>
```

## Motion and Accessibility

### Reduced Motion

```html
<div
  class="transition-transform duration-300 motion-safe:hover:scale-105 motion-reduce:transition-none"
>
  Respects motion preferences
</div>
```

### Forced Colors Mode

```html
<button
  class="bg-blue-600 text-white forced-colors:border-2 forced-colors:border-current"
>
  Works in high contrast mode
</button>
```

## Safe Area Handling (Notched Devices)

For devices with notches (iPhone X+, modern Android), respect safe areas:

### Custom Safe Area Utilities

```css
@utility safe-area-pt {
  padding-top: env(safe-area-inset-top);
}

@utility safe-area-pb {
  padding-bottom: env(safe-area-inset-bottom);
}

@utility safe-area-pl {
  padding-left: env(safe-area-inset-left);
}

@utility safe-area-pr {
  padding-right: env(safe-area-inset-right);
}

@utility safe-area-p {
  padding: env(safe-area-inset-top) env(safe-area-inset-right)
    env(safe-area-inset-bottom) env(safe-area-inset-left);
}
```

### Usage

```html
<!-- Header respects top notch -->
<header class="safe-area-pt sticky top-0 border-b bg-white">
  <nav class="flex h-14 items-center px-4">Navigation</nav>
</header>

<!-- Bottom navigation respects home indicator -->
<nav class="safe-area-pb fixed inset-x-0 bottom-0 border-t bg-white">
  <div class="flex justify-around py-2">Bottom nav</div>
</nav>

<!-- Full-screen app shell -->
<div class="safe-area-p min-h-screen">App content</div>
```

## Performance Optimizations for Responsive Design

### Content Visibility for Off-Screen Content

```css
@utility content-auto {
  content-visibility: auto;
  contain-intrinsic-size: auto 500px;
}
```

```html
<section class="content-auto">
  <!-- Content below fold - rendering deferred until needed -->
  Large section content
</section>
```

### Lazy Loading

```html
<!-- Native lazy loading for images -->
<img
  src="image.jpg"
  alt="Description"
  loading="lazy"
  decoding="async"
  class="h-auto w-full"
/>

<!-- Lazy load iframes -->
<iframe src="embed.html" loading="lazy" class="aspect-video w-full"></iframe>
```

### Reduced Data Mode

```css
@custom-variant prefers-reduced-data (media(prefers-reduced-data: reduce));
```

```html
<!-- Show simpler content on slow/metered connections -->
<div class="prefers-reduced-data:hidden block">
  <video autoplay muted loop>Full video</video>
</div>
<div class="prefers-reduced-data:block hidden">
  <img src="poster.jpg" alt="Video poster" />
</div>
```

## 2025/2026 CSS Features

### View Transitions (Progressive Enhancement)

```css
@utility view-transition-name-* {
  view-transition-name: --value(ident);
}
```

```html
<div class="view-transition-name-card">Animates during page transitions</div>
```

### Subgrid for Aligned Nested Grids

```html
<div class="grid grid-cols-3 gap-4">
  <div class="col-span-2 grid grid-cols-subgrid">
    <!-- Child grid aligns with parent columns -->
    <div>Aligned 1</div>
    <div>Aligned 2</div>
  </div>
</div>
```

### :has() Selector for Parent Selection

```css
/* Style parent based on child state */
.card:has(input:focus) {
  @apply ring-2 ring-blue-500;
}

/* Show sibling when checkbox checked */
.toggle:has(input:checked) + .content {
  @apply block;
}
```

## Best Practices Summary

| Pattern            | Implementation             | Use Case            |
| ------------------ | -------------------------- | ------------------- |
| Viewport queries   | `md:`, `lg:` prefixes      | Page layouts        |
| Container queries  | `@md:`, `@lg:` prefixes    | Reusable components |
| Fluid typography   | `clamp()` in @theme        | Smooth scaling      |
| Touch targets      | `min-h-11 min-w-11`        | Mobile interactions |
| Safe areas         | `env(safe-area-inset-*)`   | Notched devices     |
| Reduced motion     | `motion-reduce:` prefix    | Accessibility       |
| Lazy loading       | `loading="lazy"`           | Performance         |
| Content visibility | `content-visibility: auto` | Render optimization |
