import React from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'motion/react';
import { personalData } from '../data/portfolioData';
import heroImg from '../assets/hero.webp';

const ease = [0.16, 1, 0.3, 1] as const;

export const Masthead: React.FC = () => {
  return (
    <section id="top" className="architectural-hero">
      <div className="hero-grid">
        {/* Left Column (60%): Bio & Headline */}
        <div className="hero-content">
          <h1 className="hero-title" aria-label="Robert Terquin Laqui">
            <span className="hero-title-line-mask">
              <motion.span
                className="hero-title-line"
                initial={{ y: '115%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.78, delay: 0.06, ease }}
              >
                ROBERT
              </motion.span>
            </span>

            <span className="hero-title-line-mask">
              <motion.span
                className="hero-title-line"
                initial={{ y: '115%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.78, delay: 0.16, ease }}
              >
                TERQUIN
              </motion.span>
            </span>

            <span className="hero-title-line-mask">
              <motion.span
                className="hero-title-line"
                initial={{ y: '115%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.78, delay: 0.26, ease }}
              >
                LAQUI<span className="hero-title-dot">.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="hero-bio"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.38, ease }}
          >
            {personalData.shortBio}
          </motion.p>

          <motion.div
            className="hero-achievement-strip"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.48, ease }}
          >
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
          </motion.div>
        </div>

        {/* Right Column (40%): Clean Framed Portrait */}
        <motion.div
          className="hero-portrait-stage"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.2, ease }}
        >
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
              loading="eager"
              fetchPriority="high"
              decoding="async"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
