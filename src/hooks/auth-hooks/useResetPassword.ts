import { useState } from 'react';
import type { UseResetPasswordProps } from '../../types/AuthTypes.ts';
import { resetPassword } from '../../services/authService.ts';
import { ERRORS } from '../../utils/Constants.ts';
import { isValidPassword } from '../../utils/AuthFunctions.ts';

export function useResetPassword({ email, onSuccess }: UseResetPasswordProps) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState<string | null>(null);

  const showError = hasSubmitted && password !== confirm;

  const submit = async () => {
    setHasSubmitted(true);
    if (!email) {
      setError(ERRORS.MISSING_EMAIL);
      return;
    }
    if (!isValidPassword(password)) {
      setError(ERRORS.STRONGER_PASSWORD);
      return;
    }
    try {
      setLoading(true);
      setError(null);

      await resetPassword(email, password);
      onSuccess?.();
    } catch (err: any) {
      setError(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return {
    password,
    confirm,
    setPassword,
    setConfirm,
    showError,
    Error,
    loading,
    submit,
  };
}
