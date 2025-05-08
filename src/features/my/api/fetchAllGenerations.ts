import { fetchApi } from '@/shared/utils/fetchApi';
import { MarketingContentsGeneration } from '../model/types';

export async function fetchAllGenerations(
  memberId: number,
): Promise<MarketingContentsGeneration[]> {
  const result = await fetchApi(`/marketing/contents?memberId=${memberId}`, {
    method: 'GET',
  });
  return result.data;
}
