const LEVEL_MAP = {
  'NONE': 0,
  'FIRST_QUARTILE': 1,
  'SECOND_QUARTILE': 2,
  'THIRD_QUARTILE': 3,
  'FOURTH_QUARTILE': 4,
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  const rawToken = process.env.GITHUB_TOKEN;
  let token = rawToken ? rawToken.trim().replace(/^["']|["']$/g, '') : '';
  if (token.startsWith('GITHUB_TOKEN=')) {
    token = token.replace(/^GITHUB_TOKEN=/, '').trim().replace(/^["']|["']$/g, '');
  }

  if (token) {
    try {
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Authorization': `bearer ${token}`,
          'User-Agent': 'Portfolio-Vercel-Serverless',
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

      if (!response.ok) {
        const errText = await response.text().catch(() => '');
        throw new Error(`GitHub GraphQL responded with HTTP ${response.status}: ${errText.slice(0, 200)}`);
      }

      const json = await response.json();
      if (json.errors && json.errors.length > 0) {
        throw new Error(`GitHub GraphQL error: ${json.errors.map((e) => e.message).join('; ')}`);
      }

      const calendar = json.data?.viewer?.contributionsCollection?.contributionCalendar;
      if (!calendar) {
        throw new Error('No contributionCalendar in response');
      }

      const days = [];
      for (const week of calendar.weeks) {
        for (const day of week.contributionDays) {
          days.push({
            date: day.date,
            count: day.contributionCount,
            level: LEVEL_MAP[day.contributionLevel] ?? (day.contributionCount > 0 ? 1 : 0),
          });
        }
      }

      return res.status(200).json({
        total: { lastYear: calendar.totalContributions },
        contributions: days,
      });
    } catch (err) {
      console.warn('GitHub GraphQL fetch failed, falling back to repository snapshot:', err.message);
    }
  }

  try {
    const rawRes = await fetch(
      'https://raw.githubusercontent.com/robertterquin/personal-portfolio/main/src/data/githubContributions.json',
      { headers: { 'Cache-Control': 'no-cache' } }
    );
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
