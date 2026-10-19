import { cleanToken, fetchContributions } from '../lib/github-contributions.mjs';

const SNAPSHOT_URL =
  'https://raw.githubusercontent.com/robertterquin/personal-portfolio/main/src/data/githubContributions.json';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  const token = cleanToken(process.env.GITHUB_TOKEN);

  if (token) {
    try {
      const data = await fetchContributions(token, { userAgent: 'Portfolio-Vercel-Serverless' });
      return res.status(200).json(data);
    } catch (err) {
      console.warn('GitHub GraphQL fetch failed, falling back to repository snapshot:', err.message);
    }
  }

  try {
    const rawRes = await fetch(SNAPSHOT_URL, { headers: { 'Cache-Control': 'no-cache' } });
    if (rawRes.ok) {
      const data = await rawRes.json();
      if (data?.contributions?.length > 0) {
        return res.status(200).json(data);
      }
    }
    throw new Error(`Fallback fetch responded with HTTP ${rawRes.status}`);
  } catch (err) {
    console.error('GitHub contributions fetch failed:', err.message);
    return res.status(500).json({ error: 'Failed to fetch contributions' });
  }
}
