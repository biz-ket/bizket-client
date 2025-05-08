import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApi } from '@/shared/utils/fetchApi';

type UpdateBusinessProfileInput = {
  brand: string;
  openDate: string;
  phone1: string;
  phone2: string;
  phone3: string;
  categoryId: number | null;
  subCategoryId: number | null;
  detailCategoryId: number | null;
  street: string;
  ageGroupIds: number[];
};

export const useUpdateBusinessProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateBusinessProfileInput) => {
      await fetchApi('/business-report/me', {
        method: 'PATCH',
        auth: true,
        body: {
          placeName: data.brand,
          customerAgeGroupId: data.ageGroupIds[0],
          businessCategoryId: data.categoryId,
          businessSubCategoryId: data.subCategoryId,
          businessDetailCategoryId: data.detailCategoryId,
          openDate: data.openDate,
          address: data.street,
          placePhoneNumber: `${data.phone1}-${data.phone2}-${data.phone3}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['businessProfile'] });
    },
  });
};
