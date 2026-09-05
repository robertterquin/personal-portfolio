import React from 'react';
import { ArrowUp } from 'lucide-react';
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
          {personalData.location}
        </span>
      </div>

      <div className="footer-center">
        <span className="footer-tagline">
          Engineered with precision &amp; modern web standards.
        </span>
      </div>

      <div className="footer-right">
        <a href="#top" className="back-to-top-btn" aria-label="Back to top of dossier">
          <span>Top</span>
          <ArrowUp size={13} />
        </a>
      </div>
    </footer>
  );
};
