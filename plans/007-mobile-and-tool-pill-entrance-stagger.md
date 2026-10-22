# 007 — Choreographed Stagger Entrances on Mobile Drawer and Tool Pills

- **Status**: DONE
- **Commit**: portfolio-v2-main
- **Severity**: LOW
- **Category**: Cohesion & Polish
- **Estimated scope**: 2 files (`src/components/Navbar.tsx`, `src/components/ServicesSection.tsx`), ~35 lines

## Problem

In `Navbar.tsx`, when the mobile hamburger menu opens, all 6 navigation links appear simultaneously in a static block:

```tsx
/* src/components/Navbar.tsx:130-155 — current */
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="md:hidden fixed top-16 inset-x-4 z-40 bg-[#101015]/95 border border-white/15 rounded-2xl p-6 backdrop-blur-2xl flex flex-col gap-3 shadow-2xl"
    >
      ...
      {links.map((link) => (
        <a key={link.label} href={link.href} className="...">
          <span>{link.label}</span>
        </a>
      ))}
    </motion.div>
  )}
</AnimatePresence>
```

In `ServicesSection.tsx:131-142`, when switching capability tabs, the tech stack tool pills also appear in a single instantaneous row.

Per Emil Kowalski's animation rules (AUDIT.md Category 7):
"Everything-at-once group entrances where a 30–50ms stagger belongs make complex UI feel mechanical and unchoreographed. Stagger is decorative — it must be tight (30–45ms per child) and never block interaction."

## Target

1. Mobile Drawer in `Navbar.tsx`: Use Framer Motion `variants` on the drawer container (`staggerChildren: 0.035, delayChildren: 0.04`) and item variants (`{ closed: { opacity: 0, x: -8 }, open: { opacity: 1, x: 0 } }`). Total stagger takes ~180ms, feeling brisk and choreographed.
2. Capability Pills in `ServicesSection.tsx`: Animate pills with a 30ms stagger on tab change.

```tsx
/* target: src/components/Navbar.tsx */
const drawerVariants = {
  closed: { 
    opacity: 0, 
    scale: 0.98,
    y: -8, 
    transition: { duration: 0.15, ease: 'easeIn' } 
  },
  open: { 
    opacity: 1, 
    scale: 1,
    y: 0, 
    transition: { 
      duration: 0.24, 
      ease: [0.23, 1, 0.32, 1],
      staggerChildren: 0.035,
      delayChildren: 0.04
    } 
  }
};

const itemVariants = {
  closed: { opacity: 0, x: -8 },
  open: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] } 
  }
};
```

## Repo conventions to follow

- Mobile drawer renders inside `<AnimatePresence>`.
- Links use `font-tech text-lg text-white`.

## Steps

1. In `src/components/Navbar.tsx`:
   Define `drawerVariants` and `itemVariants` above `Navbar()`.
2. In `src/components/Navbar.tsx:132-154`:
   Update `motion.div` to consume `variants={drawerVariants}` with `initial="closed" animate="open" exit="closed"`.
   Replace the raw `<a>` tags with `<motion.a variants={itemVariants} ...>`.
3. In `src/components/ServicesSection.tsx:131`:
   Add `motion.div` container with `transition={{ staggerChildren: 0.03 }}` for the `s.tools` pill array.

## Boundaries

- Do NOT slow down mobile drawer dismissal: `exit` must remain fast (≤150ms).
- Do NOT alter link targets or `handleScroll` logic.

## Verification

- **Mechanical**: Run `npm run build` — must build with zero errors.
- **Feel check**:
  - On a mobile viewport (<768px), tap the hamburger icon (☰): the drawer opens with the 6 navigation items cascading gracefully from top to bottom.
  - Close the drawer (✕): drawer closes instantaneously without stagger delay on exit.
- **Done when**: Mobile menu cascade feels fluid, organic, and complete within 200ms.
