import type { SeatStatus } from '../../../types/ProjectionSeatLayout.ts';
import { SeatButton } from '../../buttons/seatButtons/SeatButton.tsx';
import { shouldInsertAisle } from '../../../utils/ProjectionFunctions.ts';
import { NUMBERS } from '../../../utils/Constants.ts';

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
  const FAKE_SEAT: SeatStatus = {
    type: 'REGULAR',
    availability: 'PAID',
  };
  if (isSkeleton) {
    return (
      <section className="flex flex-col gap-2">
        {Array.from({ length: NUMBERS.NINE }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1 md:gap-2">
            {Array.from({ length: NUMBERS.EIGHT }).map((_, seatIndex) => (
              <div
                key={seatIndex}
                className={
                  seatIndex === NUMBERS.FOUR ? 'md:ml-12 ml-3 flex' : 'flex'
                }
              >
                <SeatButton
                  info={FAKE_SEAT}
                  isSelectedForSeatGuide={false}
                  isSelected={false}
                  isSkeleton={true}
                />
              </div>
            ))}
          </div>
        ))}
      </section>
    );
  }

  const seatsByRow = seats.reduce<Record<string, SeatStatus[]>>((acc, seat) => {
    if (!acc[seat.row]) acc[seat.row] = [];
    acc[seat.row].push(seat);
    return acc;
  }, {});

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
