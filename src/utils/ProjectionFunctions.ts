import {
  SeatHallType,
  type SeatStatus,
} from '../types/ProjectionSeatLayout.ts';
import { SESSION_CONSTS } from './Constants.ts';

export function shouldInsertAisle(index: number, rowSeats: SeatStatus[]) {
  if (rowSeats.length === 0) return false;
  const isLoveRow = rowSeats[0].type === SeatHallType.LOVE_BOX;
  const totalPlaces = isLoveRow ? rowSeats.length * 2 : rowSeats.length;
  const middle = totalPlaces / 2;
  const aisleAfterIndex = isLoveRow ? middle / 2 : middle;
  return index === aisleAfterIndex;
}

export function FromSeatToPrice(seat: SeatStatus) {
  const type = seat.type;
  if (type === SeatHallType.VIP) return 10;
  else if (type === SeatHallType.LOVE_BOX) return 24;
  else return 7;
}

export function formatSeatLabels(seats: SeatStatus[]): string {
  return seats.map((s) => `${s.row}${s.column}`).join(', ');
}

export function getOrCreateSeatSessionEnd(): number {
  const existing = sessionStorage.getItem(SESSION_CONSTS.SESSION_KEY);

  if (existing) {
    return Number(existing);
  }

  const end = Date.now() + SESSION_CONSTS.SESSION_DURATION_IN_MS;
  sessionStorage.setItem(SESSION_CONSTS.SESSION_KEY, String(end));
  return end;
}

export function clearSeatSession() {
  sessionStorage.removeItem(SESSION_CONSTS.SESSION_KEY);
}

export function formatMs(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
