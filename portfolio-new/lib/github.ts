import { PinnedRepo, ContributionWeek } from './types';

const GITHUB_USERNAME = 'Princess0407';
const GITHUB_API = 'https://api.github.com/graphql';

function decodeHtml(html: string): string {
  return html
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'");
}

async function scrapePinnedRepos(): Promise<PinnedRepo[]> {
  try {
    const res = await fetch(`https://github.com/${GITHUB_USERNAME}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];

    const html = await res.text();
    const repos: PinnedRepo[] = [];
    const blocks = html.split('pinned-item-list-item');

    for (let i = 1; i < blocks.length; i++) {
      const block = blocks[i];

      const nameMatch = block.match(/<span class="repo"[^>]*>([^<]+)<\/span>/);
      if (!nameMatch) continue;
      const name = nameMatch[1].trim();

      const urlMatch = block.match(/href="(\/[^"]+)"/);
      const url = urlMatch ? 'https://github.com' + urlMatch[1] : '';

      const descMatch = block.match(/<p class="pinned-item-desc[^>]*>([\s\S]*?)<\/p>/);
      const description = descMatch ? decodeHtml(descMatch[1].trim().replace(/\s+/g, ' ')) : '';

      const langMatch = block.match(/itemprop="programmingLanguage">([^<]+)<\/span>/);
      const langColorMatch = block.match(/class="repo-language-color" style="background-color:\s*([^"]+)"/);

      const primaryLanguage = langMatch ? {
        name: langMatch[1].trim(),
        color: langColorMatch ? langColorMatch[1].trim() : '#cccccc'
      } : null;

      const starMatch = block.match(/href="[^"]+\/stargazers"[^>]*>([\s\S]*?)<\/a>/);
      let stargazerCount = 0;
      if (starMatch) {
        const parts = starMatch[1].split('</svg>');
        const text = parts[parts.length - 1] || '';
        stargazerCount = parseInt(text.replace(/[^\d]/g, ''), 10) || 0;
      }

      const forkMatch = block.match(/href="[^"]+\/forks"[^>]*>([\s\S]*?)<\/a>/);
      let forkCount = 0;
      if (forkMatch) {
        const parts = forkMatch[1].split('</svg>');
        const text = parts[parts.length - 1] || '';
        forkCount = parseInt(text.replace(/[^\d]/g, ''), 10) || 0;
      }

      repos.push({
        name,
        description,
        url,
        primaryLanguage,
        stargazerCount,
        forkCount,
        updatedAt: new Date().toISOString(),
      });
    }
    return repos;
  } catch (err) {
    console.error('Error scraping pinned repos:', err);
    return [];
  }
}

async function fetchContributionsFromDeno(): Promise<ContributionWeek[]> {
  try {
    const res = await fetch(`https://github-contributions-api.deno.dev/${GITHUB_USERNAME}.json`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];

    const data = await res.json();
    const denoWeeks = data.contributions;
    if (Array.isArray(denoWeeks)) {
      return denoWeeks.map((days: any[]) => ({
        contributionDays: days.map(d => ({
          date: d.date,
          contributionCount: d.contributionCount,
          contributionLevel: d.contributionLevel === '0' || !d.contributionLevel ? 'NONE' : 
                             d.contributionLevel === '1' ? 'FIRST_QUARTILE' :
                             d.contributionLevel === '2' ? 'SECOND_QUARTILE' :
                             d.contributionLevel === '3' ? 'THIRD_QUARTILE' : 'FOURTH_QUARTILE'
        }))
      }));
    }
    return [];
  } catch (err) {
    console.error('Error fetching contributions from Deno:', err);
    return [];
  }
}

export async function fetchPinnedRepos(): Promise<PinnedRepo[]> {
  const token = process.env.GITHUB_TOKEN;

  if (token) {
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

      if (res.ok) {
        const data = await res.json();
        const nodes = data.data?.user?.pinnedItems?.nodes;
        if (nodes && nodes.length > 0) {
          return nodes;
        }
      }
    } catch (e) {
      console.error('GraphQL fetch pinned repos failed:', e);
    }
  }

  // Fallback to scraping
  const scraped = await scrapePinnedRepos();
  if (scraped && scraped.length > 0) {
    return scraped;
  }

  return getFallbackRepos();
}

export async function fetchContributions(): Promise<ContributionWeek[]> {
  const token = process.env.GITHUB_TOKEN;

  if (token) {
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

      if (res.ok) {
        const data = await res.json();
        const weeks = data.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
        if (weeks && weeks.length > 0) {
          return weeks;
        }
      }
    } catch (e) {
      console.error('GraphQL fetch contributions failed:', e);
    }
  }

  // Fallback to Deno contributions API
  const denoContributions = await fetchContributionsFromDeno();
  if (denoContributions && denoContributions.length > 0) {
    return denoContributions;
  }

  return getFallbackContributions();
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

