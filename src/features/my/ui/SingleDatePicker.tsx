'use client';

import { useState, useRef, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { DayPicker } from 'react-day-picker';
import Input from '@/shared/ui/input/Input';
import Card from '@/features/search-trend/ui/Card';
import CalendarIcon from '@/features/search-trend/ui/CalendarIcon';
import { formatDate } from '@/features/search-trend/utils/dateUtils';
import type { Control } from 'react-hook-form';
import type { ProfileFormValues } from '@/features/profile/schema';

interface SingleDatePickerProps {
  control: Control<ProfileFormValues>;
  name: 'startDate';
}

export default function SingleDatePicker({
  control,
  name,
}: SingleDatePickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (open && ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: true }}
      render={({ field: { value, onChange } }) => {
        const selectedDate = value as Date | undefined;

        return (
          <div className="relative w-full" ref={ref}>
            <Input
              readOnly
              value={selectedDate ? formatDate(selectedDate) : ''}
              placeholder="YYYY.MM.DD"
              onClick={() => setOpen((v) => !v)}
              className="cursor-pointer pr-12"
            />
            <div className="absolute inset-y-0 right-10 flex items-center pointer-events-none">
              <CalendarIcon fill={open ? '#FF7900' : '#CFCFCF'} />
            </div>

            {open && (
              <Card className="absolute top-full left-0 mt-2 z-50 px-20 py-10">
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    if (date) {
                      onChange(date); // Date 그대로 전달!
                      setOpen(false);
                    }
                  }}
                />
              </Card>
            )}
          </div>
        );
      }}
    />
  );
}
