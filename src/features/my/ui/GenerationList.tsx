import Flex from '@/shared/ui/layout/Flex';
import { memo, useCallback } from 'react';
import ArrowDownIcon from './ArrowDownIcon';
import Image from 'next/image';
import ContentsCard from './ContentsCard';
import { useGetMarketingHistoryQuery } from '@/shared/hooks/useGetMarketingHistoryQuery';

interface GenerationListProps {
  keyword: string;
}

const GenerationList = ({ keyword }: GenerationListProps) => {
  const { contents, isLoading, isError, hasNextPage, fetchNextPage } =
    useGetMarketingHistoryQuery(keyword);

  const fetchMore = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  if (isLoading) {
    // TODO: 로딩 컴포넌트로 대체
    return <p>로딩중</p>;
  }

  if (isError || contents === undefined) {
    // TODO: 에러 컴포넌트로 대체
    return <p>에러 발생!</p>;
  }

  if (contents.length === 0) {
    return (
      <div className="w-full h-[232px] flex flex-col gap-20 justify-center items-center">
        <Image
          width={100}
          height={110}
          src={'/images/create-marketing/no-history.png'}
          alt="생성이력x 이미지"
        />
        <Flex direction="col" gap={2} align="center">
          <p className="body-md-regular text-font-30">생성이력이 없습니다</p>
          <p className="text-center body-sm-regular text-font-20">
            마케팅 콘텐츠 생성 AI에서
            <br />
            간편하게 게시물을 생성해 보세요!
          </p>
        </Flex>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-20">
        {contents.map((contents) => (
          <ContentsCard
            key={`contents-${contents.id}`}
            contents={contents}
          />
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
