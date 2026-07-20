import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () => {
  const token = import.meta.env.GITHUB_PAT;

  if (!token) {
    return new Response(JSON.stringify({ error: 'GITHUB_PAT not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const query = `{
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
    }
  }`;

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    });

    const json = await res.json();
    return new Response(JSON.stringify(json), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'GitHub API request failed' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
