# 008 — Blur-Masked Crossfade for Capability Tab Transitions

- **Status**: DONE
- **Commit**: portfolio-v2-main
- **Severity**: LOW
- **Category**: Cohesion & Polish
- **Estimated scope**: 1 file (`src/components/ServicesSection.tsx`), ~25 lines

## Problem

In `ServicesSection.tsx:108-126`, all 3 service panels reside in the exact same CSS grid cell (`col-start-1 row-start-1`):

```tsx
/* src/components/ServicesSection.tsx:118-124 — current */
animate={{
  opacity: isActive ? 1 : 0,
  y: isActive ? 0 : 12,
  pointerEvents: isActive ? 'auto' : 'none',
}}
transition={{ type: 'spring', stiffness: 300, damping: 26 }}
className="col-start-1 row-start-1 flex flex-col justify-center will-change-transform transform-gpu"
```

When switching from "Web Architecture" to "Local SEO", the departing panel fades from 100% to 0% while the arriving panel fades from 0% to 100% in the exact same screen real estate. At the midpoint (around 100ms), both paragraphs overlap at ~50% opacity. The colliding text creates an unpolished "double-exposure" visual glitch.

Per Emil Kowalski's guidelines (AUDIT.md Category 7):
"A jarring crossfade that shows two overlapping states can be masked with subtle `filter: blur(2px)` during the transition, or by making exits twice as fast as entrances so text never visibly collides."

## Target

1. Asymmetric crossfade timing: The departing panel exits rapidly in `100ms`, while the arriving panel enters smoothly in `220ms` (`y: 8 → 0`).
2. Blur mask: Apply a subtle `filter: isActive ? 'blur(0px)' : 'blur(3px)'` during the transition to soften the state handoff.

```tsx
/* target: src/components/ServicesSection.tsx */
animate={{
  opacity: isActive ? 1 : 0,
  y: isActive ? 0 : 8,
  filter: isActive ? 'blur(0px)' : 'blur(3px)',
  pointerEvents: isActive ? 'auto' : 'none',
}}
transition={{
  duration: isActive ? 0.22 : 0.10,
  ease: [0.23, 1, 0.32, 1],
}}
className="col-start-1 row-start-1 flex flex-col justify-center transform-gpu"
```

## Repo conventions to follow

- All 3 panels remain mounted in the DOM for SEO/crawlers with `aria-hidden={!isActive}`.
- Single CSS grid cell overlap (`col-start-1 row-start-1`).

## Steps

1. In `src/components/ServicesSection.tsx:118-124`:
   Update the `animate` prop:
   ```tsx
   animate={{
     opacity: isActive ? 1 : 0,
     y: isActive ? 0 : 8,
     filter: isActive ? 'blur(0px)' : 'blur(3px)',
     pointerEvents: isActive ? 'auto' : 'none',
   }}
   ```
2. In `src/components/ServicesSection.tsx:123`:
   Replace the uniform spring transition with asymmetric duration:
   ```tsx
   transition={{
     duration: isActive ? 0.22 : 0.10,
     ease: [0.23, 1, 0.32, 1],
   }}
   ```

## Boundaries

- Do NOT unmount inactive tab panels from the DOM (strict SEO/GEO requirement).
- Keep blur radius under 4px (heavy blur causes GPU compositor slowdowns on mobile).

## Verification

- **Mechanical**: Run `npm run build` — must build with zero errors.
- **Feel check**:
  - Click rapidly between tab 01, 02, and 03.
  - In DevTools (slow motion 20%), observe the text transition: the departing text dissolves swiftly without colliding or double-exposing with the incoming text.
- **Done when**: Text crossfade feels silky, intentional, and editorial with zero ghosting artifacts.
