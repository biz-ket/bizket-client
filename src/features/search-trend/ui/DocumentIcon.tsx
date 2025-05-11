import { IconProps } from '@/shared/types/iconType';

const DocumentIcon = ({ width, height, fill }: IconProps) => {
  return (
    <svg
      width={width || '18'}
      height={height || '22'}
      viewBox="0 0 18 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={fill || "#FF9000"}
        fillRule="evenodd"
        d="M8.813.55a.55.55 0 0 0-.55-.55h-3.85a4.4 4.4 0 0 0-4.4 4.4v13.2a4.4 4.4 0 0 0 4.4 4.4h8.8a4.4 4.4 0 0 0 4.4-4.4V9.35a.55.55 0 0 0-.55-.55h-2.75a5.5 5.5 0 0 1-5.5-5.5V.55Zm7.941 6.05c.366 0 .629-.353.453-.674a3.298 3.298 0 0 0-.56-.748L12.434.967a3.302 3.302 0 0 0-.748-.561c-.321-.176-.674.087-.674.453V3.3a3.3 3.3 0 0 0 3.3 3.3h2.441Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default DocumentIcon;
