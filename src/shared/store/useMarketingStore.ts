import { CreateMarketingResponseType } from '@/features/create-marketing/types/apiType';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type MarketingLoadingState = {
  isLoading: boolean;
  isSuccess: boolean;
  setLoading: (loading: boolean) => void;
  setIsSuccess: (success: boolean) => void;
};

export const useMarketingLoadingStore = create<MarketingLoadingState>(
  (set) => ({
    isLoading: false,
    isSuccess: false,
    setLoading: (loading) => set({ isLoading: loading }),
    setIsSuccess: (success) => set({ isSuccess: success }),
  }),
);

type MarketingDataStore = {
  data: CreateMarketingResponseType | null;
  setData: (data: CreateMarketingResponseType) => void;
  clearData: () => void;
};

export const useMarketingDataStore = create<MarketingDataStore>()(
  immer((set) => ({
    data: null,
    setData: (data) =>
      set((state) => {
        state.data = data;
      }),
    clearData: () =>
      set((state) => {
        state.data = null;
      }),
  })),
);
