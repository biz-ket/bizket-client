import { useGetMarketingHistoryQuery } from '@/features/create-marketing/hooks/useGetMarketingHistoryQuery';
import HistoryCard from '@/features/create-marketing/ui/HistoryCard';
import SearchIcon from '@/features/create-marketing/ui/SearchIcon';
import Input from '@/shared/ui/input/Input';
import Flex from '@/shared/ui/layout/Flex';

const CreateHistory = () => {
  const { data: marketingHistory } = useGetMarketingHistoryQuery();

  console.log(marketingHistory);

  return (
    <Flex direction="col" gap={30} className="w-full">
      <Flex direction="col" gap={14} className="w-full">
        <h3 className="body-md-regular text-font-40">생성이력</h3>
        <div className="relative w-full">
          <Input placeholder="검색하려는 이력을 작성해 주세요." />
          <button className="absolute -translate-y-1/2 top-1/2 right-18">
            <SearchIcon />
          </button>
        </div>
      </Flex>
      <Flex
        direction="col"
        gap={24}
        className="w-[calc(100%+6px)] h-[730px] overflow-y-auto"
      >
        {marketingHistory?.map((data, index) => (
          <HistoryCard key={'history' + index} data={data} />
        ))}
      </Flex>
    </Flex>
  );
};

export default CreateHistory;
