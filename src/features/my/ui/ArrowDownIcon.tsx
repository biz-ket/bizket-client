import { IconProps } from '@/shared/types/iconType';

const ArrowDownIcon = ({ width, height, fill }: IconProps) => {
  return (
    <svg
      width={width || '24'}
      height={height || '13'}
      viewBox="0 0 24 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path stroke={fill || 'black'} d="m2 1.5 10 10 10-10" />
      <path
        stroke={fill || 'black'}
        strokeLinecap="square"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m2 1.5 10 10 10-10"
      />
    </svg>
  );
};

export default ArrowDownIcon;
