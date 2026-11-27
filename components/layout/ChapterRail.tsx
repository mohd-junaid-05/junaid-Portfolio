'use client';

import { useEffect, useRef, useState } from 'react';
import { CHAPTERS } from '@/lib/navigation';

function resolveActiveChapterLabel(): string | null {
  const vh = window.innerHeight || 900;
  const anchorY = vh * 0.42;

  const suppressors = document.querySelectorAll<HTMLElement>('.statement, footer.credits');
  for (const el of suppressors) {
    const r = el.getBoundingClientRect();
    if (r.top <= anchorY && r.bottom >= anchorY) {
      return null;
    }
  }

  for (const chapter of CHAPTERS) {
    const sec = document.getElementById(chapter.id);
    if (!sec) continue;
    const r = sec.getBoundingClientRect();
    if (r.top <= anchorY && r.bottom >= anchorY) {
      return `${chapter.number} / 08 — ${chapter.title}`;
    }
  }

  if (window.scrollY < 160) {
    return `${CHAPTERS[0].number} / 08 — ${CHAPTERS[0].title}`;
  }
  return null;
}

/**
 * Fixed left 4px scroll-progress rail + rotated difference-blend chapter label (`>= 1024px`).
 */
export function ChapterRail() {
  const barRef = useRef<HTMLSpanElement | null>(null);
  const [label, setLabel] = useState<string | null>(
    `${CHAPTERS[0].number} / 08 — ${CHAPTERS[0].title}`
  );

  useEffect(() => {
    let rafPending = false;

    const sync = () => {
      rafPending = false;
      const doc = document.documentElement;
      const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));

      if (barRef.current) {
        barRef.current.style.transform = `scaleY(${progress.toFixed(4)})`;
      }

      const nextLabel = resolveActiveChapterLabel();
      setLabel((prev) => (prev === nextLabel ? prev : nextLabel));
    };

    const scheduleSync = () => {
      if (rafPending) return;
      rafPending = true;
      window.requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener('scroll', scheduleSync, { passive: true });
    window.addEventListener('resize', scheduleSync, { passive: true });
    return () => {
      window.removeEventListener('scroll', scheduleSync);
      window.removeEventListener('resize', scheduleSync);
    };
  }, []);

  return (
    <div className="rail" aria-hidden="true">
      <span ref={barRef} className="rail__bar" />
      <span className={label ? 'rail__chapter is-shown' : 'rail__chapter'}>
        {label ?? ''}
      </span>
    </div>
  );
}
