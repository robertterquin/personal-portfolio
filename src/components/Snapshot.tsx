import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { personalData } from '../data/portfolioData';

export const Snapshot: React.FC = () => {
  const [phoneFeedback, setPhoneFeedback] = useState<boolean>(false);

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
    if (!isMobile) {
      // On desktop PCs, mailto: often fails silently without an installed mail app (e.g. Outlook).
      // We directly open Gmail web compose in a new tab for seamless desktop redirection.
      e.preventDefault();
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(personalData.email)}&su=${encodeURIComponent('Project Inquiry / Collaboration')}`;
      const win = window.open(gmailUrl, '_blank', 'noopener,noreferrer');
      if (!win) {
        window.location.href = `mailto:${personalData.email}`;
      }
    }
  };

  const handlePhoneClick = () => {
    const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
    if (!isMobile) {
      // On desktop PCs, copy to clipboard so the user can easily paste into WhatsApp/Viber
      navigator.clipboard?.writeText(personalData.phoneRaw).then(() => {
        setPhoneFeedback(true);
        setTimeout(() => setPhoneFeedback(false), 2200);
      }).catch(() => {});
    }
  };

  return (
    <section className="studio-connect-strip">
      <div className="connect-strip-inner">
        {/* Direct Contact Links: Email & Phone */}
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
            href={`tel:${personalData.phoneRaw}`}
            onClick={handlePhoneClick}
            className="strip-contact-link"
            title={phoneFeedback ? 'Copied to clipboard!' : `Call ${personalData.phone}`}
          >
            <Icon
              icon={phoneFeedback ? 'lucide:check' : 'lucide:phone'}
              width={15}
              height={15}
              className={`strip-icon ${phoneFeedback ? 'icon-success' : ''}`}
            />
            <span className="strip-text">
              {phoneFeedback ? 'Number copied!' : personalData.phone}
            </span>
            <Icon icon="lucide:arrow-up-right" width={12} height={12} className="arrow-muted" />
          </a>
        </div>

        {/* Links: Clean Typographic Line */}
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
    </section>
  );
};
