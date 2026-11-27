'use client';

import type { ThemeId } from '@/data/types';

export interface ThemeDefinition {
  id: ThemeId;
  label: string;
  title: string;
  dotColor: string;
}

export const THEMES: ThemeDefinition[] = [
  { id: 'blood', label: 'Blood theme', title: 'Blood', dotColor: '#B4101C' },
  { id: 'aged', label: 'Aged theme', title: 'Aged', dotColor: '#932517' },
  { id: 'indigo', label: 'Indigo theme', title: 'Indigo', dotColor: '#1F3FAE' },
  { id: 'moss', label: 'Moss theme', title: 'Moss', dotColor: '#33603B' },
];

const THEME_STORAGE_KEY = 'mj-theme';
const THEME_CHANGE_EVENT = 'mj-theme-change';
let themeShiftTimer: number | null = null;

export function isThemeId(value: string | null | undefined): value is ThemeId {
  return value === 'blood' || value === 'aged' || value === 'indigo' || value === 'moss';
}

export function getThemeSnapshot(): ThemeId {
  if (typeof window === 'undefined') return 'blood';
  const attr = document.documentElement.getAttribute('data-theme');
  if (isThemeId(attr)) return attr;
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (isThemeId(stored)) return stored;
  } catch {
    // Ignore storage read failures in restricted contexts.
  }
  return 'blood';
}

export function getThemeServerSnapshot(): ThemeId {
  return 'blood';
}

export function subscribeTheme(onStoreChange: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY) {
      if (isThemeId(event.newValue)) {
        document.documentElement.setAttribute('data-theme', event.newValue);
      }
      onStoreChange();
    }
  };
  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
    window.removeEventListener('storage', onStorage);
  };
}

export function applyTheme(theme: ThemeId, animateTransition: boolean): void {
  if (typeof window === 'undefined') return;
  const html = document.documentElement;

  if (animateTransition) {
    html.classList.add('theme-shift');
    if (themeShiftTimer !== null) window.clearTimeout(themeShiftTimer);
    themeShiftTimer = window.setTimeout(() => {
      html.classList.remove('theme-shift');
      themeShiftTimer = null;
    }, 450);
  } else {
    html.classList.remove('theme-shift');
  }

  html.setAttribute('data-theme', theme);
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Ignore storage write failures.
  }
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}
