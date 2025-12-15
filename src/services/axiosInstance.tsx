import axios from 'axios';
import qs from 'qs';
import { ROUTES } from '../utils/Constants.ts';

//..env variables -> VITE_BASE_BACKEND_URL , VITE_PROD_BACKEND_URL
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//I left this function "delay" for future skeleton testing
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: true,
  paramsSerializer: (params) =>
    qs.stringify(params, { arrayFormat: 'repeat', skipNulls: true }),
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (original?.url?.includes(ROUTES.REFRESH_TOKEN_ENDPOINT)) {
      return Promise.reject(error);
    }

    if (
      error.response?.status !== 401 ||
      original._alreadyRefreshed ||
      isRefreshing
    ) {
      return Promise.reject(error);
    }
    original._alreadyRefreshed = true;
    isRefreshing = true;

    try {
      await axiosInstance.post(ROUTES.REFRESH_TOKEN_ENDPOINT);
      isRefreshing = false;
      return axiosInstance(original);
    } catch (err) {
      isRefreshing = false;
      return Promise.reject(err);
    }
  }
);
export default axiosInstance;
