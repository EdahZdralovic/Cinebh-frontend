import { type SeatStatus } from '../../types/ProjectionSeatLayout.ts';
import {
  formatSeatLabels,
  FromSeatToPrice,
} from '../../utils/ProjectionFunctions.ts';
import { LongRedWhiteButton } from '../buttons/LongRedWhiteButton.tsx';
import { useEffect, useState } from 'react';

interface ChosenSeatsProps {
  seats: SeatStatus[];
}

export function ChosenSeatsComponent({ seats }: ChosenSeatsProps) {
  const [disabledPayment, setDisabledPayment] = useState(true);
  useEffect(() => {
    setDisabledPayment(seats.length === 0);
  }, [seats]);

  const totalPrice = seats.reduce(
    (sum, seat) => sum + FromSeatToPrice(seat),
    0
  );

  return (
    <section className={'grid grid-cols-1 md:mx-0 mx-[8%]'}>
      <div className="flex justify-center">
        <span className="mt-3 font-thin text-lg">Chosen Seats</span>
      </div>

      <div className="mt-4 flex justify-between">
        <span>Seat(s)</span>
        <span>Total price</span>
      </div>

      <div className="w-full mt-1 mb-4 h-px border-b border-gray-200"></div>
      <div className="flex justify-between text-xl font-bold">
        <span>
          {seats.length > 0 ? formatSeatLabels(seats) : 'Choose your Seat(s)'}
        </span>
        <span>{totalPrice} KM</span>
      </div>
      <div className={'mt-[14%]'}>
        <LongRedWhiteButton
          text={'Continue to Payment'}
          disabled={disabledPayment}
        />
      </div>
    </section>
  );
}
