import SearchInput from './KeywordInput';
import SearchFilters from './SearchFilters';
import SearchHistory from './SearchHistory';

const SearchForm = () => {
  return (
    <section className="flex flex-col items-center">
      <h2 className="heading-md text-center">트렌드 키워드 찾기</h2>
      <SearchInput />
      <SearchHistory />
      <SearchFilters />
    </section>
  );
};

export default SearchForm;
