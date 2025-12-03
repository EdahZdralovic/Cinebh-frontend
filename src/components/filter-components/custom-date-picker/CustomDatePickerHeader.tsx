import { FiCalendar } from 'react-icons/fi';

interface CustomDatePickerHeaderProps {
  label: string;
  isOpen: boolean;
  onClick: () => void;
}

export default function CustomDatePickerHeader({
  label,
  isOpen,
  onClick,
}: CustomDatePickerHeaderProps) {
  return (
    <div
      onClick={onClick}
      className="w-full flex items-center gap-2 bg-white rounded-lg px-3 h-12 cursor-pointer"
    >
      <FiCalendar
        className={
          'ml-0 flex justify-center ' +
          (isOpen
            ? 'text-[var(--color-secondary)]'
            : 'text-[var(--color-primary)]')
        }
      />
      <span
        className={isOpen ? 'text-[var(--color-primary)]' : 'text-gray-500'}
      >
        {label}
      </span>
    </div>
  );
}
