'use client';

import { useEffect, useRef } from 'react';
import { useMotionRuntime } from '@/components/motion/MotionProvider';
import { RESPONSIVE_GATES } from '@/lib/motion/config';

interface TrailPoint {
  x: number;
  y: number;
  born: number;
}

const TRAIL_LIFETIME_MS = 320;

/**
 * Desktop-only custom accent cursor, Canvas 2D ink-brush trail, and `[data-magnetic="true"]`
 * button nudge. Automatically inactive on touch devices and when motion is off.
 */
export function CursorFx() {
  const { motionEnabled } = useMotionRuntime();
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cursorEl = cursorRef.current;
    const labelEl = labelRef.current;
    const canvas = canvasRef.current;
    if (!cursorEl || !labelEl || !canvas) return;

    const finePointer =
      typeof window.matchMedia === 'function' &&
      window.matchMedia(RESPONSIVE_GATES.hoverPointerQuery).matches;

    if (!motionEnabled || !finePointer) {
      cursorEl.classList.remove('is-on', 'is-link', 'is-label');
      labelEl.textContent = '';
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const ctx = canvas.getContext('2d');
    const points: TrailPoint[] = [];
    let rafId = 0;
    let activeMagnet: HTMLElement | null = null;
    let inkColor =
      getComputedStyle(document.documentElement).getPropertyValue('--ink').trim() || '#0a0a0a';

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };
    resizeCanvas();

    const themeObserver = new MutationObserver(() => {
      inkColor =
        getComputedStyle(document.documentElement).getPropertyValue('--ink').trim() || '#0a0a0a';
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    const drawTrail = (now: number) => {
      rafId = 0;
      if (!ctx) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      while (points.length > 0 && now - points[0].born > TRAIL_LIFETIME_MS) {
        points.shift();
      }
      if (points.length < 2) return;

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = inkColor;

      for (let i = 1; i < points.length; i++) {
        const p0 = points[i - 1];
        const p1 = points[i];
        const age = (now - p1.born) / TRAIL_LIFETIME_MS;
        const alpha = Math.max(0, (1 - age) * 0.24);
        ctx.globalAlpha = alpha;
        ctx.lineWidth = Math.max(0.8, (1 - age) * 4.2);
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      if (points.length > 0) {
        rafId = window.requestAnimationFrame(drawTrail);
      }
    };

    const resetMagnet = () => {
      if (activeMagnet) {
        activeMagnet.style.removeProperty('transform');
        activeMagnet = null;
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const { clientX: x, clientY: y } = event;

      cursorEl.classList.add('is-on');
      cursorEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      const target = event.target instanceof Element ? event.target : null;
      const labelled = target?.closest<HTMLElement>('[data-cursor-label]');
      const interactive = target?.closest<HTMLElement>('a, button, summary, [role="button"]');

      if (labelled) {
        const text = labelled.dataset.cursorLabel || 'Open';
        if (labelEl.textContent !== text) labelEl.textContent = text;
        cursorEl.classList.add('is-label');
        cursorEl.classList.remove('is-link');
      } else {
        if (labelEl.textContent) labelEl.textContent = '';
        cursorEl.classList.remove('is-label');
        cursorEl.classList.toggle('is-link', Boolean(interactive));
      }

      const magnet = target?.closest<HTMLElement>('[data-magnetic="true"]') ?? null;
      if (activeMagnet && activeMagnet !== magnet) {
        resetMagnet();
      }
      if (magnet) {
        const r = magnet.getBoundingClientRect();
        const dx = ((x - (r.left + r.width / 2)) / Math.max(1, r.width / 2)) * 12;
        const dy = ((y - (r.top + r.height / 2)) / Math.max(1, r.height / 2)) * 6;
        magnet.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`;
        activeMagnet = magnet;
      }

      const last = points[points.length - 1];
      if (!last || Math.hypot(x - last.x, y - last.y) > 4) {
        points.push({ x, y, born: performance.now() });
        if (points.length > 26) points.shift();
        if (!rafId) rafId = window.requestAnimationFrame(drawTrail);
      }
    };

    const onPointerLeave = () => {
      cursorEl.classList.remove('is-on', 'is-link', 'is-label');
      resetMagnet();
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('resize', resizeCanvas, { passive: true });
    document.documentElement.addEventListener('mouseleave', onPointerLeave);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      themeObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', resizeCanvas);
      document.documentElement.removeEventListener('mouseleave', onPointerLeave);
      cursorEl.classList.remove('is-on', 'is-link', 'is-label');
      resetMagnet();
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [motionEnabled]);

  return (
    <>
      <canvas ref={canvasRef} className="ink-trail" aria-hidden="true" />
      <div ref={cursorRef} className="cursor" aria-hidden="true">
        <span ref={labelRef} className="cursor__label" />
      </div>
    </>
  );
}
