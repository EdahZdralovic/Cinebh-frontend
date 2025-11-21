interface ProjectionTimeButtonProps {
  time: string;
}

export function ProjectionTimeButton({ time }: ProjectionTimeButtonProps) {
  return (
    <button
      className={
        ' bg-white text-[var(--color-primary)] text-xl border border-gray-200 shadow-sm hover:bg-[var(--color-secondary)] rounded-xl hover:text-white px-3 py-3 font-semibold'
      }
    >
      {time.slice(0, 5)}
    </button>
  );
}
