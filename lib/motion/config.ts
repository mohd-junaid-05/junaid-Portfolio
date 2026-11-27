/**
 * Motion tokens and responsive feature gates derived from `docs/design-system.md`
 * and verified against the reference runtime (`E-013`, `E-036`, `E-039`).
 */
export const MOTION_TOKENS = {
  f2: 0.083,
  f6: 0.25,
  f12: 0.5,
  // GSAP approximation of cubic-bezier(0.16, 1, 0.3, 1) and cubic-bezier(0.76, 0, 0.24, 1)
  easeSlam: 'expo.out',
  easeCut: 'power3.inOut',
  revealDistancePx: 28,
} as const;

export const RESPONSIVE_GATES = {
  desktopNavMinWidth: 900,
  railMinWidth: 1024,
  stickyStackMinHeight: 620,
  hoverPointerQuery: '(hover: hover) and (pointer: fine)',
  reducedMotionQuery: '(prefers-reduced-motion: reduce)',
} as const;

export const LENIS_OPTIONS = {
  lerp: 0.1,
  smoothWheel: true,
  wheelMultiplier: 1,
  autoRaf: false,
  respectReducedMotion: true,
} as const;
