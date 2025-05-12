'use client';

import { TrendSearchParams } from '@/features/search-trend/model/types';
import SearchForm from '@/features/search-trend/ui/SearchForm';
import SearchResult from '@/features/search-trend/ui/SearchResult';
import Container from '@/shared/ui/layout/Container';
import { useState } from 'react';

const SearchTrendPage = () => {
  const [searchParams, setSearchParams] = useState<TrendSearchParams | null>(
    null,
  );

  return (
    <div>
      <SearchForm onSearch={setSearchParams} />
      <Container>
        {searchParams && <SearchResult searchParams={searchParams} />}
      </Container>
    </div>
  );
};

export default SearchTrendPage;
