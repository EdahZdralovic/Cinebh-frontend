import { ROUTES } from '../utils/Constants';
import axiosInstance from './axiosInstance.tsx';

export const getProjectionSeatLayout = async (projectionId: number) => {
  const { data } = await axiosInstance.get(
    ROUTES.PROJECTION_SEATS(projectionId)
  );
  return data;
};
