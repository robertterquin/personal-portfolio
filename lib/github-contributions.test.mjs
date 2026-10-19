import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  cleanToken,
  fetchContributions,
  mapGraphQLResponse,
  parseContributionsHtml,
} from './github-contributions.mjs';

const graphQLResponse = (days, total = 7) => ({
  data: {
    viewer: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: total,
          weeks: [{ contributionDays: days }],
        },
      },
    },
  },
});

describe('cleanToken', () => {
  it('returns an empty string for missing values', () => {
    expect(cleanToken(undefined)).toBe('');
    expect(cleanToken('')).toBe('');
  });

  it('trims whitespace and surrounding quotes', () => {
    expect(cleanToken('  "ghp_abc"  ')).toBe('ghp_abc');
    expect(cleanToken("'ghp_abc'")).toBe('ghp_abc');
  });

  it('drops a pasted GITHUB_TOKEN= prefix', () => {
    expect(cleanToken('GITHUB_TOKEN="ghp_abc"')).toBe('ghp_abc');
  });
});

describe('mapGraphQLResponse', () => {
  it('maps days, levels and the yearly total', () => {
    const result = mapGraphQLResponse(
      graphQLResponse([
        { date: '2026-01-04', contributionCount: 0, contributionLevel: 'NONE' },
        { date: '2026-01-05', contributionCount: 3, contributionLevel: 'SECOND_QUARTILE' },
        { date: '2026-01-06', contributionCount: 4, contributionLevel: 'FOURTH_QUARTILE' },
      ])
    );

    expect(result.total.lastYear).toBe(7);
    expect(result.contributions).toEqual([
      { date: '2026-01-04', count: 0, level: 0 },
      { date: '2026-01-05', count: 3, level: 2 },
      { date: '2026-01-06', count: 4, level: 4 },
    ]);
  });

  it('falls back to level 1 for unknown levels with activity', () => {
    const result = mapGraphQLResponse(
      graphQLResponse([
        { date: '2026-01-04', contributionCount: 2, contributionLevel: 'SOMETHING_NEW' },
        { date: '2026-01-05', contributionCount: 0, contributionLevel: 'SOMETHING_NEW' },
      ])
    );

    expect(result.contributions.map((d) => d.level)).toEqual([1, 0]);
  });

  it('throws on GraphQL errors', () => {
    expect(() => mapGraphQLResponse({ errors: [{ message: 'Bad credentials' }] })).toThrow(
      'Bad credentials'
    );
  });

  it('throws when the calendar is missing', () => {
    expect(() => mapGraphQLResponse({ data: { viewer: null } })).toThrow('contributionCalendar');
  });
});

describe('fetchContributions', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('sends the token and maps the response', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () =>
        graphQLResponse([{ date: '2026-01-04', contributionCount: 1, contributionLevel: 'FIRST_QUARTILE' }], 1),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await fetchContributions('ghp_abc', { userAgent: 'Test' });

    expect(result.total.lastYear).toBe(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.github.com/graphql');
    expect(init.headers.Authorization).toBe('bearer ghp_abc');
    expect(init.headers['User-Agent']).toBe('Test');
  });

  it('throws on non-OK HTTP responses', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 401, text: async () => 'Bad credentials' })
    );

    await expect(fetchContributions('bad')).rejects.toThrow('HTTP 401');
  });
});

describe('parseContributionsHtml', () => {
  const cell = (id, date, level) =>
    `<td tabindex="0" data-ix="0" style="width: 10px" data-date="${date}" id="${id}" data-level="${level}" role="gridcell" class="ContributionCalendar-day"></td>`;
  const tip = (id, text) =>
    `<tool-tip id="tooltip-${id}" for="${id}" popover="manual" class="sr-only position-absolute">${text}</tool-tip>`;

  const html = `
    <h2 class="f4 text-normal mb-2">
      1,234 contributions
      in the last year
    </h2>
    <table>
      ${cell('day-0', '2026-01-04', 0)}${tip('day-0', 'No contributions on January 4th.')}
      ${cell('day-1', '2026-01-05', 3)}${tip('day-1', '1,024 contributions on January 5th.')}
      ${cell('day-2', '2026-01-06', 9)}
    </table>`;

  it('reads the yearly total with thousands separators', () => {
    expect(parseContributionsHtml(html).total.lastYear).toBe(1234);
  });

  it('pairs each day with its tooltip count', () => {
    const [noActivity, busy] = parseContributionsHtml(html).contributions;
    expect(noActivity).toEqual({ date: '2026-01-04', count: 0, level: 0 });
    expect(busy).toEqual({ date: '2026-01-05', count: 1024, level: 3 });
  });

  it('clamps levels to 0–4 and estimates missing counts', () => {
    const [, , unknown] = parseContributionsHtml(html).contributions;
    expect(unknown).toEqual({ date: '2026-01-06', count: 1, level: 4 });
  });

  it('returns empty data for unrelated HTML', () => {
    expect(parseContributionsHtml('<html><body>Not found</body></html>')).toEqual({
      total: { lastYear: 0 },
      contributions: [],
    });
  });
});
