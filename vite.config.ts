import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import {
  fetchContributions,
  fetchPublicContributions,
  readGithubToken,
  type ContributionsData,
} from './lib/github-contributions.mjs'

const SNAPSHOT_PATH = path.resolve(process.cwd(), 'src/data/githubContributions.json');

function readSnapshot(): ContributionsData {
  try {
    return JSON.parse(fs.readFileSync(SNAPSHOT_PATH, 'utf-8'));
  } catch {
    return { total: { lastYear: 858 }, contributions: [] };
  }
}

function writeSnapshot(data: ContributionsData) {
  try {
    fs.writeFileSync(SNAPSHOT_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (_err) {
    void _err;
  }
}

// Mirrors the Vercel function in dev: live data when possible, then the snapshot.
async function loadLiveContributions(): Promise<ContributionsData | null> {
  const token = readGithubToken();
  if (token) {
    try {
      const data = await fetchContributions(token, { userAgent: 'Portfolio-Dev-Proxy' });
      if (data.total.lastYear > 0) return data;
    } catch (_err) {
      void _err;
    }
  }

  try {
    const data = await fetchPublicContributions();
    if (data.total.lastYear > 0) return data;
  } catch (_err) {
    void _err;
  }

  return null;
}

function githubContributionsPlugin(): Plugin {
  return {
    name: 'github-contributions-dev-proxy',
    configureServer(server) {
      server.middlewares.use('/api/github-contributions', async (_req, res) => {
        const live = await loadLiveContributions();
        if (live) writeSnapshot(live);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(live ?? readSnapshot()));
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
