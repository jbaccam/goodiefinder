import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FilterState } from '../types';
import type { JobCategory, ExperienceLevel } from '../utils/constants';

interface FilterStore extends FilterState {
  setCity: (city: string) => void;
  setCategory: (category: JobCategory) => void;
  setDateRange: (dateRange: string) => void;
  setExperienceLevel: (level: ExperienceLevel) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
}

const initialState: FilterState = {
  city: '',
  category: '',
  dateRange: '',
  experienceLevel: '',
  searchQuery: '',
};

export const useFilterStore = create<FilterStore>()(
  persist(
    (set) => ({
      ...initialState,
      setCity: (city) => set({ city }),
      setCategory: (category) => set({ category }),
      setDateRange: (dateRange) => set({ dateRange }),
      setExperienceLevel: (experienceLevel) => set({ experienceLevel }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      resetFilters: () => set(initialState),
    }),
    {
      name: 'iowa-dev-jobs-filters',
    }
  )
);
