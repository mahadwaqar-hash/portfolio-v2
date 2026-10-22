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
