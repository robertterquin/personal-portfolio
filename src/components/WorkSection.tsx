import React, { useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Icon } from '@iconify/react';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react';
import type { Project } from '../types';
import { projectsData } from '../data/portfolioData';
import { keepInPlace } from '../hooks';

/** Projects shown before "Show all"; the data is ordered with the featured ones first. */
const FEATURED_COUNT = 4;
const ARCHIVE_EASE = [0.16, 1, 0.3, 1] as const;

const rowItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 6,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

const archiveDrawerVariants: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.42, ease: ARCHIVE_EASE },
      opacity: { duration: 0.28, ease: 'easeOut' },
      staggerChildren: 0.035,
      staggerDirection: -1,
    },
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.42, ease: ARCHIVE_EASE },
      opacity: { duration: 0.32, ease: 'easeOut' },
      staggerChildren: 0.045,
      delayChildren: 0.02,
    },
  },
};

const archiveRowVariants: Variants = {
  collapsed: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.24, ease: ARCHIVE_EASE },
  },
  expanded: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.34, ease: ARCHIVE_EASE },
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
  const toggleRef = useRef<HTMLButtonElement>(null);
  const collapseTopRef = useRef<number | null>(null);

  const featuredProjects = projectsData.slice(0, FEATURED_COUNT);
  const archiveProjects = projectsData.slice(FEATURED_COUNT);
  const hasMore = archiveProjects.length > 0;
  const hiddenCount = archiveProjects.length;

  const handleToggle = () => {
    const button = toggleRef.current;
    const topBefore = button?.getBoundingClientRect().top;

    if (isReducedMotion) {
      flushSync(() => setShowAll((prev) => !prev));
      if (showAll && button && topBefore !== undefined) keepInPlace(button, topBefore);
      return;
    }

    if (showAll && topBefore !== undefined) {
      collapseTopRef.current = topBefore;
    } else {
      collapseTopRef.current = null;
    }
    setShowAll((prev) => !prev);
  };

  const syncCollapseScroll = () => {
    if (!showAll && collapseTopRef.current !== null && toggleRef.current) {
      keepInPlace(toggleRef.current, collapseTopRef.current);
    }
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

        <AnimatePresence
          initial={false}
          onExitComplete={() => {
            syncCollapseScroll();
            collapseTopRef.current = null;
          }}
        >
          {showAll && (
            <motion.div
              key="project-archive-drawer"
              className="project-archive-drawer"
              initial={isReducedMotion ? false : 'collapsed'}
              animate="expanded"
              exit={isReducedMotion ? undefined : 'collapsed'}
              variants={isReducedMotion ? undefined : archiveDrawerVariants}
              onUpdate={syncCollapseScroll}
            >
              {archiveProjects.map((project) => (
                <motion.article
                  key={project.id}
                  variants={isReducedMotion ? undefined : archiveRowVariants}
                  className="project-index-row"
                >
                  <ProjectRow project={project} />
                </motion.article>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {hasMore && (
        <div className="work-toggle-wrap">
          <span className="work-toggle-line" aria-hidden="true" />
          <button
            ref={toggleRef}
            type="button"
            className="work-toggle"
            onClick={handleToggle}
            aria-expanded={showAll}
            aria-controls="project-list"
          >
            <span>{showAll ? 'Show fewer' : 'View Full Archive'}</span>
            {!showAll && <span className="work-toggle-count">+{hiddenCount}</span>}
            <Icon
              icon="lucide:chevron-down"
              width={14}
              height={14}
              aria-hidden="true"
              className={`work-toggle-chevron${showAll ? ' is-open' : ''}`}
            />
          </button>
          <span className="work-toggle-line" aria-hidden="true" />
        </div>
      )}
    </section>
  );
};
