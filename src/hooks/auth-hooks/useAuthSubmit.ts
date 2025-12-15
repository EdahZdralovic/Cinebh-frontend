import { useState } from 'react';
import { login, register } from '../../services/authService.ts';
import type { useAuthSubmitProps } from '../../types/AuthTypes.ts';

export function useAuthSubmit({
  email,
  password,
  confirmPassword,
  onLoginSuccess,
  onRegisterSuccess,
}: useAuthSubmitProps) {
  const [error, setError] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [loading, setLoading] = useState(false);

  const loginSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      await login(email, password);
      onLoginSuccess?.();
    } catch (err: any) {
      const status = err?.response?.status;
      if (status === 403) {
        setNeedsVerification(true);
        setError(err.response.data.message);
        return;
      }
      setNeedsVerification(false);
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const registerSubmit = async () => {
    setHasSubmitted(true);

    if (password !== confirmPassword) return;

    try {
      setLoading(true);
      setError(null);
      await register(email, password);
      onRegisterSuccess?.(email);
    } catch (err: any) {
      const status = err?.response?.status;
      setError(err?.response?.data?.message);
      if (status === 403) {
        setNeedsVerification(true);
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loginSubmit,
    registerSubmit,
    error,
    hasSubmitted,
    needsVerification,
    loading,
  };
}
