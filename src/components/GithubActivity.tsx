import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { personalData } from '../data/portfolioData';
import verifiedData from '../data/githubContributions.json';

const GithubIcon: React.FC<{ size?: number; className?: string }> = ({ size = 15, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ApiResponse {
  total?: { [key: string]: number };
  contributions?: ContributionDay[];
}

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

export const GithubActivity: React.FC = () => {
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
        let liveData: ApiResponse | null = null;
        let liveTotal = 0;

        // 1. Try local dev direct proxy (fastest, zero cache lag)
        try {
          const devRes = await fetch('/api/github-contributions');
          if (devRes.ok) {
            const devData: ApiResponse = await devRes.json();
            const count = devData.total?.lastYear ?? (devData.contributions ? devData.contributions.reduce((acc, c) => acc + c.count, 0) : 0);
            if (count > 0 && devData.contributions && devData.contributions.length > 0) {
              liveData = devData;
              liveTotal = count;
            }
          }
        } catch {
          // Dev proxy unavailable in static production builds
        }

        // 2. Fallback to public live API (for deployed builds)
        if (!liveData || liveTotal === 0) {
          const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
          if (res.ok) {
            const apiData: ApiResponse = await res.json();
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
      } catch {
        // Keeps verifiedData silently
      }
    };

    fetchLiveContributions();

    return () => {
      isMounted = false;
    };
  }, [username]);

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
      {/* Section Header */}
      <div className="github-activity-header">
        <div className="activity-title-col">
          <span className="section-label">GitHub Activity</span>
          <h2 className="section-title">Contribution Activity</h2>
        </div>

        <p className="activity-desc">
          Public contribution activity recorded across GitHub repositories.
        </p>
      </div>

      {/* Main Architectural Heatmap Box */}
      <div className="github-heatmap-container">
        {/* Top Status Bar */}
        <div className="heatmap-top-bar">
          <div className="heatmap-user-meta">
            <GithubIcon size={14} className="github-brand-icon" />
            <span className="heatmap-username">@{username}</span>
          </div>

          <a
            href={personalData.github}
            target="_blank"
            rel="noreferrer"
            className="heatmap-profile-link"
            aria-label="View full GitHub profile"
          >
            <span>View profile</span>
            <ArrowUpRight size={13} />
          </a>
        </div>

        {/* Heatmap Grid Viewport */}
        <div className="heatmap-scroll-stage">
          <div className="heatmap-board">
            {/* Months Header Line */}
            <div className="heatmap-months-row" aria-hidden="true">
              <span className="heatmap-month-spacer" />
              <div className="heatmap-months-track">
                {MONTH_LABELS.map((m) => (
                  <span
                    key={m.label + m.col}
                    className="heatmap-month-tag"
                    style={{ gridColumnStart: m.col + 1 }}
                  >
                    {m.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Weekdays and 53-column Grid */}
            <div className="heatmap-body-row">
              {/* Day Labels */}
              <div className="heatmap-weekdays-col" aria-hidden="true">
                <span className="weekday-label" />
                <span className="weekday-label">Mon</span>
                <span className="weekday-label" />
                <span className="weekday-label">Wed</span>
                <span className="weekday-label" />
                <span className="weekday-label">Fri</span>
                <span className="weekday-label" />
              </div>

              {/* 53 Columns Grid */}
              <div className="heatmap-grid" role="region" aria-label="Contribution Calendar">
                {contributions.map((day) => (
                  <div
                    key={day.date}
                    className={`heatmap-cell level-${day.level}`}
                    onMouseEnter={() => setHoveredDay(day)}
                    onMouseLeave={() => setHoveredDay(null)}
                    tabIndex={0}
                    onFocus={() => setHoveredDay(day)}
                    onBlur={() => setHoveredDay(null)}
                    aria-label={`${day.count} contributions on ${formatDate(day.date)}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Inspection Bar */}
        <div className="heatmap-bottom-bar">
          <span className="heatmap-total-label">
            {totalCount} {totalCount === 1 ? 'contribution' : 'contributions'} in the last year.
          </span>

          <div className="heatmap-bottom-right">
            <span className="heatmap-inspection-status">
              {hoveredDay ? (
                <>
                  <strong>{hoveredDay.count}</strong> {hoveredDay.count === 1 ? 'contribution' : 'contributions'} · {formatDate(hoveredDay.date)}
                </>
              ) : (
                <span className="inspection-cue">Hover a square to inspect a day</span>
              )}
            </span>

            {/* Legend */}
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
        </div>
      </div>
    </section>
  );
};
