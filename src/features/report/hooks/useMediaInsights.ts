import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '@/shared/utils/fetchApi';
import { useAuthStore } from '@/features/auth/model/useAuthStore';
export interface MediaWithInsights {
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
  const token = useAuthStore((s) => s.token);
  return useQuery<MediaWithInsights[], Error>({
    queryKey: ['mediaInsights'],
    queryFn: () =>
      fetchApi('/instagram/insight/me/media-with-insights', {
        auth: true,
      }) as Promise<MediaWithInsights[]>,
    enabled: Boolean(token),
    retry: false,
  });
}
