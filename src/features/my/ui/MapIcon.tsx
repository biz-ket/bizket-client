import { IconProps } from '@/shared/types/iconType';

const MapIcon = ({ width, height, fill }: IconProps) => {
  return (
    <svg
      width={width || '16'}
      height={height || '16'}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke={fill || 'black'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
        d="M12.91 6.91C12.91 10.726 8 14 8 14s-4.909-3.273-4.909-7.09a4.91 4.91 0 0 1 9.818 0Z"
      />
      <path
        stroke={fill || 'black'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
        d="M8 8.546a1.636 1.636 0 1 0 0-3.273 1.636 1.636 0 0 0 0 3.273Z"
      />
    </svg>
  );
};

export default MapIcon;
