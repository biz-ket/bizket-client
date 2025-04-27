import { IconProps } from '@/shared/types/iconType';

const SearchIcon = ({ width, height, fill }: IconProps) => {
  return (
    <svg
      width={width || '23'}
      height={height || '23'}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.24 10.12a9.12 9.12 0 1 1-18.24 0 9.12 9.12 0 0 1 18.24 0Z"
        stroke={fill || 'black'}
        strokeWidth="2"
      />
      <path
        d="m17 17 4 4"
        stroke={fill || 'black'}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default SearchIcon;
