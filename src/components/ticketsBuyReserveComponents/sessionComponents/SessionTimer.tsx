import { formatMs } from '../../../utils/ProjectionFunctions.ts';

interface SessionTimerProps {
  remainingMs: number;
}

export function SessionTimer({ remainingMs }: SessionTimerProps) {
  const alarmingDesign = remainingMs < 10000;

  return (
    <div className="flex items-center">
      <span className="mr-3">Session Duration</span>

      <div
        className={`border py-2 px-4 rounded-xl min-w-20 mb-1 border-gray-300 font-bold text-xl text-center ${
          alarmingDesign
            ? 'border-[var(--color-secondary)] text-[var(--color-secondary)]'
            : ''
        }`}
      >
        {formatMs(remainingMs)}
      </div>
    </div>
  );
}
