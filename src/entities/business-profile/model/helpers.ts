import { ProfileFormValues } from '@/features/profile/model/profileSchema';
import { BusinessProfilePayload } from './types';

export function toBusinessProfilePayload(
  data: ProfileFormValues,
): BusinessProfilePayload {
  return {
    placeName: data.brand,
    customerAgeGroupId: data.ageGroupId,
    businessCategoryId: data.categoryId,
    businessSubCategoryId: data.subCategoryId,
    businessDetailCategoryId: data.detailCategoryId,
    openDate: data.startDate.toISOString().split('T')[0],
    address: data.street || '',
    placeEmail: data.placeEmail,
    placePhoneNumber: `${data.phone1}-${data.phone2}-${data.phone3}`,
  };
}
