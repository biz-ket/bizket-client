// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { fetchApi } from '@/shared/utils/fetchApi';

// type UpdateBusinessProfileInput = {
// brand: string;
// openDate: string;
// phone1: string;
// phone2: string;
// phone3: string;
// categoryId: number | null;
// subCategoryId: number | null;
// detailCategoryId: number | null;
// street: string;
// placeEmail: string;
// ageGroupId: number | null;
// };

// export const useUpdateBusinessProfile = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (data: UpdateBusinessProfileInput) => {
//       await fetchApi('/business-report/me', {
//         method: 'PATCH',
//         auth: true,
// body: {
//   placeName: data.brand,
//   customerAgeGroupId: data.ageGroupId,
//   businessCategoryId: data.categoryId,
//   businessSubCategoryId: data.subCategoryId,
//   businessDetailCategoryId: data.detailCategoryId,
//   openDate: data.openDate,
//   address: data.street,
//   placeEmail: data.placeEmail,
//   placePhoneNumber: `${data.phone1}-${data.phone2}-${data.phone3}`,
// },
//       });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['businessProfile'] });
//     },
//   });
// };
// hooks/useBusinessProfileMutations.ts
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { fetchApi } from '@/shared/utils/fetchApi';

// type BusinessProfilePayload = {
//   brand: string;
//   openDate: string;
//   phone1: string;
//   phone2: string;
//   phone3: string;
//   categoryId: number | null;
//   subCategoryId: number | null;
//   detailCategoryId: number | null;
//   street: string;
//   placeEmail: string;
//   ageGroupId: number | null;
// };

// // 수정(PATCH) 훅
// export const useUpdateBusinessProfile = () => {
//   const qc = useQueryClient();
//   return useMutation({
//     mutationFn: async (data: BusinessProfilePayload) => {
//       await fetchApi('/business-report/me', {
//         method: 'PATCH',
//         auth: true,
// body: {
//   placeName: data.brand,
//   customerAgeGroupId: data.ageGroupId,
//   businessCategoryId: data.categoryId,
//   businessSubCategoryId: data.subCategoryId,
//   businessDetailCategoryId: data.detailCategoryId,
//   openDate: data.openDate,
//   address: data.street,
//   placeEmail: data.placeEmail,
//   placePhoneNumber: `${data.phone1}-${data.phone2}-${data.phone3}`,
// },
//       });
//     },
//     onSuccess: () => {
//       qc.invalidateQueries({ queryKey: ['businessProfile'] });
//     },
//   });
// };

// // 생성(POST) 훅
// export const useCreateBusinessProfile = () => {
//   const qc = useQueryClient();
//   return useMutation({
//     mutationFn: async (data: BusinessProfilePayload) => {
//       await fetchApi('/business-report/me', {
//         method: 'POST',
//         auth: true,
//         body: {
//           placeName: data.brand,
//           customerAgeGroupId: data.ageGroupId,
//           businessCategoryId: data.categoryId,
//           businessSubCategoryId: data.subCategoryId,
//           businessDetailCategoryId: data.detailCategoryId,
//           openDate: data.openDate,
//           address: data.street,
//           placeEmail: data.placeEmail,
//           placePhoneNumber: `${data.phone1}-${data.phone2}-${data.phone3}`,
//         },
//       });
//     },
//     onSuccess: () => {
//       qc.invalidateQueries({ queryKey: ['businessProfile'] });
//     },
//   });
// };

// hooks/useCreateBusinessProfileMutation.ts

// src/features/report/hooks/useBusinessProfileMutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApi } from '@/shared/utils/fetchApi';

export type BusinessProfilePayload = {
  placeName: string; // 브랜드명이니까 placeName
  customerAgeGroupId: number | null;
  businessCategoryId: number | null;
  businessSubCategoryId: number | null;
  businessDetailCategoryId: number | null;
  openDate: string;
  address: string;
  placeEmail: string;
  placePhoneNumber: string;
};

// PATCH → 수정
export const useUpdateBusinessProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: BusinessProfilePayload) => {
      try {
        return await fetchApi('/business-report/me', {
          method: 'PATCH',
          auth: true,
          body: data,
        });
      } catch (err: any) {
        console.error('fetchApi PATCH error:', err);
        throw err;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['businessProfile'] });
    },
  });
};

export const useCreateBusinessProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: BusinessProfilePayload) =>
      fetchApi('/business-report/me', {
        method: 'POST',
        auth: true,
        body,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['businessProfile'] });
    },
  });
};
