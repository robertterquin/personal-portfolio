import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import type { ContributionDay, GithubApiResponse } from '../types';
import { personalData } from '../data/portfolioData';
import verifiedData from '../data/githubContributions.json';
import { buildMonthLabels } from '../utils/monthLabels';
import { computeContributionStats } from '../utils/contributionStats';

const monthVariants: Variants = {
  hidden: { opacity: 0, y: -4 },
  visible: (col: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: col * 0.012,
      duration: 0.25,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export const GithubActivity: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const isReducedMotion = Boolean(shouldReduceMotion);

  const [isGridRevealed, setIsGridRevealed] = useState<boolean>(false);
  const [contributions, setContributions] = useState<ContributionDay[]>(
    verifiedData.contributions as ContributionDay[]
  );
  const [totalCount, setTotalCount] = useState<number>(verifiedData.total.lastYear);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const scrollStageRef = useRef<HTMLDivElement>(null);

  const username = 'robertterquin';

  useEffect(() => {
    let isMounted = true;

    // Live API first (Vercel function, or the Vite proxy in dev), then the latest committed snapshot.
    const sources = [
      '/api/github-contributions',
      `https://raw.githubusercontent.com/${username}/personal-portfolio/main/src/data/githubContributions.json`,
    ];

    const loadLatest = async () => {
      for (const url of sources) {
        try {
          const res = await fetch(url, { cache: 'no-store' });
          if (!res.ok) continue;
          const data: GithubApiResponse = await res.json();
          const total = data.total?.lastYear ?? 0;
          if (total > 0 && data.contributions?.length) {
            if (isMounted) {
              setContributions(data.contributions);
              setTotalCount(total);
            }
            return;
          }
        } catch (_err) {
          void _err;
        }
      }
    };

    loadLatest();

    return () => {
      isMounted = false;
    };
  }, [username]);

  const todayEntry = contributions[contributions.length - 1];

  const stats = React.useMemo(() => computeContributionStats(contributions), [contributions]);

  // On narrow screens the grid scrolls sideways; start at the most recent weeks.
  useEffect(() => {
    const stage = scrollStageRef.current;
    if (stage) stage.scrollLeft = stage.scrollWidth;
  }, [contributions]);

  const displayDays = React.useMemo(() => {
    if (!contributions || contributions.length === 0) return [];
    const list = [...contributions];
    const last = list[list.length - 1];
    if (!last) return list;

    const [y, m, d] = last.date.split('-').map((n) => parseInt(n, 10));
    const lastDate = new Date(Date.UTC(y, m - 1, d));
    const dayOfWeek = lastDate.getUTCDay();

    if (dayOfWeek < 6) {
      for (let i = dayOfWeek + 1; i <= 6; i++) {
        const nextDate = new Date(lastDate);
        nextDate.setUTCDate(lastDate.getUTCDate() + (i - dayOfWeek));
        const dateStr = nextDate.toISOString().split('T')[0];
        list.push({ date: dateStr, count: 0, level: 0, isFuture: true });
      }
    }
    return list;
  }, [contributions]);

  const monthLabels = React.useMemo(() => buildMonthLabels(displayDays), [displayDays]);

  const formatDate = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split('-');
      const d = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <section id="activity" className="github-activity-section">
      <motion.div
        className="github-activity-header"
        initial={isReducedMotion ? false : { opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <h2 className="section-title">GitHub Contributions</h2>
        <a
          href={personalData.github}
          target="_blank"
          rel="noreferrer"
          className="heatmap-user-meta"
          title={`View @${username} on GitHub`}
        >
          <span>@{username}</span>
          <Icon icon="lucide:arrow-up-right" width={13} height={13} />
        </a>
      </motion.div>

      <motion.div
        className="github-heatmap"
        initial={isReducedMotion ? false : { opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="heatmap-summary">
          <span>
            <strong>{totalCount.toLocaleString('en-US')}</strong>{' '}
            {totalCount === 1 ? 'contribution' : 'contributions'} in the last year
          </span>
          <span className="heatmap-summary-sep" aria-hidden="true">/</span>
          <span>
            <strong>{stats.longestStreak}</strong>-day longest streak
          </span>
          <span className="heatmap-summary-sep" aria-hidden="true">/</span>
          <span>
            <strong>{stats.currentStreak}</strong>-day current streak
          </span>
          {stats.mostActiveWeekday && (
            <>
              <span className="heatmap-summary-sep" aria-hidden="true">/</span>
              <span>
                most active on <strong>{stats.mostActiveWeekday}s</strong>
              </span>
            </>
          )}
        </p>

        <div className="heatmap-card">
          <div className="heatmap-scroll-stage" ref={scrollStageRef}>
            <div
              className="heatmap-board"
              style={{ '--weeks': Math.ceil(displayDays.length / 7) } as React.CSSProperties}
            >
              <div className="heatmap-months-row" aria-hidden="true">
                <span className="heatmap-month-spacer" />
                <motion.div
                  className="heatmap-months-track"
                  initial={isReducedMotion ? false : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                >
                  {monthLabels.map((m) => (
                    <motion.span
                      key={m.label + m.col}
                      className="heatmap-month-tag"
                      style={{ gridColumnStart: m.col + 1 }}
                      custom={m.col}
                      variants={isReducedMotion ? undefined : monthVariants}
                    >
                      {m.label}
                    </motion.span>
                  ))}
                </motion.div>
              </div>

              <div className="heatmap-body-row">
                <motion.div
                  className="heatmap-weekdays-col"
                  aria-hidden="true"
                  initial={isReducedMotion ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <span className="weekday-label" />
                  <span className="weekday-label">Mon</span>
                  <span className="weekday-label" />
                  <span className="weekday-label">Wed</span>
                  <span className="weekday-label" />
                  <span className="weekday-label">Fri</span>
                  <span className="weekday-label" />
                </motion.div>

                <motion.div
                  className={`heatmap-grid ${isGridRevealed || isReducedMotion ? 'revealed' : ''}`}
                  role="region"
                  aria-label="Contribution Calendar"
                  onViewportEnter={() => setIsGridRevealed(true)}
                  viewport={{ once: true, amount: 0.15 }}
                >
                  {displayDays.map((day, index) => {
                    const isToday = day.date === todayEntry?.date;
                    const isFuture = day.isFuture;
                    const col = Math.floor(index / 7);
                    const row = index % 7;
                    const delay = (col * 0.012 + row * 0.003).toFixed(3);

                    return (
                      <div
                        key={day.date}
                        style={{ '--cell-delay': `${delay}s` } as React.CSSProperties}
                        className={`heatmap-cell level-${day.level}${isToday ? ' cell-today' : ''}${isFuture ? ' cell-future' : ''}`}
                        onMouseEnter={() => !isFuture && setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                        tabIndex={isFuture ? -1 : 0}
                        onFocus={() => !isFuture && setHoveredDay(day)}
                        onBlur={() => setHoveredDay(null)}
                        aria-label={
                          isFuture
                            ? undefined
                            : `${day.count} contributions on ${formatDate(day.date)}${isToday ? ' (Today)' : ''}`
                        }
                      />
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </div>

          <motion.div
            className="heatmap-bottom-bar"
            initial={isReducedMotion ? false : { opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
          >
            <span className="heatmap-inspection-status">
              {hoveredDay ? (
                <>
                  <strong>{hoveredDay.count}</strong> {hoveredDay.count === 1 ? 'contribution' : 'contributions'} · {formatDate(hoveredDay.date)}
                  {hoveredDay.date === todayEntry?.date && ' (Today)'}
                </>
              ) : todayEntry ? (
                <>
                  <strong>{todayEntry.count}</strong> {todayEntry.count === 1 ? 'contribution' : 'contributions'} today · {formatDate(todayEntry.date)}
                </>
              ) : (
                <span className="inspection-cue">Hover a square to inspect a day</span>
              )}
            </span>

            <div className="heatmap-legend" aria-hidden="true">
              <span>Less</span>
              <span className="legend-cell level-0" />
              <span className="legend-cell level-1" />
              <span className="legend-cell level-2" />
              <span className="legend-cell level-3" />
              <span className="legend-cell level-4" />
              <span>More</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
