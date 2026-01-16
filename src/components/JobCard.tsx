import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  MapPin,
  Clock,
  DollarSign,
  ExternalLink,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Wifi,
} from 'lucide-react';
import type { Job } from '../types';
import { CategoryBadge } from './CategoryBadge';

interface JobCardProps {
  job: Job;
  index: number;
}

function formatSalary(min: number | null, max: number | null, _currency: string | null, period: string | null): string {
  if (!min && !max) return '';

  const per = period?.toLowerCase() || 'year';

  const formatNum = (n: number) => {
    if (n >= 1000) return `${(n / 1000).toFixed(0)}k`;
    return n.toString();
  };

  if (min && max) {
    return `$${formatNum(min)} - $${formatNum(max)}/${per}`;
  }
  if (min) return `$${formatNum(min)}+/${per}`;
  if (max) return `Up to $${formatNum(max)}/${per}`;

  return '';
}

function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return `${Math.floor(days / 30)} months ago`;
}

export function JobCard({ job, index }: JobCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const salary = formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency, job.salaryPeriod);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="bg-warm-white rounded-2xl p-5 shadow-soft hover:shadow-hover transition-shadow duration-300"
    >
      {/* Header */}
      <div className="flex gap-4 mb-4">
        {/* Company Logo */}
        <div className="flex-shrink-0">
          {job.companyLogo ? (
            <img
              src={job.companyLogo}
              alt={`${job.company} logo`}
              className="w-14 h-14 rounded-xl object-contain bg-cream p-1"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className={`w-14 h-14 rounded-xl bg-lavender-light/30 flex items-center justify-center ${job.companyLogo ? 'hidden' : ''}`}>
            <Building2 className="w-6 h-6 text-lavender" />
          </div>
        </div>

        {/* Job Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-text-primary text-lg truncate mb-1">
            {job.title}
          </h3>
          <p className="text-text-secondary flex items-center gap-1 truncate">
            <Building2 className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{job.company}</span>
          </p>
        </div>
      </div>

      {/* Meta Info */}
      <div className="flex flex-wrap gap-3 mb-4 text-xs sm:text-sm text-text-secondary">
        <span className="flex items-center gap-1">
          <MapPin className="w-4 h-4 text-dusty-pink" />
          {job.location}
        </span>

        {job.isRemote && (
          <span className="flex items-center gap-1 text-soft-mint-dark">
            <Wifi className="w-4 h-4" />
            Remote
          </span>
        )}

        <span className="flex items-center gap-1">
          <Briefcase className="w-4 h-4 text-dusty-blue" />
          {job.employmentType}
        </span>

        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4 text-peach" />
          {formatDate(job.postedAt)}
        </span>

        {salary && (
          <span className="flex items-center gap-1 text-soft-mint-dark font-medium">
            <DollarSign className="w-4 h-4" />
            {salary}
          </span>
        )}
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-4">
        {job.categories.map((cat) => (
          <CategoryBadge key={cat} category={cat} />
        ))}
      </div>

      {/* Expandable Description */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-cream-dark pt-4 mb-4">
              <p className="text-text-secondary text-sm leading-relaxed line-clamp-6">
                {job.description}
              </p>

              {job.highlights && (
                <div className="mt-4 space-y-3">
                  {job.highlights.benefits && job.highlights.benefits.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-soft-mint-dark mb-1">Benefits</h4>
                      <ul className="text-sm text-text-secondary list-disc list-inside">
                        {job.highlights.benefits.slice(0, 3).map((b, i) => (
                          <li key={i} className="truncate">{b}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 border-t border-cream-dark">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-lavender hover:text-lavender-dark flex items-center gap-1 transition-colors"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Show more
            </>
          )}
        </button>

        <motion.a
          href={job.applyLink}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-lavender text-cream rounded-xl font-medium text-sm
                     hover:bg-lavender-dark transition-colors duration-200
                     flex items-center justify-center gap-2 shadow-soft w-full sm:w-auto"
        >
          Apply
          <ExternalLink className="w-4 h-4" />
        </motion.a>
      </div>
    </motion.article>
  );
}
