import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

function parseGithubHtml(html: string) {
  const totalMatch = html.match(/([0-9,]+)\s+contributions\s+in\s+the\s+last\s+year/i);
  const total = totalMatch ? parseInt(totalMatch[1].replace(/,/g, ''), 10) : 0;

  const tips = new Map<string, number>();
  const tipRegex = /<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]+)<\/tool-tip>/g;
  let tip: RegExpExecArray | null;
  while ((tip = tipRegex.exec(html)) !== null) {
    const id = tip[1];
    const text = tip[2].trim();
    const countMatch = text.match(/([0-9,]+)\s+contribution/i);
    tips.set(id, countMatch ? parseInt(countMatch[1].replace(/,/g, ''), 10) : 0);
  }

  const days: Array<{ date: string; count: number; level: number }> = [];
  const tdRegex = /<td[^>]*class="[^"]*ContributionCalendar-day[^"]*"[^>]*>/g;
  let tdMatch: RegExpExecArray | null;
  while ((tdMatch = tdRegex.exec(html)) !== null) {
    const tdTag = tdMatch[0];
    const dateMatch = tdTag.match(/data-date="([^"]+)"/);
    const levelMatch = tdTag.match(/data-level="([^"]+)"/);
    const idMatch = tdTag.match(/id="([^"]+)"/);
    if (dateMatch && levelMatch) {
      const date = dateMatch[1];
      const level = Math.min(4, Math.max(0, parseInt(levelMatch[1], 10)));
      const id = idMatch ? idMatch[1] : '';
      const count = tips.get(id) ?? (level > 0 ? 1 : 0);
      days.push({ date, count, level });
    }
  }

  return { total: { lastYear: total }, contributions: days };
}

function getGithubToken(): string | null {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
  for (const file of ['.env.local', '.env']) {
    const envPath = path.resolve(process.cwd(), file);
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

async function fetchGraphQLContributions(token: string) {
  const levelMap: Record<string, number> = {
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
      'User-Agent': 'Portfolio-Dev-Proxy',
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

  if (!res.ok) throw new Error(`GraphQL HTTP ${res.status}`);
  const json = (await res.json()) as {
    data?: {
      viewer?: {
        contributionsCollection?: {
          contributionCalendar?: {
            totalContributions: number;
            weeks: Array<{
              contributionDays: Array<{
                date: string;
                contributionCount: number;
                contributionLevel: string;
              }>;
            }>;
          };
        };
      };
    };
  };
  const calendar = json.data?.viewer?.contributionsCollection?.contributionCalendar;
  if (!calendar) throw new Error('No calendar in response');

  const days: Array<{ date: string; count: number; level: number }> = [];
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
    total: { lastYear: calendar.totalContributions },
    contributions: days,
  };
}

function getVerifiedContributions() {
  const baseFilePath = path.resolve(process.cwd(), 'src/data/githubContributions.json');
  try {
    return JSON.parse(fs.readFileSync(baseFilePath, 'utf-8'));
  } catch {
    return { total: { lastYear: 858 }, contributions: [] };
  }
}

function githubContributionsPlugin(): Plugin {
  return {
    name: 'github-contributions-dev-proxy',
    configureServer(server) {
      server.middlewares.use('/api/github-contributions', async (_req, res) => {
        const token = getGithubToken();
        if (token) {
          try {
            const data = await fetchGraphQLContributions(token);
            if (data.total.lastYear > 0) {
              const targetPath = path.resolve(process.cwd(), 'src/data/githubContributions.json');
              try {
                fs.writeFileSync(targetPath, JSON.stringify(data, null, 2), 'utf-8');
              } catch (_err) {
                void _err;
              }
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
              return;
            }
          } catch (_err) {
            void _err;
          }
        }

        try {
          const ghRes = await fetch('https://github.com/users/robertterquin/contributions', {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            },
          });
          if (ghRes.ok) {
            const html = await ghRes.text();
            const data = parseGithubHtml(html);
            if (data.total.lastYear > 0) {
              const targetPath = path.resolve(process.cwd(), 'src/data/githubContributions.json');
              try {
                fs.writeFileSync(targetPath, JSON.stringify(data, null, 2), 'utf-8');
              } catch (_err) {
                void _err;
              }
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
              return;
            }
          }
        } catch (_err) {
          void _err;
        }

        const cleanData = getVerifiedContributions();
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(cleanData));
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), githubContributionsPlugin()],
  server: {
    port: 3000,
  },
})

