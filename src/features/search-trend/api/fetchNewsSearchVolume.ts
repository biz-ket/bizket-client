import { fetchApi } from '@/shared/utils/fetchApi';

export interface NewsSearchVolume {
  keyword: string;
  newsTotalCount: number;
}

export async function fetchNewsSearchVolume(keyword: string) {
  const result = await fetchApi(`datalab/trends/${keyword}/news/total`, {
    method: 'GET',
  });
  return result as NewsSearchVolume;
}
