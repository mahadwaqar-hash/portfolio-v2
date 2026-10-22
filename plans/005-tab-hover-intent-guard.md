# 005 — Eliminate Accidental Tab Thrashing on Hover in Services Section

- **Status**: DONE
- **Commit**: portfolio-v2-main
- **Severity**: MEDIUM
- **Category**: Purpose & Frequency
- **Estimated scope**: 1 file (`src/components/ServicesSection.tsx`), ~15 lines

## Problem

In `ServicesSection.tsx`, capability tabs switch instantly on `onMouseEnter`:

```tsx
/* src/components/ServicesSection.tsx:76-78 — current */
onClick={() => setActive(idx)}
onMouseEnter={() => setActive(idx)}
className="relative text-left py-8 pr-8 pl-4 border-b border-white/10 transition-colors duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DEC1FC] focus-visible:ring-inset"
```

When users scroll through the page or move their cursor to read content, the cursor frequently sweeps over the left tab column. Because `onMouseEnter` is un-debounced:
1. Every casual cursor pass triggers an immediate active tab switch.
2. The `layoutId="activeCapabilityIndicator"` spring fires involuntarily.
3. The right-hand panel animates text and pills in and out repeatedly, creating visual noise and distraction.

Per Emil Kowalski's motion rules (AUDIT.md Category 1):
"Every animation must answer 'why does this animate?'... 'It looks cool' on a frequently-seen element is not a purpose... The strongest fix is often delete the animation or require deliberate intent."

## Target

Reserve the active tab switch and its layoutId spring indicator for deliberate user actions:
- Remove `onMouseEnter={() => setActive(idx)}`.
- Allow explicit user clicks (`onClick`) and keyboard navigation (`onKeyDown` Enter/Space).
- Keep a lightweight CSS text color highlight on hover (`group-hover:text-white`), leaving the active state indicator stable during cursor movement.

```tsx
/* target: src/components/ServicesSection.tsx */
<button
  key={s.id}
  role="tab"
  id={`tab-${s.id}`}
  aria-selected={isSelected}
  aria-controls={`panel-${s.id}`}
  onClick={() => setActive(idx)}
  className="relative text-left py-8 pr-8 pl-4 border-b border-white/10 transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DEC1FC] focus-visible:ring-inset active:bg-white/[0.02]"
>
```

## Repo conventions to follow

- Tabs adhere to WAI-ARIA tab pattern (`role="tab"`, `aria-selected`, `aria-controls`).
- Selected tab displays `<motion.div layoutId="activeCapabilityIndicator" ... />`.

## Steps

1. In `src/components/ServicesSection.tsx:77`:
   Delete `onMouseEnter={() => setActive(idx)}`.
2. In `src/components/ServicesSection.tsx:78`:
   Update className transition to `transition-colors duration-200 active:bg-white/[0.02]`.

## Boundaries

- Do NOT change the layoutId spring configuration (`stiffness: 320, damping: 28`).
- Do NOT alter the right-hand panel content or DOM layout.
- Tab selection must remain 100% accessible via keyboard focus and click.

## Verification

- **Mechanical**: Run `npm run build` — must build with zero errors.
- **Feel check**:
  - Sweep cursor quickly across tabs 01, 02, and 03: the active indicator must NOT jump or chase the pointer.
  - Click on tab 02: the `activeCapabilityIndicator` must glide smoothly with spring physics to tab 02.
  - Press `Tab` and `Enter`: keyboard navigation must switch tabs cleanly.
- **Done when**: Accidental tab jumping is eliminated; tab switching occurs only on deliberate intent.
