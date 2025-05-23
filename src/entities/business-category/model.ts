import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '@/shared/utils/fetchApi';

export interface CategoryOption {
  id: number;
  name: string;
}

export function useBusinessCategories() {
  return useQuery<CategoryOption[], Error>({
    queryKey: ['business-categories'],
    queryFn: () =>
      fetchApi('/business/categories', { auth: true }) as Promise<
        CategoryOption[]
      >,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSubCategories(categoryId: number) {
  return useQuery<CategoryOption[], Error>({
    queryKey: ['business-sub-categories', categoryId],
    queryFn: () =>
      fetchApi(`/business/categories/${categoryId}/sub-categories`, {
        auth: true,
      }) as Promise<CategoryOption[]>,
    enabled: Boolean(categoryId),
  });
}

export function useDetailCategories(subCategoryId: number) {
  return useQuery<CategoryOption[], Error>({
    queryKey: ['business-detail-categories', subCategoryId],
    queryFn: () =>
      fetchApi(`/business/sub-categories/${subCategoryId}/detail-categories`, {
        auth: true,
      }) as Promise<CategoryOption[]>,
    enabled: Boolean(subCategoryId),
  });
}
