import type { ContributionDay } from '../types';

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export interface ContributionStats {
  longestStreak: number;
  currentStreak: number;
  mostActiveWeekday: string | null;
}

// Days must be in chronological order (as GitHub returns them).
export function computeContributionStats(days: Pick<ContributionDay, 'date' | 'count'>[]): ContributionStats {
  let longestStreak = 0;
  let run = 0;
  const weekdayTotals = new Array(7).fill(0);

  for (const day of days) {
    run = day.count > 0 ? run + 1 : 0;
    longestStreak = Math.max(longestStreak, run);
    weekdayTotals[new Date(`${day.date}T00:00:00Z`).getUTCDay()] += day.count;
  }

  // Like GitHub, today without contributions yet does not break the streak.
  let currentStreak = 0;
  let i = days.length - 1;
  if (i >= 0 && days[i].count === 0) i--;
  for (; i >= 0 && days[i].count > 0; i--) currentStreak++;

  const maxTotal = Math.max(...weekdayTotals);
  const mostActiveWeekday = maxTotal > 0 ? WEEKDAYS[weekdayTotals.indexOf(maxTotal)] : null;

  return { longestStreak, currentStreak, mostActiveWeekday };
}
