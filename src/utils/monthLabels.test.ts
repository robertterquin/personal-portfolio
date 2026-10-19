import { describe, expect, it } from 'vitest';
import { buildMonthLabels } from './monthLabels';

// Builds `weeks` consecutive days (7 per column) starting at an ISO date.
function daysFrom(start: string, weeks: number) {
  const first = new Date(`${start}T00:00:00Z`);
  return Array.from({ length: weeks * 7 }, (_, i) => {
    const d = new Date(first);
    d.setUTCDate(first.getUTCDate() + i);
    return { date: d.toISOString().slice(0, 10) };
  });
}

describe('buildMonthLabels', () => {
  it('labels each month at the first column that starts in it', () => {
    // Sunday 2026-02-01 → Feb at col 0, Mar at col 4 (Mar 1 is a Sunday)
    const labels = buildMonthLabels(daysFrom('2026-02-01', 9));
    expect(labels.slice(0, 2)).toEqual([
      { col: 0, label: 'Feb' },
      { col: 4, label: 'Mar' },
    ]);
  });

  it('drops a leading month that would overlap the next label', () => {
    // Starts Oct 19: November begins two columns later, so October is dropped
    const labels = buildMonthLabels(daysFrom('2025-10-19', 6));
    expect(labels[0]).toEqual({ col: 2, label: 'Nov' });
    expect(labels.some((l) => l.label === 'Oct')).toBe(false);
  });

  it('covers a full year with one label per month', () => {
    const labels = buildMonthLabels(daysFrom('2025-10-19', 53));
    expect(labels).toHaveLength(12);
    expect(new Set(labels.map((l) => l.label)).size).toBe(12);
  });

  it('keeps labels at least 3 columns apart', () => {
    const labels = buildMonthLabels(daysFrom('2025-10-19', 53));
    for (let i = 1; i < labels.length; i++) {
      expect(labels[i].col - labels[i - 1].col).toBeGreaterThanOrEqual(3);
    }
  });

  it('returns no labels for empty data', () => {
    expect(buildMonthLabels([])).toEqual([]);
  });
});
