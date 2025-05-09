import {
  TrendSearchFormValues,
  TrendSearchParams,
} from '../model/types';

export function transformToSearchParams(
  formValues: TrendSearchFormValues,
): TrendSearchParams {
  const searchParams: TrendSearchParams = {
    keyword: formValues.keyword,
  };
  return searchParams;
}
