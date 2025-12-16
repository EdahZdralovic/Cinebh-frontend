import { useDateInfo } from '../../hooks/filter-hooks/useDateInfo.ts';

interface DayDateButtonProps {
  date: Date;
  isActive?: boolean;
  onClick?: () => void;
  isSkeleton?: boolean;
}

export default function DayDateButton({
  date,
  isActive,
  onClick,
  isSkeleton = false,
}: DayDateButtonProps) {
  const { monthName, dayNumber, weekday, isToday } = useDateInfo(date);
  return (
    <button
      onClick={onClick}
      className={
        ' border shadow-md w-full aspect-[110/84] rounded-lg text-xl ' +
        (isActive
          ? ' bg-[var(--color-secondary)] border-[var(--color-secondary)] text-white '
          : ' bg-white border-gray-200') +
        (isSkeleton ? ' bg-gray-200 ' : ' ')
      }
    >
      <span
        className={
          ' font-semibold ' + (isActive ? '' : ' text-[var(--color-primary)] ')
        }
      >
        {monthName} {dayNumber}
      </span>
      <p className={' font-extralight ' + (isActive ? ' ' : ' text-gray-500 ')}>
        {isSkeleton ? 'Loading...' : isToday ? 'Today' : weekday}
      </p>
    </button>
  );
}
