export type Tags = 'TREND' | 'PRICE' | 'QUALITY' | 'DESIGN';

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
  id: number;
  prompt: string;
  generatedContent: string;
  hashtags: string[];
  platform?: string;
  imageUrls: string[];
  createdAt: string;
}

export interface MarketingHistoryItem {
  id: number;
  prompt: string;
  generatedContent: string;
  platform: string;
  hashtags: string[];
  imageUrls: string[];
  createdAt: string;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface MarketingHistoryData {
  content: MarketingHistoryItem[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  first: boolean;
  empty: boolean;
}

export interface MarketingHistoryResponse {
  data: MarketingHistoryData;
  message: string;
}
