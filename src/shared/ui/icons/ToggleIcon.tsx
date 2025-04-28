import { IconProps } from '@/shared/types/iconType';

const ToggleIcon = ({ fill }: IconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.6597 7.5C17.954 7.5 18.6407 9.02919 17.7808 9.99655L13.1211 15.2387C12.5244 15.91 11.4756 15.91 10.8789 15.2387L6.21915 9.99654C5.35928 9.02919 6.04599 7.5 7.34027 7.5L16.6597 7.5Z"
        fill={fill || '#DDDDDD'}
      />
    </svg>
  );
};

export default ToggleIcon;
