import { useEffect, useState } from 'react';
import { SignInSingUpSuccessful } from './SideBarTypes/SignInSignUpSuccessful';
import { SignInSignUpInput } from './SideBarTypes/SignInSignUpInput';
import { NewPasswordEnterType } from './SideBarTypes/NewPasswordEnterType.tsx';
import { EmailVerifyType } from './SideBarTypes/EmailVerifyType.tsx';
import type {
  SideBarView,
  SignInOutSideOpenerProps,
} from '../../types/AuthTypes.ts';

export default function LoginSignupSideSection({
  onClose,
}: SignInOutSideOpenerProps) {
  const [view, setView] = useState<SideBarView>('signIn');
  const [signupEmail, setSignupEmail] = useState<string>('');
  const [resetEmail, setResetEmail] = useState<string | null>(null);

  useEffect(() => {
    if (view === 'successLogin') {
      const timer = setTimeout(onClose, 1500);
      return () => clearTimeout(timer);
    }
  }, [view]);

  return (
    <section>
      <div className="fixed h-full items-center md:w-2/6 overflow-y-auto overscroll-contain w-full top-[80px] top-0 pb-14 sm:pb-0  right-0 bg-[var(--color-primary)] text-white flex flex-col">
        <div className={'sm:w-4/6 w-10/12'}>
          <div className="mt-[10%]   relative flex justify-center ">
            <img src="/assets/logos/Logo.png" width={130} />
          </div>

          {view === 'signIn' && (
            <SignInSignUpInput
              isForSignUp={false}
              onLoginSuccess={() => setView('successLogin')}
              goToSignUp={() => setView('signUp')}
              goToReset={() => setView('reset')}
              onRegisterSuccess={(email) => {
                setSignupEmail(email);
                setView('verifySignup');
              }}
              onClose={onClose}
            />
          )}

          {view === 'signUp' && (
            <SignInSignUpInput
              isForSignUp={true}
              onRegisterSuccess={(email) => {
                setSignupEmail(email);
                setView('verifySignup');
              }}
              goToSignUp={() => setView('signIn')}
              goToReset={() => setView('reset')}
              onClose={onClose}
            />
          )}

          {view === 'verifySignup' && signupEmail && (
            <EmailVerifyType
              isForVerification
              presetEmail={signupEmail}
              onBack={() => setView('signUp')}
              onVerified={() => setView('successSignUp')}
            />
          )}

          {view === 'reset' && (
            <EmailVerifyType
              isForVerification={false}
              onBack={() => setView('signIn')}
              presetEmail={signupEmail}
              onVerified={(email) => {
                setResetEmail(email);
                setView('newPassword');
              }}
            />
          )}

          {view === 'successLogin' && (
            <SignInSingUpSuccessful onClose={onClose} isForSignUp={false} />
          )}

          {view === 'successSignUp' && (
            <SignInSingUpSuccessful onClose={onClose} isForSignUp={true} />
          )}

          {view === 'newPassword' && (
            <NewPasswordEnterType
              email={resetEmail}
              onBack={() => setView('reset')}
              onSuccess={() => setView('successSignUp')}
            />
          )}
        </div>
      </div>
    </section>
  );
}
