import Flex from '@/shared/ui/layout/Flex';
import SearchIcon from '../../icons/SearchIcon';

const SearchInput = () => {
  return (
    <Flex
      className="bg-white w-[793px] h-[75px] rounded-[100px] px-38 mt-30"
      align="center"
    >
      <input
        placeholder="검색할 트렌드 키워드를 입력하세요"
        className="flex-1 body-xl-regular"
        name='keyword'
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

export default SearchInput;
