import {
  TrendSearchFormValues,
  TrendSearchParams,
} from '@/features/search-trend/model/types';
import SearchInput from './KeywordInput';
import SearchFilters from './SearchFilters';
import { useForm } from 'react-hook-form';
import { getYesterday } from '@/shared/utils/dateUtils';
import { memo } from 'react';
import { AGE_RANGE_LABELS } from '@/features/search-trend/model/constants';
import { transformToSearchParams } from '@/features/search-trend/utils/transformToSearchParams';
import { addSearchHistory } from '@/features/search-trend/utils/searchHistoryUtils';
import dynamic from 'next/dynamic';
import { useQueryClient } from '@tanstack/react-query';

const SearchHistory = dynamic(() => import('./SearchHistory'), { ssr: false });

interface SearchFormProps {
  onSearch: (searchParams: TrendSearchParams) => void;
}

const SearchForm = ({ onSearch }: SearchFormProps) => {
  const { control, handleSubmit } = useForm<TrendSearchFormValues>({
    defaultValues: {
      keyword: '',
      dateRange: {
        from: getYesterday(),
      },
      device: 'all',
      gender: 'all',
      ages: { minIndex: 0, maxIndex: AGE_RANGE_LABELS.length - 1 },
    },
  });

  const queryClient = useQueryClient();

  const onSubmit = (data: TrendSearchFormValues) => {
    // 검색 기록 추가
    addSearchHistory(data.keyword);
    queryClient.invalidateQueries({
      queryKey: ['search-history'],
    });

    const transformedData = transformToSearchParams(data);
    onSearch(transformedData);
  };

  return (
    <section className="w-full flex flex-col items-center">
      <h2 className="heading-md text-center">트렌드 키워드 찾기</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center mt-30"
      >
        <div className="w-[793px]">
          <SearchInput control={control} />
          <SearchHistory />
        </div>
        <SearchFilters control={control} />
      </form>
    </section>
  );
};

export default memo(SearchForm);
