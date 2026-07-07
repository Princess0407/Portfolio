import { PinnedRepo, ContributionWeek } from './types';

const GITHUB_USERNAME = 'Princess0407';
const GITHUB_API = 'https://api.github.com/graphql';

export async function fetchPinnedRepos(): Promise<PinnedRepo[]> {
  const token = process.env.GITHUB_TOKEN;
  
  if (!token) {
    return getFallbackRepos();
  }

  try {
    const query = `
      query {
        user(login: "${GITHUB_USERNAME}") {
          pinnedItems(first: 6, types: [REPOSITORY]) {
            nodes {
              ... on Repository {
                name
                description
                url
                primaryLanguage {
                  name
                  color
                }
                stargazerCount
                forkCount
                updatedAt
              }
            }
          }
        }
      }
    `;

    const res = await fetch(GITHUB_API, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 },
    });

    const data = await res.json();
    return data.data?.user?.pinnedItems?.nodes || getFallbackRepos();
  } catch {
    return getFallbackRepos();
  }
}

export async function fetchContributions(): Promise<ContributionWeek[]> {
  const token = process.env.GITHUB_TOKEN;
  
  if (!token) {
    return getFallbackContributions();
  }

  try {
    const query = `
      query {
        user(login: "${GITHUB_USERNAME}") {
          contributionsCollection {
            contributionCalendar {
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
      }
    `;

    const res = await fetch(GITHUB_API, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 },
    });

    const data = await res.json();
    return data.data?.user?.contributionsCollection?.contributionCalendar?.weeks || getFallbackContributions();
  } catch {
    return getFallbackContributions();
  }
}

function getFallbackRepos(): PinnedRepo[] {
  return [
    {
      name: 'The-Intelligent-Engine',
      description: 'Custom silicon to run AI models without cloud dependency. Dedicated neural processing, on-device LLaMA inference, full data sovereignty.',
      url: 'https://github.com/Princess0407/The-Intelligent-Engine',
      primaryLanguage: { name: 'C++', color: '#f34b7d' },
      stargazerCount: 0,
      forkCount: 0,
      updatedAt: '2026-01-15T00:00:00Z',
    },
    {
      name: 'The-Deceivers-Snare',
      description: 'Browser extension that flags malicious GitHub repos before you clone them. Sandboxed execution and counterfeit dependency injection.',
      url: 'https://github.com/Princess0407/The-Deceivers-Snare',
      primaryLanguage: { name: 'TypeScript', color: '#3178c6' },
      stargazerCount: 0,
      forkCount: 0,
      updatedAt: '2025-12-01T00:00:00Z',
    },
  ];
}

function getFallbackContributions(): ContributionWeek[] {
  const weeks: ContributionWeek[] = [];
  const today = new Date();
  
  for (let w = 51; w >= 0; w--) {
    const days = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(today);
      date.setDate(date.getDate() - (w * 7 + (6 - d)));
      const count = Math.floor(Math.random() * 8);
      let level: 'NONE' | 'FIRST_QUARTILE' | 'SECOND_QUARTILE' | 'THIRD_QUARTILE' | 'FOURTH_QUARTILE' = 'NONE';
      if (count > 0) level = 'FIRST_QUARTILE';
      if (count > 2) level = 'SECOND_QUARTILE';
      if (count > 4) level = 'THIRD_QUARTILE';
      if (count > 6) level = 'FOURTH_QUARTILE';
      
      days.push({
        date: date.toISOString().split('T')[0],
        contributionCount: count,
        contributionLevel: level,
      });
    }
    weeks.push({ contributionDays: days });
  }
  
  return weeks;
}
