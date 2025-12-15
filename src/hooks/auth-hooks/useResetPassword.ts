import { useState } from 'react';
import type { UseResetPasswordProps } from '../../types/AuthTypes.ts';
import { resetPassword } from '../../services/authService.ts';
import { ERRORS } from '../../utils/Constants.ts';

export function useResetPassword({ email, onSuccess }: UseResetPasswordProps) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const showError = hasSubmitted && password !== confirm;

  const submit = async () => {
    setHasSubmitted(true);
    if (!email) {
      setApiError(ERRORS.MISSING_EMAIL);
      return;
    }
    try {
      setLoading(true);
      setApiError(null);

      await resetPassword(email, password);
      onSuccess?.();
    } catch (err: any) {
      setApiError(err?.response?.data?.message);
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
    apiError,
    loading,
    submit,
  };
}
