import { useQuery } from '@tanstack/react-query';
import { authFetch } from '../lib/authFetch';
import { useAuthStore } from '../model/useAuthStore';

export interface Member {
  id: number;
  nickname: string;
}

export const useCurrentUser = () => {
  const token = useAuthStore((s) => s.token);

  return useQuery<Member, Error>({
    queryKey: ['currentUser'],
    queryFn: () => authFetch('/api/members/me') as Promise<Member>,
    enabled: Boolean(token), // 토큰이 있어야만 호출
  });
};
