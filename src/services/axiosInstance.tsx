import axios from 'axios';
import qs from 'qs';


//this is for my testing puposes to havel ocal link so i can copy
// 'http://localhost:8080/api/' .   import.meta.env.VITE_BACKEND_URL for railway conection
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL ,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  paramsSerializer: (params) =>
    qs.stringify(params, { arrayFormat: 'repeat', skipNulls: true }),
});
export default axiosInstance;
