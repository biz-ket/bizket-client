import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

type ContentGeneration = {
  title: string;
  platform: string;
  prompt: string;
};

const sample: ContentGeneration[] = [
  {
    title: '모카무스 메이크업',
    platform: '인스타그램',
    prompt:
      '20대 여성의 말투로 메이크업 컨셉, 컬러 특징을 포함해서 메이크업에 대한 설명을 간략히 작성해줘',
  },
  {
    title: '프로필 촬영 메이크업',
    platform: '인스타그램',
    prompt:
      '20대 여성의 말투로 메이크업 컨셉, 컬러 특징을 포함해서 메이크업에 대한 설명을 간략히 작성해줘',
  },
  {
    title: '러블리 방송 메이크업',
    platform: '인스타그램',
    prompt:
      '20대 여성의 말투로 메이크업 컨셉, 컬러 특징을 포함해서 메이크업에 대한 설명을 간략히 작성해줘',
  },
  {
    title: '데일리 메이크업',
    platform: '인스타그램',
    prompt:
      '20대 여성의 말투로 메이크업 컨셉, 컬러 특징을 포함해서 메이크업에 대한 설명을 간략히 작성해줘',
  },
];

const limit = 4;

interface useGenerationQueryProps {
  keyword: string;
}

const useGenerationQuery = ({ keyword }: useGenerationQueryProps) => {
  const { data, isLoading, isError, hasNextPage, fetchNextPage, error } =
    useInfiniteQuery({
      queryKey: ['marketing-contents', keyword],
      queryFn: () => {
        // TODO: api 호출 코드로 변경
        return sample;
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, _, lastPageParam) => {
        if (lastPage.length < limit) {
          return undefined;
        }
        return lastPageParam + 1;
      },
    });

  const generations = useMemo(() => {
    if (!data) {
      return [];
    }

    let result: ContentGeneration[] = [];
    data.pages.forEach((page) => {
      result = [...result, ...page];
    });
    return result;
  }, [data]);

  return {
    generations,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
  };
};

export default useGenerationQuery;
