import { SignInButton } from '../../buttons/SignInButton.tsx';
import { FaApple, FaGoogle } from 'react-icons/fa';
import { InputField } from '../InputField.tsx';
import { useState } from 'react';
import { LogInSideBarArrowButton } from '../../buttons/LogInSideBarArrowButton.tsx';
import { LOCK_ICON, MAIL_ICON } from '../../../utils/icons.tsx';
import { useAuthSubmit } from '../../../hooks/auth-hooks/useAuthSubmit.ts';
import { NotVerifiedButton } from '../../buttons/NotVerifiedButton.tsx';
import type { SignInSignUpProps } from '../../../types/AuthTypes.ts';

export function SignInSignUpInput({
  onClose,
  isForSignUp = false,
  goToSignUp,
  onLoginSuccess,
  onRegisterSuccess,
  goToReset,
  isForPasswordReset = false,
}: SignInSignUpProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  const {
    loginSubmit,
    registerSubmit,
    error,
    hasSubmitted,
    needsVerification,
  } = useAuthSubmit({
    email,
    password,
    confirmPassword,
    onLoginSuccess,
    onRegisterSuccess,
  });

  const showPasswordError =
    isForSignUp && hasSubmitted && password !== confirmPassword;
  const isMatchingPassword = !showPasswordError;

  return (
    <section className={''}>
      <div className={'flex justify-start mb-4 items-center mt-10 '}>
        <LogInSideBarArrowButton onClose={onClose} />
        <h1
          className={
            ' absolute left-1/2 -translate-x-1/2  sm:text-3xl text-xl text-[var(--color-second-white)] font-bold '
          }
        >
          {isForSignUp ? 'Hello' : 'Welcome Back'}
        </h1>
      </div>
      <div className={'items-center'}>
        {isForPasswordReset ? (
          ''
        ) : (
          <>
            {' '}
            <InputField
              placeHolder={'Email Address'}
              type={'email'}
              name={'Email'}
              value={email}
              icon={MAIL_ICON}
              onChange={(e) => setEmail(e.target.value)}
            />
          </>
        )}

        <InputField
          placeHolder={'Password'}
          type={'password'}
          name={'Password'}
          icon={LOCK_ICON}
          value={password}
          isPassword
          onChange={(e) => setPassword(e.target.value)}
          isMatchingPasswords={!showPasswordError}
        />

        {isForSignUp && (
          <InputField
            placeHolder={'Retype Password'}
            type={'password'}
            name={'Confirm Password'}
            icon={LOCK_ICON}
            isPassword
            onChange={(e) => setConfirmPassword(e.target.value)}
            isMatchingPasswords={!showPasswordError}
          />
        )}

        {error && (
          <p className="text-[var(--color-secondary)] text-sm mt-1 ">{error}</p>
        )}
        {needsVerification && (
          <div className="text-center mt-3">
            <NotVerifiedButton
              email={email}
              onRegisterSuccess={onRegisterSuccess}
            />
          </div>
        )}

        <div
          className={
            'flex justify-between mb-3 mt-2 text-[var(--color-second-white)] '
          }
        >
          <div>
            <input
              type="checkbox"
              className="w-4 h-4 mb-5 rounded-md accent-[var(--color-primary)]  checked:bg-transparent border border-gray-200 "
            />
            <span className="text-lg pl-2 ">Remember me</span>
          </div>
          <button onClick={goToReset}>Forgot password?</button>
        </div>
        <SignInButton
          disabled={!isMatchingPassword && isForSignUp}
          onClick={isForSignUp ? registerSubmit : loginSubmit}
        />

        <div className={'w-4/6 self-center ml-[20%] mt-6'}>
          {isForSignUp ? (
            <>
              <span className={' mr-1'}> Already have an account ?</span>
              <button onClick={goToSignUp} className={'underline'}>
                Sign In
              </button>
            </>
          ) : (
            <>
              <span className={'mr-1'}> Don’t have an account yet?</span>
              <button onClick={goToSignUp} className={'underline'}>
                Sign Up
              </button>
            </>
          )}
        </div>
        <div className="flex items-center w-full my-5">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-4 text-lg text-white">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <div
          className={'flex flex-col columns-2 justify-center  items-center '}
        >
          <span className={'col-span-2 mb-5'}>Login with </span>
          <div className={'flex items-center gap-4 mb-6'}>
            <FaGoogle className={'col-span-1 '} size={30} />{' '}
            <FaApple className={'col-span-1 '} size={30} />
          </div>
          <button onClick={onClose}>
            <span className={'col-span-w underline mt-4'}>
              Continue without Signing In
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
