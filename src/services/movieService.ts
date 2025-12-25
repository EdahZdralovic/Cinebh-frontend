import axiosInstance, { delay } from './axiosInstance';
import { buildMovieParams } from '../utils/buildMovieParams.ts';
import type { MovieDetailsProps } from '../types/MovieTypes.ts';

export const getCards = async (type: string, page: number, size: number) => {
  const url = `${type}`;
  const params = { page, size };

  try {
    await delay(2000);
    const { data } = await axiosInstance.get(url, { params });
    return data;
  } catch (error) {
    throw error;
  }
};

export const getUpcomingMovies = async (
  url: string,
  filters: any,
  page: number,
  size: number
) => {
  const params = buildMovieParams(filters, page, size);

  try {
    const { data } = await axiosInstance.get(url, { params });
    return data;
  } catch (error) {
    throw error;
  }
};
export const getCurrentlyShowingMovies = async (
  url: string,
  filters: any,
  page: number,
  size: number
) => {
  const params = buildMovieParams(filters, page, size);

  try {
    await delay(2000);
    const { data } = await axiosInstance.get(url, { params });
    return data;
  } catch (error) {
    throw error;
  }
};

export async function getMovieDetails(id: number): Promise<MovieDetailsProps> {
  await delay(2000);
  const res = await axiosInstance.get(`/movies/details/${id}`);
  return res.data;
}

export const formatDate = (date: Date | null) => {
  if (!date) return null;
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
};
