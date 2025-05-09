import DocumentIcon from './DocumentIcon';
import MetricCard from './MetricCard';
import PencilIcon from './PencilIcon';
import PieChartIcon from './PieChartIcon';
import ShinySearchIcon from './ShinySearchIcon';

const SearchResultMetrics = () => {
  return (
    <div className="w-full grid grid-cols-4 gap-[20px]">
      <MetricCard
        title="블로그 검색량"
        description="*2025년 1월 기준"
        data={"268,000"}
        icon={<PencilIcon />}
      />

      <MetricCard
        title="뉴스 검색량"
        description="*2025년 1월 기준"
        data={"183,723"}
        icon={<DocumentIcon />}
      />

      <MetricCard
        title="다음달 검색 예측 비율"
        description="*2025년 1월 기준"
        data={'55.97%'}
        icon={<PieChartIcon />}
      />

      <MetricCard
        title="콘텐츠 포화 지수"
        subtitle="(블로그+뉴스)"
        description="*2025년 1월 기준"
        data={'183,000%'}
        icon={<ShinySearchIcon />}
      />
    </div>
  );
};

export default SearchResultMetrics;
