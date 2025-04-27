import Flex from '@/shared/ui/layout/Flex';
import MonthlySearchTrendChart from './MonthlySearchTrendChart';
import RelatedKeywordsRanking from './RelatedKeywordsRanking';
import SearchResultMetrics from './SearchResultMetrics';
import WeeklySearchRatioChart from './WeeklySearchRatioChart';
import { TrendSearchParams } from '@/features/search-trend/model/types';
import useSearchResultQuery from '@/features/search-trend/hooks/useSearchResultQuery';

interface SearchResultProps {
  searchParams: TrendSearchParams;
}

const SearchResult = ({ searchParams }: SearchResultProps) => {
  const { data, isLoading, isError } = useSearchResultQuery({ searchParams });

  if (isLoading) {
    // TODO: 로딩 컴포넌트로 대체
    return <></>;
  }

  if (isError || !data) {
    // TODO: 에러 컴포넌트로 대체
    return <></>;
  }

  return (
    <section className="mt-80">
      <h2 className="heading-sm">트렌드 키워드 분석</h2>
      <Flex direction="col" gap={30} className="mt-38">
        <MonthlySearchTrendChart />
        <SearchResultMetrics />
        <Flex gap={20} className="w-full">
          <RelatedKeywordsRanking />
          <WeeklySearchRatioChart />
        </Flex>
      </Flex>
    </section>
  );
};

export default SearchResult;
