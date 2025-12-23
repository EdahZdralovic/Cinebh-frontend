import axiosInstance from './axiosInstance.tsx';
import { ROUTES } from '../utils/Constants';

export const getProjectionSeatLayout = async (projectionId: number) => {
  const { data } = await axiosInstance.get(
    ROUTES.PROJECTION_SEATS(projectionId)
  );
  return data;
};
