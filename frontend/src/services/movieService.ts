import axiosInstance from './axiosInstance';
import { buildMovieParams } from '../utils/buildMovieParams.ts';

export const getCards = async (type: string, page: number, size: number) => {
  const url = `${type}`;
  const params = { page, size };

  try {
    const { data } = await axiosInstance.get(url, { params });
    return data;
  } catch (error) {
    console.error('Something went wrong', error);
    throw error;
  }
};

export const getUpcomingMovies = async (
  type: string,
  filters: any,
  page: number,
  size: number
) => {
  const url = `${type}`;
  const params = buildMovieParams(filters, page, size);

  try {
    const { data } = await axiosInstance.get(url, { params });
    console.log(params);
    return data;
  } catch (error) {
    console.error('Something went wrong', error);
    throw error;
  }
};
export const getCurrentlyShowingMovies = async (
  type: string,
  filters: any,
  page: number,
  size: number
) => {
  const url = `${type}`;
  const params = buildMovieParams(filters, page, size);

  try {
    const { data } = await axiosInstance.get(url, { params });
    console.log(params);
    return data;
  } catch (error) {
    console.error('Something went wrong', error);
    throw error;
  }
};
