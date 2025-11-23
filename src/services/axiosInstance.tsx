import axios from 'axios';
import qs from 'qs';

const axiosInstance = axios.create({
  baseURL: "https://cinebh-backend-production.up.railway.app/api",
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  paramsSerializer: (params) =>
    qs.stringify(params, { arrayFormat: 'repeat', skipNulls: true }),
});
export default axiosInstance;
