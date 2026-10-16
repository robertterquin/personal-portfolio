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
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');

  const rawToken = process.env.GITHUB_TOKEN;

  if (!rawToken) {
    return res.status(500).json({ error: 'GITHUB_TOKEN not configured' });
  }

  // Sanitize token: remove whitespace, wrapping quotes, and accidental "GITHUB_TOKEN=" prefix
  let token = rawToken.trim().replace(/^["']|["']$/g, '');
  if (token.startsWith('GITHUB_TOKEN=')) {
    token = token.replace(/^GITHUB_TOKEN=/, '').trim().replace(/^["']|["']$/g, '');
  }

  if (!token) {
    return res.status(500).json({ error: 'GITHUB_TOKEN is empty after sanitization' });
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

    const result = {
      total: { lastYear: calendar.totalContributions },
      contributions: days,
    };

    return res.status(200).json(result);
  } catch (err) {
    console.error('GitHub contributions fetch failed:', err.message);
    const safeError = err.message ? err.message.replace(token, '[REDACTED]') : 'Unknown error';
    return res.status(500).json({
      error: 'Failed to fetch contributions',
      detail: safeError,
    });
  }
}
