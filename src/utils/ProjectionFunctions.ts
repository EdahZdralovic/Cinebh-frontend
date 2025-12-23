import type { SeatStatus } from '../types/ProjectionSeatLayout.ts';

export function shouldInsertAisle(index: number, rowSeats: SeatStatus[]) {
  if (rowSeats.length === 0) return false;
  const isLoveRow = rowSeats[0].type === 'LOVEBOX';
  const totalPlaces = isLoveRow ? rowSeats.length * 2 : rowSeats.length;
  const middle = totalPlaces / 2;
  const aisleAfterIndex = isLoveRow ? middle / 2 : middle;
  return index === aisleAfterIndex;
}
