import React, { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Icon } from '@iconify/react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import type { Project } from '../types';
import { projectsData } from '../data/portfolioData';
import { keepInPlace, smoothScrollBy } from '../hooks';

/** Projects shown before "Show all"; the data is ordered with the featured ones first. */
const FEATURED_COUNT = 5;
const ARCHIVE_EASE = [0.16, 1, 0.3, 1] as const;
const STAGGER_STEP_MS = 150;
const CLOSE_STEP_S = 0.065;
const CLOSE_ROW_DURATION_S = 0.38;
const CLOSE_GLIDE_DURATION_S = 0.68;

const rowItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: ARCHIVE_EASE },
  },
};

const archiveRowVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: ARCHIVE_EASE },
  },
  closing: (revIdx: number) => ({
    opacity: 0,
    y: -8,
    transition: {
      duration: CLOSE_ROW_DURATION_S,
      delay: revIdx * CLOSE_STEP_S,
      ease: ARCHIVE_EASE,
    },
  }),
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
  const [revealedCount, setRevealedCount] = useState(0);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const toggleWrapRef = useRef<HTMLDivElement>(null);
  const featuredGroupRef = useRef<HTMLDivElement>(null);
  const archiveDrawerRef = useRef<HTMLDivElement>(null);
  const closeTweenRef = useRef<{ kill: () => void } | null>(null);
  const cooldownTimerRef = useRef<number | null>(null);
  const inViewSetRef = useRef<Set<number>>(new Set());
  const revealedCountRef = useRef(0);

  const featuredProjects = projectsData.slice(0, FEATURED_COUNT);
  const archiveProjects = projectsData.slice(FEATURED_COUNT);
  const hasMore = archiveProjects.length > 0;
  const hiddenCount = archiveProjects.length;
  const isExpandedUI = showAll && !isClosing;

  const clearQueueTimers = () => {
    if (closeTweenRef.current !== null) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    if (cooldownTimerRef.current !== null) {
      window.clearTimeout(cooldownTimerRef.current);
      cooldownTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      clearQueueTimers();
    };
  }, []);

  const advanceRevealQueue = () => {
    if (cooldownTimerRef.current !== null) return;
    const nextIdx = revealedCountRef.current;
    if (nextIdx >= archiveProjects.length) return;
    if (!inViewSetRef.current.has(nextIdx)) return;

    revealedCountRef.current = nextIdx + 1;
    setRevealedCount(nextIdx + 1);

    cooldownTimerRef.current = window.setTimeout(() => {
      cooldownTimerRef.current = null;
      advanceRevealQueue();
    }, STAGGER_STEP_MS);
  };

  const handleArchiveRowInView = (index: number) => {
    inViewSetRef.current.add(index);
    advanceRevealQueue();
  };

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
      clearQueueTimers();
      inViewSetRef.current = new Set([0]);
      revealedCountRef.current = 0;
      setRevealedCount(0);
      setShowAll(true);
      // Kick off project #05 immediately, then stagger subsequent rows one-by-one as they enter view.
      advanceRevealQueue();
      return;
    }

    clearQueueTimers();
    const drawerHeight = archiveDrawerRef.current?.offsetHeight ?? 0;

    // Phase 1: Smoothly glide scroll up to Row 04 while archive rows dissolve one-by-one (document height stays constant, zero flicker).
    setIsClosing(true);

    closeTweenRef.current = smoothScrollBy(-drawerHeight, CLOSE_GLIDE_DURATION_S, () => {
      const featuredEl = featuredGroupRef.current;
      const featuredTopBefore = featuredEl?.getBoundingClientRect().top;

      // Phase 2: Camera is now resting on Row 04; unmount archive rows below it with 0px shift.
      flushSync(() => {
        setShowAll(false);
        setIsClosing(false);
        setRevealedCount(0);
        revealedCountRef.current = 0;
        inViewSetRef.current.clear();
      });

      if (featuredEl && featuredTopBefore !== undefined) {
        keepInPlace(featuredEl, featuredTopBefore);
      }

      toggleWrapRef.current?.animate(
        [
          { opacity: 0, transform: 'translateY(6px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        { duration: 360, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
      );

      closeTweenRef.current = null;
    });
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
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={isReducedMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={isReducedMotion ? undefined : rowItemVariants}
              className={`project-index-row${index % 2 === 1 ? ' is-even' : ''}`}
            >
              <ProjectRow project={project} />
            </motion.article>
          ))}
        </div>

        {showAll && (
          <div ref={archiveDrawerRef} className="project-archive-drawer">
            {archiveProjects.map((project, index) => {
              const globalIndex = FEATURED_COUNT + index;
              const isEven = globalIndex % 2 === 1;
              const isRevealed = index < revealedCount;
              const revIdx = archiveProjects.length - 1 - index;
              const animateState = isClosing
                ? 'closing'
                : isRevealed
                  ? 'visible'
                  : 'hidden';

              return (
                <motion.article
                  key={project.id}
                  custom={revIdx}
                  initial={isReducedMotion ? false : 'hidden'}
                  animate={isReducedMotion ? undefined : animateState}
                  onViewportEnter={() => handleArchiveRowInView(index)}
                  viewport={{ once: true, amount: 0.08 }}
                  variants={isReducedMotion ? undefined : archiveRowVariants}
                  className={`project-index-row${isEven ? ' is-even' : ''}`}
                >
                  <ProjectRow project={project} />
                </motion.article>
              );
            })}
          </div>
        )}
      </div>

      {hasMore && (
        <div ref={toggleWrapRef} className="work-toggle-wrap">
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
