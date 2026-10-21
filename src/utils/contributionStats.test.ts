import { describe, expect, it } from 'vitest';
import { computeContributionStats } from './contributionStats';

// 2026-01-04 is a Sunday.
const days = (counts: number[], start = '2026-01-04') => {
  const first = new Date(`${start}T00:00:00Z`);
  return counts.map((count, i) => {
    const d = new Date(first);
    d.setUTCDate(first.getUTCDate() + i);
    return { date: d.toISOString().slice(0, 10), count };
  });
};

describe('computeContributionStats', () => {
  it('finds the longest run of active days', () => {
    expect(computeContributionStats(days([1, 2, 0, 3, 4, 5, 0, 1])).longestStreak).toBe(3);
  });

  it('counts the current streak back from the last day', () => {
    expect(computeContributionStats(days([1, 0, 2, 3, 4])).currentStreak).toBe(3);
  });

  it('does not break the current streak when today has no contributions yet', () => {
    expect(computeContributionStats(days([0, 2, 3, 0])).currentStreak).toBe(2);
  });

  it('reports 0 for the current streak after two inactive days', () => {
    expect(computeContributionStats(days([5, 0, 0])).currentStreak).toBe(0);
  });

  it('picks the weekday with the most contributions', () => {
    // Sun 1, Mon 9, Tue 2
    expect(computeContributionStats(days([1, 9, 2])).mostActiveWeekday).toBe('Monday');
  });

  it('handles empty or inactive data', () => {
    expect(computeContributionStats([])).toEqual({ longestStreak: 0, currentStreak: 0, mostActiveWeekday: null });
    expect(computeContributionStats(days([0, 0])).mostActiveWeekday).toBeNull();
  });
});
