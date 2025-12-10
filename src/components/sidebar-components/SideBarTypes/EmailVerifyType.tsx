import { LogInSideBarArrowButton } from '../../buttons/LogInSideBarArrowButton.tsx';
import { InputField } from '../InputField.tsx';
import { useState } from 'react';
import { EnterCodeInput } from '../EnterCodeInput.tsx';
import { useCountdown } from '../../../hooks/auth-hooks/useCountdown.ts';
import { useEmailVerificationFlow } from '../../../hooks/auth-hooks/useEmailVerificationFlow.ts';
import { MAIL_ICON } from '../../../utils/icons.tsx';
import {
  handleResendVerification,
  maskEmail,
  withLoading,
} from '../../../utils/AuthFunctions.ts';
import { SignInButton } from '../../buttons/SignInButton.tsx';
import { ResendButton } from '../../buttons/ResendButton.tsx';
import { forgotPassword, verifyCode } from '../../../services/authService.ts';
import type { EmailVerifyTypeProps } from '../../../types/AuthTypes.ts';

export function EmailVerifyType({
  isForVerification,
  onBack,
  onVerified,
  presetEmail,
}: EmailVerifyTypeProps) {
  const [email, setEmail] = useState(presetEmail ?? '');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const title = isForVerification ? 'Verify Email' : 'Password Reset';
  const description = isForVerification
    ? 'Enter your email to receive a verification code.'
    : 'Provide your account’s email for which you want to reset your password.';

  const { enterCode, apiError, setApiError, handleContinue } =
    useEmailVerificationFlow({
      isForVerification,
      email,
      forgotPassword,
      onVerified,
    });

  const safeHandleContinue = () =>
    withLoading(loading, setLoading, () => handleContinue(code));

  const onResendClick = () =>
    handleResendVerification(email, isForVerification, reset, setApiError);

  const { counter, reset } = useCountdown(30, enterCode);
  setCode('');

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
              onChange={(e) => setEmail(e.target.value)}
            />
            {apiError && (
              <p className="text-red-400 text-sm text-start">{apiError}</p>
            )}
          </>
        ) : (
          <EnterCodeInput
            onComplete={async (code) => {
              try {
                const data = await verifyCode(email, code, isForVerification);
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);

                onVerified(email);
              } catch (err: any) {
                setApiError('INVALID_CODE');
              }
            }}
          />
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
          {apiError && (
            <p className="text-red-400 text-sm text-center ">{apiError}</p>
          )}
        </div>
      )}
      <div className={'mb-8'}></div>
      <SignInButton
        onClick={safeHandleContinue}
        disabled={loading || !email || enterCode}
        isLoading={loading}
        text="Continue"
      />
    </section>
  );
}
