const LEVEL_MAP = {
  'NONE': 0,
  'FIRST_QUARTILE': 1,
  'SECOND_QUARTILE': 2,
  'THIRD_QUARTILE': 3,
  'FOURTH_QUARTILE': 4,
};

export default async function handler(req, res) {
  // CORS headers for production
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');

  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return res.status(500).json({ error: 'GITHUB_TOKEN not configured' });
  }

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
      throw new Error(`GitHub GraphQL responded with HTTP ${response.status}`);
    }

    const json = await response.json();
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

    const result = {
      total: { lastYear: calendar.totalContributions },
      contributions: days,
    };

    return res.status(200).json(result);
  } catch (err) {
    console.error('GitHub contributions fetch failed:', err.message);
    return res.status(500).json({ error: 'Failed to fetch contributions' });
  }
}
