# 002 — Implement `prefers-reduced-motion` Systemic Accessibility

- **Status**: DONE
- **Commit**: portfolio-v2-main
- **Severity**: HIGH
- **Category**: Accessibility
- **Estimated scope**: 3 files (`src/index.css`, `src/components/HeroSection.tsx`, `src/components/LenisScroller.tsx`), ~25 lines

## Problem

The site contains zero handling for `prefers-reduced-motion`. Users with vestibular sensitivity or accessibility preferences who enable "Reduce motion" in their operating system still experience:
1. 3D mouse parallax tilt on the hero monolith (`rotateX` / `rotateY`).
2. Continuous SVG perimeter beam animations (`animate-border-beam`).
3. Lenis inertial scroll smoothing.
4. Scale and translation entrances across cards, buttons, and drawers.

Under WCAG 2.1 Success Criterion 2.3.3 (Animation from Interactions), non-essential motion triggered by interaction must be suppressible.

```tsx
/* src/components/HeroSection.tsx:220-224 — current */
style={{
  rotateX: isFinePointer ? rotateX : 0,
  rotateY: isFinePointer ? rotateY : 0,
  transformStyle: "preserve-3d",
}}
```

```css
/* src/index.css — current */
/* Zero @media (prefers-reduced-motion: reduce) block exists */
```

## Target

1. In `src/index.css`: Add a global `@media (prefers-reduced-motion: reduce)` block that disables continuous loops (`.animate-border-beam`) and reduces transitions to instant or gentle fades without breaking functional layout.
2. In `src/components/HeroSection.tsx`: Import `useReducedMotion` from `framer-motion` and disable 3D tilt when active.
3. In `src/components/LenisScroller.tsx`: Check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` and bypass Lenis smoothing.

```css
/* target: src/index.css */
@media (prefers-reduced-motion: reduce) {
  .animate-border-beam {
    animation: none !important;
  }
  html.lenis, html.lenis body {
    scroll-behavior: auto !important;
  }
}
```

```tsx
/* target: src/components/HeroSection.tsx */
const shouldReduceMotion = useReducedMotion();

// In motion.div style:
style={{
  rotateX: isFinePointer && !shouldReduceMotion ? rotateX : 0,
  rotateY: isFinePointer && !shouldReduceMotion ? rotateY : 0,
  transformStyle: "preserve-3d",
}}
```

## Repo conventions to follow

- Media queries in `src/index.css` match `@media (max-width: 767px)` style blocks.
- Framer Motion hooks (`useScroll`, `useMotionValue`) are placed at top of component body.

## Steps

1. In `src/index.css`:
   Add the following reduced-motion rule:
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, ::before, ::after {
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.01ms !important;
       scroll-behavior: auto !important;
     }
     .animate-border-beam {
       animation: none !important;
     }
   }
   ```
2. In `src/components/HeroSection.tsx:2`:
   Add `useReducedMotion` to the Framer Motion imports:
   ```tsx
   import { motion, useMotionValue, useSpring, useTransform, useScroll, useReducedMotion } from 'framer-motion';
   ```
3. In `src/components/HeroSection.tsx:68`:
   Initialize the hook:
   ```tsx
   const shouldReduceMotion = useReducedMotion();
   ```
4. In `src/components/HeroSection.tsx:221-222`:
   Update the style props:
   ```tsx
   rotateX: isFinePointer && !shouldReduceMotion ? rotateX : 0,
   rotateY: isFinePointer && !shouldReduceMotion ? rotateY : 0,
   ```
5. In `src/components/LenisScroller.tsx:17-23`:
   Add reduced motion detection to the early return check:
   ```tsx
   if (
     window.innerWidth < 768 ||
     window.matchMedia('(pointer: coarse)').matches ||
     window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
     'ontouchstart' in window
   ) {
     return;
   }
   ```

## Boundaries

- Do NOT remove opacity feedback for interactive states (reduced motion means fewer position/scale transforms, not invisible buttons).
- Do NOT break desktop fine pointer mouse tracking when reduced-motion is not requested.

## Verification

- **Mechanical**: Run `npm run build` — must build with zero errors.
- **Feel check**:
  1. Open Chrome DevTools -> Run Command (`Ctrl+Shift+P`) -> type `Emulate CSS prefers-reduced-motion: reduce`.
  2. Move mouse across Hero monolith: 3D tilt must stay completely stationary.
  3. Inspect monolith border beam: traveling gradient loop must be stopped.
  4. Scroll page with mouse wheel: scrolling must use standard instant native jump without inertial lag.
- **Done when**: With reduced motion emulated, all UI remains 100% accessible and readable with zero involuntary motion.
