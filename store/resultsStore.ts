import { MatchData } from '@/types/events/events.types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MatchesStore {
  results: MatchData[];
  setResults: (results: MatchData[]) => void;
}

export const useResultsStore = create<MatchesStore>()(
  persist(
    (set) => ({
      results: [],
      setResults: (results) => set({ results }),
    }),
    {
      name: 'next-matches',
    },
  ),
);
