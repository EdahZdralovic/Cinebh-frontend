import { useState } from 'react';
import DayDateButton from '../buttons/DayDateButton.tsx';
import type { Filters } from '../../utils/buildMovieParams.ts';

function generateNext10Days() {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 10; i++) {
    const d = new Date();
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
}
interface DateDaysProps {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
}

export default function DateDaysComponent({
  filters,
  onChange,
}: DateDaysProps) {
  const days = generateNext10Days();

  return (
    <section>
      <div className="flex justify-between pt-8 overflow-x-auto py-3">
        {days.map((day, index) => (
          <DayDateButton
            key={index}
            date={day}
            isActive={day.toISOString().split('T')[0] === filters.selectedDate}
            onClick={() => {
              onChange({
                selectedDate: day.toISOString().split('T')[0], // yyyy-mm-dd format
              });
            }}
          />
        ))}
      </div>
      <p className={'text-gray-500 text-[14px] '}>
        Quick reminder that our cinema schedule is on a ten-day update cycle.
      </p>
    </section>
  );
}
