'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { useMotionRuntime } from '@/components/motion/MotionProvider';
import { MOTION_TOKENS } from '@/lib/motion/config';

const SEEN_STORAGE_KEY = 'mj-seen';
const FONT_WAIT_CAP_MS = 900;
const HARD_FAILSAFE_MS = 2700;

function buildInkWaveClipPath(progress: number): string {
  if (progress >= 0.995) {
    return 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)';
  }
  const base = (1 - progress) * 100;
  const amp = Math.sin(progress * Math.PI) * 5.2;
  const pts: string[] = ['0% 0%', '100% 0%'];
  const steps = 12;
  for (let i = steps; i >= 0; i--) {
    const x = ((i / steps) * 100).toFixed(1);
    const wave = Math.sin(i * 0.95 + progress * Math.PI * 5.5) * amp;
    const y = Math.min(104, Math.max(0, base + wave)).toFixed(2);
    pts.push(`${x}% ${y}%`);
  }
  return `polygon(${pts.join(', ')})`;
}

function clearLoadingStateImmediately(): void {
  const html = document.documentElement;
  html.removeAttribute('data-loading');

  try {
    window.sessionStorage.setItem(SEEN_STORAGE_KEY, '1');
  } catch {
    // Ignore storage failures in locked-down privacy contexts.
  }

  const mask = document.querySelector<HTMLElement>('.hero__inkmask');
  if (mask) {
    mask.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)';
  }

  const resetSelectors = [
    '.loader',
    '.topbar',
    '#opening [data-intro]',
    '#opening .hero__ch',
  ];
  for (const sel of resetSelectors) {
    document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
      el.style.removeProperty('opacity');
      el.style.removeProperty('transform');
      el.style.removeProperty('visibility');
      el.style.removeProperty('clip-path');
    });
  }
}

/**
 * First-visit comic-inking preloader (`INKING PAGE 01` + `000→100`).
 * Bound to real font/image readiness, capped at `<= 2.7s`, skipped immediately on
 * repeat session visits or reduced motion, and dismissible with `Escape`.
 */
