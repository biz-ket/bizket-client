import Flex from '@/shared/ui/layout/Flex';
import MonthlyInterestChart from './MonthlyInterestChart';
import RelatedKeywordsRanking from './RelatedKeywordsRanking';
import WeeklySearchRatioChart from './WeeklySearchRatioChart';
import { TrendSearchParams } from '@/features/search-trend/model/types';
import useSearchResultQueries from '../hooks/useSearchResultQueries';
import Image from 'next/image';
import BlogSearchVolumeCard from './BlogSearchVolumeCard';
import NewsSearchVolumeCard from './NewsSearchVolumeCard';
import SearchVolumeForecastCard from './SearchVolumeForecastCard';
import ContentsSaturationCard from './ContentsSaturationCard';
import { useEffect, useRef } from 'react';

interface SearchResultProps {
  searchParams: TrendSearchParams;
}

const SearchResult = ({ searchParams }: SearchResultProps) => {
  const { isSomeLoading, results } = useSearchResultQueries({ searchParams });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [searchParams, ref]);

  return (
    <section className="pt-[155px] pb-[210px]" ref={ref}>
      <h2 className="heading-sm">트렌드 키워드 분석</h2>

      {isSomeLoading ? (
        <div className="w-full flex justify-center mt-38">
          <Image
            src={'/images/shared/loading-text-gray.gif'}
            alt="로딩 이미지"
            width={100}
            height={89}
            unoptimized
          />
        </div>
      ) : (
        <Flex direction="col" gap={30} className="mt-38">
          <MonthlyInterestChart
            result={results['monthly-interest']}
            keyword={searchParams.keyword}
          />
          <div className="w-full grid grid-cols-4 gap-[20px]">
            <BlogSearchVolumeCard result={results['search-volume-blog']} />
            <NewsSearchVolumeCard result={results['search-volume-news']} />
            <SearchVolumeForecastCard
              result={results['forecast-search-volume']}
            />
            <ContentsSaturationCard result={results['contents-saturation']} />
          </div>
          <Flex gap={20} className="w-full">
            <RelatedKeywordsRanking result={results['related-keywords']} />
            <WeeklySearchRatioChart result={results['weekly-search-ratio']} />
          </Flex>
        </Flex>
      )}
    </section>
  );
};

export default SearchResult;
