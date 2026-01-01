export type SeatAvailability = 'FREE' | 'RESERVED' | 'SOLD';
export type SeatType = 'REGULAR' | 'VIP' | 'LOVEBOX';

export interface SeatStatus {
  id: number;
  row: string;
  column: number;
  type: SeatType;
  availability: SeatAvailability;
}

export interface ProjectionSeatLayout {
  projectionId: number;
  projectionDate: string;
  projectionTime: string;

  movie: {
    id: number;
    title: string;
    duration: number;
    pgRating: string;
    coverImageUrl: string;
  };

  venue: {
    id: number;
    name: string;
    street: string;
    city: string;
  };

  hall: {
    id: number;
    name: string;
  };

  seats: SeatStatus[];
}

export enum SeatHallType {
  REGULAR = 'REGULAR',
  LOVE_BOX = 'LOVEBOX',
  VIP = 'VIP',
}
export enum SeatPaidType {
  FREE = 'FREE',
  RESERVED = 'RESERVED',
  PAID = 'PAID',
}

export interface BuyTicketDto {
  movie: {
    id: number;
    title: string;
    date: string;
  };
  projection: {
    id: number;
    startTime: string;
    price: number;
  };
  hall: {
    id: number;
    name: string;
    regularSeats: number;
    vipSeats: number;
    loveBoxSeats: number;
  };
  seats: {
    seatId: number;
    row: string;
    number: number;
    status: 'FREE' | 'RESERVED' | 'PAID';
  }[];
}
