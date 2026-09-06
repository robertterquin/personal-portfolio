import React from 'react';
import { Icon } from '@iconify/react';
import { personalData } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="dossier-footer">
      <div className="footer-left">
        <p className="footer-copyright">
          © {currentYear} {personalData.name}
        </p>
        <span className="footer-meta">
          · {personalData.location}
        </span>
      </div>

      <div className="footer-right">
        <a href="#top" className="back-to-top-btn" aria-label="Back to top">
          <span>Back to top</span>
          <Icon icon="lucide:arrow-up" width={13} height={13} />
        </a>
      </div>
    </footer>
  );
};
