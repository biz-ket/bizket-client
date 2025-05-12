// store/useSelectBoxStore.ts
import { create } from 'zustand';

export interface SelectBoxState {
  openBoxId: string | null;
  setOpenBoxId: (id: string | null) => void;
  isBoxOpen: (id: string) => boolean;
  toggleBox: (id: string) => void;
  closeAllBoxes: () => void;
}

export const useSelectBoxStore = create<SelectBoxState>((set, get) => ({
  openBoxId: null,

  setOpenBoxId: (id: string | null) => set({ openBoxId: id }),

  isBoxOpen: (id: string) => get().openBoxId === id,

  toggleBox: (id: string) => {
    const { openBoxId } = get();
    if (openBoxId === id) {
      set({ openBoxId: null });
    } else {
      set({ openBoxId: id });
    }
  },

  closeAllBoxes: () => set({ openBoxId: null }),
}));
