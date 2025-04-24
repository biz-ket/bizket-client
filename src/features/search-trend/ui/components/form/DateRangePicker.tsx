import { useState } from 'react';
import CalendarIcon from '../../icons/CalendarIcon';
import Card from '../shared/Card';
import { DayPicker } from 'react-day-picker';
import { formatDate } from '@/features/search-trend/utils/dateUtils';
import { Control, Controller } from 'react-hook-form';
import { TrendSearchFormValues } from '@/features/search-trend/model/types';

interface DateRangePickerProps {
  control: Control<TrendSearchFormValues, any, TrendSearchFormValues>;
}

const DateRangePicker = ({ control }: DateRangePickerProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <Controller
      control={control}
      name="dateRange"
      rules={{ required: true }}
      render={({ field: { value, onChange } }) => (
        <Card className="w-full h-full justify-center items-center pl-15 pr-35 gap-[30px] relative">
          <CalendarIcon fill="#CFCFCF" />
          <div
            className="flex-1 flex flex-row justify-between cursor-pointer body-lg-regular text-font-40"
            onClick={() => setShowDatePicker((prev) => !prev)}
          >
            <span className="block">{formatDate(value.from)}</span>
            <span className='block'>~</span>
            <span className="block">
              {value.to ? formatDate(value.to) : formatDate(value.from)}
            </span>
          </div>
          {showDatePicker && (
            <Card className="absolute left-1/2 -translate-x-1/2 top-full p-10">
              <DayPicker
                mode="range"
                selected={value}
                onSelect={(selected) => onChange(selected)}
              />
            </Card>
          )}
        </Card>
      )}
    />
  );
};

export default DateRangePicker;
