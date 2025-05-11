import { IconProps } from '@/shared/types/iconType';

interface ShinySearchIconProps extends IconProps {
  sparkleColor?: string;
}

const ShinySearchIcon = ({
  width,
  height,
  fill,
  sparkleColor,
}: ShinySearchIconProps) => {
  return (
    <svg
      width={width || '21'}
      height={height || '20'}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke={fill || '#FF9000'}
        strokeLinecap="round"
        strokeWidth="4"
        d="m13.25 12.75 4.875 4.875"
      />
      <circle cx="9.291" cy="9.5" r="9.299" fill={fill || '#FF9000'} />
      <path
        stroke={sparkleColor || '#FFEFE4'}
        strokeLinecap="round"
        strokeWidth="2.12"
        d="M4.367 9.5a4.924 4.924 0 0 1 4.924-4.924"
      />
    </svg>
  );
};

export default ShinySearchIcon;
