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

export default function DateDaysSkeletonComponent() {
  const days = generateNext10Days();

  return (
    <section>
      <div className="lg:flex lg:justify-between sm:grid sm:grid-cols-5 grid grid-cols-4 gap-2 sm:pt-6 pt-4 min-w-[70px]  overflow-x-auto py-3">
        {days.map((day, index) => (
          <DayDateButton key={index} date={day} isSkeleton={true} />
        ))}
      </div>
      <p className={'text-gray-500 text-sm'}>
        Quick reminder that our cinema schedule is on a ten-day update cycle.
      </p>
    </section>
  );
}
