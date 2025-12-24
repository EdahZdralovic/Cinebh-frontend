import type { SeatStatus } from '../../types/ProjectionSeatLayout.ts';
import { SeatButton } from '../buttons/seatButtons/SeatButton.tsx';
import { shouldInsertAisle } from '../../utils/ProjectionFunctions.ts';

interface SeatsComponentProps {
  seats: SeatStatus[];
  selectedSeats: SeatStatus[];
  onSeatToggle: (seat: SeatStatus) => void;
}

export function SeatsComponent({
  seats,
  selectedSeats,
  onSeatToggle,
}: SeatsComponentProps) {
  const seatsByRow = seats.reduce<Record<string, SeatStatus[]>>((acc, seat) => {
    if (!acc[seat.row]) acc[seat.row] = [];
    acc[seat.row].push(seat);
    return acc;
  }, {});

  return (
    <section className="flex flex-col md:gap-2 gap-1">
      {Object.entries(seatsByRow).map(([row, rowSeats]) => (
        <div key={row} className="flex justify-center md:gap-2 gap-1">
          {rowSeats
            .sort((a, b) => a.column - b.column)
            .map((seat, index) => (
              <div
                key={seat.id}
                className={
                  shouldInsertAisle(index, rowSeats)
                    ? 'md:ml-12 ml-2 flex'
                    : 'flex'
                }
              >
                <SeatButton
                  info={seat}
                  isSelected={selectedSeats.some((s) => s.id === seat.id)}
                  onClick={() => onSeatToggle(seat)}
                />
              </div>
            ))}
        </div>
      ))}
    </section>
  );
}
