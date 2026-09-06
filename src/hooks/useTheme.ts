import { useState, useEffect, useCallback } from 'react';
import type { Theme } from '../types';

const THEME_STORAGE_KEY = 'rt_theme';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return saved === 'day' ? 'day' : 'night';
  });

  useEffect(() => {
    if (theme === 'day') {
      document.documentElement.classList.remove('theme-night');
      document.documentElement.classList.add('theme-day');
    } else {
      document.documentElement.classList.add('theme-night');
      document.documentElement.classList.remove('theme-day');
    }
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const nextTheme: Theme = theme === 'night' ? 'day' : 'night';
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setTheme(nextTheme);
      });
    } else {
      setTheme(nextTheme);
    }
  }, [theme]);

  return { theme, toggleTheme };
}
