import {
  useQueries,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { AnalysisKey, TrendSearchParams } from '../model/types';
import { fetchMonthlyInterest } from '../api/fetchMonthlyInterest';
import { fetchBlogSearchVolume } from '../api/fetchBlogSearchVolume';
import { fetchNewsSearchVolume } from '../api/fetchNewsSearchVolume';
import { fetchSearchVolumeForecast } from '../api/fetchSearchVolumeForecast';
import { fetchContentsSaturation } from '../api/fetchContentsSaturation';
import { fetchRelatedKeywords } from '../api/fetchRelatedKeywords';
import { fetchWeeklySearchRatio } from '../api/fetchWeeklySearchRatio';
import { useMemo } from 'react';

function getQueryMap(searchParams: TrendSearchParams) {
  const { keyword } = searchParams;

  const COMMON_QUERY_OPTIONS = {
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  };

  const queryMap: Record<AnalysisKey, UseQueryOptions<any>> = {
    'monthly-interest': {
      queryKey: ['monthly-interest', keyword],
      queryFn: () => fetchMonthlyInterest(keyword),
      ...COMMON_QUERY_OPTIONS,
    },
    'search-volume-blog': {
      queryKey: ['search-volume-blog', keyword],
      queryFn: () => fetchBlogSearchVolume(keyword),
      ...COMMON_QUERY_OPTIONS,
    },
    'search-volume-news': {
      queryKey: ['search-volume-news', keyword],
      queryFn: () => fetchNewsSearchVolume(keyword),
      ...COMMON_QUERY_OPTIONS,
    },
    'forecast-search-volume': {
      queryKey: ['forecast-search-volume', keyword],
      queryFn: () => fetchSearchVolumeForecast(keyword),
      ...COMMON_QUERY_OPTIONS,
    },
    'contents-saturation': {
      queryKey: ['contents-saturation', keyword],
      queryFn: () => fetchContentsSaturation(keyword),
      ...COMMON_QUERY_OPTIONS,
    },
    'related-keywords': {
      queryKey: ['related-keywords', keyword],
      queryFn: () => fetchRelatedKeywords(keyword),
      ...COMMON_QUERY_OPTIONS,
    },
    'weekly-search-ratio': {
      queryKey: ['weekly-search-ratio', keyword],
      queryFn: () => fetchWeeklySearchRatio(keyword),
      ...COMMON_QUERY_OPTIONS,
    },
  };

  return queryMap;
}

interface useSearchResultQueriesProps {
  searchParams: TrendSearchParams;
}

const useSearchResultQueries = ({
  searchParams,
}: useSearchResultQueriesProps) => {
  const queryMap = useMemo(() => getQueryMap(searchParams), [searchParams]);

  const queries = useQueries({
    queries: Object.values(queryMap),
  });

  const results = useMemo(() => {
    return Object.fromEntries(
      Object.keys(queryMap).map((key, idx) => [key, queries[idx]]),
    ) as Record<AnalysisKey, UseQueryResult<any>>;
  }, [queryMap, queries]);

  const isSomeLoading = queries.some((query) => query.isLoading);

  return {
    results,
    isSomeLoading,
  };
};

export default useSearchResultQueries;
