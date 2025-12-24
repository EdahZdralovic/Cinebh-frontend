import { generateNext10Days } from '../../../utils/dateUtils.ts';
import DayDateButton from '../../buttons/DayDateButton.tsx';
import type { Filters } from '../../../types/Filters.ts';

interface DaysProjectionsProps {
  filters?: Filters;
  onChange?: (patch: Partial<Filters>) => void;
}
export function DaysProjections({}: DaysProjectionsProps) {
  const days = generateNext10Days();

  return (
    <section>
      <div className={'grid grid-cols-6 gap-4 '}>
        {days.map((day, index) => (
          <DayDateButton key={index} date={day} />
        ))}
      </div>
    </section>
  );
}
