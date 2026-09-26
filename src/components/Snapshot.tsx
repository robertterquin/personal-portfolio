import React from 'react';
import { Icon } from '@iconify/react';
import { motion, useReducedMotion } from 'motion/react';
import { personalData } from '../data/portfolioData';

export const Snapshot: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const isReducedMotion = Boolean(shouldReduceMotion);

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
    if (!isMobile) {
      e.preventDefault();
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(personalData.email)}&su=${encodeURIComponent('Project Inquiry / Collaboration')}`;
      const win = window.open(gmailUrl, '_blank', 'noopener,noreferrer');
      if (!win) {
        window.location.href = `mailto:${personalData.email}`;
      }
    }
  };

  return (
    <motion.section
      className="studio-connect-strip"
      initial={isReducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        type: 'spring',
        stiffness: 240,
        damping: 28,
        mass: 0.7,
      }}
    >
      <div className="connect-strip-inner">
        <div className="strip-contact-group">
          <a
            href={`mailto:${personalData.email}`}
            onClick={handleEmailClick}
            className="strip-contact-link"
            title={`Compose email to ${personalData.email}`}
          >
            <Icon icon="lucide:mail" width={15} height={15} className="strip-icon" />
            <span className="strip-text">{personalData.email}</span>
            <Icon icon="lucide:arrow-up-right" width={12} height={12} className="arrow-muted" />
          </a>

          <span className="strip-item-divider" aria-hidden="true">·</span>

          <a
            href={personalData.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="strip-contact-link"
            title={`Message on WhatsApp (${personalData.phone})`}
          >
            <Icon
              icon="simple-icons:whatsapp"
              width={15}
              height={15}
              className="strip-icon"
            />
            <span className="strip-text">{personalData.phone}</span>
            <Icon icon="lucide:arrow-up-right" width={12} height={12} className="arrow-muted" />
          </a>
        </div>

        <div className="strip-links-block">
          <a
            href={personalData.github}
            target="_blank"
            rel="noreferrer"
            className="strip-nav-link"
          >
            <Icon icon="lucide:github" width={15} height={15} />
            <span>GitHub</span>
            <Icon icon="lucide:arrow-up-right" width={12} height={12} className="arrow-muted" />
          </a>

          <span className="strip-divider" aria-hidden="true">·</span>

          <a
            href={personalData.linkedin}
            target="_blank"
            rel="noreferrer"
            className="strip-nav-link"
          >
            <Icon icon="lucide:linkedin" width={15} height={15} />
            <span>LinkedIn</span>
            <Icon icon="lucide:arrow-up-right" width={12} height={12} className="arrow-muted" />
          </a>

          <span className="strip-divider" aria-hidden="true">·</span>

          <a
            href={personalData.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="strip-nav-link"
          >
            <Icon icon="lucide:file-text" width={15} height={15} />
            <span>Resume</span>
            <Icon icon="lucide:arrow-up-right" width={12} height={12} className="arrow-muted" />
          </a>
        </div>
      </div>
    </motion.section>
  );
};
