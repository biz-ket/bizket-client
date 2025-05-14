'use client';

import { useGetMarketingHistoryQuery } from '@/shared/hooks/useGetMarketingHistoryQuery';
import HistoryCard from '@/features/create-marketing/ui/HistoryCard';
import SearchIcon from '@/features/create-marketing/ui/SearchIcon';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useContentHistoryStore } from '@/shared/store/useContentHistoryStroe';
import Input from '@/shared/ui/input/Input';
import Flex from '@/shared/ui/layout/Flex';
import Image from 'next/image';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

const CreateHistory = () => {
  const [keyword, setKeyword] = useState('');
  const { id, setId } = useContentHistoryStore();
  const debounceKeyword = useDebounce(keyword, 300);

  const { contents, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetMarketingHistoryQuery(debounceKeyword);

  const handleChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    if (!contents || contents.length === 0 || id !== null) return;
    setId(contents[0].id);
  }, [contents, setId, id]);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [topVisible, setTopVisible] = useState(false);
  const [bottomVisible, setBottomVisible] = useState(true);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    setTopVisible(scrollTop > 0);
    setBottomVisible(scrollTop + clientHeight < scrollHeight - 1);

    if (
      scrollTop + clientHeight >= scrollHeight - 100 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    setTopVisible(el.scrollTop > 0);
    setBottomVisible(el.scrollTop + el.clientHeight < el.scrollHeight - 1);
  }, [contents]);

  return (
    <Flex direction="col" gap={30} className="relative w-full">
      {topVisible && (
        <div className="pointer-events-none absolute top-[114px] left-0 z-10 w-full h-50 bg-gradient-to-b from-white to-transparent" />
      )}

      {bottomVisible && (
        <div className="absolute bottom-0 left-0 z-10 w-full pointer-events-none h-50 bg-gradient-to-t from-white to-[rgba(255,255,255,0.6)]" />
      )}

      <Flex direction="col" gap={14} className="w-full">
        <h3 className="body-md-regular text-font-40">생성이력</h3>
        <div className="relative w-full">
          <Input
            placeholder="검색하려는 이력을 작성해 주세요."
            onChange={handleChangeKeyword}
            value={keyword}
          />
          <button className="absolute -translate-y-1/2 top-1/2 right-18">
            <SearchIcon />
          </button>
        </div>
      </Flex>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="relative z-0 w-[calc(100%+6px)] h-[730px] overflow-y-auto bg-white"
      >
        <Flex direction="col" gap={24} className="w-full">
          {contents ? (
            contents.map((item) => <HistoryCard key={item.id} data={item} />)
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
                alt="생성이력 없음"
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
          {isFetchingNextPage && (
            <Flex justify="center" align="center" className="w-full py-10">
              <Image
                width={100}
                height={60}
                src="/images/shared/loading_ui.gif"
                alt="로딩중"
              />
            </Flex>
          )}
        </Flex>
      </div>
    </Flex>
  );
};

export default CreateHistory;
