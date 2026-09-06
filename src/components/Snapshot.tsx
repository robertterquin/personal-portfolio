import React from 'react';
import { Icon } from '@iconify/react';
import { personalData } from '../data/portfolioData';

export const Snapshot: React.FC = () => {
  return (
    <section className="studio-connect-strip">
      <div className="connect-strip-inner">
        {/* Direct Contact Links: Email & Phone */}
        <div className="strip-contact-group">
          <a
            href={`mailto:${personalData.email}?subject=Project%20Inquiry%20%2F%20Engineering%20Opportunity`}
            className="strip-contact-link"
            title="Compose email to Robert"
          >
            <Icon icon="lucide:mail" width={15} height={15} className="strip-icon" />
            <span className="strip-text">{personalData.email}</span>
            <Icon icon="lucide:arrow-up-right" width={12} height={12} className="arrow-muted" />
          </a>

          <span className="strip-item-divider" aria-hidden="true">·</span>

          <a
            href={`tel:${personalData.phoneRaw}`}
            className="strip-contact-link"
            title="Call mobile phone"
          >
            <Icon icon="lucide:phone" width={15} height={15} className="strip-icon" />
            <span className="strip-text">{personalData.phone}</span>
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
