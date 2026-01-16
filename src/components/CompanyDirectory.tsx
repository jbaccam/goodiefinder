import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronUp, Building2, Cat } from 'lucide-react';
import { IOWA_COMPANIES_WITH_LINKS, getCompaniesByCategory } from '../utils/companyData';

const categoryColors: Record<string, string> = {
  Software: 'bg-lavender-light/50 text-lavender-dark',
  Aerospace: 'bg-dusty-blue-light/50 text-dusty-blue-dark',
  Agriculture: 'bg-soft-mint-light/50 text-soft-mint-dark',
  Financial: 'bg-peach-light/50 text-peach-dark',
  Retail: 'bg-dusty-pink-light/50 text-dusty-pink-dark',
  Healthcare: 'bg-dusty-blue-light/50 text-dusty-blue-dark',
  Energy: 'bg-peach-light/50 text-peach-dark',
  Consulting: 'bg-lavender-light/50 text-lavender-dark',
};

export function CompanyDirectory() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const companiesByCategory = getCompaniesByCategory();
  const categories = Object.keys(companiesByCategory);

  const displayedCompanies = selectedCategory
    ? companiesByCategory[selectedCategory]
    : IOWA_COMPANIES_WITH_LINKS;

  return (
    <div className="mb-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-warm-white rounded-2xl p-4 shadow-soft"
      >
        <div className="flex flex-col sm:flex-row items-start gap-4">
          {/* Cat Icon */}
          <motion.div
            animate={{ rotate: isOpen ? [0, -10, 10, -10, 0] : 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0 bg-lavender p-3 rounded-2xl shadow-soft self-center sm:self-start"
          >
            <Cat className="w-8 h-8 text-cream" />
          </motion.div>

          {/* Speech Bubble */}
          <div className="flex-1">
            <div className="relative bg-cream rounded-2xl p-4 shadow-sm">
              <div className="absolute left-[-8px] top-4 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-cream hidden sm:block" />

              <p className="text-text-primary mb-3">
                Sometimes hunting for jobs is hard! Check out the list of{' '}
                <span className="font-semibold text-lavender">{IOWA_COMPANIES_WITH_LINKS.length}+ top tech companies</span>{' '}
                in Iowa and see if we missed any!
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-lavender text-cream rounded-xl font-medium text-sm hover:bg-lavender-dark transition-colors"
              >
                {isOpen ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    Hide Companies
                  </>
                ) : (
                  <>
                    <Building2 className="w-4 h-4" />
                    View Company Directory
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Expandable Company List */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-cream-dark">
                {/* Category Filter Pills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === null
                        ? 'bg-lavender text-cream'
                        : 'bg-cream-dark text-text-secondary hover:bg-lavender-light/30'
                    }`}
                  >
                    All ({IOWA_COMPANIES_WITH_LINKS.length})
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        selectedCategory === category
                          ? 'bg-lavender text-cream'
                          : 'bg-cream-dark text-text-secondary hover:bg-lavender-light/30'
                      }`}
                    >
                      {category} ({companiesByCategory[category].length})
                    </button>
                  ))}
                </div>

                {/* Company Grid */}
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 max-h-[400px] overflow-y-auto pr-2">
                  {displayedCompanies.map((company, index) => (
                    <motion.a
                      key={company.name}
                      href={company.careerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="flex items-center justify-between gap-2 p-3 bg-cream rounded-xl hover:shadow-soft transition-all group"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[company.category] || 'bg-lavender-light/50 text-lavender-dark'}`}>
                          {company.category}
                        </span>
                        <span className="text-text-primary text-sm truncate font-medium">
                          {company.name}
                        </span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-lavender flex-shrink-0 transition-colors" />
                    </motion.a>
                  ))}
                </div>

                {/* Footer note */}
                <p className="text-text-muted text-xs mt-4 text-center">
                  Know a company we missed? Let us know! =^..^=
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
