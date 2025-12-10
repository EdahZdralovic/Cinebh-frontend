import { useState } from 'react';
import { verifyCode } from '../../services/authService.ts';
import type { useEmailVerificationFlowProps } from '../../types/AuthTypes.ts';

export function useEmailVerificationFlow({
  isForVerification,
  email,
  forgotPassword,
  onVerified,
}: useEmailVerificationFlowProps) {
  const [enterCode, setEnterCode] = useState(isForVerification);
  const [apiError, setApiError] = useState<string | null>(null);
  const handleContinue = async (code?: string) => {
    setApiError(null);
    if (!email || email.trim().length === 0) {
      setApiError('Email missing');
      return;
    }
    if (!enterCode) {
      if (!isForVerification) {
        try {
          await forgotPassword(email);
          setEnterCode(true);
        } catch (err: any) {
          setApiError(
            err?.response?.data?.message || 'Email is not registered'
          );
        }
      }
      return;
    }
    if (enterCode) {
      try {
        await verifyCode(email, code || '', isForVerification);
        onVerified(email);
      } catch (err: any) {
        setApiError(err.message);
      }
    }
  };
  return {
    enterCode,
    apiError,
    setApiError,
    handleContinue,
  };
}
