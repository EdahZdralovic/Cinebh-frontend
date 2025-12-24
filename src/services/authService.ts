import axiosInstance from './axiosInstance';
import { AUTH_CONST, ROUTES } from '../utils/Constants.ts';

export async function login(
  email: string,
  password: string,
  rememberMe: boolean
) {
  const res = await axiosInstance.post(ROUTES.LOGIN_ENDPOINT, {
    email,
    password,
    rememberMe,
  });

  return res.data;
}

export async function register(email: string, password: string) {
  const res = await axiosInstance.post(ROUTES.REGISTER_ENDPOINT, {
    email,
    password,
  });

  return res.data;
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

export async function logout() {
  await axiosInstance.post(ROUTES.LOGOUT_ENDPOINT, {});
}

export async function getCurrentUser() {
  const res = await axiosInstance.get(ROUTES.USER_EMAIL_ENDPOINT, {
    withCredentials: true,
  });
  return res.data;
}
