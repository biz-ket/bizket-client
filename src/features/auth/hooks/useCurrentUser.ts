import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../model/useAuthStore';
import { fetchApi } from '@/shared/utils/fetchApi';

export interface CurrentUser {
  nickname: string;
  placeEmail: string;
  placePhoneNumber: string;
}

export const useCurrentUser = () => {
  const token = useAuthStore((s) => s.token);
  const hasHydrated = useAuthStore((s) => s._hasHydrated);

  return useQuery<CurrentUser, Error>({
    queryKey: ['currentUser'],
    queryFn: () =>
      fetchApi('/mypage/me', {
        auth: true,
      }) as Promise<CurrentUser>,
    enabled: Boolean(token) && hasHydrated, // 토큰이 있어야만 호출
    staleTime: 1000 * 60 * 5,
  });
};
