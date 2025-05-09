'use client';

import Flex from '@/shared/ui/layout/Flex';
import Card from './Card';

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
  return (
    <Card className="flex-1 h-[616px] p-30 flex-col">
      <div className="body-lg-semibold">
        키워드 연관 검색 Top 10
      </div>

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
    </Card>
  );
};

export default RelatedKeywordsRanking;
