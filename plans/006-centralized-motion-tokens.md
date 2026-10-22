# 006 — Centralized Motion and Spring Physics Tokens

- **Status**: DONE
- **Commit**: portfolio-v2-main
- **Severity**: MEDIUM
- **Category**: Cohesion & Tokens
- **Estimated scope**: 2 files (`src/styles/motion.ts`, `src/index.css`), ~40 lines

## Problem

The codebase has 8+ arbitrary, un-synchronized spring and easing configurations defined in isolation:

- `Navbar.tsx:78`: `{ type: "spring", stiffness: 350, damping: 25 }`
- `Navbar.tsx:92`: `{ type: 'spring', stiffness: 400, damping: 20 }`
- `HeroSection.tsx:85`: `{ stiffness: 180, damping: 25, mass: 0.5 }`
- `HeroSection.tsx:227`: `{ type: "spring", stiffness: 100, damping: 20 }`
- `ServicesSection.tsx:85`: `{ type: "spring", stiffness: 320, damping: 28 }`
- `ServicesSection.tsx:123`: `{ type: 'spring', stiffness: 300, damping: 26 }`
- `ServicesSection.tsx:136`: `{ type: 'spring', stiffness: 400, damping: 15 }` (underdamped spring with unnatural bounce)
- `ContactNexus.tsx:117`: `{ type: 'spring', stiffness: 350, damping: 22 }`
- `ContactNexus.tsx:202`: `{ type: 'spring', stiffness: 450, damping: 20 }`
- `FaqSection.tsx:76`: `{ type: 'spring', stiffness: 350, damping: 20 }`

Per Emil Kowalski's guidelines (AUDIT.md Category 7):
"Motion should match the product's personality — a luxury flagship stays crisp, physical, and restrained. Five hand-typed cubic-beziers and random spring numbers that almost match is a consolidation finding."

Without a shared token system, each component author invents their own physics, leading to inconsistent bounce and timing.

## Target

1. Create `src/styles/motion.ts` exporting centralized, typed motion presets based on Emil Kowalski's design engineering system.
2. Add CSS custom properties in `src/index.css` for standard cubic-beziers.

```ts
/* target: src/styles/motion.ts */
export const EASING = {
  out: [0.23, 1, 0.32, 1] as const,       // Strong ease-out for UI entrances
  inOut: [0.77, 0, 0.175, 1] as const,   // Strong ease-in-out for morphs & layout
  expo: [0.16, 1, 0.3, 1] as const,       // Flagship cinematic reveal
};

export const SPRING = {
  snappy: { type: 'spring', stiffness: 400, damping: 26 } as const, // Buttons, micro-icons, pills
  smooth: { type: 'spring', stiffness: 300, damping: 24 } as const, // Cards, modals, drawers
  subtle: { type: 'spring', stiffness: 180, damping: 22 } as const, // 3D tilt, ambient parallax
};

export const DURATION = {
  instant: 0.12,
  micro: 0.18,
  standard: 0.24,
  expand: 0.30,
};
```

```css
/* target: src/index.css */
:root {
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
}
```

## Repo conventions to follow

- Typescript utilities and data structures live in `src/` (`src/data/`, `src/styles/`).
- Framer Motion transitions consume `{ transition: SPRING.snappy }`.

## Steps

1. Create new file `src/styles/motion.ts` with the `EASING`, `SPRING`, and `DURATION` constants.
2. In `src/index.css`:
   Add the `:root` CSS variables for `--ease-out`, `--ease-in-out`, and `--ease-drawer` directly after line 3.
3. Update imports in `src/components/ServicesSection.tsx:136`:
   Replace ad-hoc `{ type: 'spring', stiffness: 400, damping: 15 }` with `SPRING.snappy`.

## Boundaries

- Do NOT alter project markup or layout.
- Existing visual endpoints and delays are preserved; only physics curve parameters are unified.

## Verification

- **Mechanical**: Run `npm run build` — must build with zero TypeScript errors.
- **Feel check**:
  - Compare interaction feedback on navbar buttons, service pills, and contact cards: all interactive elements must share a unified, tactile physical stiffness with zero oscillating overshoot bounce.
- **Done when**: `src/styles/motion.ts` exists and is consumed across interactive components.
