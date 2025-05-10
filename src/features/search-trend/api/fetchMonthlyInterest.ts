import { fetchApi } from '@/shared/utils/fetchApi';

export interface MonthlyInterest {
  keyword: string;
  yearMonth: string;
  searchVolume: number;
};

export async function fetchMonthlyInterest(keyword: string) {
  const result = await fetchApi(`datalab/trends/${keyword}/monthly`, {
    method: 'GET',
  });
  return result as MonthlyInterest[];
}
