import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import type { ContributionDay, GithubApiResponse } from '../types';
import { personalData } from '../data/portfolioData';
import verifiedData from '../data/githubContributions.json';

const MONTH_LABELS = [
  { col: 0, label: 'Sep' },
  { col: 4, label: 'Oct' },
  { col: 8, label: 'Nov' },
  { col: 13, label: 'Dec' },
  { col: 17, label: 'Jan' },
  { col: 22, label: 'Feb' },
  { col: 26, label: 'Mar' },
  { col: 30, label: 'Apr' },
  { col: 34, label: 'May' },
  { col: 39, label: 'Jun' },
  { col: 43, label: 'Jul' },
  { col: 47, label: 'Aug' },
];


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

  const username = 'robertterquin';

  useEffect(() => {
    let isMounted = true;

    const fetchLiveContributions = async () => {
      try {
        let liveData: GithubApiResponse | null = null;
        let liveTotal = 0;

        try {
          const devRes = await fetch('/api/github-contributions');
          if (devRes.ok) {
            const devData: GithubApiResponse = await devRes.json();
            const count = devData.total?.lastYear ?? (devData.contributions ? devData.contributions.reduce((acc, c) => acc + c.count, 0) : 0);
            if (count > 0 && devData.contributions && devData.contributions.length > 0) {
              liveData = devData;
              liveTotal = count;
            }
          }
        } catch (_err) {
          void _err;
        }

        if (!liveData || liveTotal === 0) {
          const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
          if (res.ok) {
            const apiData: GithubApiResponse = await res.json();
            const count =
              apiData.total?.lastYear ??
              (apiData.contributions ? apiData.contributions.reduce((acc, c) => acc + c.count, 0) : 0);
            if (count > 0 && apiData.contributions && apiData.contributions.length > 0) {
              liveData = apiData;
              liveTotal = count;
            }
          }
        }

        if (isMounted && liveData && liveTotal > 0 && liveData.contributions && liveData.contributions.length > 0) {
          setContributions(liveData.contributions);
          setTotalCount(liveTotal);
        }
      } catch (_err) {
        void _err;
      }
    };

    fetchLiveContributions();

    return () => {
      isMounted = false;
    };
  }, [username]);

  const todayEntry = contributions[contributions.length - 1];

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
        list.push({
          date: dateStr,
          count: 0,
          level: 0,
          isFuture: true,
        } as ContributionDay & { isFuture?: boolean });
      }
    }
    return list;
  }, [contributions]);

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
        <div className="activity-title-col">
          <span className="section-label">GitHub Activity</span>
          <h2 className="section-title">Contribution Activity</h2>
        </div>

        <p className="activity-desc">
          Public contribution activity recorded across GitHub repositories.
        </p>
      </motion.div>

      <motion.div
        className="github-heatmap-container"
        initial={isReducedMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="heatmap-top-bar">
          <a
            href={personalData.github}
            target="_blank"
            rel="noreferrer"
            className="heatmap-user-meta"
            title={`View @${username} on GitHub`}
          >
            <Icon icon="lucide:github" width={14} height={14} className="github-brand-icon" />
            <span className="heatmap-username">@{username}</span>
          </a>
        </div>

        <div className="heatmap-scroll-stage">
          <div className="heatmap-board">
            <div className="heatmap-months-row" aria-hidden="true">
              <span className="heatmap-month-spacer" />
              <motion.div
                className="heatmap-months-track"
                initial={isReducedMotion ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                {MONTH_LABELS.map((m) => (
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
          <span className="heatmap-total-label">
            {totalCount} {totalCount === 1 ? 'contribution' : 'contributions'} in the last year.
          </span>

          <div className="heatmap-bottom-right">
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
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
