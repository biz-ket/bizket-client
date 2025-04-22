import SearchForm from '@/features/search-trend/ui/components/form/SearchForm';
import SearchResult from '@/features/search-trend/ui/components/result/SearchResult';
import Container from '@/shared/ui/layout/Container';

const SearchTrendPage = () => {
  return (
    <div className='bg-[url("/images/search-trend/background-image.png")] bg-contain bg-no-repeat py-[200px]'>
      <Container>
        <SearchForm />
        <SearchResult />
      </Container>
    </div>
  );
};

export default SearchTrendPage;
