import { type SeatStatus } from '../../../types/ProjectionSeatLayout.ts';
import { SeatButton } from '../../buttons/seatButtons/SeatButton.tsx';
import { shouldInsertAisle } from '../../../utils/ProjectionFunctions.ts';

import { SeatsSkeletonComponent } from './SeatsSkeletonComponent.tsx';
import { useMemo } from 'react';

interface SeatsComponentProps {
  seats: SeatStatus[];
  selectedSeats: SeatStatus[];
  onSeatToggle: (seat: SeatStatus) => void;
  isSkeleton?: boolean;
}

export function SeatsComponent({
  seats,
  selectedSeats,
  onSeatToggle,
  isSkeleton = false,
}: SeatsComponentProps) {
  if (isSkeleton) {
    return <SeatsSkeletonComponent />;
  }

  const seatsByRow = useMemo(() => {
    return seats.reduce<Record<string, SeatStatus[]>>((acc, seat) => {
      if (!acc[seat.row]) acc[seat.row] = [];
      acc[seat.row].push(seat);
      return acc;
    }, {});
  }, [seats]);

  return (
    <section className="flex flex-col md:gap-2 gap-2">
      {Object.entries(seatsByRow).map(([row, rowSeats]) => (
        <div key={row} className="flex justify-center md:gap-2 gap-1">
          {rowSeats
            .sort((a, b) => a.column - b.column)
            .map((seat, index) => (
              <div
                key={seat.id}
                className={
                  shouldInsertAisle(index, rowSeats)
                    ? 'md:ml-12 ml-3 flex'
                    : 'flex'
                }
              >
                <SeatButton
                  info={seat}
                  isDisabled={seat.availability === 'RESERVED'}
                  isSelected={selectedSeats.some((s) => s.id === seat.id)}
                  onClick={() => onSeatToggle(seat)}
                  isSkeleton={false}
                />
              </div>
            ))}
        </div>
      ))}
    </section>
  );
}
