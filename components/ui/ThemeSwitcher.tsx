'use client';

import type { CSSProperties } from 'react';
import { useSyncExternalStore } from 'react';
import { useMotionRuntime } from '@/components/motion/MotionProvider';
import {
  THEMES,
  applyTheme,
  getThemeServerSnapshot,
  getThemeSnapshot,
  subscribeTheme,
} from '@/lib/theme';

interface ThemeSwitcherProps {
  prefix: 'bar' | 'menu';
}

export function ThemeSwitcher({ prefix }: ThemeSwitcherProps) {
  const { motionEnabled } = useMotionRuntime();
  const activeTheme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeServerSnapshot
  );

  return (
    <div className="theme-dots" role="group" aria-label="Colour theme">
      {THEMES.map((theme) => {
        const pressed = activeTheme === theme.id;
        return (
          <button
            key={theme.id}
            id={`${prefix}-${theme.id}`}
            type="button"
            className="theme-dot"
            style={{ '--dot': theme.dotColor } as CSSProperties}
            aria-pressed={pressed}
            aria-label={theme.label}
            title={theme.title}
            onClick={() => applyTheme(theme.id, motionEnabled)}
          />
        );
      })}
    </div>
  );
}
