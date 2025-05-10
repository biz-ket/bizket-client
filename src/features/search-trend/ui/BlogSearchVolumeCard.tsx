import { UseQueryResult } from '@tanstack/react-query';
import MetricCard from './MetricCard';
import PencilIcon from './PencilIcon';
import { BlogSearchVolume } from '../api/fetchBlogSearchVolume';
import { formatNumber } from '../utils/formatNumber';

interface BlogSearchVolumeProps {
  result: UseQueryResult<BlogSearchVolume>;
}

const BlogSearchVolumeCard = ({ result }: BlogSearchVolumeProps) => {
  const { data, isError } = result;

  const metricData =
    isError || !data ? 'Error' : formatNumber(data.blogTotalCount);

  return (
    <MetricCard
      title="블로그 검색량"
      description="*2025년 1월 기준"
      data={metricData}
      icon={<PencilIcon />}
    />
  );
};

export default BlogSearchVolumeCard;
