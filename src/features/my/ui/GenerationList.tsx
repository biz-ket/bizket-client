import Flex from '@/shared/ui/layout/Flex';
import useGenerationQuery from '../hooks/useGenerationQuery';
import { ReactNode } from 'react';
import clsx from 'clsx';

interface GenerationListProps {
  keyword: string;
}

const GenerationList = ({ keyword }: GenerationListProps) => {
  const { data, isLoading, isError } =
    useGenerationQuery({ keyword });

  if (isLoading) {
    // TODO: 로딩 컴포넌트로 대체
    return <></>;
  }

  if (isError || data === undefined) {
    // TODO: 에러 컴포넌트로 대체
    return <></>;
  }

  if (data.length === 0) {
    return (
      <div className="w-full h-[232px] flex justify-center items-center">
        <p>생성 이력이 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-20">
        {data.map((generation, idx) => (
          <div
            key={`creation-${idx}`}
            className="w-full h-[232px] px-32 py-35 border border-line-20 rounded-20 shadow-[0px_2px_5px_0px_rgba(0,0,0,0.06)]"
          >
            <div className="w-full">
              <span className="block w-full overflow-hidden whitespace-nowrap text-ellipsis title-sm">
                {generation.generatedContent}
              </span>
              <Flex gap={6} className="text-white mt-12">
                <Chip className="bg-black rounded-20">마케팅 콘텐츠</Chip>
                <Chip className="bg-[#F67824]">{generation.platform}</Chip>
              </Flex>
            </div>
            <div className="mt-28">
              <p className="text-font-40 body-sm-light">
                {/* TODO: data.prompt로 대체 */}
                20대 여성의 말투로 메이크업 컨셉, 컬러 특징을 포함해서
                메이크업에 대한 설명을 간략히 작성해줘
              </p>
            </div>
          </div>
        ))}
      </div>
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
