import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApi } from '@/shared/utils/fetchApi';
import { BusinessProfilePayload } from './types';

export const useCreateBusinessProfile = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: BusinessProfilePayload) =>
      fetchApi('/business-report/me', { method: 'POST', auth: true, body }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['business-profile'] }),
  });
};

export const useUpdateBusinessProfile = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: BusinessProfilePayload) =>
      fetchApi('/business-report/me', { method: 'PATCH', auth: true, body }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['business-profile'] }),
  });
};
