import { Match } from '@/types/la_liga/la_liga.types';
import { create } from 'zustand';

interface LaLigaMatchesStore {
  events: Match[];
  setEvents: (events: Match[]) => void;
}

export const useLaLigaMatchesStore = create<LaLigaMatchesStore>((set) => ({
  events: [],
  setEvents: (events) => set({ events }),
}));
