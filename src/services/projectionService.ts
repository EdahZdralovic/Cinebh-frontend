import axiosInstance, { delay } from './axiosInstance.tsx';
import { ROUTES } from '../utils/Constants';

export const getProjectionSeatLayout = async (projectionId: number) => {
  await delay(2200);
  const { data } = await axiosInstance.get(
    ROUTES.PROJECTION_SEATS(projectionId)
  );
  return data;
};
