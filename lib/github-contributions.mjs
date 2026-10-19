// Shared GitHub contributions logic, used by the Vite dev server,
// the sync script (GitHub Action) and the Vercel API function.

import fs from 'node:fs';
import path from 'node:path';

export const GITHUB_USERNAME = 'robertterquin';

const LEVEL_MAP = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const CONTRIBUTIONS_QUERY = `query {
  viewer {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
            contributionLevel
          }
        }
      }
    }
  }
}`;

const stripQuotes = (value) => value.trim().replace(/^["']|["']$/g, '');

const clampLevel = (level) => Math.min(4, Math.max(0, level));

const parseCount = (text) => parseInt(text.replace(/,/g, ''), 10);

/** Normalizes a token from env/config: trims, drops quotes and a stray `GITHUB_TOKEN=` prefix. */
export function cleanToken(raw) {
  if (!raw) return '';
  let token = stripQuotes(raw);
  if (token.startsWith('GITHUB_TOKEN=')) {
    token = stripQuotes(token.slice('GITHUB_TOKEN='.length));
  }
  return token;
}

/** Reads GITHUB_TOKEN from the environment, then from .env.local / .env in `rootDir`. */
export function readGithubToken(rootDir = process.cwd()) {
  const fromEnv = cleanToken(process.env.GITHUB_TOKEN);
  if (fromEnv) return fromEnv;

  for (const file of ['.env.local', '.env']) {
    const envPath = path.resolve(rootDir, file);
    if (!fs.existsSync(envPath)) continue;
    const match = fs.readFileSync(envPath, 'utf-8').match(/^GITHUB_TOKEN\s*=\s*(.+)$/m);
    const token = cleanToken(match?.[1]);
    if (token) return token;
  }
  return '';
}

/** Converts a GitHub GraphQL response into `{ total, contributions }`. Throws on errors or missing data. */
export function mapGraphQLResponse(json) {
  if (json?.errors?.length) {
    throw new Error(`GitHub GraphQL error: ${json.errors.map((e) => e.message).join('; ')}`);
  }

  const calendar = json?.data?.viewer?.contributionsCollection?.contributionCalendar;
  if (!calendar) {
    throw new Error('GitHub GraphQL response did not include contributionCalendar');
  }

  const contributions = calendar.weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: LEVEL_MAP[day.contributionLevel] ?? (day.contributionCount > 0 ? 1 : 0),
    }))
  );

  return { total: { lastYear: calendar.totalContributions }, contributions };
}

/** Fetches the viewer's contribution calendar (including private repos) via the GraphQL API. */
export async function fetchContributions(token, { userAgent = 'Portfolio' } = {}) {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`,
      'User-Agent': userAgent,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: CONTRIBUTIONS_QUERY }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`GitHub GraphQL responded with HTTP ${res.status}: ${errText.slice(0, 200)}`);
  }

  return mapGraphQLResponse(await res.json());
}

/** Parses GitHub's public contributions page HTML into `{ total, contributions }`. */
export function parseContributionsHtml(html) {
  const totalMatch = html.match(/([0-9,]+)\s+contributions\s+in\s+the\s+last\s+year/i);
  const total = totalMatch ? parseCount(totalMatch[1]) : 0;

  const counts = new Map();
  for (const [, id, text] of html.matchAll(/<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]+)<\/tool-tip>/g)) {
    const countMatch = text.trim().match(/([0-9,]+)\s+contribution/i);
    counts.set(id, countMatch ? parseCount(countMatch[1]) : 0);
  }

  const contributions = [];
  for (const [tag] of html.matchAll(/<td[^>]*class="[^"]*ContributionCalendar-day[^"]*"[^>]*>/g)) {
    const date = tag.match(/data-date="([^"]+)"/)?.[1];
    const levelText = tag.match(/data-level="([^"]+)"/)?.[1];
    if (!date || !levelText) continue;

    const level = clampLevel(parseInt(levelText, 10));
    const id = tag.match(/id="([^"]+)"/)?.[1] ?? '';
    contributions.push({ date, count: counts.get(id) ?? (level > 0 ? 1 : 0), level });
  }

  return { total: { lastYear: total }, contributions };
}

/** Fetches and parses the public contributions page (public activity only, no token needed). */
export async function fetchPublicContributions(username = GITHUB_USERNAME) {
  const res = await fetch(`https://github.com/users/${username}/contributions`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
  });
  if (!res.ok) {
    throw new Error(`GitHub responded with HTTP ${res.status}`);
  }
  return parseContributionsHtml(await res.text());
}
