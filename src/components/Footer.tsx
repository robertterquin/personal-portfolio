import React from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { personalData } from '../data/portfolioData';

interface FooterProps {
  viewMode: 'home' | 'contact';
  onToggleContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ viewMode, onToggleContact }) => {
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
        {viewMode === 'home' ? (
          <button
            type="button"
            className="footer-contact-link"
            onClick={onToggleContact}
          >
            <span>Start a conversation</span>
            <ArrowUpRight size={14} />
          </button>
        ) : (
          <button
            type="button"
            className="footer-contact-link"
            onClick={onToggleContact}
          >
            <span>Back to portfolio</span>
            <ArrowUpRight size={14} />
          </button>
        )}

        <a href="#top" className="back-to-top-btn" aria-label="Back to top of dossier">
          <span>Top</span>
          <ArrowUp size={13} />
        </a>
      </div>
    </footer>
  );
};
