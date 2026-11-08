import React from 'react';
import { useActiveSection } from '../hooks';

const NAV_LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'toolkit', label: 'Stack' },
  { id: 'experience', label: 'Experience' },
  { id: 'activity', label: 'Activity' },
] as const;

const SECTION_IDS = NAV_LINKS.map((link) => link.id);

/** Pill of section links; the header shows it on desktop, a bottom dock on phones. */
export const SectionNav: React.FC<{ className?: string }> = ({ className = '' }) => {
  const active = useActiveSection(SECTION_IDS);

  return (
    <nav className={`section-pill ${className}`} aria-label="Sections">
      {NAV_LINKS.map((link) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          className={`section-pill-link${active === link.id ? ' is-active' : ''}`}
          aria-current={active === link.id ? 'true' : undefined}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
};
