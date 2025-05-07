import Flex from '@/shared/ui/layout/Flex';
import useGenerationQuery from '../hooks/useGenerationQuery';
import { ReactNode, useCallback } from 'react';
import clsx from 'clsx';
import ArrowDownIcon from './ArrowDownIcon';

interface GenerationListProps {
  keyword: string;
}

const GenerationList = ({ keyword }: GenerationListProps) => {
  const { generations, isLoading, isError, hasNextPage, fetchNextPage } =
    useGenerationQuery({ keyword });

  const fetchMore = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  if (isLoading) {
    // TODO: 로딩 컴포넌트로 대체
    return <></>;
  }

  if (isError) {
    // TODO: 에러 컴포넌트로 대체
    return <></>;
  }

  if (generations.length === 0) {
    return (
      <div className="w-full h-[232px] flex justify-center items-center">
        <p>생성 이력이 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-20">
        {generations.map((generation, idx) => (
          <div
            key={`creation-${idx}`}
            className="w-full h-[232px] px-32 py-35 border border-line-20 rounded-20 shadow-[0px_2px_5px_0px_rgba(0,0,0,0.06)]"
          >
            <div>
              <span className="title-sm">{generation.title}</span>
              <Flex gap={6} className="text-white mt-12">
                <Chip className="bg-black rounded-20">마케팅 콘텐츠</Chip>
                <Chip className="bg-[#F67824]">{generation.platform}</Chip>
              </Flex>
            </div>
            <div className="mt-28">
              <p className="text-font-40 body-sm-light">{generation.prompt}</p>
            </div>
          </div>
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

interface ChipProps {
  children: ReactNode;
  className?: string;
}

const Chip = ({ children, className }: ChipProps) => {
  return (
    <div
      className={clsx(
        'rounded-20 px-10 py-6 text-white label-sm-semibold',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default GenerationList;
