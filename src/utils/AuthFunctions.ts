import { resendVerification } from '../services/authService';
import { AUTH_CONST } from './Constants.ts';

export function maskEmail(email: string) {
  const [name, domain] = email.split('@');
  if (!name) return email;
  return `${name[0]}${'*'.repeat(Math.max(name.length - 2, 2))}${name[name.length - 1]}@${domain}`;
}

export async function withLoading(
  loading: boolean,
  setLoading: (value: boolean) => void,
  action: () => Promise<void>
): Promise<void> {
  if (loading) return;

  try {
    setLoading(true);
    await action();
  } finally {
    setLoading(false);
  }
}

export async function handleResendVerification(
  email: string,
  isForVerification: boolean,
  reset: () => void,
  setApiError: (value: string | null) => void
): Promise<void> {
  setApiError(null);
  try {
    await resendVerification(email, isForVerification);
    reset();
  } catch (err: any) {
    setApiError(err?.message || 'Failed to resend');
  }
}

export const isValidEmail = (email: string) =>
  AUTH_CONST.EMAIL_REGEX.test(email.trim());

export const isValidPassword = (password: string) =>
  AUTH_CONST.PASSWORD_REGEX.test(password);
