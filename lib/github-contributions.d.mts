export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export interface ContributionsData {
  total: { lastYear: number };
  contributions: ContributionDay[];
}

export const GITHUB_USERNAME: string;

export function cleanToken(raw: string | undefined | null): string;
export function readGithubToken(rootDir?: string): string;
export function mapGraphQLResponse(json: unknown): ContributionsData;
export function fetchContributions(token: string, options?: { userAgent?: string }): Promise<ContributionsData>;
export function parseContributionsHtml(html: string): ContributionsData;
export function fetchPublicContributions(username?: string): Promise<ContributionsData>;
