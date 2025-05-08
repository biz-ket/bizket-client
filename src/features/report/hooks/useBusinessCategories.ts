import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '@/shared/utils/fetchApi';

export interface CategoryOption {
  id: number;
  name: string;
}

export const useBusinessCategories = () =>
  useQuery<CategoryOption[], Error>({
    queryKey: ['businessCategories'],
    queryFn: () =>
      fetchApi('/business/categories', { auth: true }) as Promise<
        CategoryOption[]
      >,
    staleTime: 5 * 60 * 1000,
  });

export const useSubCategories = (categoryId: number) =>
  useQuery<CategoryOption[], Error>({
    queryKey: ['subCategories', categoryId],
    queryFn: () =>
      fetchApi(`/business/categories/${categoryId}/sub-categories`, {
        auth: true,
      }) as Promise<CategoryOption[]>,
    enabled: Boolean(categoryId),
  });

export const useDetailCategories = (subCategoryId: number) =>
  useQuery<CategoryOption[], Error>({
    queryKey: ['detailCategories', subCategoryId],
    queryFn: () =>
      fetchApi(`/business/sub-categories/${subCategoryId}/detail-categories`, {
        auth: true,
      }) as Promise<CategoryOption[]>,
    enabled: Boolean(subCategoryId),
  });
