import { IconProps } from '@/shared/types/iconType';

const PieChartIcon = ({ width, height, fill }: IconProps) => {
  return (
    <svg
      width={width || '21'}
      height={height || '21'}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={fill || '#FF9000'}
        fillRule="evenodd"
        d="M10.532 3.648c0-1.122-.94-2.195-2.235-2.032a9.479 9.479 0 1 0 10.587 10.587c.162-1.295-.91-2.235-2.033-2.235h-5.266a1.053 1.053 0 0 1-1.053-1.054V3.648Z"
        clipRule="evenodd"
      />
      <path
        fill={fill || '#FF9000'}
        fillRule="evenodd"
        d="M14.914.018C13.8-.142 13 .788 13 1.735v5.28c0 .544.44.985.985.985h5.28c.947 0 1.877-.799 1.717-1.914A7.159 7.159 0 0 0 14.914.018Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default PieChartIcon;
