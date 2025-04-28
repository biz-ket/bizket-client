import { useAuthStore } from '../model/useAuthStore';

export const useIsLoggedIn = () => {
  // 토큰이 있을 때 true, 없으면 false
  return useAuthStore((s) => Boolean(s.token));
};
