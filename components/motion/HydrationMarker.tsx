'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    __mjHydrated?: boolean;
  }
}

/**
 * Leaf client sentinel rendered at the end of a page route (`app/page.tsx`).
 * Its `useEffect` only fires after the route's entire React tree has hydrated,
 * preventing layout-level GSAP/Preloader effects from mutating inline `style`
 * attributes on SSR nodes before child hydration completes.
 */
export function HydrationMarker() {
  useEffect(() => {
    window.__mjHydrated = true;
    window.dispatchEvent(new Event('mj:hydrated'));
  }, []);

  return null;
}
