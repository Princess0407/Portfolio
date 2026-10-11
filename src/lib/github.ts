import { documentedProjects } from '../data/profile';

export type Repo = {
  name: string;
  description: string;
  url: string;
  language: string | null;
  color: string | null;
  stars: number | null;
};

export type HeatWeek = {
  days: { date: string; count: number }[];
};

export type Pull = {
  title: string;
  url: string;
  repo: string;
  state: 'merged' | 'open' | 'closed';
  date: string;
};

export class GithubError extends Error {
  status: number;

  constructor(message: string, status = 500) {
    super(message);
    this.status = status;
  }
}

function token(): string | undefined {
  const value = import.meta.env.GITHUB_PAT;
  return value && value.trim() ? value.trim() : undefined;
}

async function graphql<T>(query: string): Promise<T> {
  const pat = token();
  if (!pat) {
    throw new GithubError('GITHUB_PAT is not configured', 500);
  }

  let response: Response;
  try {
    response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${pat}`,
        'User-Agent': 'priyanka-portfolio',
      },
      body: JSON.stringify({ query }),
    });
  } catch {
    throw new GithubError('GitHub request failed', 502);
  }

  if (!response.ok) {
    throw new GithubError(
      response.status === 401 ? 'GitHub rejected GITHUB_PAT' : 'GitHub request failed',
      response.status === 401 ? 401 : 502,
    );
  }

  const payload = (await response.json()) as { data?: T; errors?: { message: string }[] };
  if (payload.errors?.length || !payload.data) {
    throw new GithubError('GitHub request failed', 502);
  }
  return payload.data;
}

export async function loadGithubHome(): Promise<{
  total: number | null;
  weeks: HeatWeek[] | null;
  repos: Repo[];
  warning?: string;
}> {
  try {
    const data = await graphql<{
      user: {
        pinnedItems: {
          nodes: Array<{
            name: string;
            description: string | null;
            url: string;
            stargazerCount: number;
            primaryLanguage: { name: string; color: string } | null;
          } | null>;
        };
        contributionsCollection: {
          contributionCalendar: {
            totalContributions: number;
            weeks: { contributionDays: { contributionCount: number; date: string }[] }[];
          };
        };
      } | null;
    }>(`query {
      user(login: "Princess0407") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              stargazerCount
              primaryLanguage { name color }
            }
          }
        }
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays { contributionCount date }
            }
          }
        }
      }
    }`);

    if (!data.user) {
      throw new GithubError('GitHub user Princess0407 was not found', 502);
    }

    const calendar = data.user.contributionsCollection.contributionCalendar;
    const repos = data.user.pinnedItems.nodes.filter((node): node is NonNullable<typeof node> => Boolean(node)).map((node) => ({
      name: node.name,
      description: node.description ?? '',
      url: node.url,
      language: node.primaryLanguage?.name ?? null,
      color: node.primaryLanguage?.color ?? null,
      stars: node.stargazerCount,
    }));

    return {
      total: calendar.totalContributions,
      weeks: calendar.weeks.map((week) => ({
        days: week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
        })),
      })),
      repos,
    };
  } catch (error) {
    const warning = error instanceof GithubError ? error.message : 'GitHub request failed';
    return {
      total: null,
      weeks: null,
      repos: documentedProjects,
      warning: `${warning}. Showing work documented on this site.`,
    };
  }
}

function mapState(state: string, mergedAt: string | null): Pull['state'] {
  if (mergedAt || state === 'MERGED') return 'merged';
  if (state === 'OPEN' || state === 'open') return 'open';
  return 'closed';
}

async function pullsFromGraphql(): Promise<Pull[]> {
  const data = await graphql<{
    search: {
      nodes: Array<{
        title: string;
        url: string;
        state: string;
        createdAt: string;
        mergedAt: string | null;
        repository: { nameWithOwner: string };
      } | null>;
    };
  }>(`query {
    search(query: "author:Princess0407 is:pr", type: ISSUE, first: 50) {
      nodes {
        ... on PullRequest {
          title
          url
          state
          createdAt
          mergedAt
          repository { nameWithOwner }
        }
      }
    }
  }`);

  return data.search.nodes
    .filter((node): node is NonNullable<typeof node> => Boolean(node?.title && node.url))
    .map((node) => ({
      title: node.title,
      url: node.url,
      repo: node.repository.nameWithOwner,
      state: mapState(node.state, node.mergedAt),
      date: node.createdAt,
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

async function pullsFromRest(): Promise<Pull[]> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'priyanka-portfolio',
  };
  const pat = token();
  if (pat) headers.Authorization = `Bearer ${pat}`;

  let response: Response;
  try {
    response = await fetch(
      'https://api.github.com/search/issues?q=' +
        encodeURIComponent('author:Princess0407 type:pr') +
        '&sort=created&order=desc&per_page=100',
      { headers },
    );
  } catch {
    throw new GithubError('GitHub request failed', 502);
  }

  if (!response.ok) {
    throw new GithubError('GitHub request failed', 502);
  }

  const payload = (await response.json()) as {
    items?: Array<{
      title: string;
      html_url: string;
      state: string;
      created_at: string;
      pull_request?: { merged_at?: string | null };
    }>;
  };

  return (payload.items ?? [])
    .filter((item) => item.pull_request && item.html_url.includes('/pull/'))
    .map((item) => {
      const parts = item.html_url.split('/');
      const repo = `${parts[3]}/${parts[4]}`;
      return {
        title: item.title,
        url: item.html_url,
        repo,
        state: mapState(item.state, item.pull_request?.merged_at ?? null),
        date: item.created_at,
      };
    });
}

export async function loadPulls(): Promise<Pull[]> {
  if (token()) {
    try {
      return await pullsFromGraphql();
    } catch {
      return pullsFromRest();
    }
  }
  return pullsFromRest();
}

export function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=300',
    },
  });
}

export function jsonError(error: unknown): Response {
  const message = error instanceof GithubError ? error.message : 'GitHub request failed';
  const status = error instanceof GithubError ? error.status : 502;
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}
