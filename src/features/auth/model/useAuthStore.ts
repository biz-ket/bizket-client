import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id: number;
  nickname: string;
}
interface AuthState {
  _hasHydrated: boolean;
  token: string | null;
  refreshToken: string | null;
  memberId: number | null;
  user: User | null;
  setToken: (t: string) => void;
  setRefreshToken: (rt: string) => void;
  setMemberId: (id: number) => void;
  setUser: (u: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      _hasHydrated: false,
      token:
        'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNzQ4MzA4MzY1LCJleHAiOjE3NDk1MTc5NjV9.fW41kaIpv0_mpkpFds4V7maUX-BvNEOJbLlqydtOiLE',
      refreshToken: null,
      memberId: 2,
      user: null,
      setToken: (t) => set({ token: t }),
      setRefreshToken: (rt) => set({ refreshToken: rt }),
      setMemberId: (id) => set({ memberId: id }),
      setUser: (u) => set({ user: u }),
      logout: () => {
        set({ token: null, refreshToken: null, memberId: null, user: null });
      },
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        token: state.token,
        refreshToken: state.refreshToken,
        memberId: state.memberId,
      }),
      onRehydrateStorage: () => (state) => {
        state!._hasHydrated = true;
      },
    },
  ),
);

export const getAuthState = () => useAuthStore.getState();
