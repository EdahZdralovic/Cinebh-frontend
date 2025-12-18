import { useState } from 'react';
import { verifyCode } from '../../services/authService.ts';
import type { useEmailVerificationFlowProps } from '../../types/AuthTypes.ts';
import { ERRORS } from '../../utils/Constants.ts';

export function useEmailVerificationFlow({
  isForVerification,
  email,
  forgotPassword,
  onVerified,
}: useEmailVerificationFlowProps) {
  const [enterCode, setEnterCode] = useState(isForVerification);
  const [error, setError] = useState<string | null>(null);
  const handleContinue = async (code?: string) => {
    setError(null);
    if (!email || email.trim().length === 0) {
      setError(ERRORS.MISSING_EMAIL);
      return;
    }
    if (!enterCode) {
      if (!isForVerification) {
        try {
          await forgotPassword(email);
          setEnterCode(true);
        } catch (err: any) {
          setError(err?.response?.data?.message);
        }
      }
      return;
    }
    if (enterCode) {
      if (!code || code.length !== 4) {
        setError(ERRORS.ERROR_CODE_INPUT);
        return;
      }
      try {
        await verifyCode(email, code || '', isForVerification);
        onVerified(email);
      } catch (err: any) {
        setError(err?.response?.data?.message);
      }
    }
  };
  return {
    enterCode,
    error,
    setError,
    handleContinue,
  };
}
