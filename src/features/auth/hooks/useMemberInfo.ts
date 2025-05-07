import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../model/useAuthStore';
import { fetchApi } from '@/shared/utils/fetchApi';

export interface Member {
  id: number;
  nickname: string;
}

export const useMemberInfo = () => {
  const memberId = useAuthStore((s) => s.memberId);
  const token = useAuthStore((s) => s.token);
  return useQuery<Member, Error>({
    queryKey: ['member', memberId],
    queryFn: () =>
      fetchApi(`/api/member/me`, { auth: true }) as Promise<Member>,
    enabled: Boolean(token), // 토큰이 있어야만 호출
    staleTime: 1000 * 60 * 5,
  });
};