export function Preloader() {
  const { motionEnabled } = useMotionRuntime();

  useEffect(() => {
    const html = document.documentElement;
    let cancelled = false;
    let settled = false;
    let failsafeTimer: number | null = null;
    let hydrationTimer: number | null = null;
    let ctx: gsap.Context | null = null;

    const startPreloader = () => {
      if (cancelled) return;

      let seen = false;
      try {
        seen = window.sessionStorage.getItem(SEEN_STORAGE_KEY) === '1';
      } catch {
        seen = false;
      }

      const shouldRun = motionEnabled && !seen && html.hasAttribute('data-loading');
      if (!shouldRun) {
        clearLoadingStateImmediately();
        return;
      }

      ctx = gsap.context(() => {
      const loader = document.querySelector<HTMLElement>('.loader');
      const numEl = document.querySelector<HTMLElement>('.loader__num');
      const maskEl = document.querySelector<HTMLElement>('.hero__inkmask');
      const topbar = document.querySelector<HTMLElement>('.topbar');
      const heroTop = document.querySelector<HTMLElement>('#opening .hero__top');
      const heroArt = document.querySelector<HTMLElement>('#opening .hero__art');
      const heroSlash = document.querySelector<SVGGElement>('#opening [data-intro="slash"]');
      const heroChars = gsap.utils.toArray<HTMLElement>('#opening .hero__ch');
      const heroFootItems = gsap.utils.toArray<HTMLElement>('#opening .hero__foot [data-intro]');

      const finishToHero = (skipAnim = false) => {
        if (settled || cancelled) return;
        settled = true;

        if (failsafeTimer !== null) {
          window.clearTimeout(failsafeTimer);
          failsafeTimer = null;
        }

        try {
          window.sessionStorage.setItem(SEEN_STORAGE_KEY, '1');
        } catch {
          // Ignore storage failures.
        }

        if (skipAnim) {
          clearLoadingStateImmediately();
          return;
        }

        if (numEl) numEl.textContent = '100';
        if (maskEl) maskEl.style.clipPath = buildInkWaveClipPath(1);

        const exitTl = gsap.timeline({
          onComplete: () => {
            html.removeAttribute('data-loading');
          },
        });

        if (loader) {
          exitTl.to(loader, {
            yPercent: 100,
            duration: 0.36,
            ease: MOTION_TOKENS.easeCut,
          });
        }

        exitTl.add(() => {
          html.removeAttribute('data-loading');

          const introTl = gsap.timeline();
          if (topbar) {
            introTl.fromTo(
              topbar,
              { opacity: 0, y: -8 },
              {
                opacity: 1,
                y: 0,
                duration: 0.36,
                ease: MOTION_TOKENS.easeSlam,
                clearProps: 'opacity,transform',
              },
              0
            );
          }

          if (heroTop) {
            introTl.fromTo(
              heroTop,
              { opacity: 0, y: 14 },
              {
                opacity: 1,
                y: 0,
                duration: 0.44,
                ease: MOTION_TOKENS.easeSlam,
                clearProps: 'opacity,transform',
              },
              0.04
            );
          }

          if (heroChars.length > 0) {
            introTl.fromTo(
              heroChars,
              {
                opacity: 0,
                y: 28,
                rotateX: -48,
                transformPerspective: 700,
              },
              {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 0.52,
                stagger: 0.025,
                ease: MOTION_TOKENS.easeSlam,
                clearProps: 'opacity',
              },
              0.08
            );
          }

          if (heroSlash) {
            introTl.fromTo(
              heroSlash,
              { clipPath: 'inset(-40% 100% -40% 0%)', opacity: 1 },
              {
                clipPath: 'inset(-40% 0% -40% 0%)',
                duration: 0.56,
                ease: MOTION_TOKENS.easeSlam,
              },
              0.16
            );
          }

          if (heroArt) {
            introTl.fromTo(
              heroArt,
              { opacity: 0, x: 24, scale: 0.96 },
              {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.65,
                ease: MOTION_TOKENS.easeSlam,
                clearProps: 'opacity,transform',
              },
              0.18
            );
          }

          if (heroFootItems.length > 0) {
            introTl.fromTo(
              heroFootItems,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.48,
                stagger: 0.08,
                ease: MOTION_TOKENS.easeSlam,
                clearProps: 'opacity,transform',
              },
              0.24
            );
          }
        }, '-=0.06');
      };

      const state = { p: 0 };
      const updateReadout = () => {
        const clamped = Math.min(1, Math.max(0, state.p));
        if (numEl) {
          numEl.textContent = String(Math.round(clamped * 100)).padStart(3, '0');
        }
        if (maskEl) {
          maskEl.style.clipPath = buildInkWaveClipPath(clamped);
        }
      };

      const inkTween = gsap.to(state, {
        p: 0.62,
        duration: 0.72,
        ease: 'power2.out',
        onUpdate: updateReadout,
      });

      const waitForFonts = Promise.race([
        document.fonts?.ready ?? Promise.resolve(),
        new Promise<void>((resolve) => window.setTimeout(resolve, FONT_WAIT_CAP_MS)),
      ]);

      waitForFonts.then(() => {
        if (cancelled || settled) return;
        inkTween.kill();
        gsap.to(state, {
          p: 1,
          duration: 0.78,
          ease: 'power2.inOut',
          onUpdate: updateReadout,
          onComplete: () => finishToHero(false),
        });
      });

      failsafeTimer = window.setTimeout(() => {
        finishToHero(true);
      }, HARD_FAILSAFE_MS);

      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          finishToHero(true);
        }
      };
      window.addEventListener('keydown', onKeyDown);

      return () => {
        window.removeEventListener('keydown', onKeyDown);
      };
      });
    };

    const onHydrated = () => {
      if (hydrationTimer !== null) {
        window.clearTimeout(hydrationTimer);
        hydrationTimer = null;
      }
      window.removeEventListener('mj:hydrated', onHydrated);
      startPreloader();
    };

    if (window.__mjHydrated) {
      startPreloader();
    } else {
      window.addEventListener('mj:hydrated', onHydrated, { once: true });
      hydrationTimer = window.setTimeout(onHydrated, 1200);
    }

    return () => {
      cancelled = true;
      if (hydrationTimer !== null) window.clearTimeout(hydrationTimer);
      window.removeEventListener('mj:hydrated', onHydrated);
      if (failsafeTimer !== null) window.clearTimeout(failsafeTimer);
      ctx?.revert();
      if (window.__mjHydrated) {
        clearLoadingStateImmediately();
      }
    };
  }, [motionEnabled]);

  return (
    <div className="loader" aria-hidden="true">
      <p className="loader__note label">Inking page 01</p>
      <p className="loader__count display">
        <span className="loader__num">000</span>
      </p>
    </div>
  );
}
