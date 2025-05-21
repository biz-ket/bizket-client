export interface BusinessProfile {
  placeName: string;
  customerAgeGroupId: number;
  customerAgeGroupLabel: string;
  businessCategoryId: number;
  businessCategoryName: string;
  businessSubCategoryId: number;
  businessSubCategoryName: string;
  businessDetailCategoryId: number;
  businessDetailCategoryName: string;
  openDate: string;
  address: string;
  placeEmail: string;
  placePhoneNumber: string;
  followerCount: number;
  instagramAccountId: string;
  threadsAccountId: string;
}

export type BusinessProfilePayload = {
  placeName: string;
  customerAgeGroupId: number | null;
  businessCategoryId: number | null;
  businessSubCategoryId: number | null;
  businessDetailCategoryId: number | null;
  openDate: string;
  address: string;
  placeEmail: string;
  placePhoneNumber: string;
};
