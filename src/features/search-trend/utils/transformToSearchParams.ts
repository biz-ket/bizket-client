import { formatDate } from '@/features/search-trend/utils/dateUtils';
import {
  AgeCategory,
  Ages,
  IndexRange,
  TrendSearchFormValues,
  TrendSearchParams,
} from '../model/types';

const indexRangeToAges = (range: IndexRange) => {
  const { minIndex, maxIndex } = range;
  const minVal = minIndex + 1;
  const maxVal = maxIndex;
  const ages: Ages = [];
  for (let i = minVal; i <= maxVal; i += 1) {
    ages.push(`${i}` as AgeCategory);
  }
  return ages;
};

export function transformToSearchParams(
  formValues: TrendSearchFormValues,
): TrendSearchParams {
  const searchParams: TrendSearchParams = {
    keyword: formValues.keyword,
    startDate: formatDate(formValues.dateRange.from),
    endDate: formValues.dateRange.to
      ? formatDate(formValues.dateRange.to)
      : formatDate(formValues.dateRange.from),
    device: formValues.device === 'all' ? undefined : formValues.device,
    gender: formValues.gender === 'all' ? undefined : formValues.gender,
    ages: indexRangeToAges(formValues.ages),
  };
  return searchParams;
}
