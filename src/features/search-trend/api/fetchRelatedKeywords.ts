import { fetchApi } from '@/shared/utils/fetchApi';

export interface RelatedKeywords {
  keyword: string;
  suggestions: string[];
}

export async function fetchRelatedKeywords(keyword: string) {
  const result = await fetchApi(`datalab/trends/${keyword}/related`, {
    method: 'GET',
  });
  return result as RelatedKeywords;
}
