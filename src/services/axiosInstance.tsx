import axios from 'axios';
import qs from 'qs';
import { ROUTES } from '../utils/Constants.ts';

//..env variables -> VITE_BASE_BACKEND_URL , VITE_PROD_BACKEND_URL

//I left this function "delay" for future skeleton testing
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PROD_BACKEND_URL,
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

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const status = error.response?.status;

    if (!original || !status) {
      return Promise.reject(error);
    }

    if (
      original.url?.includes('/auth/login') ||
      original.url?.includes('/auth/refresh')
    ) {
      return Promise.reject(error);
    }

    if (status !== 401 && status !== 403) {
      return Promise.reject(error);
    }

    if (original._alreadyRefreshed) {
      return Promise.reject(error);
    }

    if (
      original.url?.includes('/reserve') ||
      original.url?.includes('/seat-session') ||
      original.url?.includes('/booking')
    ) {
      return Promise.reject(error);
    }

    original._alreadyRefreshed = true;

    try {
      await axiosInstance.post(ROUTES.REFRESH_TOKEN_ENDPOINT);
      return axiosInstance(original);
    } catch {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
