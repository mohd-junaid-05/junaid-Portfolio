'use client';

import { useMotionRuntime } from '@/components/motion/MotionProvider';

export function MotionToggle() {
  const { motionEnabled, toggleMotion } = useMotionRuntime();

  return (
    <button
      type="button"
      className="motion-toggle"
      aria-pressed={motionEnabled}
      onClick={toggleMotion}
    >
      <span className="motion-toggle__dot" aria-hidden="true" />
      <span>{motionEnabled ? 'Motion on' : 'Motion off'}</span>
    </button>
  );
}
