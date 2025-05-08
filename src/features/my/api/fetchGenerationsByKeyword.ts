import { fetchApi } from '@/shared/utils/fetchApi';

export async function fetchGenerationsByKeyword(
  memberId: number,
  keyword: string,
  page: number,
  size: number,
) {
  const searchParams = new URLSearchParams({
    memberId: memberId.toString(),
    keyword,
    page: page.toString(),
    size: size.toString(),
  });

  const result = await fetchApi(
    `/marketing/contents?${searchParams.toString()}`,
    {
      method: 'GET',
    },
  );
  return result.data;
}
