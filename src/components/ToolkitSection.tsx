import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'motion/react';
import type { CredentialItem } from '../types';
import { capabilityGroups, credentialsData } from '../data/portfolioData';
import { Magnetic } from './Magnetic';

const toolkitListVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const toolkitItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 28,
      mass: 0.7,
    },
  },
};

export const ToolkitSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const isReducedMotion = Boolean(shouldReduceMotion);

  const [selectedCert, setSelectedCert] = useState<CredentialItem | null>(null);

  const selectedIndex = selectedCert
    ? credentialsData.findIndex((c) => c.index === selectedCert.index)
    : -1;

  const handlePrevCert = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === -1) return;
    const prevIndex = selectedIndex === 0 ? credentialsData.length - 1 : selectedIndex - 1;
    setSelectedCert(credentialsData[prevIndex]);
  }, [selectedIndex]);

  const handleNextCert = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === -1) return;
    const nextIndex = selectedIndex === credentialsData.length - 1 ? 0 : selectedIndex + 1;
    setSelectedCert(credentialsData[nextIndex]);
  }, [selectedIndex]);

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
  }, [selectedCert, handlePrevCert, handleNextCert]);

  return (
    <section id="toolkit" className="minimal-toolkit-section">
      <div className="toolkit-two-col">
        <div className="toolkit-col toolkit-tools-col">
          <motion.div
            className="section-title-wrap"
            initial={isReducedMotion ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              type: 'spring',
              stiffness: 240,
              damping: 28,
              mass: 0.7,
            }}
          >
            <span className="section-label">Technical Stack</span>
            <h2 className="section-title">Capabilities &amp; Tools</h2>
          </motion.div>

          <motion.div
            className="spec-ledger"
            initial={isReducedMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={isReducedMotion ? undefined : toolkitListVariants}
          >
            {capabilityGroups.map((group) => (
              <motion.div
                key={group.code}
                className="spec-group-row"
                variants={isReducedMotion ? undefined : toolkitItemVariants}
              >
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
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="toolkit-col toolkit-cred-col">
          <motion.div
            className="section-title-wrap"
            initial={isReducedMotion ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              type: 'spring',
              stiffness: 240,
              damping: 28,
              mass: 0.7,
            }}
          >
            <span className="section-label">Credentials</span>
            <h2 className="section-title">Certifications &amp; Honors</h2>
          </motion.div>

          <motion.div
            className="chronological-ledger"
            initial={isReducedMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={isReducedMotion ? undefined : toolkitListVariants}
          >
            {Array.from(new Set(credentialsData.map((c) => c.year)))
              .sort((a, b) => Number(b) - Number(a))
              .map((year) => {
                const items = credentialsData.filter((c) => c.year === year);
                if (items.length === 0) return null;
                return (
                  <motion.div
                    key={year}
                    className="ledger-year-section"
                    variants={isReducedMotion ? undefined : toolkitItemVariants}
                  >
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
                  </motion.div>
                );
              })}
          </motion.div>
        </div>
      </div>

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
                  <div className="cert-modal-header">
                    <div className="cert-modal-header-left">
                      <span className="cert-modal-status-dot" aria-hidden="true" />
                      <span className="cert-modal-bar-label">Credential Overview</span>
                      <span className="cert-modal-bar-separator" aria-hidden="true">·</span>
                      <span className="cert-modal-bar-index">
                        {selectedCert.index} / {String(credentialsData.length).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="cert-modal-header-right">
                      <Magnetic strength={0.28} maxDistance={8}>
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
                      </Magnetic>
                    </div>
                  </div>

                  <div className="cert-modal-stage">
                    <button
                      type="button"
                      className="cert-nav-arrow cert-nav-prev"
                      onClick={handlePrevCert}
                      aria-label="Previous certificate"
                      title="Previous certificate (←)"
                    >
                      <Magnetic strength={0.4} maxDistance={10} innerOnly>
                        <Icon icon="lucide:chevron-left" width={18} height={18} />
                      </Magnetic>
                    </button>

                    <div className="cert-modal-image-wrapper">
                      <img
                        src={selectedCert.image}
                        alt={`${selectedCert.title} - ${selectedCert.institution}`}
                        className="cert-modal-image"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <button
                      type="button"
                      className="cert-nav-arrow cert-nav-next"
                      onClick={handleNextCert}
                      aria-label="Next certificate"
                      title="Next certificate (→)"
                    >
                      <Magnetic strength={0.4} maxDistance={10} innerOnly>
                        <Icon icon="lucide:chevron-right" width={18} height={18} />
                      </Magnetic>
                    </button>
                  </div>

                  <div className="cert-modal-footer">
                    <div className="cert-modal-info-col">
                      <div className="cert-modal-meta-row">
                        <span className="cert-modal-tag-pill">{selectedCert.type}</span>
                        <span className="cert-modal-year">{selectedCert.year}</span>
                      </div>
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
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
};
