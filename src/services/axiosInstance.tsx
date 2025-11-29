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
export default axiosInstance;
