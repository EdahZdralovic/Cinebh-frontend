import { useState } from 'react';
import DayDateButton from '../buttons/DayDateButton.tsx';

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

export default function DateDaysComponent() {
  const [active, setActive] = useState(0);
  const days = generateNext10Days();

  return (
    <section>
      <div className="flex justify-between pt-8 overflow-x-auto py-3">
        {days.map((day, index) => (
          <DayDateButton
            key={index}
            date={day}
            isActive={index === active}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
      <p className={'text-gray-500 text-[14px] '}>
        Quick reminder that our cinema schedule is on a ten-day update cycle.
      </p>
    </section>
  );
}
