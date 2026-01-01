import { ROUTES } from '../utils/Constants';
import axiosInstance from './axiosInstance.tsx';

export const getProjectionSeatLayout = async (projectionId: number) => {
  const { data } = await axiosInstance.get(
    ROUTES.PROJECTION_SEATS(projectionId)
  );
  return data;
};

export const reserveSeats = async (projectionId: number, seatIds: number[]) => {
  await axiosInstance.post(ROUTES.RESERVE_SEATS_POST(projectionId), seatIds);
};
