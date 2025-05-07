import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/features/auth/model/useAuthStore';
import { MarketingContentsGeneration } from '../model/types';
import { fetchAllGenerations } from '../api/fetchAllGenerations';

const sample: MarketingContentsGeneration[] = [
  {
    generatedContent: '누드톤으로 고급스러운 데일리 룩 ✨ #누드톤메이크업 #직장인메이크업',
    hashtags: [],
    platform: '인스타그램',
    imageUrls: [],
    createdAt: '',
  },
  {
    generatedContent: '프로필 촬영 메이크업',
    hashtags: [],
    platform: '인스타그램',
    imageUrls: [],
    createdAt: '',
  },
  {
    generatedContent: '러블리 방송 메이크업',
    hashtags: [],
    platform: '인스타그램',
    imageUrls: [],
    createdAt: '',
  },
  {
    generatedContent: '데일리 메이크업',
    hashtags: [],
    platform: '인스타그램',
    imageUrls: [],
    createdAt: '',
  },
];

interface useGenerationQueryProps {
  keyword: string;
}

const useGenerationQuery = ({ keyword }: useGenerationQueryProps) => {
  const memberId = useAuthStore((s) => s.memberId);
  const hasHydrated = useAuthStore((s) => s._hasHydrated);

  return useQuery({
      queryKey: ['marketing-contents', memberId, keyword],
      queryFn: async () => {
        if (keyword === '') {
          return await fetchAllGenerations(memberId!);
        }
        // TODO: keyword에 따른 검색 결과 반환
        return sample;
      },
      enabled: memberId !== null && hasHydrated,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });
};

export default useGenerationQuery;
