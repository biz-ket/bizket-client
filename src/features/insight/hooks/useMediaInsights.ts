import { useQuery } from '@tanstack/react-query';
import { authFetch } from '@/features/auth/lib/authFetch';
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
  return useQuery<MediaWithInsights[], Error>({
    queryKey: ['mediaInsights'],
    queryFn: () =>
      authFetch('/api/instagram/insight/me/media-with-insights') as Promise<
        MediaWithInsights[]
      >,
    enabled: Boolean(useAuthStore.getState().token),
    retry: false,
  });
}
