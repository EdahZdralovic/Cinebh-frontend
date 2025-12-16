import axiosInstance from './axiosInstance';
import { jwtDecode } from 'jwt-decode';
import { AUTH_CONST, ROUTES } from '../utils/Constants.ts';

export async function login(email: string, password: string) {
  const res = await axiosInstance.post(ROUTES.LOGIN_ENDPOINT, {
    email,
    password,
  });
  localStorage.setItem(AUTH_CONST.ACCESS_TOKEN, res.data.accessToken);
  localStorage.setItem(AUTH_CONST.REFRESH_TOKEN, res.data.refreshToken);
  return res.data;
}

export async function register(email: string, password: string) {
  const res = await axiosInstance.post(ROUTES.REGISTER_ENDPOINT, {
    email,
    password,
  });
  localStorage.setItem(AUTH_CONST.ACCESS_TOKEN, res.data.accessToken);
  localStorage.setItem(AUTH_CONST.REFRESH_TOKEN, res.data.refreshToken);
  return res.data;
}

export function getUserFromToken() {
  const token = localStorage.getItem(AUTH_CONST.ACCESS_TOKEN);
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
  const res = await axiosInstance.post(ROUTES.VERIFICATION_ENDPOINT, {
    email,
    code,
    type: isForVerification
      ? AUTH_CONST.EMAIL_VERIFY
      : AUTH_CONST.PASSWORD_RESET,
  });

  return res.data;
}

export async function forgotPassword(email: string) {
  await axiosInstance.post(ROUTES.FORGOT_PASSWORD_ENDPOINT, { email });
}

export async function resendVerification(
  email: string,
  isForVerification: boolean
) {
  await axiosInstance.post(ROUTES.RESEND_VERIFICATION_ENDPOINT, {
    email,
    type: isForVerification
      ? AUTH_CONST.EMAIL_VERIFY
      : AUTH_CONST.PASSWORD_RESET,
  });
}

export async function resetPassword(email: string, newPassword: string) {
  const res = await axiosInstance.post(ROUTES.RESET_PASSWORD_ENDPOINT, {
    email,
    newPassword,
  });
  return res.data;
}
//
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const isValidEmail = (email: string) => EMAIL_REGEX.test(email.trim());
