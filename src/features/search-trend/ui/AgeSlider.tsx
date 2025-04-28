import { Control, Controller } from 'react-hook-form';
import RangeSlider from './RangeSlider';
import { TrendSearchFormValues } from '@/features/search-trend/model/types';
import { AGE_RANGE_LABELS } from '@/features/search-trend/model/constants';

interface AgeSliderProps {
  control: Control<TrendSearchFormValues, any, TrendSearchFormValues>;
}

const AgeSlider = ({ control }: AgeSliderProps) => {
  return (
    <Controller
      control={control}
      name="ages"
      rules={{ required: true }}
      render={({ field: { value, onChange } }) => (
        <RangeSlider
          value={value}
          onValueChange={(value) => onChange(value)}
          range={AGE_RANGE_LABELS}
        />
      )}
    />
  );
};

export default AgeSlider;
