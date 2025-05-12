import { IconProps } from '@/shared/types/iconType';

const UserIcon = ({ width, height, fill }: IconProps) => {
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
        d="M12.889 14V12.78a2.445 2.445 0 0 0-2.445-2.445H5.555a2.444 2.444 0 0 0-2.444 2.445V14M8 7.89A2.445 2.445 0 1 0 8 3a2.445 2.445 0 0 0 0 4.89Z"
      />
    </svg>
  );
};

export default UserIcon;
