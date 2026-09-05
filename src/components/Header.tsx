import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { personalData } from '../data/portfolioData';

interface HeaderProps {
  theme: 'day' | 'night';
  onToggleTheme: () => void;
  viewMode: 'home' | 'contact';
  onToggleContact: () => void;
  manilaTime: string;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  viewMode,
  onToggleContact,
  manilaTime,
}) => {
  return (
    <header className="site-header">
      <div className="header-left">
        <a href="#top" className="brand-monogram" aria-label="Go to top">
          <span className="monogram-text">{personalData.name}</span>
        </a>

        <div className="header-status-badge">
          <span className="status-indicator"></span>
          <span className="status-label">{personalData.status}</span>
        </div>
      </div>

      <div className="header-center">
        <span className="timezone-clock">
          MNL {manilaTime}
        </span>
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

        <button
          type="button"
          className={`contact-nav-btn ${viewMode === 'contact' ? 'active' : ''}`}
          onClick={onToggleContact}
          aria-label={viewMode === 'contact' ? 'Close contact view' : 'Open contact view'}
        >
          <span>{viewMode === 'contact' ? 'Close' : 'Contact'}</span>
          <span className="nav-btn-indicator"></span>
        </button>
      </div>
    </header>
  );
};
