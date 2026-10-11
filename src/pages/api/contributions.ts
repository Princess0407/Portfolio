import type { APIRoute } from 'astro';
import { json, jsonError, loadPulls } from '../../lib/github';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const pulls = await loadPulls();
    return json({ pulls, count: pulls.length });
  } catch (error) {
    return jsonError(error);
  }
};
