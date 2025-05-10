export type TrendSearchFormValues = {
  keyword: string;
};

export type TrendSearchParams = {
  keyword: string;
};

export type AnalysisKey =
  | 'monthly-interest'
  | 'search-volume-blog'
  | 'search-volume-news'
  | 'forecast-search-volume'
  | 'contents-saturation'
  | 'related-keywords'
  | 'weekly-search-ratio';
