export type MarketingContentsGeneration = {
  id: number;
  prompt: string;
  generatedContent: string;
  platform?: string;
  hashtags: string[];
  imageUrls?: string[];
  createdAt: string;
};
