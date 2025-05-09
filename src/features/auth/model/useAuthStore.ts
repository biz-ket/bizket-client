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
        'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNzQ2Njc4NTUzLCJleHAiOjE3NDc4ODgxNTN9.yxxIVrjJGpi2jANcmnhwj5XFw7OTvyMPLuG4BJ-hyKE',
      refreshToken: null,
      memberId: null,
      user: null,
      setToken: (t) => set({ token: t }),
      setRefreshToken: (rt) => set({ refreshToken: rt }),
      setMemberId: (id) => set({ memberId: id }),
      setUser: (u) => set({ user: u }),
      logout: () => {
        set({ token: null, refreshToken: null, memberId: null, user: null });
        localStorage.removeItem('auth'); // storage name
        window.location.replace('/');
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
