'use client';

import useSearchHistoryQuery from '@/features/search-trend/hooks/useSearchHistoryQuery';
import Flex from '@/shared/ui/layout/Flex';
import clsx from 'clsx';
import { ReactNode, useLayoutEffect, useRef } from 'react';

const SearchHistory = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { data } = useSearchHistoryQuery();

  // 가운데 정렬
  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const keywordBoxes = document.getElementsByClassName(
      'search_history_keyword_box',
    );
    if (keywordBoxes.length === 0) {
      return;
    }

    let maxRight = 0;
    for (const element of keywordBoxes) {
      maxRight = Math.max(maxRight, element.getBoundingClientRect().right);
    }
    const realWidth = maxRight - ref.current.getBoundingClientRect().left;
    ref.current.style.transform = `translateX(-${realWidth / 2}px)`;
  }, [data]);

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div
      ref={ref}
      className="flex items-start gap-6 max-w-full mt-15 mx-auto relative left-[50%] overflow-hidden"
    >
      <span className="body-lg-regular whitespace-nowrap inline-flex h-39 items-center">검색기록 :</span>
      <div className="flex flex-wrap gap-6">
        {data.map((content, idx) => (
          <KeywordBox key={`history-${idx}`}>{content}</KeywordBox>
        ))}
      </div>
    </div>
  );
};

interface KeywordBoxProps {
  children: ReactNode;
}

const KeywordBox = ({ children }: KeywordBoxProps) => {
  return (
    <Flex
      align="center"
      justify="center"
      className={clsx(
        'search_history_keyword_box',
        'bg-white body-md-regular text-20 border border-line-30 rounded-[100px] max-w-[350px] h-[39px] px-[13px]',
      )}
    >
      <span className="truncate">{children}</span>
    </Flex>
  );
};

export default SearchHistory;
