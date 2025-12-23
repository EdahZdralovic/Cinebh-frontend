import type {
  SeatAvailability,
  SeatStatus,
  SeatType,
} from '../../../types/ProjectionSeatLayout.ts';
import { FaRegStar } from 'react-icons/fa';

interface SeatButtonProps {
  info: SeatStatus;
}

export function SeatButton({ info }: SeatButtonProps) {
  const type = info.type;
  const row = info.row || 'X';
  const column = info.column || 'Y';
  const availability = info.availability;
  const bgColor = seatAvailabilityStyle(availability);
  const buttonSize = isLovebox(type);
  return (
    <button
      className={
        'py-2  gap-1 h-10 flex justify-center rounded-lg border  text-var[--color-primary] ' +
        bgColor +
        buttonSize
      }
    >
      {seatTypeLook(type)}
      {row}
      {column}
    </button>
  );
}

function seatAvailabilityStyle(availability: SeatAvailability) {
  if (availability === 'FREE') {
    return ' border-gray-200 ';
  } else if (availability === 'SOLD') {
    return ' bg-[var(--color-secondary)] text-white border-[var(--color-secondary)] ';
  } else if (availability === 'RESERVED') {
    return ' bg-gray-200 ';
  } else return ' ';
}

function seatTypeLook(type: SeatType) {
  if (type === 'REGULAR') {
    return;
  } else if (type === 'VIP') {
    return <FaRegStar size={19} />;
  } else if (type === 'LOVEBOX') {
    return;
  }
}

function isLovebox(type: SeatType) {
  if (type === 'LOVEBOX') {
    return ' w-[108px] ';
  } else return ' w-[50px] ';
}
