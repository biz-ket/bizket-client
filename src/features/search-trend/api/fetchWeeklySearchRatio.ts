import { fetchApi } from '@/shared/utils/fetchApi';

export interface WeeklySearchRatio {
  keyword: string;
  ratioByDay: {
    MONDAY: number;
    TUESDAY: number;
    WEDNESDAY: number;
    THURSDAY: number;
    FRIDAY: number;
    SATURDAY: number;
    SUNDAY: number;
  };
}

export async function fetchWeeklySearchRatio(keyword: string) {
  const result = await fetchApi(`datalab/trends/${keyword}/weekday-ratio`, {
    method: 'GET',
  });
  return result as WeeklySearchRatio;
}
