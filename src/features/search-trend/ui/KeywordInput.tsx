import Flex from '@/shared/ui/layout/Flex';
import SearchIcon from './SearchIcon';
import { Control, useController } from 'react-hook-form';
import { TrendSearchFormValues } from '@/features/search-trend/model/types';

interface KeywordInputProps {
  control: Control<TrendSearchFormValues, any, TrendSearchFormValues>;
}

const KeywordInput = ({ control }: KeywordInputProps) => {
  const { field } = useController<TrendSearchFormValues, 'keyword'>({
    name: 'keyword',
    control,
    rules: { required: true },
  });

  return (
    <Flex
      className="bg-white w-full h-[75px] rounded-[100px] px-38"
      align="center"
    >
      <input
        {...field}
        placeholder="검색할 트렌드 키워드를 입력하세요"
        className="flex-1 body-xl-regular"
        type="text"
      />
      <Flex
        className="bg-primary-50 w-[39px] h-[39px] rounded-[50%]"
        justify="center"
        align="center"
      >
        <SearchIcon fill="white" />
      </Flex>
    </Flex>
  );
};

export default KeywordInput;
