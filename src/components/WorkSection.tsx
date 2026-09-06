import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'motion/react';
import type { Project } from '../types';
import { projectsData } from '../data/portfolioData';

export const WorkSection: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isViewerOpen, setIsViewerOpen] = useState<boolean>(false);
  const [mobileExpandedId, setMobileExpandedId] = useState<string | null>(null);

  const viewerRef = useRef<HTMLDivElement>(null);

  const activeProject: Project = projectsData[selectedIndex] || projectsData[0];

  const handleSelectProject = (project: Project) => {
    const originalIndex = projectsData.findIndex((p) => p.id === project.id);
    if (originalIndex !== -1) {
      setSelectedIndex(originalIndex);
      setIsViewerOpen(true);
      setTimeout(() => {
        viewerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 60);
    }
  };

  const handleToggleMobileExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMobileExpandedId((prev) => (prev === id ? null : id));
  };

  const handlePrevProject = () => {
    setSelectedIndex((prev) => (prev === 0 ? projectsData.length - 1 : prev - 1));
  };

  const handleNextProject = () => {
    setSelectedIndex((prev) => (prev === projectsData.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation for viewer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isViewerOpen) return;
      if (e.key === 'Escape') setIsViewerOpen(false);
      if (e.key === 'ArrowLeft') handlePrevProject();
      if (e.key === 'ArrowRight') handleNextProject();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isViewerOpen]);

  return (
    <section id="work" className="work-index-section">
      {/* Section Header */}
      <div className="work-index-header">
        <div className="work-index-title-group">
          <span className="section-label">Selected Work</span>
          <h2 className="section-title">Systems &amp; Applications</h2>
        </div>
      </div>

      {/* Interactive Project Index Table / List */}
      <div className="project-index-list">
        {projectsData.map((project) => {
          const isSelected = isViewerOpen && projectsData[selectedIndex]?.id === project.id;
          const isMobileExpanded = mobileExpandedId === project.id;

          return (
            <div
              key={project.id}
              className={`project-index-row ${isSelected ? 'row-active' : ''}`}
              onClick={() => handleSelectProject(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelectProject(project);
                }
              }}
              aria-label={`Inspect ${project.title}`}
            >
              {/* Monospace Number */}
              <div className="row-col row-col-idx">
                <span className="row-index-num">{project.number}</span>
              </div>

              {/* Main Title & One-line Summary */}
              <div className="row-col row-col-title">
                <div className="row-title-wrap">
                  <h3 className="row-title">{project.title}</h3>
                  <span className="row-tag-badge">{project.tag}</span>
                </div>
                <p className="row-description">{project.description}</p>
              </div>

              {/* Tech Stack */}
              <div className="row-col row-col-stack">
                <span className="row-stack-text">{project.stack}</span>
              </div>

              {/* Action Column: Minimal Inspect Cue */}
              <div className="row-col-actions">
                <span className="row-inspect-cue">
                  <span>Inspect</span>
                  <Icon icon="lucide:arrow-up-right" width={13} height={13} />
                </span>

                {/* Mobile Inline Toggle Button */}
                <button
                  type="button"
                  className="row-mobile-toggle"
                  onClick={(e) => handleToggleMobileExpand(project.id, e)}
                  aria-label="Toggle preview"
                >
                  {isMobileExpanded ? 'Close' : 'View'}
                </button>
              </div>

              {/* Mobile Inline Expanded Spec (Visible only on mobile when toggled) */}
              <AnimatePresence>
                {isMobileExpanded && (
                  <motion.div
                    className="row-mobile-expanded"
                    onClick={(e) => e.stopPropagation()}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="mobile-expanded-img-wrap">
                      <img
                        src={project.image}
                        alt={`${project.title} preview`}
                        className="mobile-expanded-img"
                      />
                    </div>
                    <div className="mobile-expanded-body">
                      <p className="mobile-expanded-detail">{project.detail}</p>

                      {project.highlights && project.highlights.length > 0 && (
                        <div className="mobile-highlights-block">
                          <span className="mobile-highlights-title">Engineering Highlights</span>
                          <ul className="mobile-highlights-list">
                            {project.highlights.map((h, i) => (
                              <li key={i} className="mobile-highlight-item">
                                <span className="highlight-bullet" aria-hidden="true">›</span>
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="mobile-expanded-actions">
                        {project.demoUrl &&
                          project.demoUrl.startsWith('http') &&
                          !project.demoUrl.includes('github') && (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="viewer-btn viewer-btn-primary"
                            >
                              <Icon icon="lucide:globe" width={13} height={13} />
                              <span>Live Site</span>
                              <Icon icon="lucide:arrow-up-right" width={12} height={12} />
                            </a>
                          )}
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="viewer-btn viewer-btn-secondary"
                        >
                          <Icon icon="lucide:github" width={13} height={13} />
                          <span>Source</span>
                          <Icon icon="lucide:arrow-up-right" width={12} height={12} />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Architectural Project File Viewer Drawer */}
      <AnimatePresence>
        {isViewerOpen && (
          <motion.div
            className="minimal-viewer"
            ref={viewerRef}
            aria-live="polite"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="viewer-top-bar">
              <div className="viewer-title-group">
                <span className="viewer-index-tag">Project {activeProject.number}</span>
                <span className="viewer-sep">|</span>
                <strong className="viewer-name">{activeProject.title}</strong>
              </div>

              <div className="viewer-controls-group">
                <button
                  type="button"
                  className="viewer-close"
                  onClick={() => setIsViewerOpen(false)}
                  aria-label="Close viewer"
                >
                  <span>Close</span>
                  <Icon icon="lucide:x" width={14} height={14} />
                </button>
              </div>
            </div>

            <div className="viewer-body-stage">
              <button
                type="button"
                className="stage-nav-arrow stage-nav-prev"
                onClick={handlePrevProject}
                aria-label="Previous project"
              >
                <Icon icon="lucide:chevron-left" width={18} height={18} />
              </button>

              <div className="viewer-grid">
                {/* Left: Showcase Image Preview */}
                <div className="viewer-image-col">
                  <div className="viewer-img-frame">
                    <img
                      src={activeProject.image}
                      alt={`${activeProject.title} preview`}
                      className="viewer-img"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                </div>

                {/* Right: Project Spec Copy */}
                <div className="viewer-copy-col">
                  <div className="viewer-copy-header">
                    <div className="viewer-meta-tags">
                      <span className="viewer-cat-label">{activeProject.tag}</span>
                      {activeProject.metrics && (
                        <span className="viewer-metrics-tag">{activeProject.metrics}</span>
                      )}
                    </div>
                    <h3 className="viewer-main-title">{activeProject.title}</h3>
                    <p className="viewer-detail-text">{activeProject.detail}</p>
                  </div>

                  {/* Engineering Highlights & Architecture */}
                  {activeProject.highlights && activeProject.highlights.length > 0 && (
                    <div className="viewer-highlights-card">
                      <div className="viewer-highlights-header">
                        <Icon icon="lucide:layers" width={13} height={13} className="highlights-header-icon" />
                        <span className="viewer-highlights-title">Engineering Highlights &amp; Solutions</span>
                      </div>
                      <ul className="viewer-highlights-list">
                        {activeProject.highlights.map((highlight, idx) => (
                          <li key={idx} className="viewer-highlight-item">
                            <span className="highlight-bullet" aria-hidden="true">›</span>
                            <span className="highlight-text">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="viewer-actions-row">
                    <span className="viewer-stack-label">{activeProject.stack}</span>

                    <div className="viewer-links">
                      {activeProject.demoUrl &&
                        activeProject.demoUrl.startsWith('http') &&
                        !activeProject.demoUrl.includes('github') && (
                          <a
                            href={activeProject.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="viewer-btn viewer-btn-primary"
                          >
                            <Icon icon="lucide:globe" width={13} height={13} />
                            <span>Live Site</span>
                            <Icon icon="lucide:arrow-up-right" width={12} height={12} />
                          </a>
                        )}
                      <a
                        href={activeProject.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="viewer-btn viewer-btn-secondary"
                      >
                        <Icon icon="lucide:github" width={13} height={13} />
                        <span>Source</span>
                        <Icon icon="lucide:arrow-up-right" width={12} height={12} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="stage-nav-arrow stage-nav-next"
                onClick={handleNextProject}
                aria-label="Next project"
              >
                <Icon icon="lucide:chevron-right" width={18} height={18} />
              </button>
            </div>

            <div className="viewer-progress-dots">
              {projectsData.map((project, idx) => (
                <button
                  type="button"
                  key={project.id}
                  className={`progress-dot ${idx === selectedIndex ? 'active' : ''}`}
                  onClick={() => setSelectedIndex(idx)}
                  aria-label={`Jump to ${project.title}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
