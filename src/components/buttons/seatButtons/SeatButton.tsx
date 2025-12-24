import {
  type SeatAvailability,
  SeatHallType,
  SeatPaidType,
  type SeatStatus,
  type SeatType,
} from '../../../types/ProjectionSeatLayout.ts';
import { FaRegStar } from 'react-icons/fa';

interface SeatButtonProps {
  info: SeatStatus;
  isSelected: boolean;
  onClick?: () => void;
  isSelectedForSeatGuide?: boolean;
}

export function SeatButton({
  info,
  isSelected,
  onClick = () => {
    return;
  },
  isSelectedForSeatGuide = false,
}: SeatButtonProps) {
  const type = info.type;
  const row = info.row || 'X';
  const column = info.column || 'Y';
  const availability = info.availability;
  const bgColor = seatAvailabilityStyle(availability);
  const buttonSize = isLovebox(type);

  return (
    <button
      onClick={onClick}
      className={
        'py-2 h-10 flex justify-center rounded-lg border font-thin ' +
        (isSelected || isSelectedForSeatGuide
          ? ' bg-[var(--color-secondary)] text-white md:text-md text-sm border-[var(--color-secondary)] '
          : '') +
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

function seatTypeLook(type: SeatType) {
  if (type === SeatHallType.REGULAR) {
    return;
  } else if (type === SeatHallType.VIP) {
    return <FaRegStar size={20} />;
  } else if (type === SeatHallType.LOVE_BOX) {
    return;
  }
}

function isLovebox(type: SeatType) {
  if (type === SeatHallType.LOVE_BOX) {
    return ' md:w-[108px] w-[84px] ';
  } else return ' md:w-[50px] w-[40px]';
}

function seatAvailabilityStyle(availability: SeatAvailability) {
  if (availability === SeatPaidType.FREE) {
    return '  border-gray-200 ';
  } else {
    return ' bg-gray-200 ';
  }
}
