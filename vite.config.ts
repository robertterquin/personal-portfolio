import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

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

function getLocalGitContributions() {
  const baseFilePath = path.resolve(process.cwd(), 'src/data/githubContributions.json');
  let base: { total: { lastYear: number }; contributions: Array<{ date: string; count: number; level: number }> } = {
    total: { lastYear: 0 },
    contributions: [],
  };
  try {
    base = JSON.parse(fs.readFileSync(baseFilePath, 'utf-8'));
  } catch {
    return base;
  }

  const gitCounts = new Map<string, number>();
  try {
    const stdout = execSync('git log --date=short --pretty=format:"%ad"', { encoding: 'utf-8' });
    for (const line of stdout.split('\n')) {
      const d = line.trim();
      if (/^\d{4}-\d{2}-\d{2}$/.test(d)) {
        gitCounts.set(d, (gitCounts.get(d) || 0) + 1);
      }
    }
  } catch {
    return base;
  }

  const days = [...base.contributions];
  const dayIndexMap = new Map<string, number>();
  days.forEach((d, idx) => dayIndexMap.set(d.date, idx));

  for (const [date, gitCount] of gitCounts.entries()) {
    if (dayIndexMap.has(date)) {
      const idx = dayIndexMap.get(date)!;
      if (date >= '2026-09-06') {
        days[idx].count = gitCount;
        days[idx].level = gitCount >= 10 ? 4 : gitCount >= 6 ? 3 : gitCount >= 3 ? 2 : 1;
      }
    } else {
      const level = gitCount >= 10 ? 4 : gitCount >= 6 ? 3 : gitCount >= 3 ? 2 : 1;
      days.push({ date, count: gitCount, level });
      dayIndexMap.set(date, days.length - 1);
    }
  }

  days.sort((a, b) => a.date.localeCompare(b.date));
  while (days.length > 371) {
    days.shift();
  }

  const newTotal = days.reduce((sum, d) => sum + d.count, 0);
  const result = {
    total: { lastYear: newTotal },
    contributions: days,
  };

  try {
    fs.writeFileSync(baseFilePath, JSON.stringify(result, null, 2), 'utf-8');
  } catch {}

  return result;
}

function githubContributionsPlugin(): Plugin {
  return {
    name: 'github-contributions-dev-proxy',
    configureServer(server) {
      server.middlewares.use('/api/github-contributions', async (_req, res) => {
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
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
              return;
            }
          }
        } catch {
          // GitHub fetch failed or timed out
        }

        // Live local git log fallback: dynamically counts every local commit
        const localData = getLocalGitContributions();
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(localData));
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), githubContributionsPlugin()],
  server: {
    port: 3000,
  },
})

