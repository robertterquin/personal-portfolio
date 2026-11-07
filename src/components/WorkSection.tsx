import React, { useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Icon } from '@iconify/react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import type { Project } from '../types';
import { projectsData } from '../data/portfolioData';
import { keepInPlace } from '../hooks';

/** Projects shown before "Show all"; the data is ordered with the featured ones first. */
const FEATURED_COUNT = 4;

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
  const primaryUrl = live ?? project.repoUrl;

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
        {(live || project.repoUrl) && (
          <div className="row-links">
            {live && (
              <a href={live} target="_blank" rel="noreferrer">
                <span>Live site</span>
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
          aria-label={`Open ${project.title} ${live ? 'live site' : 'on GitHub'}`}
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
  const visibleProjects = showAll ? projectsData : projectsData.slice(0, FEATURED_COUNT);
  const hasMore = projectsData.length > FEATURED_COUNT;

  const handleToggle = () => {
    const button = toggleRef.current;
    const topBefore = button?.getBoundingClientRect().top;
    flushSync(() => setShowAll((prev) => !prev));
    // Collapsing removes rows above the button; keep it under the visitor's cursor.
    if (showAll && button && topBefore !== undefined) keepInPlace(button, topBefore);
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
        {visibleProjects.map((project) => (
          // Each row animates itself, so rows added by "Show all" fade in too.
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

      {hasMore && (
        <button
          ref={toggleRef}
          type="button"
          className="work-toggle"
          onClick={handleToggle}
          aria-expanded={showAll}
          aria-controls="project-list"
        >
          <span>{showAll ? 'Show fewer' : `Show all ${projectsData.length} projects`}</span>
          <Icon
            icon={showAll ? 'lucide:chevron-up' : 'lucide:chevron-down'}
            width={14}
            height={14}
            aria-hidden="true"
          />
        </button>
      )}
    </section>
  );
};
