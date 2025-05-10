import Flex from '@/shared/ui/layout/Flex';
import Card from './Card';
import { UseQueryResult } from '@tanstack/react-query';
import { RelatedKeywords } from '../api/fetchRelatedKeywords';
import AlertIcon from './AlertIcon';

interface RelatedKeywordsRankingProps {
  result: UseQueryResult<RelatedKeywords>;
}

const RelatedKeywordsRanking = ({ result }: RelatedKeywordsRankingProps) => {
  const { data, isError } = result;

  return (
    <Card className="flex-1 h-[616px] p-30 flex-col">
      <div className="body-lg-semibold">키워드 연관 검색 Top 10</div>

      <div className="bg-line-30 w-full h-[0.5px] mt-15 mb-30" />

      {isError || !data ? (
        <div className="w-full flex-1 flex flex-col justify-center items-center">
          <AlertIcon />
          <div className="mt-9">
            <p>에러가 발생하였습니다.</p>
          </div>
        </div>
      ) : data.suggestions.length === 0 ? (
        <div className="w-full flex-1 flex flex-col justify-center items-center">
          <AlertIcon />
          <div className="flex flex-col gap-2 items-center mt-9">
            <p className="body-md-regular text-font-30">
              표시할 데이터가 없습니다.
            </p>
            <p className="body-sm-regular text-font-20">
              데이터가 부족하여 표시되지 않습니다.
              <br />
              다른 키워드를 검색해 주세요.
            </p>
          </div>
        </div>
      ) : (
        <ul className="w-full flex-1 flex flex-col justify-between">
          {data.suggestions.map((item, idx) => (
            <li key={`item-${idx}`} className="w-full">
              <Flex gap={15} className="w-full body-md-regular">
                <span>{idx + 1}</span>
                <span className="block flex-1">{item}</span>
              </Flex>
              <div className="bg-line-10 w-full h-[0.5px]" />
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};

export default RelatedKeywordsRanking;
