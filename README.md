# robertterquin.com

Personal portfolio of **Robert Terquin Laqui**, a software engineer focused on cross-platform mobile and web systems.

**Live:** [robertterquin.com](https://robertterquin.com)

## Stack

- React 19 + TypeScript, built with Vite
- [Motion](https://motion.dev) for animation, [Iconify](https://iconify.design) for icons
- Plain CSS with design tokens and a day/night theme
- Hosted on Vercel, with one serverless function for GitHub data

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:3000`.

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check and build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run the unit tests (Vitest) |
| `npm run sync:github` | Refresh the GitHub contributions snapshot (add `-- --dry-run` to preview without writing) |

## Project structure

```
src/
  components/   One component per page section
  data/         portfolioData.ts (all site content) and the contributions snapshot
  hooks/        Theme and Manila clock hooks
  styles/       One stylesheet per section, plus tokens.css and print.css
  utils/        Small pure helpers (e.g. heatmap month labels)
lib/            Shared GitHub contributions logic (dev server, sync script, API)
api/            Vercel function serving live GitHub contributions
scripts/        Contributions sync script
public/         Images, resume, 404 page, sitemap
```

To update the site's content (projects, stack, certifications, timeline), edit `src/data/portfolioData.ts`.

## GitHub contributions

The heatmap shows the last year of GitHub activity, including private repositories.

1. A snapshot is bundled in `src/data/githubContributions.json`, so the heatmap renders immediately.
2. On load, the page fetches fresh data from `/api/github-contributions`, which queries the GitHub GraphQL API.
3. A GitHub Action (`.github/workflows/sync-contributions.yml`) refreshes the snapshot every 15 minutes and commits it to `main`.

Live data needs a `GITHUB_TOKEN` (a GitHub personal access token):

- **Locally:** add `GITHUB_TOKEN=...` to `.env.local`
- **Vercel:** set it as an environment variable
- **GitHub Action:** add it as the `GH_PAT` repository secret

Without a token, the sync script falls back to the public contributions page (public activity only), and the API serves the committed snapshot.
