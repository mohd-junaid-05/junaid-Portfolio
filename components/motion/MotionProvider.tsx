'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { LENIS_OPTIONS } from '@/lib/motion/config';
import {
  ensureGsapPlugins,
  revealAllImmediately,
  setupScrollInfrastructure,
} from '@/lib/motion/gsapRegistry';
import {
  computeMotionEnabled,
  getMotionOverrideServerSnapshot,
  getMotionOverrideSnapshot,
  getReducedMotionServerSnapshot,
  getReducedMotionSnapshot,
  subscribeMotionOverride,
  subscribeReducedMotion,
  writeMotionOverride,
  type MotionOverride,
} from '@/lib/motion/preferences';

export interface MotionRuntimeValue {
  motionEnabled: boolean;
  prefersReducedMotion: boolean;
  toggleMotion: () => void;
  scrollToHash: (hash: string, options?: { immediate?: boolean }) => void;
}

const MotionContext = createContext<MotionRuntimeValue | null>(null);

function resolveHeaderOffset(): number {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--bar-h')
    .trim();
  const rootFont = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  if (raw.endsWith('rem')) return (parseFloat(raw) || 4) * rootFont;
  if (raw.endsWith('px')) return parseFloat(raw) || 64;
  return 64;
}

function focusAnchorTarget(target: HTMLElement): void {
  const isFocusable =
    target.tabIndex >= 0 ||
    /^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(target.tagName);

  if (!isFocusable) {
    target.setAttribute('tabindex', '-1');
  }
  target.focus({ preventScroll: true });
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const override = useSyncExternalStore(
    subscribeMotionOverride,
    getMotionOverrideSnapshot,
    getMotionOverrideServerSnapshot
  );

  const motionEnabled = computeMotionEnabled(prefersReducedMotion, override);
  const lenisRef = useRef<Lenis | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const scrollToHash = useCallback(
    (hash: string, options?: { immediate?: boolean }) => {
      if (!hash.startsWith('#')) return;
      const targetId = decodeURIComponent(hash.slice(1));
      const target = document.getElementById(targetId);
      if (!target) return;

      const mobileNav = document.querySelector<HTMLDetailsElement>('details.mobile-nav[open]');
      if (mobileNav) mobileNav.open = false;

      const instant = Boolean(options?.immediate) || !motionEnabled;
      const lenis = lenisRef.current;

      if (lenis && !instant && targetId !== 'main') {
        // Lenis 1.3.28 reads `scroll-padding-top` from `<html>` automatically;
        // passing `offset: 0` avoids doubling `--bar-h` (`64px -> 128px`).
        lenis.scrollTo(target, {
          offset: 0,
          duration: 0.85,
          easing: (t) => 1 - Math.pow(1 - t, 4),
          onComplete: () => focusAnchorTarget(target),
        });
      } else {
        const offset = targetId === 'main' ? 0 : -resolveHeaderOffset();
        const y = Math.max(0, target.getBoundingClientRect().top + window.scrollY + offset);
        window.scrollTo({ top: y, behavior: 'auto' });
        focusAnchorTarget(target);
      }

      if (window.location.hash !== hash) {
        window.history.pushState(null, '', hash);
      }
    },
    [motionEnabled]
  );

  const toggleMotion = useCallback(() => {
    const next: MotionOverride = motionEnabled ? 'off' : 'on';
    writeMotionOverride(next);
  }, [motionEnabled]);

  useEffect(() => {
    const html = document.documentElement;
    const scope = rootRef.current ?? document.body;

    html.classList.add('js');
    html.setAttribute('data-motion', motionEnabled ? 'on' : 'off');

    let cleanupRuntime: (() => void) | undefined;
    let fallbackTimer: number | null = null;
    let disposed = false;

    const startRuntime = () => {
      if (disposed) return;

      if (!motionEnabled) {
        html.classList.remove('lenis', 'lenis-smooth');
        revealAllImmediately(scope);

        const topbar = document.querySelector<HTMLElement>('.topbar');
        const syncStuck = () => {
          topbar?.classList.toggle('is-stuck', window.scrollY > 24);
        };
        syncStuck();
        window.addEventListener('scroll', syncStuck, { passive: true });
        cleanupRuntime = () => {
          window.removeEventListener('scroll', syncStuck);
        };
        return;
      }

      ensureGsapPlugins();

      const lenis = new Lenis(LENIS_OPTIONS);
      lenisRef.current = lenis;

      const unsubscribeLenis = lenis.on('scroll', ScrollTrigger.update);
      const onTick = (timeSeconds: number) => {
        lenis.raf(timeSeconds * 1000);
      };

      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);

      const ctx = setupScrollInfrastructure(scope);

      let resizeTimer: number | null = null;
      const resizeObserver = new ResizeObserver(() => {
        if (resizeTimer !== null) window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
          ScrollTrigger.refresh();
        }, 150);
      });
      resizeObserver.observe(document.body);

      let fontsCancelled = false;
      document.fonts?.ready.then(() => {
        if (!fontsCancelled) ScrollTrigger.refresh();
      });

      cleanupRuntime = () => {
        fontsCancelled = true;
        if (resizeTimer !== null) window.clearTimeout(resizeTimer);
        resizeObserver.disconnect();
        ctx.revert();
        gsap.ticker.remove(onTick);
        gsap.ticker.lagSmoothing(500, 33);
        unsubscribeLenis();
        lenis.destroy();
        lenisRef.current = null;
      };
    };

    const onHydrated = () => {
      if (fallbackTimer !== null) {
        window.clearTimeout(fallbackTimer);
        fallbackTimer = null;
      }
      window.removeEventListener('mj:hydrated', onHydrated);
      startRuntime();
    };

    if (window.__mjHydrated) {
      startRuntime();
    } else {
      window.addEventListener('mj:hydrated', onHydrated, { once: true });
      fallbackTimer = window.setTimeout(onHydrated, 1200);
    }

    return () => {
      disposed = true;
      if (fallbackTimer !== null) window.clearTimeout(fallbackTimer);
      window.removeEventListener('mj:hydrated', onHydrated);
      cleanupRuntime?.();
    };
  }, [motionEnabled]);

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"], a[href^="/#"]'
      );
      if (!anchor) return;

      const rawHref = anchor.getAttribute('href');
      if (!rawHref) return;

      const hashIndex = rawHref.indexOf('#');
      if (hashIndex === -1) return;
      if (rawHref.startsWith('/#') && window.location.pathname !== '/') return;

      const hash = rawHref.slice(hashIndex);
      if (hash.length <= 1) return;

      const targetId = decodeURIComponent(hash.slice(1));
      if (!document.getElementById(targetId)) return;

      event.preventDefault();
      const isSkipLink = anchor.classList.contains('skip-link');
      scrollToHash(hash, { immediate: isSkipLink });
    };

    document.addEventListener('click', onDocumentClick);
    return () => {
      document.removeEventListener('click', onDocumentClick);
    };
  }, [scrollToHash]);

  return (
    <MotionContext.Provider
      value={{
        motionEnabled,
        prefersReducedMotion,
        toggleMotion,
        scrollToHash,
      }}
    >
      <div ref={rootRef}>{children}</div>
    </MotionContext.Provider>
  );
}

export function useMotionRuntime(): MotionRuntimeValue {
  const ctx = useContext(MotionContext);
  if (!ctx) {
    throw new Error('useMotionRuntime must be used inside MotionProvider.');
  }
  return ctx;
}
