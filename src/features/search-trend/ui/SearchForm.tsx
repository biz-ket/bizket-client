import {
  TrendSearchFormValues,
  TrendSearchParams,
} from '@/features/search-trend/model/types';
import SearchInput from './KeywordInput';
import { useForm } from 'react-hook-form';
import { memo } from 'react';
import { transformToSearchParams } from '@/features/search-trend/utils/transformToSearchParams';
import { validateFormValues } from '@/features/search-trend/utils/validateFormValues';
import Image from 'next/image';
import Flex from '@/shared/ui/layout/Flex';
import SearchIcon from './SearchIcon';

interface SearchFormProps {
  onSearch: (searchParams: TrendSearchParams) => void;
}

const SearchForm = ({ onSearch }: SearchFormProps) => {
  const { control, handleSubmit } = useForm<TrendSearchFormValues>({
    defaultValues: {
      keyword: '',
    },
  });

  const onSubmit = (data: TrendSearchFormValues) => {
    if (!validateFormValues(data)) {
      return;
    }

    const transformedData = transformToSearchParams(data);
    onSearch(transformedData);
  };

  return (
    <section className="w-full h-[646px] relative bg-bg-10">
      <div className="w-[1200px] mx-auto relative">
        <div className="relative top-[134px]">
          <div className="relative w-fit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="81"
              height="29"
              fill="none"
            >
              <path
                fill="#FE9221"
                d="M2 28.945a2 2 0 0 1-2-2V2.003a2 2 0 0 1 2-2h76.155c1.579 0 2.535 1.745 1.686 3.076L73.258 13.4a2 2 0 0 0 0 2.151l6.583 10.32c.85 1.331-.107 3.075-1.686 3.075H2Z"
              />
            </svg>
            <span className="body-sm-semibold text-font-10 absolute left-[8.76px] top-[50%] -translate-y-1/2">
              Keyword
            </span>
          </div>
          <p className="heading-md mt-14">
            검색어 트렌드 찾고
            <br />
            마케팅 인사이트 얻기!
          </p>
          <p className="body-xl-regular text-font-30 mt-13">
            실시간 검색어 트렌드를 분석해 고객의 관심사를 파악하고,
            <br />더 똑똑한 마케팅 전략을 세워보세요!
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-65">
            <Flex
              className="bg-white w-[563px] h-60 rounded-[100px] pl-30 pr-18"
              align="center"
            >
              <SearchInput control={control} />

              <button
                type="submit"
                className="flex justify-center items-center bg-primary-50 w-34 h-34 rounded-[50%]"
              >
                <SearchIcon fill="white" width="20" height="20" />
              </button>
            </Flex>
          </form>
        </div>
        <Image
          src="/images/search-trend/chart.svg"
          alt="차트 이미지"
          className="absolute top-18 right-64"
          width={489}
          height={489}
        />
      </div>
    </section>
  );
};

export default memo(SearchForm);
