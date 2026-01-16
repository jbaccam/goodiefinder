import type { JobCategory } from './constants';

// Keywords for each category
const CATEGORY_KEYWORDS: Record<Exclude<JobCategory, ''>, string[]> = {
  frontend: [
    'frontend', 'front-end', 'front end', 'react', 'vue', 'angular', 'svelte',
    'javascript', 'typescript', 'css', 'html', 'ui developer', 'ui engineer',
    'web developer', 'next.js', 'nextjs', 'tailwind', 'sass', 'webpack'
  ],
  backend: [
    'backend', 'back-end', 'back end', 'node.js', 'nodejs', 'python', 'java',
    'golang', 'go developer', 'ruby', 'rails', 'django', 'flask', 'spring',
    'api developer', 'server', '.net', 'c#', 'php', 'laravel', 'express'
  ],
  fullstack: [
    'fullstack', 'full-stack', 'full stack', 'mern', 'mean', 'lamp'
  ],
  devops: [
    'devops', 'dev ops', 'sre', 'site reliability', 'infrastructure',
    'ci/cd', 'cicd', 'jenkins', 'gitlab', 'github actions', 'terraform',
    'ansible', 'puppet', 'chef'
  ],
  mobile: [
    'mobile', 'ios', 'android', 'swift', 'kotlin', 'react native',
    'flutter', 'xamarin', 'mobile developer', 'app developer'
  ],
  data: [
    'data engineer', 'data scientist', 'machine learning', 'ml engineer',
    'ai engineer', 'big data', 'analytics', 'etl', 'data pipeline',
    'spark', 'hadoop', 'snowflake', 'databricks', 'tensorflow', 'pytorch'
  ],
  security: [
    'security', 'cybersecurity', 'infosec', 'penetration', 'pentest',
    'vulnerability', 'soc analyst', 'security engineer', 'appsec'
  ],
  cloud: [
    'aws', 'azure', 'gcp', 'google cloud', 'cloud engineer', 'cloud architect',
    'kubernetes', 'k8s', 'docker', 'containerization', 'microservices'
  ],
};

/**
 * Categorizes a job based on its title and description
 * Returns an array of matching categories
 */
export function categorizeJob(title: string, description: string = ''): JobCategory[] {
  const text = `${title} ${description}`.toLowerCase();
  const categories: JobCategory[] = [];

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    const hasMatch = keywords.some(keyword => text.includes(keyword.toLowerCase()));
    if (hasMatch) {
      categories.push(category as JobCategory);
    }
  }

  // If fullstack is detected, we might want to also add frontend and backend
  // but for cleaner UI, let's keep fullstack separate

  // If no categories found but it's a software job, default to fullstack
  if (categories.length === 0) {
    const isSoftwareJob = /software|developer|engineer|programmer/i.test(text);
    if (isSoftwareJob) {
      categories.push('fullstack');
    }
  }

  return categories;
}

/**
 * Get the primary category for display purposes
 */
export function getPrimaryCategory(categories: JobCategory[]): JobCategory {
  // Priority order: fullstack > frontend > backend > others
  const priority: JobCategory[] = ['fullstack', 'frontend', 'backend', 'devops', 'cloud', 'mobile', 'data', 'security'];

  for (const cat of priority) {
    if (categories.includes(cat)) {
      return cat;
    }
  }

  return categories[0] || '';
}
