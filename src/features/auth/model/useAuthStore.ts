import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id: number;
  nickname: string;
}
interface AuthState {
  _hasHydrated: boolean;
  token: string | null;
  memberId: number | null;
  user: User | null;
  setToken: (t: string) => void;
  setMemberId: (id: number) => void;
  setUser: (u: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      _hasHydrated: false,
      token: null,
      memberId: null,
      user: null,
      setToken: (t) => set({ token: t }),
      setMemberId: (id) => set({ memberId: id }),
      setUser: (u) => set({ user: u }),
      logout: () => {
        set({ token: null, memberId: null, user: null });
        localStorage.removeItem('auth'); // storage name
      },
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token, memberId: state.memberId }),
      onRehydrateStorage: () => (state) => {
        state!._hasHydrated = true;
      },
    },
  ),
);
