import { UseQueryResult } from '@tanstack/react-query';
import MetricCard from './MetricCard';
import { ContentsSaturation } from '../api/fetchContentsSaturation';
import ShinySearchIcon from './ShinySearchIcon';
import { formatNumber } from '../utils/formatNumber';

interface ContentsSaturationCardProps {
  result: UseQueryResult<ContentsSaturation>;
}

const ContentsSaturationCard = ({ result }: ContentsSaturationCardProps) => {
  const { data, isError } = result;

  const metricData =
    isError || !data ? 'Error' : formatNumber(data.overallSaturationIndex);

  return (
    <MetricCard
      title="콘텐츠 포화 지수"
      subtitle="(블로그+뉴스)"
      description="*2025년 1월 기준"
      data={metricData}
      icon={<ShinySearchIcon />}
    />
  );
};

export default ContentsSaturationCard;
