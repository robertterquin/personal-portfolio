import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { personalData } from '../data/portfolioData';
import heroImg from '../assets/hero.png';

interface MastheadProps {
  onOpenContact?: () => void;
}

export const Masthead: React.FC<MastheadProps> = ({ onOpenContact }) => {
  return (
    <section id="top" className="architectural-hero">
      <div className="hero-grid">
        {/* Left Column (60%): Bio & Headline */}
        <div className="hero-content">
          <div className="hero-label-wrap">
            <span className="hero-pretitle">Full-Stack &amp; Mobile Engineer</span>
          </div>

          <h1 className="hero-title">
            ROBERT
            <br />
            TERQUIN
          </h1>

          <p className="hero-bio">
            {personalData.shortBio}
          </p>

          <div className="hero-meta-grid">
            <div className="hero-meta-item">
              <span className="meta-k">Location</span>
              <strong className="meta-v">{personalData.location}</strong>
            </div>
            <div className="hero-meta-item">
              <span className="meta-k">Core Focus</span>
              <strong className="meta-v">{personalData.focus}</strong>
            </div>
          </div>

          <div className="hero-actions">
            <a href="#work" className="hero-btn hero-btn-primary">
              <span>View Projects</span>
              <ArrowDown size={14} />
            </a>
            {onOpenContact ? (
              <button
                type="button"
                className="hero-btn hero-btn-secondary"
                onClick={onOpenContact}
              >
                <span>Get in Touch</span>
                <ArrowUpRight size={14} />
              </button>
            ) : (
              <a href="#contact" className="hero-btn hero-btn-secondary">
                <span>Get in Touch</span>
                <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </div>

        {/* Right Column (40%): Clean Framed Portrait */}
        <div className="hero-portrait-stage">
          <div className="portrait-frame">
            {/* Architectural registration corner marks */}
            <span className="portrait-corner portrait-corner-tl" aria-hidden="true">+</span>
            <span className="portrait-corner portrait-corner-tr" aria-hidden="true">+</span>
            <span className="portrait-corner portrait-corner-bl" aria-hidden="true">+</span>
            <span className="portrait-corner portrait-corner-br" aria-hidden="true">+</span>

            <img
              src={heroImg}
              alt="Robert Terquin"
              className="portrait-img"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <div className="portrait-scanline" aria-hidden="true"></div>
            <div className="portrait-badge">
              <span className="badge-dot"></span>
              <span className="badge-text">Cavite, PH • Ready for Contracts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
