import { fetchApi } from '@/shared/utils/fetchApi';

export interface BlogSearchVolume {
  keyword: string;
  blogTotalCount: number;
}

export async function fetchBlogSearchVolume(keyword: string) {
  const result = await fetchApi(`datalab/trends/${keyword}/blog/total`, {
    method: 'GET',
  });
  return result as BlogSearchVolume;
}
