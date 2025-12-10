import { useState } from 'react';
import type { UseResetPasswordProps } from '../../types/AuthTypes.ts';

export function useResetPassword({ email, onSuccess }: UseResetPasswordProps) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const ERROR_TEXT =
    'Something went wrong while resetting your password. Please try again.';

  const showError =
    hasSubmitted &&
    password.length > 0 &&
    confirm.length > 0 &&
    password !== confirm;

  const submit = async () => {
    setHasSubmitted(true);
    if (password !== confirm) return;

    try {
      setLoading(true);
      setApiError(null);
      const res = await fetch('http://localhost:8080/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          newPassword: password,
        }),
      });
      if (!res.ok) throw new Error('RESET FAILED');

      onSuccess();
    } catch {
      setApiError(ERROR_TEXT);
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
