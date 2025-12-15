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
  const [apiError, setApiError] = useState<string | null>(null);
  const handleContinue = async (code?: string) => {
    setApiError(null);
    if (!email || email.trim().length === 0) {
      setApiError(ERRORS.MISSING_EMAIL);
      return;
    }
    if (!enterCode) {
      if (!isForVerification) {
        try {
          await forgotPassword(email);
          setEnterCode(true);
        } catch (err: any) {
          setApiError(err?.response?.data?.message);
        }
      }
      return;
    }
    if (enterCode) {
      try {
        await verifyCode(email, code || '', isForVerification);
        onVerified(email);
      } catch (err: any) {
        setApiError(err?.response?.data?.message);
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
