import React from 'react';
import { Icon } from '@iconify/react';
import { personalData } from '../data/portfolioData';
import heroImg from '../assets/hero.png';

export const Masthead: React.FC = () => {
  return (
    <section id="top" className="architectural-hero">
      <div className="hero-grid">
        {/* Left Column (60%): Bio & Headline */}
        <div className="hero-content">
          <h1 className="hero-title">
            ROBERT
            <br />
            TERQUIN
            <br />
            LAQUI<span className="hero-title-dot">.</span>
          </h1>

          <p className="hero-bio">
            {personalData.shortBio}
          </p>

          <div className="hero-achievement-strip">
            <a
              href="https://stdominiccollege.edu.ph/Campus_Life/Article/SDCA-Brute4z-Team-Places-2nd-Runner-Up-in-CALABARZON-HackForGov-2025"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-achievement-link"
              title="Read official HackForGov 2025 announcement article"
            >
              <Icon icon="lucide:trophy" className="hero-achievement-icon" width={18} height={18} />
              <span className="hero-achievement-text">Hack4Gov 2025 — 2nd Runner Up</span>
              <Icon icon="lucide:arrow-up-right" className="hero-achievement-arrow" width={16} height={16} />
            </a>
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
          </div>
        </div>
      </div>
    </section>
  );
};
