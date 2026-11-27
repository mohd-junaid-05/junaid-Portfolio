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

    // Opening hero subtle depth & slash scrub verified against reference (`E-039`, Phase 05 probe)
    const heroSection = scope.querySelector<HTMLElement>('#opening');
    const heroArt = heroSection?.querySelector<HTMLElement>('.hero__art');
    const heroSlash = heroSection?.querySelector<SVGSVGElement>('.hero__slash');

    if (heroSection && heroArt) {
      gsap.fromTo(
        heroArt,
        { scale: 1, y: 0 },
        {
          scale: 1.1,
          y: 28,
          ease: 'none',
          scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }

    if (heroSection && heroSlash) {
      gsap.fromTo(
        heroSlash,
        { rotation: 0, y: 0 },
        {
          rotation: -3,
          y: 120,
          ease: 'none',
          scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }

    // Marquee tape horizontal shift scrub across seam boundaries
    const tapeShifts = gsap.utils.toArray<HTMLElement>('[data-tape-shift]', scope);
    for (const shiftEl of tapeShifts) {
      const dir = Number(shiftEl.dataset.tapeShift ?? '1') || 1;
      const container = shiftEl.closest('.tapes') ?? shiftEl;
      gsap.fromTo(
        shiftEl,
        { xPercent: -4.5 * dir },
        {
          xPercent: 4.5 * dir,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }

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
            trigger: el.closest('article, section') ?? el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }

    // Scroll-zoom for framed statement artwork
    const zoomTargets = gsap.utils.toArray<HTMLElement>('[data-zoom]', scope);
    for (const el of zoomTargets) {
      const scaleTo = Number(el.dataset.zoom ?? '1.16');
      if (!Number.isFinite(scaleTo) || scaleTo === 1) continue;

      gsap.fromTo(
        el,
        { scale: 1 },
        {
          scale: scaleTo,
          ease: 'none',
          scrollTrigger: {
            trigger: el.closest('.statement, section') ?? el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }

    // Horizontal scrub for statement display banner
    const scrubXTargets = gsap.utils.toArray<HTMLElement>('[data-scrub-x]', scope);
    for (const el of scrubXTargets) {
      const endX = Number(el.dataset.scrubX ?? '-52');
      if (!Number.isFinite(endX)) continue;

      gsap.fromTo(
        el,
        { xPercent: 6 },
        {
          xPercent: endX,
          ease: 'none',
          scrollTrigger: {
            trigger: el.closest('.statement, section') ?? el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }

    // Sequential ink-wash fill scrub across statement spans
    const inkFillTargets = gsap.utils.toArray<HTMLElement>('[data-inkfill="true"]', scope);
    const inkFillSpans: HTMLElement[] = [];
    for (const el of inkFillTargets) {
      const spans = Array.from(el.querySelectorAll<HTMLElement>(':scope > span'));
      if (spans.length === 0) continue;
      inkFillSpans.push(...spans);

      ScrollTrigger.create({
        trigger: el.closest('.statement, section') ?? el,
        start: 'top 78%',
        end: 'bottom 28%',
        scrub: true,
        onUpdate: (st) => {
          const total = spans.length;
          const scaled = st.progress * total;
          for (let i = 0; i < total; i += 1) {
            const local = Math.min(1, Math.max(0, scaled - i));
            spans[i].style.setProperty('--f', local.toFixed(3));
          }
        },
      });
    }

    const revealTargets = gsap.utils.toArray<HTMLElement>('[data-reveal]', scope);
    const clipTargets = revealTargets.filter(
      (el) => el.dataset.reveal === 'slit' || el.dataset.reveal === 'clip'
    );
    const fadeUpTargets = revealTargets.filter(
      (el) => el.dataset.reveal !== 'slit' && el.dataset.reveal !== 'clip'
    );

    for (const el of clipTargets) {
      const fromClip =
        el.dataset.reveal === 'slit'
          ? 'inset(50% 0%)'
          : 'inset(0% 100% 0% 0%)';
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          el.classList.add('is-in');
          gsap.fromTo(
            el,
            { clipPath: fromClip },
            {
              clipPath: 'inset(0% 0%)',
              duration: MOTION_TOKENS.f12,
              ease: MOTION_TOKENS.easeCut,
              clearProps: 'clipPath',
            }
          );
        },
      });
    }

    if (fadeUpTargets.length > 0) {
      ScrollTrigger.batch(fadeUpTargets, {
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
      for (const span of inkFillSpans) {
        span.style.removeProperty('--f');
      }
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
