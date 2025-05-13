'use client';

import Flex from '@/shared/ui/layout/Flex';
import { useState } from 'react';
import SearchIcon from '@/shared/ui/icons/SearchIcon';
import GenerationList from './GenerationList';
import { useDebounce } from '@/shared/hooks/useDebounce';

const GenerationHistory = () => {
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword, 300);

  return (
    <section className="w-full mt-43 flex flex-col items-center">
      <Flex justify="between" align="center" className="w-full mb-30">
        <span className="title-xl-semibold">생성 이력</span>
        <Flex align='center' gap={12} className="w-[284px] pl-20 pr-18 py-10 bg-line-10 rounded-[30px]">
          <input
            type="text"
            placeholder="검색하려는 이력을 작성해주세요."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="flex-1 text-font-20 body-md-light bg-transparent"
          />
          <SearchIcon width="24" height="24" fill="#cfcfcf" />
        </Flex>
      </Flex>

      <GenerationList keyword={debouncedKeyword} />
    </section>
  );
};

export default GenerationHistory;
