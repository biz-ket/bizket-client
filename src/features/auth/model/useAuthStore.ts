import { create } from 'zustand';

interface User {
  id: number;
  nickname: string;
}
interface AuthState {
  token: string | null;
  memberId: number | null;
  user: User | null;
  setToken: (t: string) => void;
  setMemberId: (id: number) => void;
  setUser: (u: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  memberId: null,
  user: null,
  setToken: (t) => set({ token: t }),
  setMemberId: (id) => {
    localStorage.setItem('memberId', id.toString());
    set({ memberId: id });
  },
  setUser: (u) => set({ user: u }),
  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('memberId');
    set({ token: null, memberId: null, user: null });
  },
}));
