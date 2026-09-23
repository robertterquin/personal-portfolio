import React from 'react';
import { Icon } from '@iconify/react';
import type { Theme } from '../types';
import { AnimatedThemeToggler } from './AnimatedThemeToggler';
import { useManilaClock } from '../hooks';

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
}) => {
  const manilaTime = useManilaClock();
  return (
    <header className="site-header">
      <div className="header-left">
        <a href="#top" className="header-time-link" aria-label="Go to top">
          <span className="timezone-clock">MNL {manilaTime}</span>
        </a>
      </div>

      <div className="header-right">
        <AnimatedThemeToggler
          theme={theme}
          onThemeChange={onToggleTheme}
          variant="circle"
          duration={500}
          className="theme-toggle-btn"
          aria-label={`Switch to ${theme === 'night' ? 'Day' : 'Night'} theme`}
          title={`Switch to ${theme === 'night' ? 'Day' : 'Night'} theme`}
        >
          <Icon
            icon={theme === 'night' ? 'lucide:sun' : 'lucide:moon'}
            width={15}
            height={15}
            className="theme-toggle-icon"
          />
          <span className="theme-toggle-label">{theme === 'night' ? 'Day' : 'Night'}</span>
        </AnimatedThemeToggler>
      </div>
    </header>
  );
};
