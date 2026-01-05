import { NUMBERS } from '../../../utils/Constants.ts';
import { SeatButton } from '../../buttons/seatButtons/SeatButton.tsx';
import {
  SeatHallType,
  SeatPaidType,
  type SeatStatus,
} from '../../../types/ProjectionSeatLayout.ts';

export function SeatsSkeletonComponent(){
  const FAKE_SEAT: SeatStatus = {
    column: 0,
    id: 0,
    row: '',
    type: SeatHallType.REGULAR,
    availability: SeatPaidType.RESERVED,
  };
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
                isDisabled={true}
              />
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}