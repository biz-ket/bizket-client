import AlertIcon from '@/features/create-marketing/ui/AlertIcon';
import Flex from '@/shared/ui/layout/Flex';

interface ContentTitleProps {
  title: string;
  isLogin?: boolean;
}

const ContentTitle = ({ title, isLogin }: ContentTitleProps) => {
  return (
    <h3 className="flex items-center gap-2 body-md-medium text-font-40">
      {title}
      {isLogin && (
        <Flex align="center">
          <AlertIcon />
          <span className="label-sm-medium text-font-20">회원전용</span>
        </Flex>
      )}
    </h3>
  );
};

export default ContentTitle;
