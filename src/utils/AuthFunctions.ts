import { resendVerification } from '../services/authService';
import { AUTH_CONST } from './Constants.ts';
import type { HandlePasteProps } from '../types/AuthTypes.ts';

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

export function handlePaste({
  e,
  code,
  setCode,
  inputs,
  codeLength,
  onComplete,
}: HandlePasteProps) {
  e.preventDefault();
  const pasted = e.clipboardData.getData('text').replace(/\D/g, '');
  if (!pasted) return;
  const digits = pasted.slice(0, codeLength).split('');
  const newCode = [...code];
  digits.forEach((digit, idx) => {
    newCode[idx] = digit;
    const input = inputs.current[idx];
    if (input) input.value = digit;
  });
  setCode(newCode);

  if (newCode.every((d) => d !== '')) {
    onComplete(newCode.join(''));
  }
}

/*provjeri sto ovo nije ukljuceno ovaj valid email */
export const isValidEmail = (email: string) =>
  AUTH_CONST.EMAIL_REGEX.test(email.trim());

export const isValidPassword = (password: string) =>
  AUTH_CONST.PASSWORD_REGEX.test(password);
