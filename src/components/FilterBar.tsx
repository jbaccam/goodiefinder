import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, X, RotateCcw, Briefcase } from 'lucide-react';
import { useFilterStore } from '../stores/filterStore';
import { IOWA_CITIES, JOB_CATEGORIES, DATE_FILTERS, EXPERIENCE_LEVELS } from '../utils/constants';
import { CategoryBadge } from './CategoryBadge';

export function FilterBar() {
  const {
    city,
    category,
    dateRange,
    experienceLevel,
    searchQuery,
    setCity,
    setCategory,
    setDateRange,
    setExperienceLevel,
    setSearchQuery,
    resetFilters,
  } = useFilterStore();

  const [localSearch, setLocalSearch] = useState(searchQuery);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(localSearch);
    }, 500);
    return () => clearTimeout(timer);
  }, [localSearch, setSearchQuery]);

  const hasFilters = city || category || dateRange || experienceLevel || searchQuery;

  return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-warm-white rounded-2xl p-4 md:p-6 shadow-soft mb-6"
      >

      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
        <input
          type="text"
          placeholder="Search jobs... (e.g., React, Python, DevOps)"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="w-full pl-12 pr-10 py-2.5 sm:py-3 bg-cream rounded-xl border-2 border-transparent
                     focus:border-lavender-light focus:outline-none
                     text-text-primary placeholder:text-text-muted text-sm sm:text-base
                     transition-colors duration-200"
        />
        {localSearch && (
          <button
            onClick={() => setLocalSearch('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mb-4">
        {/* City Filter */}
        <div className="relative flex-1 min-w-0 sm:min-w-[180px]">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dusty-pink" />
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-cream rounded-xl border-2 border-transparent
                       focus:border-dusty-pink-light focus:outline-none
                       text-text-primary appearance-none cursor-pointer
                       transition-colors duration-200"
          >
            {IOWA_CITIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Date Filter */}
        <div className="relative flex-1 min-w-0 sm:min-w-[140px]">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dusty-blue" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-cream rounded-xl border-2 border-transparent
                       focus:border-dusty-blue-light focus:outline-none
                       text-text-primary appearance-none cursor-pointer
                       transition-colors duration-200"
          >
            {DATE_FILTERS.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Experience Level Filter */}
        <div className="relative flex-1 min-w-0 sm:min-w-[160px]">
          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-soft-mint" />
          <select
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value as typeof experienceLevel)}
            className="w-full pl-10 pr-4 py-2.5 bg-cream rounded-xl border-2 border-transparent
                       focus:border-soft-mint-light focus:outline-none
                       text-text-primary appearance-none cursor-pointer
                       transition-colors duration-200"
          >
            {EXPERIENCE_LEVELS.map((exp) => (
              <option key={exp.value} value={exp.value}>
                {exp.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Reset Button */}
        {hasFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetFilters}
            className="px-4 py-2.5 bg-lavender-light/30 text-lavender-dark rounded-xl
                       hover:bg-lavender-light/50 transition-colors duration-200
                       flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </motion.button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {JOB_CATEGORIES.map((cat) => (
          <motion.button
            key={cat.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCategory(cat.value)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200
              ${category === cat.value
                ? 'bg-lavender text-cream shadow-soft'
                : 'bg-cream-dark text-text-secondary hover:bg-lavender-light/30'
              }`}
          >
            {cat.value ? (
              <CategoryBadge category={cat.value} />
            ) : (
              <span>All</span>
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
