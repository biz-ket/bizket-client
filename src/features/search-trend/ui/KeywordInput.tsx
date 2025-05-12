import { Control, useController } from 'react-hook-form';
import { TrendSearchFormValues } from '@/features/search-trend/model/types';

interface KeywordInputProps {
  control: Control<TrendSearchFormValues, any, TrendSearchFormValues>;
}

const KeywordInput = ({ control }: KeywordInputProps) => {
  const { field } = useController<TrendSearchFormValues, 'keyword'>({
    name: 'keyword',
    control,
    rules: { required: true },
  });

  return (
    <input
      {...field}
      placeholder="검색할 트렌드 키워드를 입력하세요"
      className="flex-1 body-xl-regular placeholder:text-line-40"
      type="text"
    />
  );
};

export default KeywordInput;
