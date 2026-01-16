import type { JobCategory, ExperienceLevel } from './utils/constants';

// JSearch API response types
export interface JSearchJob {
  job_id: string;
  employer_name: string;
  employer_logo: string | null;
  employer_website: string | null;
  job_title: string;
  job_description: string;
  job_city: string;
  job_state: string;
  job_country: string;
  job_employment_type: string;
  job_apply_link: string;
  job_posted_at_datetime_utc: string;
  job_min_salary: number | null;
  job_max_salary: number | null;
  job_salary_currency: string | null;
  job_salary_period: string | null;
  job_is_remote: boolean;
  job_highlights?: {
    Qualifications?: string[];
    Responsibilities?: string[];
    Benefits?: string[];
  };
}

export interface JSearchResponse {
  status: string;
  request_id: string;
  data: JSearchJob[];
}

// Processed job type for our app
export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string | null;
  companyWebsite: string | null;
  location: string;
  city: string;
  state: string;
  isRemote: boolean;
  employmentType: string;
  applyLink: string;
  postedAt: Date;
  description: string;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string | null;
  salaryPeriod: string | null;
  categories: JobCategory[];
  highlights?: {
    qualifications?: string[];
    responsibilities?: string[];
    benefits?: string[];
  };
}

// Filter state
export interface FilterState {
  city: string;
  category: JobCategory;
  dateRange: string;
  experienceLevel: ExperienceLevel;
  searchQuery: string;
}
