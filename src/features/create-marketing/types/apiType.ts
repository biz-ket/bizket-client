type Tags = 'TREND' | 'PRICE' | 'QUALITY' | 'DESIGN';

export interface CreateMarketingRequestType {
  userType: 'GUEST' | 'MEMBER' | 'BUSINESS';
  memberId?: number | null;
  brandName?: string | null;
  account?: string | null;
  industry?: string | null;
  clientToken?: string | null;
  platform?: 'instagram' | 'threads' | null;
  targetAgeGroup?: string | null;
  prompt: string;
  emphasisTags: Tags[] | null;
  imageUrls: File[] | null;
}

export interface CreateMarketingResponseType {
  generatedContent: string;
  hashtags: string[];
  platform?: string;
  imageUrls: string[];
  createdAt: string;
}

export interface MarketingHistoryResponse {
  generatedContent: string;
  hashtags: string[];
  platform: string;
  imageUrls: string[];
  createdAt: string;
}
