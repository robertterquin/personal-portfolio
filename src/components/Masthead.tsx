import React from 'react';
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

          <div className="hero-meta-grid">
            <div className="hero-meta-item">
              <span className="meta-k">Location</span>
              <strong className="meta-v">{personalData.location}</strong>
            </div>
            <div className="hero-meta-item">
              <span className="meta-k">Education</span>
              <strong className="meta-v">BS Information Technology</strong>
            </div>
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
