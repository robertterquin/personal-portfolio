import React, { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Icon } from '@iconify/react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import type { Project } from '../types';
import { projectsData } from '../data/portfolioData';
import { keepInPlace } from '../hooks';

/** Projects shown before "Show all"; the data is ordered with the featured ones first. */
const FEATURED_COUNT = 4;
const ARCHIVE_EASE = [0.16, 1, 0.3, 1] as const;
const CLOSE_DURATION_MS = 240;

const rowItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: ARCHIVE_EASE },
  },
};

const archiveRowVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: ARCHIVE_EASE },
  },
  closing: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.22, ease: ARCHIVE_EASE },
  },
};

/** demoUrl doubles as the repo link for apps with no web build, so only count it as live when it isn't GitHub. */
function liveUrl(project: Project): string | undefined {
  const url = project.demoUrl;
  return url && url.startsWith('http') && !url.includes('github') ? url : undefined;
}

function AwardLine({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <p className="award-line">
      <Icon icon="lucide:trophy" width={13} height={13} aria-hidden="true" />
      <span>{text}</span>
    </p>
  );
}

function ProjectRow({ project }: { project: Project }) {
  const live = liveUrl(project);
  const primaryUrl = live ?? project.videoUrl ?? project.repoUrl;
  const primaryLabel = live ? 'live site' : project.videoUrl ? 'demo video' : 'on GitHub';

  const image = (
    <img
      src={project.image}
      alt={`${project.title} preview`}
      className="row-media-img"
      loading="lazy"
      decoding="async"
    />
  );

  return (
    <>
      <div className="row-col row-col-title">
        <div className="row-title-wrap">
          <span className="row-index-num">{project.number}</span>
          <h3 className="row-title">{project.title}</h3>
        </div>
        <AwardLine text={project.award} />
        <p className="row-description">{project.description}</p>
        <ul className="row-tags" aria-label={`${project.title} tech stack`}>
          {project.stack.split('·').map((tech) => (
            <li key={tech.trim()}>{tech.trim()}</li>
          ))}
        </ul>
        {(live || project.videoUrl || project.repoUrl) && (
          <div className="row-links">
            {live && (
              <a href={live} target="_blank" rel="noreferrer">
                <span>Live site</span>
                <Icon icon="lucide:arrow-up-right" width={12} height={12} aria-hidden="true" />
              </a>
            )}
            {project.videoUrl && (
              <a href={project.videoUrl} target="_blank" rel="noreferrer">
                <span>Watch demo</span>
                <Icon icon="lucide:arrow-up-right" width={12} height={12} aria-hidden="true" />
              </a>
            )}
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noreferrer">
                <span>GitHub</span>
                <Icon icon="lucide:arrow-up-right" width={12} height={12} aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </div>

      {primaryUrl ? (
        <a
          className="row-col-media"
          href={primaryUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${project.title} ${primaryLabel}`}
        >
          {image}
        </a>
      ) : (
        <div className="row-col-media">{image}</div>
      )}
    </>
  );
}

export const WorkSection: React.FC = () => {
  const isReducedMotion = Boolean(useReducedMotion());
  const [showAll, setShowAll] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const featuredGroupRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);

  const featuredProjects = projectsData.slice(0, FEATURED_COUNT);
  const archiveProjects = projectsData.slice(FEATURED_COUNT);
  const hasMore = archiveProjects.length > 0;
  const hiddenCount = archiveProjects.length;
  const isExpandedUI = showAll && !isClosing;

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const handleToggle = () => {
    if (isClosing) return;

    const button = toggleRef.current;

    if (isReducedMotion) {
      const topBefore = button?.getBoundingClientRect().top;
      flushSync(() => setShowAll((prev) => !prev));
      if (showAll && button && topBefore !== undefined) keepInPlace(button, topBefore);
      return;
    }

    if (!showAll) {
      setShowAll(true);
      return;
    }

    // Phase 1: GPU-only reverse fade/slide of archive rows (document height stays constant, zero flicker).
    setIsClosing(true);

    // Phase 2: Once exit completes, atomically unmount + anchor scroll before paint, then settle featured rows.
    closeTimerRef.current = window.setTimeout(() => {
      const currentButton = toggleRef.current;
      const topBefore = currentButton?.getBoundingClientRect().top;
      flushSync(() => {
        setShowAll(false);
        setIsClosing(false);
      });
      if (currentButton && topBefore !== undefined) {
        keepInPlace(currentButton, topBefore);
      }
      featuredGroupRef.current?.animate(
        [
          { opacity: 0.65, transform: 'translateY(-16px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        { duration: 380, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
      );
      closeTimerRef.current = null;
    }, CLOSE_DURATION_MS);
  };

  return (
    <section id="work" className="work-index-section">
      <motion.div
        className="work-index-header"
        initial={isReducedMotion ? false : { opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="work-index-title-group">
          <h2 className="section-title">Selected Work</h2>
        </div>
      </motion.div>

      <div id="project-list" className="project-index-list">
        <div ref={featuredGroupRef} className="project-featured-group">
          {featuredProjects.map((project) => (
            <motion.article
              key={project.id}
              initial={isReducedMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={isReducedMotion ? undefined : rowItemVariants}
              className="project-index-row"
            >
              <ProjectRow project={project} />
            </motion.article>
          ))}
        </div>

        {showAll && (
          <div className="project-archive-drawer">
            {archiveProjects.map((project) => (
              <motion.article
                key={project.id}
                initial={isReducedMotion ? false : 'hidden'}
                whileInView={isClosing ? undefined : 'visible'}
                animate={isClosing ? 'closing' : undefined}
                viewport={{ once: true, amount: 0.12 }}
                variants={isReducedMotion ? undefined : archiveRowVariants}
                className="project-index-row"
              >
                <ProjectRow project={project} />
              </motion.article>
            ))}
          </div>
        )}
      </div>

      {hasMore && (
        <div className="work-toggle-wrap">
          <span className="work-toggle-line" aria-hidden="true" />
          <button
            ref={toggleRef}
            type="button"
            className="work-toggle"
            onClick={handleToggle}
            aria-expanded={isExpandedUI}
            aria-controls="project-list"
          >
            <span>{isExpandedUI ? 'Show fewer' : 'View Full Archive'}</span>
            {!isExpandedUI && <span className="work-toggle-count">+{hiddenCount}</span>}
            <Icon
              icon="lucide:chevron-down"
              width={14}
              height={14}
              aria-hidden="true"
              className={`work-toggle-chevron${isExpandedUI ? ' is-open' : ''}`}
            />
          </button>
          <span className="work-toggle-line" aria-hidden="true" />
        </div>
      )}
    </section>
  );
};
