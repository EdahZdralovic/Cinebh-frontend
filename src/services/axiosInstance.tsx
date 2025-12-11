import axios from 'axios';
import qs from 'qs';

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
    const token = localStorage.getItem('accessToken');

    if (
      token &&
      token !== 'null' &&
      token !== 'undefined' &&
      token.split('.').length === 3
    ) {
      config.headers.Authorization = `Bearer ${token}`;
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
      !originalRequest.url.includes('/auth/refresh') &&
      !originalRequest.url.includes('/auth/login')
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = 'Bearer ' + token;
            return axiosInstance.request(originalRequest);
          })
          .catch(Promise.reject);
      }
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('Missing refresh token');

        const res = await axiosInstance.post('/auth/refresh', { refreshToken });
        const newToken = res.data.accessToken;
        localStorage.setItem('accessToken', newToken);
        processQueue(null, newToken);

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/auth/login';

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
