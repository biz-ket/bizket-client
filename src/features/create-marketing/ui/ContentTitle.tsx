interface ContentTitleProps {
  title: string;
}

const ContentTitle = ({ title }: ContentTitleProps) => {
  return <h3 className="body-md-medium text-font-40">{title}</h3>;
};

export default ContentTitle;
