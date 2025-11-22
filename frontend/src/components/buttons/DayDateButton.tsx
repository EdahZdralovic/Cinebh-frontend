interface DayDateButtonProps {
  date: Date;
  isActive?: boolean;
  onClick?: () => void;
}

export default function DayDateButton({
  date,
  isActive,
  onClick,
}: DayDateButtonProps) {
  const monthName = date.toLocaleString('en-US', { month: 'short' });
  const dayNumber = date.getDate();
  const weekday = date.toLocaleString('en-US', { weekday: 'short' });
  const today = new Date();
  const isToday = today.getDate() === date.getDate();

  return (
    <button
      onClick={onClick}
      className={
        ' border shadow-md w-full aspect-[110/84] rounded-lg   text-[16px] ' +
        (isActive
          ? ' bg-[var(--color-secondary)] border-[var(--color-secondary)] text-white '
          : ' bg-white border-gray-200')
      }
    >
      <span
        className={
          ' font-semibold ' +
          (isActive ? ' sm:text-lg' : ' text-[var(--color-primary)] ')
        }
      >
        {monthName} {dayNumber}
      </span>
      <p className={' font-extralight ' + (isActive ? ' ' : ' text-gray-500 ')}>
        {isToday ? 'Today' : weekday}
      </p>
    </button>
  );
}
