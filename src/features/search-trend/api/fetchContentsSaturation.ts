import { fetchApi } from '@/shared/utils/fetchApi';

export interface ContentsSaturation {
  keyword: string;
  blog: {
    keyword: string;
    contentCount: number;
    searchCount: number;
    saturationIndex: number;
  };
  news: {
    keyword: string;
    contentCount: number;
    searchCount: number;
    saturationIndex: number;
  };
  totalContentCount: number;
  totalSearchCount: number;
  overallSaturationIndex: number;
}

export async function fetchContentsSaturation(keyword: string) {
  const result = await fetchApi(`datalab/trends/${keyword}/saturation`, {
    method: 'GET',
  });
  return result as ContentsSaturation;
}
