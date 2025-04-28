import { IconProps } from '@/shared/types/iconType';

const ArrowDownIcon = ({ width, height, fill }: IconProps) => {
  return (
    <svg
      width={width || '16'}
      height={height || '9'}
      viewBox="0 0 16 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m1 1 7 7 7-7"
        stroke={fill || 'black'}
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ArrowDownIcon;
