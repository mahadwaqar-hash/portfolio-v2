# 001 — Eliminate `transition-all` Conflicts with Framer Motion Springs

- **Status**: DONE
- **Commit**: portfolio-v2-main
- **Severity**: HIGH
- **Category**: Performance
- **Estimated scope**: 2 files (`src/components/TrustMetricsSection.tsx`, `src/components/ContactNexus.tsx`), ~15 lines

## Problem

Framer Motion spring physics (`whileHover={{ y: -4, scale: 1.02 }}`) and CSS `transition-all duration-300` are applied to the same DOM elements simultaneously.

When the user hovers over a metric card or contact card, Framer Motion writes transformed subpixel values (`transform: translate3d(...) scale(...)`) to the element on every frame. The browser's CSS transition engine intercepts those transform changes and attempts to transition them over 300ms, creating a "double-smoothing" conflict. This leads to input latency, micro-stutter, and sluggish hover release.

```tsx
/* src/components/TrustMetricsSection.tsx:194-198 — current */
<motion.div
  key={idx}
  whileHover={{ y: -4, scale: 1.02 }}
  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
  className={`p-5 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all duration-300 flex flex-col justify-between ${m.glowClass}`}
>
```

```tsx
/* src/components/ContactNexus.tsx:114-118 — current */
whileHover={{ y: -4, scale: 1.01 }}
whileTap={{ scale: 0.97 }}
viewport={{ once: true }}
transition={{ type: 'spring', stiffness: 350, damping: 22 }}
className="group relative p-6 sm:p-8 apple-glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-[#00B67A]/50 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,182,122,0.2)] flex flex-col justify-between h-44 sm:h-52 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B67A]"
```

```tsx
/* src/components/ContactNexus.tsx:158-166 — current */
whileHover={{ y: -4, scale: 1.01 }}
whileTap={{ scale: 0.97 }}
viewport={{ once: true }}
transition={{ type: 'spring', stiffness: 350, damping: 22 }}
className={`group relative p-6 sm:p-8 apple-glass-card rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between text-left h-44 sm:h-52 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DEC1FC] ${
  copied
    ? 'border-[#00B67A] shadow-[0_0_35px_rgba(0,182,122,0.3)] bg-[#00B67A]/5'
    : 'border-white/10 hover:border-[#DEC1FC]/50 hover:shadow-[0_20px_50px_rgba(222,193,252,0.2)]'
}`}
```

## Target

Remove `transition-all` from cards driven by Framer Motion transforms. Replace with explicit, non-conflicting CSS transition properties: `transition-colors duration-200` and `transition-[box-shadow,border-color] duration-300`. This grants Framer Motion exclusive, unimpeded 60fps authority over `transform`.

```tsx
/* target: TrustMetricsSection.tsx */
className={`p-5 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-colors duration-200 transition-shadow duration-300 flex flex-col justify-between ${m.glowClass}`}
```

```tsx
/* target: ContactNexus.tsx */
className="group relative p-6 sm:p-8 apple-glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-[#00B67A]/50 transition-colors duration-200 transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(0,182,122,0.2)] flex flex-col justify-between h-44 sm:h-52 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B67A]"
```

## Repo conventions to follow

- Hover styles use Tailwind classes (`hover:border-...`, `hover:shadow-...`).
- Framer Motion handles dynamic physics (`whileHover`, `whileTap`) exclusively on GPU transforms (`y`, `scale`).

## Steps

1. In `src/components/TrustMetricsSection.tsx:197`:
   Replace `transition-all duration-300` with `transition-colors duration-200 transition-shadow duration-300`.
2. In `src/components/ContactNexus.tsx:118`:
   Replace `transition-all duration-300` with `transition-colors duration-200 transition-shadow duration-300`.
3. In `src/components/ContactNexus.tsx:162`:
   Replace `transition-all duration-300` with `transition-colors duration-200 transition-shadow duration-300`.
4. In `src/components/ContactNexus.tsx:292`:
   Replace `transition-all duration-300` with `transition-colors duration-200 transition-shadow duration-300`.

## Boundaries

- Do NOT touch the spring physics values (`stiffness: 350, damping: 20/22`).
- Do NOT remove the hover box shadows or border colors.
- Motion properties only.

## Verification

- **Mechanical**: Run `npm run build` — must build with zero errors.
- **Feel check**:
  - Sweep cursor rapidly over the 4 metric cards in the process section: cards must track cursor enter/leave instantaneously without a 300ms delayed drag.
  - Hover over the WhatsApp and Email cards: hover lift and scale must feel tactile and snappy with zero rubber-band jitter.
- **Done when**: In Chrome DevTools Elements panel, inspecting `.apple-glass-card` reveals no active CSS `transition-property: all`.
