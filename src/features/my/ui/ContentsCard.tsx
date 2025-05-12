import { useContentHistoryStore } from '@/shared/store/useContentHistoryStroe';
import { MarketingContentsGeneration } from '../model/types';
import { useRouter } from 'next/navigation';
import { ReactNode, useCallback } from 'react';
import Flex from '@/shared/ui/layout/Flex';
import clsx from 'clsx';
import { useTabStore } from '@/shared/store/useTabStore';

interface ContentsCardProps {
  contents: MarketingContentsGeneration;
}

const ContentsCard = ({ contents }: ContentsCardProps) => {
  const { setId } = useContentHistoryStore();
  const { setActiveTab } = useTabStore();
  const router = useRouter();

  const onClickCard = useCallback(() => {
    setId(contents.id);
    setActiveTab('history');
    router.push('/create');
  }, [router, setId, contents, setActiveTab]);

  return (
    <div
      className="w-full h-[232px] px-32 py-35 border border-line-20 rounded-20 shadow-[0px_2px_5px_0px_rgba(0,0,0,0.06)] cursor-pointer"
      onClick={onClickCard}
    >
      <div className="w-full">
        <span className="block w-full overflow-hidden whitespace-nowrap text-ellipsis title-sm">
          {contents.generatedContent}
        </span>
        <Flex gap={6} className="text-white mt-12">
          <Chip className="bg-black rounded-20">마케팅 콘텐츠</Chip>
          {contents.platform && (
            <Chip className="bg-[#F67824]">{contents.platform}</Chip>
          )}
        </Flex>
      </div>
      <div className="mt-28">
        <p className="text-font-40 body-sm-light">{contents.prompt}</p>
      </div>
    </div>
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

export default ContentsCard;
