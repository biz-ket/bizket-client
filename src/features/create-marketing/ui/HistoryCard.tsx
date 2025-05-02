import HistoryTag from '@/features/create-marketing/ui/HistoryTag';
import XIcon from '@/features/create-marketing/ui/XIcon';
import Flex from '@/shared/ui/layout/Flex';

interface HistoryCardProps {
  data: any;
}

const HistoryCard = ({ data }: HistoryCardProps) => {
  return (
    <div className="w-full px-32 border rounded-10 py-25 border-line-30">
      <Flex direction="col" gap={34} className="relative w-full">
        <Flex direction="col" gap={12} className="w-full">
          <h4 className="title-sm text-font-60">{data.title}</h4>
          <Flex align="center" gap={6}>
            {data.tags.map((tag: string) => (
              <HistoryTag key={tag} tag={tag} />
            ))}
          </Flex>
          <button className="absolute top-0 right-0">
            <XIcon />
          </button>
        </Flex>
        <Flex direction="col" gap={10} className="w-full">
          <p className="body-sm-light text-font-40">{data.desc}</p>
          <p className="body-sm-light text-font-20">{data.date}</p>
        </Flex>
      </Flex>
    </div>
  );
};

export default HistoryCard;
