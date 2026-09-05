import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { personalData } from '../data/portfolioData';

export const Snapshot: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalData.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <section className="studio-connect-strip">
      <div className="connect-strip-inner">
        {/* Email with 1-click inline copy */}
        <div className="strip-email-block">
          <button
            type="button"
            className="strip-email-trigger"
            onClick={handleCopyEmail}
            aria-label="Copy email address"
          >
            <Icon icon="lucide:mail" width={15} height={15} className="strip-icon" />
            <span className="strip-email-text">{personalData.email}</span>
            <span className={`strip-copy-cue ${copied ? 'copied' : ''}`}>
              {copied ? (
                <Icon icon="lucide:check" width={12} height={12} />
              ) : (
                <Icon icon="lucide:copy" width={12} height={12} />
              )}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </span>
          </button>
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
            rel="noreferrer"
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
