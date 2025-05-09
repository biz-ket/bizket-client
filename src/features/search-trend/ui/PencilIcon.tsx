import { IconProps } from '@/shared/types/iconType';

const PencilIcon = ({ width, height, fill }: IconProps) => {
  return (
    <svg
      width={width || '21'}
      height={height || '22'}
      viewBox="0 0 21 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={fill || "#FF9000"}
        d="m9.802 5.111 6.636 5.362c.16.129.187.364.062.528l-7.82 9.941a2.582 2.582 0 0 1-2.005 1.005L2.381 22a.49.49 0 0 1-.482-.383l-.976-4.244c-.17-.78 0-1.586.495-2.208l7.86-9.99a.368.368 0 0 1 .524-.064ZM19.454 6.968l-1.28 1.597a.366.366 0 0 1-.52.06c-1.555-1.26-5.537-4.49-6.642-5.384a.38.38 0 0 1-.053-.532l1.233-1.532c1.12-1.441 3.072-1.573 4.646-.317l1.81 1.44c.741.582 1.236 1.35 1.405 2.156.195.887-.013 1.758-.599 2.512Z"
      />
    </svg>
  );
};

export default PencilIcon;
