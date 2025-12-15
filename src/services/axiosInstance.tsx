import axios from 'axios';
import qs from 'qs';
import { AUTH_CONST, ERRORS, ROUTES } from '../utils/Constants.ts';

//..env variables -> VITE_BASE_BACKEND_URL , VITE_PROD_BACKEND_URL

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PROD_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  paramsSerializer: (params) =>
    qs.stringify(params, { arrayFormat: 'repeat', skipNulls: true }),
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_CONST.ACCESS_TOKEN);

    if (
      token &&
      token !== 'null' &&
      token !== 'undefined' &&
      token.split('.').length === 3
    ) {
      config.headers.Authorization = AUTH_CONST.BEARER + { token };
    }

    return config;
  },
  (error) => Promise.reject(error)
);
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes(ROUTES.REFRESH_TOKEN_ENDPOINT) &&
      !originalRequest.url.includes(ROUTES.LOGIN_ENDPOINT)
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = AUTH_CONST.BEARER + token;
            return axiosInstance.request(originalRequest);
          })
          .catch(Promise.reject);
      }
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem(AUTH_CONST.REFRESH_TOKEN);
        if (!refreshToken) throw new Error(ERRORS.MISSING_REFRESH_TOKEN);

        const res = await axiosInstance.post(ROUTES.REFRESH_TOKEN_ENDPOINT, {
          refreshToken,
        });
        const newToken = res.data.accessToken;
        localStorage.setItem(AUTH_CONST.ACCESS_TOKEN, newToken);
        processQueue(null, newToken);

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization =
          AUTH_CONST.BEARER + { newToken };

        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.removeItem(AUTH_CONST.ACCESS_TOKEN);
        localStorage.removeItem(AUTH_CONST.REFRESH_TOKEN);
        window.location.href = ROUTES.LOGIN_ENDPOINT;

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
