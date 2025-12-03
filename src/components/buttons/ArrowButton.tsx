import { ArrowLeft, ArrowRight } from 'lucide-react';

export enum ArrowDirection {
  Left,
  Right,
}

interface ArrowButtonProps {
  onClick: () => void;
  disabled?: boolean;
  direction: ArrowDirection;
}

export default function ArrowButton({
  onClick,
  disabled = false,
  direction,
}: ArrowButtonProps) {
  const Direction = direction === ArrowDirection.Left ? ArrowLeft : ArrowRight;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="text-[var(--color-primary)]  p-3 border border-gray-200 rounded-[8px] "
    >
      <Direction
        size={20}
        strokeWidth={2}
        className={
          disabled
            ? 'text-[var(--color-disabled)]'
            : 'text-[var(--color-primary)]'
        }
      />
    </button>
  );
}
