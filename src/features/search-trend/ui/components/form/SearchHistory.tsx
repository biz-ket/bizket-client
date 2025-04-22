import Flex from '@/shared/ui/layout/Flex';
import { ReactNode } from 'react';

const data = [
  '검색기록',
  '검색기록기록',
  '검색기록기록',
  '검색기록',
  '검색기록',
];

const SearchHistory = () => {
  return (
    <Flex align="center" gap={6} className="mt-15">
      <span className="body-lg-regular">검색기록 :</span>
      <Flex align="center" gap={6}>
        {data.map((content, idx) => (
          <KeywordBox key={`history-${idx}`}>{content}</KeywordBox>
        ))}
      </Flex>
    </Flex>
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
      className="bg-white body-md-regular text-20 border border-line-30 rounded-[100px] h-[39px] px-[13px]"
    >
      {children}
    </Flex>
  );
};

export default SearchHistory;
