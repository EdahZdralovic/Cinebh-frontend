import type { SeatStatus } from '../../types/ProjectionSeatLayout.ts';
import { SeatButton } from '../buttons/seatButtons/SeatButton.tsx';
import { shouldInsertAisle } from '../../utils/ProjectionFunctions.ts';

interface SeatsComponentProps {
  seats: SeatStatus[];
  isSkeleton?: boolean;
}
export function SeatsComponent({
  seats,
  isSkeleton = false,
}: SeatsComponentProps) {
  const seatsByRow = seats.reduce<Record<string, SeatStatus[]>>((acc, seat) => {
    if (!acc[seat.row]) acc[seat.row] = [];
    acc[seat.row].push(seat);
    return acc;
  }, {});

  return (
    <section className="flex flex-col gap-2">
      {Object.entries(seatsByRow).map(([row, rowSeats]) => (
        <div key={row} className="flex justify-center gap-2">
          {rowSeats
            .sort((a, b) => a.column - b.column)
            .map((seat, index) => (
              <div
                key={seat.id}
                className={
                  shouldInsertAisle(index, rowSeats) ? 'ml-12 flex' : 'flex'
                }
              >
                <SeatButton info={seat} />
              </div>
            ))}
        </div>
      ))}
    </section>
  );
}
