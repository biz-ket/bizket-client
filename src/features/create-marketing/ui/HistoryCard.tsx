import { useDeleteMarketingMutation } from '@/features/create-marketing/hooks/useDeleteMarketingMutation';
import { MarketingHistoryItem } from '@/features/create-marketing/types/apiType';
import HistoryTag from '@/features/create-marketing/ui/HistoryTag';
import XIcon from '@/features/create-marketing/ui/XIcon';
import { useContentHistoryStore } from '@/shared/store/useContentHistoryStroe';
import Flex from '@/shared/ui/layout/Flex';
import CheckDeleteModal from '@/shared/ui/modal/CheckDeleteModal';
import { formatDate } from '@/shared/utils/formatDate';
import clsx from 'clsx';
import { MouseEvent, useState, forwardRef, ForwardedRef } from 'react';

interface HistoryCardProps {
  data: MarketingHistoryItem;
}

const HistoryCard = forwardRef<HTMLDivElement, HistoryCardProps>(
  ({ data }, ref: ForwardedRef<HTMLDivElement>) => {
    const { id, setId } = useContentHistoryStore();
    const [isOpen, setIsOpen] = useState(false);
    const [historyId, setHistoryId] = useState<number | null>(null);

    const { mutate: deleteHistoryMutate } = useDeleteMarketingMutation();

    const handleClickCard = () => {
      setId(data.id);
    };

    const handleOpenModal = (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setIsOpen(true);
      setHistoryId(data.id);
    };

    const handleCloseModal = () => {
      setIsOpen(false);
    };

    const handleClickDelete = () => {
      deleteHistoryMutate(historyId);
      setIsOpen(false);
    };

    return (
      <div
        ref={ref}
        onClick={handleClickCard}
        className={clsx(
          'w-full px-32 border cursor-pointer rounded-10 py-25',
          data.id === id ? 'border-primary-60' : 'border-line-30',
        )}
      >
        <Flex direction="col" gap={34} className="relative w-full">
          <Flex direction="col" gap={12} className="w-full">
            <h4 className="title-sm text-font-60 w-[300px] truncate">
              {data.generatedContent}
            </h4>
            <Flex align="center" gap={6}>
              <HistoryTag tag="마케팅 콘텐츠" />
              {data.platform && (
                <HistoryTag
                  tag={data.platform === 'instagram' ? '인스타그램' : '스레드'}
                />
              )}
            </Flex>
            <button
              onClick={handleOpenModal}
              className="absolute top-0 right-0 z-10"
            >
              <XIcon />
            </button>
          </Flex>
          <Flex direction="col" gap={10} className="w-full">
            <p className="body-sm-light text-font-40">
              {data.generatedContent}
            </p>
            <p className="body-sm-light text-font-20">
              {formatDate(data.createdAt)}
            </p>
          </Flex>
        </Flex>
        {isOpen && (
          <CheckDeleteModal
            onDelete={handleClickDelete}
            onCancel={handleCloseModal}
          />
        )}
      </div>
    );
  },
);

HistoryCard.displayName = 'HistoryCard';

export default HistoryCard;
