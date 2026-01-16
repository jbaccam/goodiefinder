import type { VercelRequest, VercelResponse } from '@vercel/node';

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = 'jsearch.p.rapidapi.com';
const BASE_URL = 'https://jsearch.p.rapidapi.com';

function getQueryParam(query: VercelRequest['query'], key: string): string | undefined {
  const value = query[key];
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!RAPIDAPI_KEY) {
    res.status(500).json({ error: 'Missing RAPIDAPI_KEY' });
    return;
  }

  const query = getQueryParam(req.query, 'query') || '';
  const page = getQueryParam(req.query, 'page') || '1';
  const numPages = getQueryParam(req.query, 'num_pages') || '3';
  const datePosted = getQueryParam(req.query, 'date_posted') || 'all';
  const jobRequirements = getQueryParam(req.query, 'job_requirements');

  const searchParams = new URLSearchParams({
    query,
    page,
    num_pages: numPages,
    date_posted: datePosted,
  });

  if (jobRequirements) {
    searchParams.set('job_requirements', jobRequirements);
  }

  try {
    const response = await fetch(`${BASE_URL}/search?${searchParams.toString()}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': RAPIDAPI_HOST,
      },
    });

    const body = await response.text();

    if (!response.ok) {
      res.status(response.status).json({ error: body });
      return;
    }

    res.status(200).send(body);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch RapidAPI' });
  }
}
