import Flex from '@/shared/ui/layout/Flex';
import clsx from 'clsx';

interface HistoryTagProps {
  tag: string;
}

const HistoryTag = ({ tag }: HistoryTagProps) => {
  return (
    <Flex
      justify="center"
      align="center"
      className={clsx(
        'label-sm-semibold text-white px-10 py-6 rounded-20',
        tag === '마케팅 콘텐츠' && 'bg-black',
        (tag === '인스타그램' || tag === '스레드') && 'bg-[#F67824]',
      )}
    >
      {tag}
    </Flex>
  );
};

export default HistoryTag;
