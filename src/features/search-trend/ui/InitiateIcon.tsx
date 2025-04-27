import { IconProps } from '@/shared/types/iconType';

const InitiateIcon = ({ width, height, fill }: IconProps) => {
  return (
    <svg
      width={width || '17'}
      height={height || '17'}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#a)">
        <path
          d="m13.458 5.667-2.833 2.834h2.125a4.253 4.253 0 0 1-4.25 4.25 4.158 4.158 0 0 1-1.984-.496l-1.034 1.034a5.618 5.618 0 0 0 3.018.878 5.665 5.665 0 0 0 5.666-5.666h2.125l-2.833-2.834ZM4.25 8.501A4.253 4.253 0 0 1 8.5 4.25c.715 0 1.395.177 1.983.495l1.034-1.034A5.618 5.618 0 0 0 8.5 2.834a5.665 5.665 0 0 0-5.667 5.667H.708l2.833 2.833 2.834-2.833H4.25Z"
          fill={fill || 'black'}
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h17v17H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default InitiateIcon;
