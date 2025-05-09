import { MarketingHistoryResponse } from '@/features/create-marketing/types/apiType';
import HistoryTag from '@/features/create-marketing/ui/HistoryTag';
import XIcon from '@/features/create-marketing/ui/XIcon';
import Flex from '@/shared/ui/layout/Flex';
import { MouseEvent } from 'react';

interface HistoryCardProps {
  data: MarketingHistoryResponse;
}

const HistoryCard = ({ data }: HistoryCardProps) => {
  const handleClickCard = () => {
    console.log('카드 클릭');
  };

  const handleClickDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log('삭제');
  };

  return (
    <div
      onClick={handleClickCard}
      className="w-full px-32 border cursor-pointer rounded-10 py-25 border-line-30"
    >
      <Flex direction="col" gap={34} className="relative w-full">
        <Flex direction="col" gap={12} className="w-full">
          <h4 className="title-sm text-font-60 w-[300px] truncate">
            {data.generatedContent}
          </h4>
          <Flex align="center" gap={6}>
            {data.hashtags.map((tag: string) => (
              <HistoryTag key={tag} tag={tag} />
            ))}
          </Flex>
          <button
            onClick={handleClickDelete}
            className="absolute top-0 right-0 z-10"
          >
            <XIcon />
          </button>
        </Flex>
        <Flex direction="col" gap={10} className="w-full">
          <p className="body-sm-light text-font-40">{data.generatedContent}</p>
          <p className="body-sm-light text-font-20">{data.createdAt}</p>
        </Flex>
      </Flex>
    </div>
  );
};

export default HistoryCard;
