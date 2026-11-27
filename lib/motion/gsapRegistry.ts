import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MOTION_TOKENS } from './config';

let pluginsRegistered = false;

export function ensureGsapPlugins(): void {
  if (pluginsRegistered || typeof window === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });
  pluginsRegistered = true;
}

/**
 * Registers representative ScrollTrigger pipelines inside a single `gsap.context`
 * so repeated mounts/unmounts and motion toggles revert cleanly without leaks.
 */
export function setupScrollInfrastructure(scope: HTMLElement): gsap.Context {
  ensureGsapPlugins();

  return gsap.context((self) => {
    const topbar = document.querySelector<HTMLElement>('.topbar');
    if (topbar) {
      ScrollTrigger.create({
        start: 24,
        end: 'max',
        onEnter: () => topbar.classList.add('is-stuck'),
        onLeaveBack: () => topbar.classList.remove('is-stuck'),
      });
    }

    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (st) => {
        document.documentElement.style.setProperty(
          '--scroll-progress',
          st.progress.toFixed(4)
        );
      },
    });

    const parallaxTargets = gsap.utils.toArray<HTMLElement>('[data-parallax]', scope);
    for (const el of parallaxTargets) {
      const amount = Number(el.dataset.parallax ?? '0');
      if (!Number.isFinite(amount) || amount === 0) continue;

      gsap.fromTo(
        el,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: 'none',
          scrollTrigger: {
            trigger: el.closest('section') ?? el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }

    const revealTargets = gsap.utils.toArray<HTMLElement>('[data-reveal]', scope);
    if (revealTargets.length > 0) {
      ScrollTrigger.batch(revealTargets, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) => {
          batch.forEach((el) => el.classList.add('is-in'));
          gsap.fromTo(
            batch,
            { y: MOTION_TOKENS.revealDistancePx, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: MOTION_TOKENS.f12,
              ease: MOTION_TOKENS.easeSlam,
              stagger: 0.06,
              overwrite: 'auto',
              clearProps: 'transform,opacity',
            }
          );
        },
      });
    }

    scope.setAttribute('data-motion-triggers', String(ScrollTrigger.getAll().length));

    self.add(() => () => {
      topbar?.classList.remove('is-stuck');
      document.documentElement.style.removeProperty('--scroll-progress');
      scope.removeAttribute('data-motion-triggers');
    });
  }, scope);
}

export function revealAllImmediately(root: ParentNode = document): void {
  const els = root.querySelectorAll<HTMLElement>('[data-reveal]');
  els.forEach((el) => {
    el.classList.add('is-in');
    el.style.removeProperty('opacity');
    el.style.removeProperty('transform');
    el.style.removeProperty('clip-path');
  });
}
