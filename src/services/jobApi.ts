import type { JSearchResponse, JSearchJob, Job } from '../types';
import { categorizeJob } from '../utils/categorize';
import { API_CONFIG, TOP_IOWA_TECH_EMPLOYERS } from '../utils/constants';
import type { ExperienceLevel } from '../utils/constants';


/**
 * Transform JSearch API response to our Job type
 */
function transformJob(job: JSearchJob): Job {
  return {
    id: job.job_id,
    title: job.job_title,
    company: job.employer_name,
    companyLogo: job.employer_logo,
    companyWebsite: job.employer_website,
    location: `${job.job_city}, ${job.job_state}`,
    city: job.job_city,
    state: job.job_state,
    isRemote: job.job_is_remote,
    employmentType: job.job_employment_type,
    applyLink: job.job_apply_link,
    postedAt: new Date(job.job_posted_at_datetime_utc),
    description: job.job_description,
    salaryMin: job.job_min_salary,
    salaryMax: job.job_max_salary,
    salaryCurrency: job.job_salary_currency,
    salaryPeriod: job.job_salary_period,
    categories: categorizeJob(job.job_title, job.job_description),
    highlights: job.job_highlights ? {
      qualifications: job.job_highlights.Qualifications,
      responsibilities: job.job_highlights.Responsibilities,
      benefits: job.job_highlights.Benefits,
    } : undefined,
  };
}

/**
 * Convert date filter to date_posted parameter for JSearch
 */
function getDatePostedParam(dateRange: string): string {
  switch (dateRange) {
    case 'today': return 'today';
    case '3days': return '3days';
    case 'week': return 'week';
    case 'month': return 'month';
    default: return 'all';
  }
}

/**
 * Single API request to JSearch
 */
async function searchJobs(params: {
  query: string;
  dateRange?: string;
  experienceLevel?: ExperienceLevel;
  page?: number;
}): Promise<JSearchJob[]> {
  const { query, dateRange, experienceLevel, page = 1 } = params;

  const searchParams = new URLSearchParams({
    query,
    page: page.toString(),
    num_pages: '3', // Fetch 3 pages worth of results
    date_posted: getDatePostedParam(dateRange || ''),
  });

  // Add experience requirements if specified
  if (experienceLevel) {
    searchParams.set('job_requirements', experienceLevel);
  }

  const response = await fetch(`/api/jobs?${searchParams}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  const data: JSearchResponse = await response.json();

  if (data.status !== 'OK') {
    throw new Error('API returned error status');
  }

  return data.data || [];
}

/**
 * Fetch jobs from JSearch API with multiple queries for better coverage
 */
export async function fetchJobs(params: {
  city?: string;
  searchQuery?: string;
  dateRange?: string;
  experienceLevel?: ExperienceLevel;
}): Promise<Job[]> {
  const { city, searchQuery, dateRange, experienceLevel } = params;

  const location = city || 'Iowa';
  const allJobs: JSearchJob[] = [];
  const seenIds = new Set<string>();

  // If user has a specific search query, just use that
  if (searchQuery) {
    const query = `${searchQuery} in ${location}`;
    const jobs = await searchJobs({ query, dateRange, experienceLevel });
    return jobs.map(transformJob);
  }

  // Otherwise, run multiple searches for better coverage
  const searchQueries = [
    // General software searches
    `software engineer in ${location}`,
    `software developer in ${location}`,
    `web developer in ${location}`,
    `full stack developer in ${location}`,
    // Role-specific searches
    `frontend developer in ${location}`,
    `backend developer in ${location}`,
    `devops engineer in ${location}`,
    `data engineer in ${location}`,
    // Top Iowa companies (sample a few to not exhaust API)
    ...TOP_IOWA_TECH_EMPLOYERS.slice(0, 5).map(company => `${company} software Iowa`),
  ];

  // Execute searches (limit to conserve API calls)
  // In production, you might want to rotate these or cache aggressively
  const queriesToRun = searchQueries.slice(0, 3); // Limit to 3 queries per load

  for (const query of queriesToRun) {
    try {
      const jobs = await searchJobs({ query, dateRange, experienceLevel });

      // Deduplicate by job ID
      for (const job of jobs) {
        if (!seenIds.has(job.job_id)) {
          seenIds.add(job.job_id);
          allJobs.push(job);
        }
      }
    } catch (error) {
      console.warn(`Search failed for query: ${query}`, error);
      // Continue with other searches
    }
  }

  // Sort by posted date (newest first)
  allJobs.sort((a, b) =>
    new Date(b.job_posted_at_datetime_utc).getTime() -
    new Date(a.job_posted_at_datetime_utc).getTime()
  );

  return allJobs.map(transformJob);
}

/**
 * Get cached jobs from localStorage
 */
export function getCachedJobs(): Job[] | null {
  try {
    const cached = localStorage.getItem(API_CONFIG.CACHE_KEY);
    if (!cached) return null;

    const { jobs, timestamp } = JSON.parse(cached);
    const now = Date.now();

    // Check if cache is still valid (30 minutes)
    if (now - timestamp > API_CONFIG.STALE_TIME) {
      localStorage.removeItem(API_CONFIG.CACHE_KEY);
      return null;
    }

    // Restore Date objects
    return jobs.map((job: Job) => ({
      ...job,
      postedAt: new Date(job.postedAt),
    }));
  } catch {
    return null;
  }
}

/**
 * Cache jobs to localStorage
 */
export function cacheJobs(jobs: Job[]): void {
  try {
    localStorage.setItem(API_CONFIG.CACHE_KEY, JSON.stringify({
      jobs,
      timestamp: Date.now(),
    }));
  } catch {
    // localStorage might be full, ignore
  }
}
