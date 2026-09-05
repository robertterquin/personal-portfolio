import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

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
          if (!ghRes.ok) {
            res.statusCode = ghRes.status;
            res.end(JSON.stringify({ error: 'GitHub fetch failed' }));
            return;
          }
          const html = await ghRes.text();
          const data = parseGithubHtml(html);
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
        } catch (err: unknown) {
          res.statusCode = 500;
          const msg = err instanceof Error ? err.message : 'Unknown error';
          res.end(JSON.stringify({ error: msg }));
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), githubContributionsPlugin()],
})

