import { IconProps } from '@/shared/types/iconType';

const HomeIcon = ({ width, height, fill }: IconProps) => {
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
        d="M2.6 6.2 8 2l5.4 4.2v6.6a1.2 1.2 0 0 1-1.2 1.2H3.8a1.2 1.2 0 0 1-1.2-1.2V6.2Z"
      />
      <path
        stroke={fill || 'black'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
        d="M6.2 14V8h3.6v6"
      />
    </svg>
  );
};

export default HomeIcon;
