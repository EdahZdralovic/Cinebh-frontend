import { useState } from 'react';
import { forgotPassword } from '../../../services/authService.ts';
import type { EmailVerifyTypeProps } from '../../../types/AuthTypes.ts';
import {
  handleResendVerification,
  maskEmail,
  withLoading,
} from '../../../utils/AuthFunctions.ts';
import { useCountdown } from '../../../hooks/auth-hooks/useCountdown.ts';
import { useEmailVerificationFlow } from '../../../hooks/auth-hooks/useEmailVerificationFlow.ts';
import { EnterCodeInput } from '../EnterCodeInput.tsx';
import { InputField } from '../InputField.tsx';
import { LogInSideBarArrowButton } from '../../buttons/LogInSideBarArrowButton.tsx';
import { SignInButton } from '../../buttons/SignInButton.tsx';
import { ResendButton } from '../../buttons/ResendButton.tsx';
import { MAIL_ICON } from '../../../utils/icons.tsx';

export function EmailVerifyType({
  isForVerification,
  onBack,
  onVerified,
  presetEmail,
}: EmailVerifyTypeProps) {
  const [email, setEmail] = useState(presetEmail ?? '');
  const [loading, setLoading] = useState(false);

  const title = isForVerification ? 'Verify Email' : 'Password Reset';
  const description = isForVerification
    ? 'Enter your email to receive a verification code.'
    : 'Provide your account’s email for which you want to reset your password.';

  const { enterCode, error, setError, handleContinue } =
    useEmailVerificationFlow({
      isForVerification,
      email,
      forgotPassword,
      onVerified,
    });

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    setError(null);
  }

  function handleCodeComplete() {
    setError(null);
  }

  const safeHandleContinue = () =>
    withLoading(loading, setLoading, () => handleContinue());

  const onResendClick = () =>
    handleResendVerification(email, isForVerification, reset, setError);

  const { counter, reset } = useCountdown(30, enterCode);
  return (
    <section>
      <div className="flex justify-start mb-4 items-center mt-10">
        <LogInSideBarArrowButton onClose={onBack} />
        <h1 className="absolute left-1/2 -translate-x-1/2 sm:text-3xl text-xl text-[var(--color-second-white)] font-bold">
          {title}
        </h1>
      </div>
      <div className="items-center text-center">
        {!enterCode ? (
          <p className="text-[var(--color-gray-secondary)] mt-6">
            {description}
          </p>
        ) : (
          <p className="text-[var(--color-gray-secondary)] mt-6 leading-6">
            We have sent a code to your email <br />
            <span>{maskEmail(email)}</span>
          </p>
        )}
      </div>
      <div className="items-center mt-[10%] flex-row justify-center">
        {!enterCode && !presetEmail ? (
          <>
            <InputField
              placeHolder="Email Address"
              type="email"
              name="Email"
              value={email}
              icon={MAIL_ICON}
              onChange={handleEmailChange}
            />
            {error && (
              <p className="text-red-400 text-sm text-start">{error}</p>
            )}
          </>
        ) : (
          <EnterCodeInput onComplete={handleCodeComplete} />
        )}
      </div>

      {enterCode && (
        <div className="mt-8 text-center text-sm  text-[var(--color-gray-secondary)]">
          <p className="mb-4">Didn’t receive the email?</p>
          {counter > 0 ? (
            <p>
              Resend in <span className="font-bold text-white">{counter}</span>{' '}
              sec
            </p>
          ) : (
            <ResendButton email={email} onResend={onResendClick} />
          )}
          {error && (
            <p className="text-red-400 text-sm text-center ">{error}</p>
          )}
        </div>
      )}
      <div className={'mb-8'}></div>
      <SignInButton
        onClick={safeHandleContinue}
        disabled={loading}
        isLoading={loading}
        text="Continue"
      />
    </section>
  );
}
