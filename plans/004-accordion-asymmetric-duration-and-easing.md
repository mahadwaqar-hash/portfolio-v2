# 004 — Accordion Asymmetric Duration and Easing Refactor

- **Status**: DONE
- **Commit**: portfolio-v2-main
- **Severity**: MEDIUM
- **Category**: Easing & Duration
- **Estimated scope**: 1 file (`src/components/FaqSection.tsx`), ~25 lines

## Problem

In `FaqSection.tsx`, accordion open and close transitions use a symmetric duration of `0.35s` (350ms):

```tsx
/* src/components/FaqSection.tsx:87-95 — current */
<AnimatePresence initial={false}>
  {isOpen && (
    <motion.div
      id={`faq-answer-${index}`}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden"
    >
```

Problems identified:
1. **Exceeds UI duration budget**: 350ms exceeds the 250ms ceiling for content disclosure accordions, making clicks feel delayed.
2. **Symmetric exit violation**: When a user closes an answer or switches between questions, closing should be roughly 2x faster than opening. When collapse is as slow as expansion, the interface feels sluggish and obstructive.
3. **Missing button press feedback**: The accordion trigger button has hover states, but no `:active` or click compression feedback.

## Target

1. Asymmetric transition: Entrance opens in `220ms` (`ease-out`); exit collapses in `130ms` (fast, crisp dismissal).
2. Use Emil Kowalski's strong UI ease-out curve: `cubic-bezier(0.23, 1, 0.32, 1)`.
3. Add tactile `active:scale-[0.99]` feedback on the trigger button.

```tsx
/* target: src/components/FaqSection.tsx */
<motion.div
  id={`faq-answer-${index}`}
  initial={{ height: 0, opacity: 0 }}
  animate={{ 
    height: 'auto', 
    opacity: 1,
    transition: { 
      height: { duration: 0.22, ease: [0.23, 1, 0.32, 1] },
      opacity: { duration: 0.18, ease: 'easeOut', delay: 0.04 }
    }
  }}
  exit={{ 
    height: 0, 
    opacity: 0,
    transition: { 
      height: { duration: 0.13, ease: [0.23, 1, 0.32, 1] },
      opacity: { duration: 0.10, ease: 'easeIn' }
    }
  }}
  className="overflow-hidden"
>
```

## Repo conventions to follow

- Accordion container uses `apple-glass-card rounded-2xl overflow-hidden`.
- `AnimatePresence initial={false}` wraps the collapsible region.

## Steps

1. In `src/components/FaqSection.tsx:69`:
   Add `active:scale-[0.995] transition-transform` to the `<button>` className:
   ```tsx
   className="w-full p-6 sm:p-8 flex items-center justify-between gap-6 text-left group hover:bg-white/[0.02] active:scale-[0.995] transition-[background-color,transform] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DEC1FC]"
   ```
2. In `src/components/FaqSection.tsx:88-95`:
   Replace the uniform `transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}` on `motion.div` with differentiated open and exit transition objects:
   ```tsx
   initial={{ height: 0, opacity: 0 }}
   animate={{ 
     height: 'auto', 
     opacity: 1,
     transition: { 
       height: { duration: 0.22, ease: [0.23, 1, 0.32, 1] },
       opacity: { duration: 0.18, ease: 'easeOut', delay: 0.04 }
     }
   }}
   exit={{ 
     height: 0, 
     opacity: 0,
     transition: { 
       height: { duration: 0.13, ease: [0.23, 1, 0.32, 1] },
       opacity: { duration: 0.10, ease: 'easeIn' }
     }
   }}
   ```

## Boundaries

- Do NOT change the FAQ copy or HTML semantics (`aria-expanded`, `aria-controls`).
- Do NOT remove `AnimatePresence`.

## Verification

- **Mechanical**: Run `npm run build` — must build with zero errors.
- **Feel check**:
  - Click any FAQ item: content must expand quickly (snappy in 220ms) without feeling jerky.
  - Click again to close: collapse must snap closed in 130ms, disappearing twice as fast as it opened.
  - Rapidly click between FAQ items: layout must retarget smoothly without text jumping outside the glass boundary.
- **Done when**: Accordion feels responsive and natural, adhering to the 220ms/130ms asymmetric timing model.
