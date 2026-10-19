import type { ContributionDay } from '../types';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// One label per month, placed on the first week column that starts in it.
// A label is dropped when the next month begins less than 3 columns later.
export function buildMonthLabels(days: Pick<ContributionDay, 'date'>[]) {
  const labels: Array<{ col: number; label: string }> = [];
  let prevMonth = -1;
  for (let i = 0; i < days.length; i += 7) {
    const month = parseInt(days[i].date.slice(5, 7), 10) - 1;
    if (month === prevMonth) continue;
    prevMonth = month;
    const col = i / 7;
    const last = labels[labels.length - 1];
    if (last && col - last.col < 3) labels.pop();
    labels.push({ col, label: MONTH_NAMES[month] });
  }
  return labels;
}
