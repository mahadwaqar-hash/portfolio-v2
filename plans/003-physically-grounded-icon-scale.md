# 003 — Physically Grounded Micro-Icon Scale and Spring Transition

- **Status**: DONE
- **Commit**: portfolio-v2-main
- **Severity**: HIGH
- **Category**: Physicality & Origin
- **Estimated scope**: 1 file (`src/components/ContactNexus.tsx`), ~20 lines

## Problem

In `ContactNexus.tsx`, when the user clicks "Copy Email", the morphing checkmark and copy SVG icons animate from `scale: 0.4` with `rotate: -45`:

```tsx
/* src/components/ContactNexus.tsx:197-220 — current */
<AnimatePresence mode="wait">
  {copied ? (
    <motion.svg
      key="check"
      initial={{ scale: 0.4, rotate: -45, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      exit={{ scale: 0.4, rotate: 45, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 450, damping: 20 }}
...
  ) : (
    <motion.svg
      key="copy"
      initial={{ scale: 0.4, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.4, opacity: 0 }}
      transition={{ duration: 0.2 }}
```

Per Emil Kowalski's animation physics rules (AUDIT.md Category 3):
- Nothing in the physical world pops into existence from a miniature 40% dot. Exaggerated scale jumps (`scale: 0.4`) feel like a cheap cartoon effect rather than high-end software craft.
- Initial scale should stay grounded in the `0.88–0.94` range paired with `opacity: 0`.
- Rotation should be subtle (`-15°` to `0°`), not `-45°`.

## Target

Ground the icon scale entrance at `0.90` with subtle `-15°` rotation, driven by an Apple-style damped spring (`{ type: "spring", stiffness: 400, damping: 25 }`):

```tsx
/* target: src/components/ContactNexus.tsx */
<AnimatePresence mode="wait">
  {copied ? (
    <motion.svg
      key="check"
      initial={{ scale: 0.88, rotate: -15, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      exit={{ scale: 0.92, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 420, damping: 25 }}
      viewBox="0 0 24 24"
      className="w-4 h-4 text-[#00B67A]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </motion.svg>
  ) : (
    <motion.svg
      key="copy"
      initial={{ scale: 0.90, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.92, opacity: 0 }}
      transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </motion.svg>
  )}
</AnimatePresence>
```

## Repo conventions to follow

- Icon containers use `w-8 h-8 rounded-full border flex items-center justify-center`.
- `AnimatePresence mode="wait"` manages icon transitions.

## Steps

1. In `src/components/ContactNexus.tsx:199`:
   Change `initial={{ scale: 0.4, rotate: -45, opacity: 0 }}` to:
   `initial={{ scale: 0.88, rotate: -15, opacity: 0 }}`.
2. In `src/components/ContactNexus.tsx:201-202`:
   Change `exit={{ scale: 0.4, rotate: 45, opacity: 0 }}` and transition to:
   `exit={{ scale: 0.92, opacity: 0 }}` with `transition={{ type: 'spring', stiffness: 420, damping: 25 }}`.
3. In `src/components/ContactNexus.tsx:216`:
   Change `initial={{ scale: 0.4, opacity: 0 }}` to:
   `initial={{ scale: 0.90, opacity: 0 }}`.
4. In `src/components/ContactNexus.tsx:218-219`:
   Change `exit={{ scale: 0.4, opacity: 0 }}` to:
   `exit={{ scale: 0.92, opacity: 0 }}` with `transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}`.

## Boundaries

- Do NOT change the green stroke color or SVG paths.
- Do NOT alter the clipboard write logic (`navigator.clipboard.writeText`).

## Verification

- **Mechanical**: Run `npm run build` — must build with zero errors.
- **Feel check**:
  - Click the "Copy Email" card: the transition from copy icon to checkmark must feel like a crisp mechanical shutter click rather than an icon inflating from a pinpoint.
  - In DevTools Animations panel (set speed to 25%), verify the icon enters at 90% size, settles with zero overshoot jitter, and smoothly transitions back to the copy icon after 2.5s.
- **Done when**: Checkmark pops cleanly into place with natural physicality and zero visual jarring.
