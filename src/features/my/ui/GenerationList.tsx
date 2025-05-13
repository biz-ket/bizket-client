import useGenerationQuery from '../hooks/useGenerationQuery';
import { memo, useCallback } from 'react';
import ArrowDownIcon from './ArrowDownIcon';
import ContentsCard from './ContentsCard';

interface GenerationListProps {
  keyword: string;
}

const GenerationList = ({ keyword }: GenerationListProps) => {
  const { generations, isLoading, isError, hasNextPage, fetchNextPage } =
    useGenerationQuery({
      keyword,
    });

  const fetchMore = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  if (isLoading) {
    // TODO: 로딩 컴포넌트로 대체
    return <p>로딩중</p>;
  }

  if (isError || generations === undefined) {
    // TODO: 에러 컴포넌트로 대체
    return <p>에러 발생!</p>;
  }

  if (generations.length === 0) {
    return (
      <div className="w-full h-[232px] flex justify-center items-center">
        <p>검색 결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-20">
        {generations.map((generation) => (
          <ContentsCard key={`contents-${generation.id}`} contents={generation} />
        ))}
      </div>

      {hasNextPage && (
        <button
          onClick={fetchMore}
          className="w-50 h-50 rounded-[50%] bg-[#F6F6F6] flex justify-center items-center mt-50"
        >
          <ArrowDownIcon fill="#D4D4D4" />
        </button>
      )}
    </>
  );
};

export default memo(GenerationList);
