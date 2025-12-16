interface ProjectionTimeButtonProps {
  time: string;
  onClick?: () => void;
  isActive?: boolean;
}

export function ProjectionTimeButton({
  time,
  onClick,
  isActive,
}: ProjectionTimeButtonProps) {
  return (
    <button
      className={
        ' text-xl border border-gray-200 shadow-sm rounded-xl hover:text-white px-3 py-3 font-semibold ' +
        (isActive
          ? ' bg-[var(--color-secondary)] text-white '
          : ' bg-white text-[var(--color-primary)] ')
      }
      onClick={onClick}
    >
      {time.slice(0, 5)}
    </button>
  );
}
