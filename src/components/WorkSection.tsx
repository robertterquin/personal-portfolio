import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, CheckCircle, Globe, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { projectsData, type Project } from '../data/portfolioData';

const GithubIcon: React.FC<{ size?: number; className?: string }> = ({ size = 14, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

type FilterCategory = 'all' | 'mobile' | 'web';

export const WorkSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHoveringList, setIsHoveringList] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isViewerOpen, setIsViewerOpen] = useState<boolean>(false);
  const [mobileExpandedId, setMobileExpandedId] = useState<string | null>(null);

  const listRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);

  const filteredProjects = projectsData.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  const activeProject: Project = projectsData[selectedIndex] || projectsData[0];

  // Track cursor position for floating image preview
  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleMouseEnterRow = (project: Project) => {
    setHoveredProject(project);
    setIsHoveringList(true);
  };

  const handleMouseLeaveList = () => {
    setIsHoveringList(false);
    setHoveredProject(null);
  };

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

  // Adjust preview position to prevent edge cutoffs
  const previewWidth = 320;
  const previewHeight = 220;
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

  const previewX = cursorPos.x + 24 + previewWidth > screenWidth
    ? cursorPos.x - previewWidth - 20
    : cursorPos.x + 24;

  const previewY = cursorPos.y + previewHeight - 80 > screenHeight
    ? cursorPos.y - previewHeight + 40
    : cursorPos.y - 80;

  return (
    <section id="work" className="work-index-section">
      {/* Section Header & Architectural Controls */}
      <div className="work-index-header">
        <div className="work-index-title-group">
          <span className="section-label">Selected Work</span>
          <h2 className="section-title">Systems &amp; Applications</h2>
        </div>

        {/* Filter Pills */}
        <div className="work-filter-bar">
          <button
            type="button"
            className={`filter-pill ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            <span>All</span>
            <span className="filter-count">({projectsData.length})</span>
          </button>
          <button
            type="button"
            className={`filter-pill ${activeFilter === 'mobile' ? 'active' : ''}`}
            onClick={() => setActiveFilter('mobile')}
          >
            <span>Mobile</span>
            <span className="filter-count">
              ({projectsData.filter((p) => p.category === 'mobile').length})
            </span>
          </button>
          <button
            type="button"
            className={`filter-pill ${activeFilter === 'web' ? 'active' : ''}`}
            onClick={() => setActiveFilter('web')}
          >
            <span>Web &amp; AI</span>
            <span className="filter-count">
              ({projectsData.filter((p) => p.category === 'web').length})
            </span>
          </button>
        </div>
      </div>

      {/* Interactive Project Index Table / List */}
      <div
        className="project-index-list"
        ref={listRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeaveList}
      >
        {filteredProjects.map((project) => {
          const isSelected = isViewerOpen && projectsData[selectedIndex]?.id === project.id;
          const isMobileExpanded = mobileExpandedId === project.id;

          return (
            <div
              key={project.id}
              className={`project-index-row ${isSelected ? 'row-active' : ''}`}
              onMouseEnter={() => handleMouseEnterRow(project)}
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
              {/* Monospace Number & Category Tag */}
              <div className="row-col row-col-idx">
                <span className="row-index-num">{project.number}</span>
                <span className="row-cat-tag">{project.category === 'mobile' ? 'APP' : 'WEB'}</span>
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
                  <ArrowUpRight size={13} />
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
              {isMobileExpanded && (
                <div
                  className="row-mobile-expanded"
                  onClick={(e) => e.stopPropagation()}
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
                    <div className="mobile-expanded-highlights">
                      <span className="mobile-hl-label">Highlights:</span>
                      <ul>
                        {project.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop Floating Preview Portal */}
      {isHoveringList && hoveredProject && (
        <div
          className="floating-preview-portal"
          style={{
            transform: `translate3d(${previewX}px, ${previewY}px, 0)`,
          }}
          aria-hidden="true"
        >
          <div className="floating-preview-card">
            <div className="floating-card-image-wrap">
              <img
                src={hoveredProject.image}
                alt=""
                className="floating-card-img"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="floating-card-scanline" />
            </div>

            <div className="floating-card-footer">
              <div className="floating-card-info">
                <span className="floating-card-num">{hoveredProject.number}</span>
                <strong className="floating-card-title">{hoveredProject.title}</strong>
              </div>
              <span className="floating-card-tag">{hoveredProject.tag}</span>
            </div>
          </div>
        </div>
      )}

      {/* Architectural Project File Viewer Drawer */}
      {isViewerOpen && (
        <div className="minimal-viewer" ref={viewerRef} aria-live="polite">
          <div className="viewer-top-bar">
            <div className="viewer-title-group">
              <span className="viewer-index-tag">Project // {activeProject.number}</span>
              <span className="viewer-sep">|</span>
              <strong className="viewer-name">{activeProject.title}</strong>
            </div>

            <div className="viewer-controls-group">
              <button
                type="button"
                className="viewer-nav-btn"
                onClick={handlePrevProject}
                aria-label="Previous project"
              >
                <ChevronLeft size={14} />
                <span>Prev</span>
              </button>
              <button
                type="button"
                className="viewer-nav-btn"
                onClick={handleNextProject}
                aria-label="Next project"
              >
                <span>Next</span>
                <ChevronRight size={14} />
              </button>
              <span className="viewer-sep">|</span>
              <button
                type="button"
                className="viewer-close"
                onClick={() => setIsViewerOpen(false)}
                aria-label="Close viewer"
              >
                <span>Close</span>
                <X size={14} />
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
              <ChevronLeft size={18} />
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
                  <div className="viewer-scanlines" aria-hidden="true" />
                </div>
              </div>

              {/* Right: Project Spec Copy */}
              <div className="viewer-copy-col">
                <div className="viewer-copy-header">
                  <span className="viewer-cat-label">{activeProject.tag}</span>
                  <h3 className="viewer-main-title">{activeProject.title}</h3>
                  <p className="viewer-detail-text">{activeProject.detail}</p>
                </div>

                <div className="viewer-highlights-list">
                  <span className="highlights-label">Key Engineering Highlights</span>
                  <ul>
                    {activeProject.highlights.map((item, i) => (
                      <li key={i}>
                        <CheckCircle size={12} className="highlight-icon" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

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
                          <Globe size={13} />
                          <span>Live Site</span>
                          <ArrowUpRight size={12} />
                        </a>
                      )}
                    <a
                      href={activeProject.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="viewer-btn viewer-btn-secondary"
                    >
                      <GithubIcon size={13} />
                      <span>Source</span>
                      <ArrowUpRight size={12} />
                    </a>
                  </div>
                </div>

                <div className="viewer-counter-pill">
                  <span>
                    {activeProject.number} / {String(projectsData.length).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="stage-nav-arrow stage-nav-next"
              onClick={handleNextProject}
              aria-label="Next project"
            >
              <ChevronRight size={18} />
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
        </div>
      )}
    </section>
  );
};
