import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'motion/react';
import type { CredentialItem } from '../types';
import { capabilityGroups, credentialsData } from '../data/portfolioData';

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

          <div className="spec-ledger">
            {capabilityGroups.map((group) => (
              <div key={group.code} className="spec-group-row">
                <div className="spec-group-header">
                  <h3 className="spec-cat-title">{group.category}</h3>
                </div>
                <p className="spec-focus-desc">{group.focus}</p>

                <div className="spec-tools-flow">
                  {group.tools.map((tool, idx) => (
                    <React.Fragment key={tool.name}>
                      {idx > 0 && <span className="spec-flow-sep" aria-hidden="true">·</span>}
                      <span className="spec-tool-item">
                        <span className="tool-text">{tool.name}</span>
                      </span>
                    </React.Fragment>
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
            {Array.from(new Set(credentialsData.map((c) => c.year)))
              .sort((a, b) => Number(b) - Number(a))
              .map((year) => {
                const items = credentialsData.filter((c) => c.year === year);
                if (items.length === 0) return null;
                return (
                  <div key={year} className="ledger-year-section">
                    <div className="ledger-year-header">
                      <span className="ledger-year-tag">{year}</span>
                      <span className="ledger-year-rule" aria-hidden="true"></span>
                    </div>

                    <div className="ledger-year-list">
                      {items.map((item) => (
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

                          <Icon icon="lucide:arrow-up-right" width={12} height={12} className="ledger-arrow" />
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Certificate Inspection Modal Lightbox */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {selectedCert && (
              <motion.div
                className="cert-modal-overlay"
                onClick={() => setSelectedCert(null)}
                role="dialog"
                aria-modal="true"
                aria-labelledby="cert-modal-title"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="cert-modal-container"
                  onClick={(e) => e.stopPropagation()}
                  initial={{ opacity: 0, scale: 0.97, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: 8 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Modal Header */}
                  <div className="cert-modal-header">
                    <div className="cert-modal-header-left">
                      <h3 id="cert-modal-title" className="cert-modal-title">
                        {selectedCert.title}
                      </h3>
                    </div>

                    <div className="cert-modal-header-right">
                      <button
                        type="button"
                        className="cert-modal-close-btn"
                        onClick={() => setSelectedCert(null)}
                        aria-label="Close modal (ESC)"
                        title="Close (Esc)"
                      >
                        <span>Close</span>
                        <Icon icon="lucide:x" width={14} height={14} />
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
                      <Icon icon="lucide:chevron-left" width={18} height={18} />
                    </button>

                    <div className="cert-modal-image-wrapper">
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
                      <Icon icon="lucide:chevron-right" width={18} height={18} />
                    </button>
                  </div>

                  {/* Modal Footer */}
                  <div className="cert-modal-footer">
                    <span className="cert-modal-institution">
                      {selectedCert.institution} · {selectedCert.year}
                    </span>

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
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
};
