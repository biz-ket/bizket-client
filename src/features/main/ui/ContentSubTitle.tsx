import { ReactNode } from 'react';

interface ContentSubTitleProps {
  title: string | ReactNode;
  fontSize?: number;
}

const ContentSubTitle = ({ title, fontSize }: ContentSubTitleProps) => {
  return (
    <h4
      style={{ fontSize: fontSize ? `${fontSize}px` : '18px' }}
      className="font-normal text-[#999]"
    >
      {title}
    </h4>
  );
};

export default ContentSubTitle;
