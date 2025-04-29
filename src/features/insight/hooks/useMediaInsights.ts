// src/features/insight/hooks/useMediaInsights.ts
import { useQuery } from '@tanstack/react-query';
import { authFetch } from '@/features/auth/lib/authFetch';
import { useAuthStore } from '@/features/auth/model/useAuthStore';

export interface MediaInsight {
  id: string;
  caption: string;
  media_type: string;
  media_url: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  saved: number;
  platform: string;
}

export function useMediaInsights() {
  return useQuery<MediaInsight[], Error>({
    queryKey: ['mediaInsight'],
    queryFn: () => authFetch('/api/instagram/insight/me/media-with-insights'),
    // 로그인 안 됐거나 토큰 없으면 호출 안 함
    enabled: Boolean(useAuthStore.getState().token),
  });
}
