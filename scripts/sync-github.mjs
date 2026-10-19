import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  GITHUB_USERNAME,
  fetchContributions,
  fetchPublicContributions,
  readGithubToken,
} from '../lib/github-contributions.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const SNAPSHOT_PATH = path.resolve(ROOT_DIR, 'src/data/githubContributions.json');

const DRY_RUN = process.argv.includes('--dry-run');

function saveSnapshot(data, source) {
  if (DRY_RUN) {
    console.log(`[dry run] Would update githubContributions.json via ${source}.`);
  } else {
    fs.writeFileSync(SNAPSHOT_PATH, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`✓ Successfully updated githubContributions.json via ${source}!`);
  }
  console.log(`  Total: ${data.total.lastYear} contributions across ${data.contributions.length} days.`);
  return data;
}

export async function fetchAndSync() {
  const token = readGithubToken(ROOT_DIR);

  if (token) {
    console.log(`Fetching latest contributions for @${GITHUB_USERNAME} via GitHub GraphQL API (including private repos)...`);
    try {
      const data = await fetchContributions(token, { userAgent: 'Portfolio-Sync' });
      return saveSnapshot(data, 'GitHub GraphQL');
    } catch (err) {
      console.warn(`GraphQL fetch failed (${err.message}). Falling back to public scraping...`);
    }
  }

  console.log(`Fetching latest contributions for @${GITHUB_USERNAME} directly from GitHub HTML...`);
  const data = await fetchPublicContributions();

  if (data.total.lastYear === 0) {
    console.warn(`\n⚠️  [NOTICE] GitHub returned 0 contributions for @${GITHUB_USERNAME}.`);
    console.warn(`Keeping existing verified githubContributions.json untouched.`);
    return null;
  }

  return saveSnapshot(data, 'public GitHub page');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  fetchAndSync().catch((err) => {
    console.error('Failed to sync contributions:', err);
    process.exit(1);
  });
}
