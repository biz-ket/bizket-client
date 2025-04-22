import { useState } from 'react';
import CalendarIcon from '../../icons/CalendarIcon';
import Card from '../shared/Card';
import { DateRange, DayPicker } from 'react-day-picker';
import { formatDate } from '@/shared/utils/formatDate';

const DateRangePicker = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selected, setSelected] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  return (
    <Card className="w-full h-full justify-center items-center pl-15 pr-35 gap-[30px] relative">
      <CalendarIcon fill="#CFCFCF" />
      <div
        className="flex-1 flex flex-row justify-between cursor-pointer body-lg-regular text-font-40"
        onClick={() => setShowDatePicker((prev) => !prev)}
      >
        <span>{selected?.from ? formatDate(selected.from) : ''}</span>
        <span>~</span>
        <div>{selected?.to ? formatDate(selected.to) : ''}</div>
      </div>
      {showDatePicker && (
        <Card className="absolute left-1/2 -translate-x-1/2 top-full p-10">
          <DayPicker
            mode="range"
            selected={selected}
            onSelect={(selected) => setSelected(selected)}
          />
        </Card>
      )}
    </Card>
  );
};

export default DateRangePicker;
