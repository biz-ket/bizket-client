import { create } from 'zustand';

export type TabType = 'create' | 'history' | '';

interface TabState {
  activeTab: TabType;
  isTabOpen: boolean;
  setActiveTab: (tab: TabType) => void;
  toggleTab: () => void;
}

export const useTabStore = create<TabState>((set) => ({
  activeTab: 'create',
  isTabOpen: true,

  setActiveTab: (tab: TabType) =>
    set({
      activeTab: tab,
      isTabOpen: tab === 'create' || tab === 'history' ? true : false,
    }),

  toggleTab: () =>
    set((state) => ({
      isTabOpen: !state.isTabOpen,
    })),
}));
