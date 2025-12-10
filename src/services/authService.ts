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

export async function verifyCode(
  email: string,
  code: string,
  isForVerification: boolean
) {
  const res = await axiosInstance.post('/auth/verify', {
    email,
    code,
    type: isForVerification ? 'EMAIL_VERIFY' : 'PASSWORD_RESET',
  });

  return res.data;
}

export async function forgotPassword(email: string) {
  await axiosInstance.post('/auth/forgot-password', { email });
}
export async function resendVerification(
  email: string,
  isForVerification: boolean
) {
  await axiosInstance.post('/auth/resend-verification', {
    email,
    type: isForVerification ? 'EMAIL_VERIFY' : 'PASSWORD_RESET',
  });
}
