'use client';

import { useGetMarketingHistoryQuery } from '@/features/create-marketing/hooks/useGetMarketingHistoryQuery';
import HistoryCard from '@/features/create-marketing/ui/HistoryCard';
import SearchIcon from '@/features/create-marketing/ui/SearchIcon';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useContentHistoryStore } from '@/shared/store/useContentHistoryStroe';
import Input from '@/shared/ui/input/Input';
import Flex from '@/shared/ui/layout/Flex';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';

const CreateHistory = () => {
  const [keyword, setKeyword] = useState('');
  const { setId } = useContentHistoryStore();
  const debounceKeyword = useDebounce(keyword, 300);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetMarketingHistoryQuery(debounceKeyword);

  const handleChagneKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    if (!data) return;

    setId(data?.pages[0].content[0].id);
  }, [data, setId]);

  return (
    <Flex direction="col" gap={30} className="w-full">
      <Flex direction="col" gap={14} className="w-full">
        <h3 className="body-md-regular text-font-40">생성이력</h3>
        <div className="relative w-full">
          <Input
            placeholder="검색하려는 이력을 작성해 주세요."
            onChange={handleChagneKeyword}
          />
          <button className="absolute -translate-y-1/2 top-1/2 right-18">
            <SearchIcon />
          </button>
        </div>
      </Flex>

      <div
        className="w-[calc(100%+6px)] h-[730px] overflow-y-auto"
        onScroll={(e) => {
          const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
          if (
            scrollTop + clientHeight >= scrollHeight - 100 &&
            hasNextPage &&
            !isFetchingNextPage
          ) {
            fetchNextPage();
          }
        }}
      >
        <Flex direction="col" gap={24} className="w-full">
          {data?.pages && data?.pages.length > 0 ? (
            data?.pages.flatMap((page) =>
              page.content.map((item) => (
                <HistoryCard key={item.id} data={item} />
              )),
            )
          ) : (
            <Flex
              direction="col"
              gap={20}
              align="center"
              className="w-full py-100"
            >
              <Image
                width={100}
                height={110}
                src={'/images/create-marketing/no-history.png'}
                alt="생성이력x 이미지지"
              />
              <Flex direction="col" gap={2} align="center">
                <p className="body-md-regular text-font-30">
                  생성이력이 없습니다
                </p>
                <p className="text-center body-sm-regular text-font-20">
                  콘텐츠 생성하기에서 간편하게
                  <br />
                  게시물을 생성해 보세요!
                </p>
              </Flex>
            </Flex>
          )}
          {isFetchingNextPage && <div>로딩 중...</div>}
        </Flex>
      </div>
    </Flex>
  );
};

export default CreateHistory;
