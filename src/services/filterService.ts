import axiosInstance from './axiosInstance.tsx';
import type { FilterParams, Filters } from '../types/Filters.ts';

export async function getFilterData(endpoint: string, params?: FilterParams) {
  try {
    const { data } = await axiosInstance.get(endpoint, { params });
    return data;
  } catch (err) {
    throw err;
  }
}

export const getMovieDetailsProjections = async (
  movieId: number,
  filters: Filters
) => {
  const params: any = {
    movieId,
    cityId: filters.cityId,
    venueId: filters.venueId,
    selectedDate: filters.selectedDate,
  };
  Object.keys(params).forEach(
    (key) => params[key] == null && delete params[key]
  );
  const { data } = await axiosInstance.get('/projections/movie', { params });
  return data;
};
