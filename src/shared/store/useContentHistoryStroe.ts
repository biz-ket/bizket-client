import { create } from 'zustand';

interface ContentHistoryState {
  id: number | null;
  setId: (id: number) => void;
  clear: () => void;
}

export const useContentHistoryStore = create<ContentHistoryState>((set) => ({
  id: null,
  setId: (id) => set({ id }),
  clear: () => set({ id: null }),
}));
