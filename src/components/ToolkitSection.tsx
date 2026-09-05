import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, Check, X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { credentialsData, type CredentialItem } from '../data/portfolioData';

interface CapabilityGroup {
  code: string;
  category: string;
  focus: string;
  items: { name: string; detail: string }[];
}

const capabilityGroups: CapabilityGroup[] = [
  {
    code: '01',
    category: 'Mobile Systems & Architecture',
    focus: 'Cross-platform engineering, offline-first synchronization, and state management.',
    items: [
      { name: 'Flutter & Dart', detail: 'Core Framework & Native Channels' },
      { name: 'Offline Data Sync', detail: 'SQLite, Supabase, Local Caching' },
      { name: 'Android Studio & SDKs', detail: 'Gradle Pipelines, Emulation, APKs' },
      { name: 'Reactive State', detail: 'Provider, Riverpod, Event Streams' },
    ],
  },
  {
    code: '02',
    category: 'Web & Full-Stack Interfaces',
    focus: 'Component architecture, strict typing, and high-performance rendering.',
    items: [
      { name: 'React', detail: 'Custom Hooks, SPA Architecture, Vite' },
      { name: 'TypeScript', detail: 'Strict Type Systems & Interface Contracts' },
      { name: 'Tailwind CSS', detail: 'Design Tokens, Responsive Grid Systems' },
      { name: 'HTML5 & Modern CSS', detail: 'Certified Specialist Standards' },
    ],
  },
  {
    code: '03',
    category: 'Backend & Data Infrastructure',
    focus: 'Relational schema modeling, RESTful microservices, and secure authentication.',
    items: [
      { name: 'Node.js & Express', detail: 'REST APIs, Middleware, Service Routing' },
      { name: 'Supabase & Cloud DB', detail: 'PostgreSQL, Row Level Security, Realtime' },
      { name: 'MySQL (Certified)', detail: 'Relational Schema Design & Query Indexing' },
      { name: 'Authentication Layers', detail: 'JWT Tokens, OAuth, Session Guards' },
    ],
  },
  {
    code: '04',
    category: 'Core Engineering & Security',
    focus: 'Defensive cybersecurity standards, version control, and computer architecture.',
    items: [
      { name: 'Java (Oracle Certified)', detail: 'OOP Patterns & Enterprise Foundations' },
      { name: 'Python & C', detail: 'Algorithms, Data Automation, Memory Concepts' },
      { name: 'Cybersecurity Fundamentals', detail: 'Mitigation, Threat Modeling, Defensive Coding' },
      { name: 'Git & Deployment', detail: 'Branch Workflows, CI/CD, Edge Networks' },
    ],
  },
];

