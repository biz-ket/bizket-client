import { UseQueryResult } from '@tanstack/react-query';
import DocumentIcon from './DocumentIcon';
import MetricCard from './MetricCard';
import { NewsSearchVolume } from '../api/fetchNewsSearchVolume';
import { formatNumber } from '../utils/formatNumber';

interface NewsSearchVolumeProps {
  result: UseQueryResult<NewsSearchVolume>;
}

const NewsSearchVolumeCard = ({ result }: NewsSearchVolumeProps) => {
  const { data, isError } = result;

  const metricData =
    isError || !data ? 'Error' : formatNumber(data.newsTotalCount);

  return (
    <MetricCard
      title="뉴스 검색량"
      description="*2025년 1월 기준"
      data={metricData}
      icon={<DocumentIcon />}
    />
  );
};

export default NewsSearchVolumeCard;
