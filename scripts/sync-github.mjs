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

export async function fetchAndSync() {
  console.log(`Fetching latest contributions for @${username} directly from GitHub...`);
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
    console.warn(`If your repositories are private, please enable "Private contributions" on your profile:`);
    console.warn(`  1. Visit https://github.com/${username}`);
    console.warn(`  2. Above the contribution calendar, click "Contribution settings ▾"`);
    console.warn(`  3. Check "Private contributions"\n`);
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
