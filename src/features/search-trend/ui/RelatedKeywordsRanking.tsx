'use client';

import Flex from '@/shared/ui/layout/Flex';
import Card from './Card';
import ArrowDownIcon from './ArrowDownIcon';

const data: {
  name: string;
  value: number;
}[] = [
  { name: '중국 희토류 수출 금지', value: 20 },
  { name: '희토류 자석석', value: 740 },
  { name: '미국 희토류 관련주', value: 960 },
  { name: '미국 희토류', value: 1190 },
  { name: '중국 희토류 관련주', value: 1290 },
  { name: '희토류 대장주', value: 1520 },
  { name: '희토류 용도', value: 3320 },
  { name: '희토류 뜻', value: 11700 },
  { name: '중국 희토류', value: 11900 },
  { name: '희토류 관련주', value: 29400 },
];

const RelatedKeywordsRanking = () => {
  const onClickExpandButton = () => {
    // 더 많은 연관키워드 보기
  };

  return (
    <Card className="flex-1 h-[616px] p-30 flex-col items-center">
      <Flex align="center" className="w-full">
        <span className="block flex-1 body-lg-semibold">연관 키워드</span>
        <span className="body-md-regular text-font-40">월간 검색량(Total)</span>
      </Flex>

      <div className="bg-line-30 w-full h-[0.5px] mt-15 mb-30" />

      <ul className="w-full flex-1 flex flex-col justify-between">
        {data.map((item, idx) => (
          <li key={`item-${idx}`} className="w-full">
            <Flex gap={15} className="w-full body-md-regular">
              <span>{idx + 1}</span>
              <span className="block flex-1">{item.name}</span>
              <span className="text-font-20">
                {item.value.toLocaleString()}
              </span>
            </Flex>
            <div className="bg-line-10 w-full h-[0.5px]" />
          </li>
        ))}
      </ul>

      <button
        className="flex gap-6 items-center mt-25"
        onClick={onClickExpandButton}
      >
        <span className="text-primary-50">더 많은 연관키워드 보기</span>
        <ArrowDownIcon fill="#FF7900" />
      </button>
    </Card>
  );
};

export default RelatedKeywordsRanking;
