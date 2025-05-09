import { IconProps } from '@/shared/types/iconType';

const DocumentIcon = ({ width, height, fill }: IconProps) => {
  return (
    <svg
      width={width || '16'}
      height={height || '19'}
      viewBox="0 0 16 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke={fill || 'black'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
        d="M9.735.934H2.907A1.707 1.707 0 0 0 1.2 2.64v13.656a1.707 1.707 0 0 0 1.707 1.707H13.15a1.707 1.707 0 0 0 1.707-1.707V6.055L9.735.934Z"
      />
      <path
        stroke={fill || 'black'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
        d="M9.735.934v5.12h5.122M11.442 10.322H4.614M11.442 13.736H4.614M6.321 6.908H4.614"
      />
    </svg>
  );
};

export default DocumentIcon;
