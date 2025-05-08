import { ReactNode } from 'react';

interface ContentTitleProps {
  title: string | ReactNode;
}

const ContentTitle = ({ title }: ContentTitleProps) => {
  return <h3 className="font-semibold text-black text-36">{title}</h3>;
};

export default ContentTitle;
