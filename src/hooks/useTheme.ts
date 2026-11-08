import { useState, useLayoutEffect, useCallback } from 'react';
import type { Theme } from '../types';

const THEME_STORAGE_KEY = 'rt_theme';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return saved === 'day' ? 'day' : 'night';
  });

  // Layout effect so the class lands inside the toggler's flushSync, before the view transition snapshots.
  useLayoutEffect(() => {
    document.documentElement.classList.toggle('theme-day', theme === 'day');
    document.documentElement.classList.toggle('theme-night', theme === 'night');
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'night' ? 'day' : 'night'));
  }, []);

  return { theme, toggleTheme };
}
