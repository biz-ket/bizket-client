import { IconProps } from '@/shared/types/iconType';

const AlertIcon = ({ width, height, fill }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || '80'}
      height={height || '80'}
      fill="none"
    >
      <path
        stroke={fill || '#DDD'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="5"
        d="M34.3 12.865 6.068 60a6.667 6.667 0 0 0 5.7 10h56.467a6.666 6.666 0 0 0 5.7-10L45.7 12.865a6.668 6.668 0 0 0-11.4 0Z"
      />
      <path
        fill={fill || '#DDD'}
        d="M37.303 32.553a2 2 0 0 1 2-2.053h1.942a2 2 0 0 1 2 2.053l-.42 15.82a2 2 0 0 1-1.999 1.947h-1.104a2 2 0 0 1-2-1.947l-.419-15.82Zm2.97 26.58c-1.809 0-3.3-1.465-3.273-3.274-.027-1.796 1.465-3.26 3.274-3.26 1.754 0 3.273 1.465 3.287 3.26-.014 1.81-1.533 3.274-3.287 3.274Z"
      />
    </svg>
  );
};

export default AlertIcon;
