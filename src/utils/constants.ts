// Iowa cities for filtering
export const IOWA_CITIES = [
  { value: '', label: 'All Iowa' },
  { value: 'Des Moines, IA', label: 'Des Moines' },
  { value: 'Cedar Rapids, IA', label: 'Cedar Rapids' },
  { value: 'Iowa City, IA', label: 'Iowa City' },
  { value: 'Ames, IA', label: 'Ames' },
  { value: 'Davenport, IA', label: 'Davenport' },
  { value: 'Sioux City, IA', label: 'Sioux City' },
  { value: 'Waterloo, IA', label: 'Waterloo' },
  { value: 'Cedar Falls, IA', label: 'Cedar Falls' },
  { value: 'Council Bluffs, IA', label: 'Council Bluffs' },
  { value: 'Dubuque, IA', label: 'Dubuque' },
  { value: 'West Des Moines, IA', label: 'West Des Moines' },
  { value: 'Ankeny, IA', label: 'Ankeny' },
  { value: 'Urbandale, IA', label: 'Urbandale' },
] as const;

// Job categories for filtering
export const JOB_CATEGORIES = [
  { value: '', label: 'All Categories', icon: 'Sparkles', color: 'lavender' },
  { value: 'frontend', label: 'Frontend', icon: 'Monitor', color: 'dusty-pink' },
  { value: 'backend', label: 'Backend', icon: 'Server', color: 'dusty-blue' },
  { value: 'fullstack', label: 'Fullstack', icon: 'Layers', color: 'soft-mint' },
  { value: 'devops', label: 'DevOps', icon: 'Cloud', color: 'peach' },
  { value: 'mobile', label: 'Mobile', icon: 'Smartphone', color: 'dusty-pink' },
  { value: 'data', label: 'Data', icon: 'Database', color: 'dusty-blue' },
  { value: 'security', label: 'Security', icon: 'Shield', color: 'soft-mint' },
  { value: 'cloud', label: 'Cloud', icon: 'CloudCog', color: 'lavender' },
] as const;

// Date filter options
export const DATE_FILTERS = [
  { value: '', label: 'Any time' },
  { value: 'today', label: 'Today' },
  { value: '3days', label: 'Last 3 days' },
  { value: 'week', label: 'This week' },
  { value: 'month', label: 'This month' },
] as const;

// Experience level filter options
export const EXPERIENCE_LEVELS = [
  { value: '', label: 'All Levels' },
  { value: 'under_3_years_experience', label: 'Entry Level (0-3 yrs)' },
  { value: 'more_than_3_years_experience', label: 'Mid Level (3+ yrs)' },
  { value: 'no_experience', label: 'No Experience Required' },
  { value: 'no_degree', label: 'No Degree Required' },
] as const;

export type ExperienceLevel = typeof EXPERIENCE_LEVELS[number]['value'];

// Category type
export type JobCategory = typeof JOB_CATEGORIES[number]['value'];

// API configuration
export const API_CONFIG = {
  BASE_URL: 'https://jsearch.p.rapidapi.com',
  STALE_TIME: 30 * 60 * 1000, // 30 minutes
  CACHE_KEY: 'iowa-dev-jobs-cache',
} as const;

// Iowa Tech Companies - organized by category
export const IOWA_TECH_COMPANIES = {
  // Software & Tech Companies
  software: [
    'Workiva',
    'National Information Solutions Cooperative (NISC)',
    'Source Allies',
    'P3 Uplift',
    'Lean Techniques',
    'Dwolla',
    'Roboflow',
    'LaunchIT',
    'Comnent',
    'Net-Integrated Consulting',
    'Ventech Solutions',
    'PowerGate Software',
    'Believe Software',
    'IntelliChoice',
    'Perficient',
    'Hy-Vee (Tech Division)',
    'Buildertrend',
    'Clickstop',
    'NewBoCo',
    'Pillar Technology',
    'Software Integrators',
    'Zirous',
    'Business Interlinks',
    'ProCircular',
    'Pratum',
    'ImOn Communications',
    'Mediacom',
    'Aureon',
  ],

  // Aerospace & Defense
  aerospace: [
    'Collins Aerospace',
    'RTX',
    'BAE Systems',
    'Rockwell Collins',
  ],

  // Agriculture & Manufacturing
  agManufacturing: [
    'John Deere',
    'Corteva Agriscience',
    'Kinze Manufacturing',
    'Vermeer Corporation',
    'AGCO',
    'Kent Corporation',
    'Sukup Manufacturing',
    'Raven Industries',
  ],

  // Financial Services & Insurance
  financial: [
    'Principal Financial Group',
    'Wellmark',
    'American Equity',
    'Homesteaders Life Company',
    'Delta Dental of Iowa',
    'SHAZAM',
    'GuideOne Insurance',
    'Farmers Mutual Hail',
    'EMC Insurance',
    'Grinnell Mutual',
    'Farm Bureau Financial Services',
    'Sammons Financial Group',
    'FBL Financial Group',
    'Athene',
  ],

  // Retail & Consumer
  retail: [
    "Casey's General Stores",
    'Hy-Vee',
    'Kum & Go',
    'Fareway',
    'Pella Corporation',
  ],

  // Healthcare
  healthcare: [
    'UnityPoint Health',
    'Cerner',
    'Oracle Health',
    'MercyOne',
    'Broadlawns Medical Center',
    'Genesis Health System',
  ],

  // Energy & Utilities
  energy: [
    'MidAmerican Energy',
    'Alliant Energy',
    'Black Hills Energy',
    'Interstate Power and Light',
  ],

  // Consulting & Enterprise
  consulting: [
    'Accenture',
    'Emerson',
    'Deloitte',
    'RSM',
    'KPMG',
    'Grant Thornton',
  ],
} as const;

// Flattened list for search queries
export const ALL_IOWA_COMPANIES = [
  ...IOWA_TECH_COMPANIES.software,
  ...IOWA_TECH_COMPANIES.aerospace,
  ...IOWA_TECH_COMPANIES.agManufacturing,
  ...IOWA_TECH_COMPANIES.financial,
  ...IOWA_TECH_COMPANIES.retail,
  ...IOWA_TECH_COMPANIES.healthcare,
  ...IOWA_TECH_COMPANIES.energy,
  ...IOWA_TECH_COMPANIES.consulting,
] as const;

// Top companies to prioritize in searches (most active tech hiring)
export const TOP_IOWA_TECH_EMPLOYERS = [
  'Workiva',
  'National Information Solutions Cooperative (NISC)',
  'Principal Financial Group',
  'Collins Aerospace',
  'John Deere',
  'Wellmark',
  'Source Allies',
  'Dwolla',
  "Casey's General Stores",
  'Hy-Vee',
  'UnityPoint Health',
  'MidAmerican Energy',
  'Corteva Agriscience',
  'Perficient',
  'Lean Techniques',
  'Buildertrend',
] as const;
