import { RESPONSIVE_GATES } from './config';

const STORAGE_KEY = 'mj-motion-override';
const OVERRIDE_EVENT = 'mj-motion-override-change';

export type MotionOverride = 'on' | 'off' | null;

export function subscribeReducedMotion(onStoreChange: () => void): () => void {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return () => {};
  }
  const mql = window.matchMedia(RESPONSIVE_GATES.reducedMotionQuery);
  mql.addEventListener('change', onStoreChange);
  return () => {
    mql.removeEventListener('change', onStoreChange);
  };
}

export function getReducedMotionSnapshot(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia(RESPONSIVE_GATES.reducedMotionQuery).matches;
}

export function getReducedMotionServerSnapshot(): boolean {
  return false;
}

export function subscribeMotionOverride(onStoreChange: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(OVERRIDE_EVENT, onStoreChange);
  window.addEventListener('storage', onStoreChange);
  return () => {
    window.removeEventListener(OVERRIDE_EVENT, onStoreChange);
    window.removeEventListener('storage', onStoreChange);
  };
}

export function getMotionOverrideSnapshot(): MotionOverride {
  if (typeof window === 'undefined') return null;
  try {
    const val = window.sessionStorage.getItem(STORAGE_KEY);
    return val === 'on' || val === 'off' ? val : null;
  } catch {
    return null;
  }
}

export function getMotionOverrideServerSnapshot(): MotionOverride {
  return null;
}

export function writeMotionOverride(override: MotionOverride): void {
  if (typeof window === 'undefined') return;
  try {
    if (override === null) window.sessionStorage.removeItem(STORAGE_KEY);
    else window.sessionStorage.setItem(STORAGE_KEY, override);
    window.dispatchEvent(new Event(OVERRIDE_EVENT));
  } catch {
    // Ignore storage failures in locked-down privacy contexts.
  }
}

export function computeMotionEnabled(
  prefersReducedMotion: boolean,
  override: MotionOverride
): boolean {
  if (override !== null) return override === 'on';
  return !prefersReducedMotion;
}
