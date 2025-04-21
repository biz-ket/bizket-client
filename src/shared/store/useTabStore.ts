import { create } from 'zustand';

export type TabType = 'create' | 'history';

interface TabState {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const useTabStore = create<TabState>((set) => ({
  activeTab: 'create',

  setActiveTab: (tab: TabType) => set({ activeTab: tab }),
}));
