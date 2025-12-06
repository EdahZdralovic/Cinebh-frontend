import axiosInstance from './axiosInstance';
import { jwtDecode } from 'jwt-decode';

export async function login(email: string, password: string) {
  const res = await axiosInstance.post('/auth/login', {
    email,
    password,
  });
  localStorage.setItem('accessToken', res.data.accessToken);
  localStorage.setItem('refreshToken', res.data.refreshToken);
  return res.data;
}
export async function register(email: string, password: string) {
  const res = await axiosInstance.post('/auth/register', {
    email,
    password,
  });
  localStorage.setItem('accessToken', res.data.accessToken);
  localStorage.setItem('refreshToken', res.data.refreshToken);
  return res.data;
}

export function getUserFromToken() {
  const token = localStorage.getItem('accessToken');
  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);
    return decoded.sub ?? null;
  } catch {
    return null;
  }
}
