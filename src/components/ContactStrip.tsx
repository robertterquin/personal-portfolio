import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { motion, useReducedMotion } from 'motion/react';
import { personalData } from '../data/portfolioData';

export const ContactStrip: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const isReducedMotion = Boolean(shouldReduceMotion);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;
    const timer = setTimeout(() => setIsCopied(false), 1600);
    return () => clearTimeout(timer);
  }, [isCopied]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalData.email);
      setIsCopied(true);
    } catch {
      const field = document.createElement('textarea');
      field.value = personalData.email;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      const didCopy = document.execCommand('copy');
      field.remove();
      if (didCopy) setIsCopied(true);
    }
  };

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
      initial={isReducedMotion ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="connect-strip-inner">
        <div className="strip-contact-group">
          <span className="strip-email-group">
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

            <button
              type="button"
              className={`strip-copy-btn${isCopied ? ' is-copied' : ''}`}
              onClick={handleCopyEmail}
              aria-label={isCopied ? 'Email copied' : 'Copy email address'}
              title={isCopied ? 'Copied' : 'Copy email'}
            >
              <Icon icon={isCopied ? 'lucide:check' : 'lucide:copy'} width={13} height={13} />
              {isCopied && <span className="strip-copy-label">Copied</span>}
            </button>
            <span className="sr-only" aria-live="polite">
              {isCopied ? 'Email address copied to clipboard' : ''}
            </span>
          </span>

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
