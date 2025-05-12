import { fetchApi } from '@/shared/utils/fetchApi';

export interface SearchVolumeForecast {
  keyword: string;
  forecastMonth: string;
  changePercent: number;
  trendLabel: string;
}

export async function fetchSearchVolumeForecast(keyword: string) {
  const result = await fetchApi(`datalab/trends/${keyword}/forecast-friendly`, {
    method: 'GET',
  });
  return result as SearchVolumeForecast;
}