export const ToolkitSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<CredentialItem | null>(null);

  const selectedIndex = selectedCert
    ? credentialsData.findIndex((c) => c.index === selectedCert.index)
    : -1;

  const handlePrevCert = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === -1) return;
    const prevIndex = selectedIndex === 0 ? credentialsData.length - 1 : selectedIndex - 1;
    setSelectedCert(credentialsData[prevIndex]);
  };

  const handleNextCert = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === -1) return;
    const nextIndex = selectedIndex === credentialsData.length - 1 ? 0 : selectedIndex + 1;
    setSelectedCert(credentialsData[nextIndex]);
  };

  useEffect(() => {
    if (!selectedCert) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCert(null);
      } else if (e.key === 'ArrowLeft') {
        handlePrevCert();
      } else if (e.key === 'ArrowRight') {
        handleNextCert();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCert, selectedIndex]);

  return (
    <section id="toolkit" className="minimal-toolkit-section">
      <div className="toolkit-two-col">
        {/* Left Column: Architectural Capability Spec Sheet */}
        <div className="toolkit-col toolkit-tools-col">
          <div className="section-title-wrap">
            <span className="section-label">Technical Stack</span>
            <h2 className="section-title">Capabilities &amp; Tools</h2>
          </div>

          <div className="capability-spec-ledger">
            {capabilityGroups.map((group) => (
              <div key={group.code} className="spec-group-row">
                <div className="spec-group-header">
                  <span className="spec-code">{group.code}</span>
                  <h3 className="spec-cat-title">{group.category}</h3>
                </div>
                <p className="spec-focus-desc">{group.focus}</p>

                <div className="spec-items-table">
                  {group.items.map((item) => (
                    <div key={item.name} className="spec-item-line">
                      <span className="spec-item-name">
                        <Check size={12} className="spec-check-icon" />
                        <strong>{item.name}</strong>
                      </span>
                      <span className="spec-item-detail">{item.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Verified Credentials */}
        <div className="toolkit-col toolkit-cred-col">
          <div className="section-title-wrap">
            <span className="section-label">Credentials</span>
            <h2 className="section-title">Certifications &amp; Honors</h2>
          </div>

          <div className="chronological-ledger">
            {[
              {
                year: '2025',
                items: credentialsData.filter((c) => c.year === '2025'),
              },
              {
                year: '2024',
                items: credentialsData.filter((c) => c.year === '2024'),
              },
            ].map((group) => (
              <div key={group.year} className="ledger-year-section">
                <div className="ledger-year-header">
                  <span className="ledger-year-tag">{group.year}</span>
                  <span className="ledger-year-rule" aria-hidden="true"></span>
                </div>

                <div className="ledger-year-list">
                  {group.items.map((item) => (
                    <button
                      key={item.title + item.year}
                      type="button"
                      onClick={() => setSelectedCert(item)}
                      className="ledger-row"
                      aria-label={`Inspect ${item.title} certificate`}
                    >
                      <span className={`ledger-type-tag ${item.type === 'Award' ? 'type-award' : 'type-cert'}`}>
                        {item.type === 'Award' ? 'HONOR' : 'CERT'}
                      </span>

                      <div className="ledger-text-col">
                        <strong className="ledger-title">{item.title}</strong>
                        <span className="ledger-sub-dash">—</span>
                        <span className="ledger-issuer">{item.institution}</span>
                      </div>

                      <ArrowUpRight size={12} className="ledger-arrow" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificate Inspection Modal Lightbox */}
      {selectedCert &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="cert-modal-overlay"
            onClick={() => setSelectedCert(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cert-modal-title"
          >
            <div
              className="cert-modal-container"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="cert-modal-header">
                <div className="cert-modal-header-left">
                  <span className="cert-modal-code">Credential · {selectedCert.year}</span>
                  <span className={`ledger-type-tag ${selectedCert.type === 'Award' ? 'type-award' : 'type-cert'}`}>
                    {selectedCert.type === 'Award' ? 'HONOR' : 'CERT'}
                  </span>
                </div>

                <div className="cert-modal-header-right">
                  <span className="cert-modal-counter">
                    {selectedCert.index} / {String(credentialsData.length).padStart(2, '0')}
                  </span>
                  <a
                    href={selectedCert.image}
                    target="_blank"
                    rel="noreferrer"
                    className="cert-modal-action-btn"
                    title="Open raw certificate image in new tab"
                    aria-label="Open original certificate file"
                  >
                    <ExternalLink size={13} />
                    <span>Raw File</span>
                  </a>
                  <button
                    type="button"
                    className="cert-modal-close-btn"
                    onClick={() => setSelectedCert(null)}
                    aria-label="Close modal (ESC)"
                    title="Close (Esc)"
                  >
                    <span>Close</span>
                    <X size={15} />
                  </button>
                </div>
              </div>

              {/* Modal Stage / Image Preview */}
              <div className="cert-modal-stage">
                <button
                  type="button"
                  className="cert-nav-arrow cert-nav-prev"
                  onClick={handlePrevCert}
                  aria-label="Previous certificate"
                  title="Previous certificate (←)"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="cert-modal-image-wrapper">
                  <div className="cert-corner-mark top-left" aria-hidden="true" />
                  <div className="cert-corner-mark top-right" aria-hidden="true" />
                  <div className="cert-corner-mark bottom-left" aria-hidden="true" />
                  <div className="cert-corner-mark bottom-right" aria-hidden="true" />
                  <img
                    src={selectedCert.image}
                    alt={`${selectedCert.title} - ${selectedCert.institution}`}
                    className="cert-modal-image"
                  />
                </div>

                <button
                  type="button"
                  className="cert-nav-arrow cert-nav-next"
                  onClick={handleNextCert}
                  aria-label="Next certificate"
                  title="Next certificate (→)"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Modal Footer */}
              <div className="cert-modal-footer">
                <div className="cert-modal-info">
                  <h3 id="cert-modal-title" className="cert-modal-title">
                    {selectedCert.title}
                  </h3>
                  <p className="cert-modal-institution">
                    {selectedCert.institution}
                  </p>
                </div>

                <div className="cert-modal-nav-dots" aria-label="Certificate navigation">
                  {credentialsData.map((c) => (
                    <button
                      key={c.index}
                      type="button"
                      className={`cert-dot-btn ${c.index === selectedCert.index ? 'active' : ''}`}
                      onClick={() => setSelectedCert(c)}
                      aria-label={`Switch to ${c.title}`}
                      title={`${c.title} (${c.year})`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};
