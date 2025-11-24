import DayDateButton from '../buttons/DayDateButton.tsx';
import type { Filters } from '../../types/Filters.ts';
import { generateNext10Days } from '../../utils/dateUtils.ts';

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
      <div className="lg:flex lg:justify-between sm:grid sm:grid-cols-5 grid grid-cols-4 gap-2 sm:pt-8 pt-4 min-w-[70px] overflow-x-auto py-3">
        {days.map((day, index) => (
          <DayDateButton
            key={index}
            date={day}
            isActive={day.toISOString().split('T')[0] === filters.selectedDate}
            onClick={() => {
              onChange({
                selectedDate: day.toISOString().split('T')[0],
              });
            }}
          />
        ))}
      </div>
      <p className={'text-gray-500 text-sm'}>
        Quick reminder that our cinema schedule is on a ten-day update cycle.
      </p>
    </section>
  );
}
