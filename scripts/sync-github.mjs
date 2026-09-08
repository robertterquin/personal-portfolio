import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const username = 'robertterquin';

export function parseGithubContributions(html) {
  const totalMatch = html.match(/([0-9,]+)\s+contributions\s+in\s+the\s+last\s+year/i);
  const total = totalMatch ? parseInt(totalMatch[1].replace(/,/g, ''), 10) : 0;

  const tips = new Map();
  const tipRegex = /<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]+)<\/tool-tip>/g;
  let tip;
  while ((tip = tipRegex.exec(html)) !== null) {
    const id = tip[1];
    const text = tip[2].trim();
    const countMatch = text.match(/([0-9,]+)\s+contribution/i);
    tips.set(id, countMatch ? parseInt(countMatch[1].replace(/,/g, ''), 10) : 0);
  }

  const days = [];
  const tdRegex = /<td[^>]*class="[^"]*ContributionCalendar-day[^"]*"[^>]*>/g;
  let tdMatch;
  while ((tdMatch = tdRegex.exec(html)) !== null) {
    const tdTag = tdMatch[0];
    const dateMatch = tdTag.match(/data-date="([^"]+)"/);
    const levelMatch = tdTag.match(/data-level="([^"]+)"/);
    const idMatch = tdTag.match(/id="([^"]+)"/);
    if (dateMatch && levelMatch) {
      const date = dateMatch[1];
      const level = parseInt(levelMatch[1], 10);
      const id = idMatch ? idMatch[1] : '';
      const count = tips.get(id) ?? (level > 0 ? 1 : 0);
      days.push({ date, count, level });
    }
  }

  return { total: { lastYear: total }, contributions: days };
}

function getGithubToken() {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
  for (const file of ['.env.local', '.env']) {
    const envPath = path.resolve(__dirname, '..', file);
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf-8');
      const match = content.match(/^GITHUB_TOKEN\s*=\s*(.+)$/m);
      if (match) {
        return match[1].trim().replace(/^["']|["']$/g, '');
      }
    }
  }
  return null;
}

export async function fetchGraphQLContributions(token) {
  const levelMap = {
    'NONE': 0,
    'FIRST_QUARTILE': 1,
    'SECOND_QUARTILE': 2,
    'THIRD_QUARTILE': 3,
    'FOURTH_QUARTILE': 4,
  };

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `bearer ${token}`,
      'User-Agent': 'Portfolio-Sync',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `query {
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
      }`,
    }),
  });

  if (!res.ok) {
    throw new Error(`GitHub GraphQL responded with HTTP ${res.status}`);
  }

  const json = await res.json();
  const calendar = json.data?.viewer?.contributionsCollection?.contributionCalendar;
  if (!calendar) {
    throw new Error('GraphQL response did not include contributionCalendar: ' + JSON.stringify(json.errors || json));
  }

  const days = [];
  for (const week of calendar.weeks) {
    for (const day of week.contributionDays) {
      days.push({
        date: day.date,
        count: day.contributionCount,
        level: levelMap[day.contributionLevel] ?? (day.contributionCount > 0 ? 1 : 0),
      });
    }
  }

  return {
    total: {
      lastYear: calendar.totalContributions,
    },
    contributions: days,
  };
}

export async function fetchAndSync() {
  const token = getGithubToken();

  if (token) {
    console.log(`Fetching latest contributions for @${username} via GitHub GraphQL API (including private repos)...`);
    try {
      const data = await fetchGraphQLContributions(token);
      const targetPath = path.resolve(__dirname, '../src/data/githubContributions.json');
      fs.writeFileSync(targetPath, JSON.stringify(data, null, 2), 'utf-8');
      console.log(`✓ Successfully updated githubContributions.json via GitHub GraphQL!`);
      console.log(`  Total: ${data.total.lastYear} contributions across ${data.contributions.length} days.`);
      return data;
    } catch (err) {
      console.warn(`GraphQL fetch failed (${err.message}). Falling back to public scraping...`);
    }
  }

  console.log(`Fetching latest contributions for @${username} directly from GitHub HTML...`);
  const res = await fetch(`https://github.com/users/${username}/contributions`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
  });

  if (!res.ok) {
    throw new Error(`GitHub responded with HTTP ${res.status}`);
  }

  const html = await res.text();
  const data = parseGithubContributions(html);

  if (data.total.lastYear === 0) {
    console.warn(`\n⚠️  [NOTICE] GitHub returned 0 contributions for @${username}.`);
    console.warn(`Keeping existing verified githubContributions.json untouched.`);
    return null;
  }

  const targetPath = path.resolve(__dirname, '../src/data/githubContributions.json');
  fs.writeFileSync(targetPath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`✓ Successfully updated githubContributions.json from GitHub!`);
  console.log(`  Total: ${data.total.lastYear} contributions across ${data.contributions.length} days.`);
  return data;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  fetchAndSync().catch((err) => {
    console.error('Failed to sync contributions:', err);
    process.exit(1);
  });
}
