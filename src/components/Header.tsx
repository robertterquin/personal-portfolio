import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface HeaderProps {
  theme: 'day' | 'night';
  onToggleTheme: () => void;
  manilaTime: string;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  manilaTime,
}) => {
  return (
    <header className="site-header">
      <div className="header-left">
        <a href="#top" className="header-time-link" aria-label="Go to top">
          <span className="timezone-clock">MNL {manilaTime}</span>
        </a>
      </div>

      <div className="header-right">
        <button
          type="button"
          className="theme-toggle-btn"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'night' ? 'Day' : 'Night'} theme`}
          title={`Switch to ${theme === 'night' ? 'Day' : 'Night'} theme`}
        >
          {theme === 'night' ? <Sun size={15} /> : <Moon size={15} />}
          <span className="theme-toggle-label">{theme === 'night' ? 'Day' : 'Night'}</span>
        </button>
      </div>
    </header>
  );
};
