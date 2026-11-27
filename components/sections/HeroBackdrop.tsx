'use client';

import { useEffect, useRef } from 'react';
import { useMotionRuntime } from '@/components/motion/MotionProvider';
import { RESPONSIVE_GATES } from '@/lib/motion/config';

/**
 * Lightweight Canvas 2D manga halftone dot backdrop for `#opening`.
 * Automatically syncs with active theme `--ink`, responds to fine pointer motion,
 * pauses when scrolled out of view or hidden, and yields cleanly to CSS `.hero__tone`
 * when motion is disabled.
 */
export function HeroBackdrop() {
  const { motionEnabled } = useMotionRuntime();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (!motionEnabled) {
      canvas.removeAttribute('data-ready');
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId = 0;
    let inView = true;
    let inkColor =
      getComputedStyle(document.documentElement).getPropertyValue('--ink').trim() || '#0a0a0a';

    const finePointer =
      typeof window.matchMedia === 'function' &&
      window.matchMedia(RESPONSIVE_GATES.hoverPointerQuery).matches;

    const pointer = {
      tx: 0.72,
      ty: 0.34,
      cx: 0.72,
      cy: 0.34,
      active: false,
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      rafId = 0;
      if (!inView || document.hidden || width === 0 || height === 0) return;

      pointer.cx += (pointer.tx - pointer.cx) * 0.14;
      pointer.cy += (pointer.ty - pointer.cy) * 0.14;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = inkColor;

      const spacing = width < 768 ? 10 : 10;
      const angle = -0.14;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      const anchorX = width * 0.72;
      const anchorY = height * 0.3;
      const px = width * pointer.cx;
      const py = height * pointer.cy;
      const anchorRadius = Math.max(width, height) * 0.34;
      const pointerRadius = Math.max(width, height) * (pointer.active ? 0.28 : 0.16);

      const diag = Math.hypot(width, height);
      const cols = Math.ceil(diag / spacing);
      const rows = Math.ceil(diag / spacing);
      const ox = width * 0.5;
      const oy = height * 0.5;

      ctx.beginPath();
      for (let r = -rows / 2; r <= rows / 2; r++) {
        for (let c = -cols / 2; c <= cols / 2; c++) {
          const lx = c * spacing;
          const ly = r * spacing;
          const x = ox + lx * cos - ly * sin;
          const y = oy + lx * sin + ly * cos;
          if (x < -spacing || x > width + spacing || y < -spacing || y > height + spacing) {
            continue;
          }

          const dAnchor = Math.hypot(x - anchorX, y - anchorY) / anchorRadius;
          const baseFalloff = Math.max(0, 1 - dAnchor);

          const dPointer = Math.hypot(x - px, y - py) / pointerRadius;
          const pointerFalloff = finePointer && pointer.active ? Math.max(0, 1 - dPointer) : 0;

          const intensity = Math.min(1, baseFalloff * 0.52 + pointerFalloff * 0.88);
          if (intensity <= 0.08) continue;

          const radius = intensity * (spacing * 0.3);
          ctx.moveTo(x + radius, y);
          ctx.arc(x, y, radius, 0, Math.PI * 2);
        }
      }
      ctx.globalAlpha = pointer.active ? 0.42 : 0.24;
      ctx.fill();
      ctx.globalAlpha = 1;

      if (!canvas.hasAttribute('data-ready')) {
        canvas.setAttribute('data-ready', 'true');
      }

      if (
        Math.abs(pointer.tx - pointer.cx) > 0.002 ||
        Math.abs(pointer.ty - pointer.cy) > 0.002
      ) {
        rafId = window.requestAnimationFrame(draw);
      }
    };

    const scheduleDraw = () => {
      if (!rafId && inView && !document.hidden) {
        rafId = window.requestAnimationFrame(draw);
      }
    };

    resize();
    scheduleDraw();

    const ro = new ResizeObserver(() => {
      resize();
      scheduleDraw();
    });
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? true;
        if (inView) scheduleDraw();
      },
      { threshold: 0.01 }
    );
    io.observe(canvas);

    const themeObserver = new MutationObserver(() => {
      inkColor =
        getComputedStyle(document.documentElement).getPropertyValue('--ink').trim() || '#0a0a0a';
      scheduleDraw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    const heroEl = canvas.parentElement;
    const onPointerMove = (event: PointerEvent) => {
      if (!finePointer || event.pointerType !== 'mouse' || !heroEl) return;
      const rect = heroEl.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      pointer.tx = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      pointer.ty = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
      pointer.active = true;
      scheduleDraw();
    };

    const onPointerLeave = () => {
      pointer.tx = 0.72;
      pointer.ty = 0.34;
      pointer.active = false;
      scheduleDraw();
    };

    if (finePointer && heroEl) {
      heroEl.addEventListener('pointermove', onPointerMove, { passive: true });
      heroEl.addEventListener('pointerleave', onPointerLeave, { passive: true });
    }

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      themeObserver.disconnect();
      if (finePointer && heroEl) {
        heroEl.removeEventListener('pointermove', onPointerMove);
        heroEl.removeEventListener('pointerleave', onPointerLeave);
      }
      canvas.removeAttribute('data-ready');
    };
  }, [motionEnabled]);

  return <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />;
}
