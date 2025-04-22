import Flex from '@/shared/ui/layout/Flex';
import Card from '../shared/Card';

const SearchResultMetrics = () => {
  return (
    <div className="w-full grid grid-cols-4 gap-[20px]">
      <MetricCard
        name="월간 검색량"
        data={{
          total: 57300,
          pc: 102000,
          mobile: 471000,
        }}
      />

      <MetricCard
        name="월간 콘텐츠 발생량"
        data={{
          total: 13000,
          pc: 102000,
          mobile: 471000,
        }}
      />

      <MetricCard
        name="4월 예상 검색량"
        data={{
          total: 126000,
          pc: 102000,
          mobile: 471000,
        }}
      />

      <MetricCard
        name="콘텐츠 포화 지수"
        data={{
          total: 268000,
          pc: 102000,
          mobile: 471000,
        }}
      />
    </div>
  );
};

interface MetricCardProps {
  name: string;
  data: {
    total: number;
    pc: number;
    mobile: number;
  };
}

const MetricCard = ({ name, data }: MetricCardProps) => {
  return (
    <Card className="flex flex-col px-[26px] py-[22px]">
      <div className="body-lg-regular w-full mb-16">{name}</div>
      <Flex direction="col" gap={12} className="w-full">
        <Flex className="w-full">
          <span className="block flex-1 title-xl2-semibold">
            {data.total.toLocaleString()}
          </span>
          <span className="body-lg-regular">Total</span>
        </Flex>
        <div className="bg-line-10 w-full h-1" />
        <Flex gap={31}>
          <Flex gap={6}>
            <span className="body-md-regular text-font-20">PC</span>
            <span className="body-md-regular">{data.pc.toLocaleString()}</span>
          </Flex>
          <Flex gap={6}>
            <span className="body-md-regular text-font-20">Mobile</span>
            <span className="body-md-regular">
              {data.mobile.toLocaleString()}
            </span>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default SearchResultMetrics;
