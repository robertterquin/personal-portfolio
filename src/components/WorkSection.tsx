import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'motion/react';
import type { Project } from '../types';
import { projectsData } from '../data/portfolioData';
import { TiltCard } from './TiltCard';

const rowListVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

const rowItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
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

export const WorkSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const isReducedMotion = Boolean(shouldReduceMotion);

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
      <motion.div
        className="work-index-header"
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
        <div className="work-index-title-group">
          <span className="section-label">Selected Work</span>
          <h2 className="section-title">Systems &amp; Applications</h2>
        </div>
      </motion.div>

      <motion.div
        className="project-index-list"
        initial={isReducedMotion ? false : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        variants={isReducedMotion ? undefined : rowListVariants}
      >
        {projectsData.map((project) => {
          const isSelected = isViewerOpen && projectsData[selectedIndex]?.id === project.id;
          const isMobileExpanded = mobileExpandedId === project.id;

          return (
            <motion.div
              key={project.id}
              variants={isReducedMotion ? undefined : rowItemVariants}
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
              <div className="row-col row-col-title">
                <div className="row-title-wrap">
                  <span className="row-index-num">{project.number}</span>
                  <h3 className="row-title">{project.title}</h3>
                </div>
                <p className="row-description">{project.description}</p>
              </div>

              <div className="row-col-actions">
                <span className="row-inspect-cue">
                  <span>Inspect</span>
                  <Icon icon="lucide:arrow-up-right" width={13} height={13} />
                </span>

                <button
                  type="button"
                  className="row-mobile-toggle"
                  onClick={(e) => handleToggleMobileExpand(project.id, e)}
                  aria-label="Toggle preview"
                >
                  {isMobileExpanded ? 'Close' : 'View'}
                </button>
              </div>

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
                    <TiltCard
                      className="mobile-tilt-wrap"
                      innerClassName="mobile-expanded-img-wrap"
                      maxTilt={5}
                      glare
                    >
                      <img
                        src={project.image}
                        alt={`${project.title} preview`}
                        className="mobile-expanded-img"
                        loading="lazy"
                        decoding="async"
                      />
                    </TiltCard>
                    <div className="mobile-expanded-body">
                      <div className="viewer-meta-row">
                        <span className="viewer-tag-pill">{project.tag}</span>
                      </div>
                      <p className="mobile-expanded-detail">{project.detail}</p>

                      <div className="viewer-stack-tags">
                        {project.stack.split('·').map((tech, i) => (
                          <span key={i} className="viewer-stack-tag">
                            {tech.trim()}
                          </span>
                        ))}
                      </div>

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

                        {project.repoUrl && (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="viewer-btn viewer-btn-secondary"
                          >
                            <Icon icon="lucide:github" width={13} height={13} />
                            <span>GitHub</span>
                            <Icon icon="lucide:arrow-up-right" width={12} height={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>

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
                <span className="viewer-status-dot" aria-hidden="true" />
                <span className="viewer-bar-label">Project Overview</span>
                <span className="viewer-bar-separator" aria-hidden="true">·</span>
                <span className="viewer-bar-index">
                  {activeProject.number} / {String(projectsData.length).padStart(2, '0')}
                </span>
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
                <div className="viewer-image-col">
                  <TiltCard
                    className="viewer-tilt-wrap"
                    innerClassName="viewer-img-frame"
                    maxTilt={5}
                    glare
                  >
                    <img
                      src={activeProject.image}
                      alt={`${activeProject.title} preview`}
                      className="viewer-img"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </TiltCard>
                </div>

                <div className="viewer-copy-col">
                  <div className="viewer-copy-header">
                    <div className="viewer-meta-row">
                      <span className="viewer-tag-pill">{activeProject.tag}</span>
                    </div>
                    <h3 className="viewer-main-title">{activeProject.title}</h3>
                    <p className="viewer-detail-text">{activeProject.detail}</p>
                  </div>

                  <div className="viewer-actions-row">
                    <div className="viewer-stack-tags">
                      {activeProject.stack.split('·').map((tech, i) => (
                        <span key={i} className="viewer-stack-tag">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>

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

                      {activeProject.repoUrl && (
                        <a
                          href={activeProject.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="viewer-btn viewer-btn-secondary"
                        >
                          <Icon icon="lucide:github" width={13} height={13} />
                          <span>GitHub</span>
                          <Icon icon="lucide:arrow-up-right" width={12} height={12} />
                        </a>
                      )}
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
