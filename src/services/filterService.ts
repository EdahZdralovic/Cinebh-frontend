import axiosInstance from './axiosInstance.tsx';
import type { FilterParams } from '../types/Filters.ts';

export async function getFilterData(endpoint: string, params?: FilterParams) {
  try {
    const { data } = await axiosInstance.get(endpoint, { params });
    return data;
  } catch (err) {
    console.error('Filter API error:', err);
    throw err;
  }
}
