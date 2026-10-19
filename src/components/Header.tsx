import React, { useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { motion, useScroll } from 'motion/react';
import type { Theme } from '../types';
import { AnimatedThemeToggler } from './AnimatedThemeToggler';
import { useManilaClock } from '../hooks';

const NAV_LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#toolkit', label: 'Stack' },
  { href: '#experience', label: 'Experience' },
  { href: '#activity', label: 'Activity' },
];

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
}

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
}) => {
  const manilaTime = useManilaClock();
  const headerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== 't' || e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
      if (isTypingTarget(e.target)) return;
      headerRef.current?.querySelector<HTMLButtonElement>('.theme-toggle-btn')?.click();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="site-header" ref={headerRef}>
      <div className="header-left">
        <a href="#top" className="header-time-link" aria-label="Go to top">
          <span className="timezone-clock">MNL {manilaTime}</span>
        </a>
      </div>

      <div className="header-right">
        <nav className="header-nav" aria-label="Sections">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="header-nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <AnimatedThemeToggler
          theme={theme}
          onThemeChange={onToggleTheme}
          variant="circle"
          duration={500}
          className="theme-toggle-btn"
          aria-label={`Switch to ${theme === 'night' ? 'Day' : 'Night'} theme`}
          title={`Switch to ${theme === 'night' ? 'Day' : 'Night'} theme (T)`}
        >
          <Icon
            icon={theme === 'night' ? 'lucide:sun' : 'lucide:moon'}
            width={16}
            height={16}
            className="theme-toggle-icon"
          />
          <span className="sr-only">Switch to {theme === 'night' ? 'Day' : 'Night'} theme</span>
        </AnimatedThemeToggler>
      </div>

      <motion.div
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
        aria-hidden="true"
      />
    </header>
  );
};
