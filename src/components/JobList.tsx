import { motion } from 'framer-motion';
import { Cat, RefreshCw, AlertCircle, SearchX } from 'lucide-react';
import { useJobs } from '../hooks/useJobs';
import { JobCard } from './JobCard';

// Skeleton loader for job cards
function JobCardSkeleton({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      className="bg-warm-white rounded-2xl p-5 shadow-soft"
    >
      <div className="flex gap-4 mb-4">
        <div className="w-14 h-14 rounded-xl bg-lavender-light/30 animate-pulse" />
        <div className="flex-1">
          <div className="h-6 bg-lavender-light/30 rounded-lg w-3/4 mb-2 animate-pulse" />
          <div className="h-4 bg-lavender-light/20 rounded-lg w-1/2 animate-pulse" />
        </div>
      </div>
      <div className="flex gap-3 mb-4">
        <div className="h-4 bg-lavender-light/20 rounded-lg w-24 animate-pulse" />
        <div className="h-4 bg-lavender-light/20 rounded-lg w-20 animate-pulse" />
        <div className="h-4 bg-lavender-light/20 rounded-lg w-16 animate-pulse" />
      </div>
      <div className="flex gap-2">
        <div className="h-6 bg-dusty-pink-light/30 rounded-full w-20 animate-pulse" />
        <div className="h-6 bg-dusty-blue-light/30 rounded-full w-16 animate-pulse" />
      </div>
    </motion.div>
  );
}

// Empty state with cute cat
function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16 px-4"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="inline-block mb-6"
      >
        <div className="bg-lavender-light/30 p-6 rounded-full">
          <SearchX className="w-12 h-12 text-lavender" />
        </div>
      </motion.div>

      <h3 className="text-xl font-semibold text-text-primary mb-2">
        No jobs found... yet!
      </h3>
      <p className="text-text-secondary max-w-md mx-auto">
        Try adjusting your filters or search terms. New opportunities pop up all the time!
      </p>

      <div className="mt-6 text-lavender-light text-2xl">
        =^..^=
      </div>
    </motion.div>
  );
}

// Error state
function ErrorState({ error, onRetry }: { error: Error | null; onRetry: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16 px-4"
    >
      <div className="inline-block mb-6">
        <div className="bg-dusty-pink-light/30 p-6 rounded-full">
          <AlertCircle className="w-12 h-12 text-dusty-pink-dark" />
        </div>
      </div>

      <h3 className="text-xl font-semibold text-text-primary mb-2">
        Oops! Something went wrong
      </h3>
      <p className="text-text-secondary max-w-md mx-auto mb-6">
        {error?.message || 'We had trouble fetching jobs. Please try again.'}
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRetry}
        className="px-6 py-3 bg-lavender text-cream rounded-xl font-medium
                   hover:bg-lavender-dark transition-colors duration-200
                   flex items-center gap-2 mx-auto shadow-soft"
      >
        <RefreshCw className="w-4 h-4" />
        Try Again
      </motion.button>
    </motion.div>
  );
}

export function JobList() {
  const { jobs, isLoading, isError, error, refetch } = useJobs();

  // Loading state
  if (isLoading) {
    return (
    <div>

        <div className="flex items-center justify-center gap-3 mb-6 text-text-secondary">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <Cat className="w-5 h-5 text-lavender" />
          </motion.div>
          <span>Finding jobs...</span>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <JobCardSkeleton key={i} index={i} />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return <ErrorState error={error} onRetry={() => refetch()} />;
  }

  // Empty state
  if (jobs.length === 0) {
    return <EmptyState />;
  }

  // Job list
  return (
      <div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-text-secondary text-sm mb-4 flex items-center gap-2"
      >
        <Cat className="w-4 h-4 text-lavender" />
        Found {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'}
      </motion.p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job, index) => (
          <JobCard key={job.id} job={job} index={index} />
        ))}
      </div>
    </div>
  );
}
