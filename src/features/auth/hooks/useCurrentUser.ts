import { useQuery } from '@tanstack/react-query';
import { authFetch } from '../lib/authFetch';
import { useAuthStore } from '../model/useAuthStore';

export interface CurrentUser {
  id: number;
  nickname: string;
}

export const useCurrentUser = () => {
  const token = useAuthStore((s) => s.token);

  return useQuery<CurrentUser, Error>({
    queryKey: ['currentUser'],
    queryFn: () => authFetch('/api/mypage/me') as Promise<CurrentUser>,
    enabled: Boolean(token), // 토큰이 있어야만 호출
    staleTime: 1000 * 60 * 5,
  });
};
