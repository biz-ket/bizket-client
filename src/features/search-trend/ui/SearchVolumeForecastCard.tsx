import { UseQueryResult } from '@tanstack/react-query';
import MetricCard from './MetricCard';
import { SearchVolumeForecast } from '../api/fetchSearchVolumeForecast';
import PieChartIcon from './PieChartIcon';
import { formatNumber } from '../utils/formatNumber';

interface SearchVolumeForecastCardProps {
  result: UseQueryResult<SearchVolumeForecast>;
}

const SearchVolumeForecastCard = ({
  result,
}: SearchVolumeForecastCardProps) => {
  const { data, isError } = result;

  const metricData =
    isError || !data ? 'Error' : `${formatNumber(data.changePercent)}%`;

  return (
    <MetricCard
      title="다음달 검색 예측 비율"
      description="*2025년 1월 기준"
      data={metricData}
      icon={<PieChartIcon />}
    />
  );
};

export default SearchVolumeForecastCard;
