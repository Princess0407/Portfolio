import type { APIRoute } from 'astro';
import { json, loadGithubHome } from '../../lib/github';

export const prerender = false;

export const GET: APIRoute = async () => json(await loadGithubHome());
