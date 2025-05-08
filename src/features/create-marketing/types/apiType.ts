type Tags = 'TREND' | 'PRICE' | 'QUALITY' | 'DESIGN';

export interface CreateMarketingRequestType {
  userType: 'GUEST' | 'MEMBER' | 'BUSINESS';
  memberId?: number;
  brandName?: string;
  account?: string;
  industry?: string;
  clientToken?: string;
  platform?: 'INSTAGRAM' | 'THREADS';
  targetAgeGroup?: string;
  prompt: string;
  emphasisTags: Tags[];
  rawImageUrls: string[];
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
