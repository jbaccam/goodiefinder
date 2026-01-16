import { useQuery } from '@tanstack/react-query';
import { fetchJobs, getCachedJobs, cacheJobs } from '../services/jobApi';
import { useFilterStore } from '../stores/filterStore';
import { API_CONFIG } from '../utils/constants';
import type { Job } from '../types';

export function useJobs() {
  const { city, category, dateRange, experienceLevel, searchQuery } = useFilterStore();

  const query = useQuery({
    queryKey: ['jobs', city, dateRange, experienceLevel, searchQuery],
    queryFn: async () => {
      // Try to get cached jobs first (only if no filters applied)
      const cached = getCachedJobs();
      if (cached && !searchQuery && !experienceLevel) {
        return cached;
      }

      const jobs = await fetchJobs({
        city,
        dateRange,
        experienceLevel,
        searchQuery,
      });

      // Cache the results (only base results without filters)
      if (!searchQuery && !experienceLevel) {
        cacheJobs(jobs);
      }

      return jobs;
    },
    staleTime: API_CONFIG.STALE_TIME,
    placeholderData: getCachedJobs() || undefined,
  });

  // Filter jobs by category on the client side
  const filteredJobs: Job[] = query.data
    ? category
      ? query.data.filter(job => job.categories.includes(category))
      : query.data
    : [];

  return {
    jobs: filteredJobs,
    allJobs: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
