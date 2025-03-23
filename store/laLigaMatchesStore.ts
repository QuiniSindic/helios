import { Match } from '@/types/la_liga/la_liga.types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LaLigaMatchesStore {
  events: Match[];
  setEvents: (events: Match[]) => void;
}

export const useLaLigaMatchesStore = create<LaLigaMatchesStore>()(
  persist(
    (set) => ({
      events: [],
      setEvents: (events) => set({ events }),
    }),
    {
      name: 'laLigaMatches',
    },
  ),
);
