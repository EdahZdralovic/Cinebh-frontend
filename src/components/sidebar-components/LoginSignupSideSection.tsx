import { useEffect, useState } from 'react';
import { SignInSingUpSuccessful } from './SideBarTypes/SignInSignUpSuccessful';
import { SignInSignUpInput } from './SideBarTypes/SignInSignUpInput';
import { NewPasswordEnterType } from './SideBarTypes/NewPasswordEnterType.tsx';
import { EmailVerifyType } from './SideBarTypes/EmailVerifyType.tsx';
import {
  SideBarView,
  type SignInOutSideOpenerProps,
} from '../../types/AuthTypes.ts';

export default function LoginSignupSideSection({
  onClose,
}: SignInOutSideOpenerProps) {
  const [view, setView] = useState<SideBarView>(SideBarView.SIGN_IN);
  const [signupEmail, setSignupEmail] = useState<string>('');
  const [resetEmail, setResetEmail] = useState<string | null>(null);

  function sideBarChange(sideBarType: SideBarView) {
    setView(sideBarType);
  }
  function goToSignIn() {
    sideBarChange(SideBarView.SIGN_IN);
  }

  function goToSignUp() {
    sideBarChange(SideBarView.SIGN_UP);
  }

  function goToReset() {
    sideBarChange(SideBarView.RESET);
  }

  function handleLoginSuccess() {
    sideBarChange(SideBarView.SUCCESS_LOG_IN);
  }
  function handleSignupSuccess() {
    sideBarChange(SideBarView.SUCCESS_SIGN_UP);
  }

  function handleEmailAndChangeView(
    setEmail: (email: string) => void,
    nextView: SideBarView
  ) {
    return (email: string) => {
      setEmail(email);
      sideBarChange(nextView);
    };
  }

  useEffect(() => {
    if (view === SideBarView.SUCCESS_LOG_IN) {
      const timer = setTimeout(onClose, 1500);
      return clearTimeout(timer);
    }
  }, [view]);

  return (
    <section>
      <div className="fixed h-full items-center md:w-2/6 overflow-y-auto overscroll-contain w-full top-[80px] top-0 pb-14 sm:pb-0  right-0 bg-[var(--color-primary)] text-white flex flex-col">
        <div className={'sm:w-4/6 w-10/12'}>
          <div className="mt-[10%] relative flex justify-center ">
            <img src="/assets/logos/Logo.png" width={130} />
          </div>

          {view === SideBarView.SIGN_IN && (
            <SignInSignUpInput
              isForSignUp={false}
              onLoginSuccess={handleLoginSuccess}
              goToSignUp={goToSignUp}
              goToReset={goToReset}
              onRegisterSuccess={handleEmailAndChangeView(
                setSignupEmail,
                SideBarView.VERIFY_CODE
              )}
              onClose={onClose}
            />
          )}

          {view === SideBarView.SIGN_UP && (
            <SignInSignUpInput
              isForSignUp={true}
              onRegisterSuccess={handleEmailAndChangeView(
                setSignupEmail,
                SideBarView.VERIFY_CODE
              )}
              goToSignUp={goToSignUp}
              goToReset={goToReset}
              onClose={onClose}
            />
          )}

          {view === SideBarView.VERIFY_CODE && signupEmail && (
            <EmailVerifyType
              isForVerification
              presetEmail={signupEmail}
              onBack={goToSignUp}
              onVerified={handleSignupSuccess}
            />
          )}

          {view === SideBarView.RESET && (
            <EmailVerifyType
              isForVerification={false}
              onBack={goToSignIn}
              presetEmail={signupEmail}
              onVerified={handleEmailAndChangeView(
                setResetEmail,
                SideBarView.NEW_PASSWORD
              )}
            />
          )}

          {view === SideBarView.SUCCESS_LOG_IN && (
            <SignInSingUpSuccessful onClose={onClose} isForSignUp={false} />
          )}

          {view === SideBarView.SUCCESS_SIGN_UP && (
            <SignInSingUpSuccessful onClose={onClose} isForSignUp={true} />
          )}

          {view === 'newPassword' && (
            <NewPasswordEnterType
              email={resetEmail}
              onBack={goToReset}
              onSuccess={handleSignupSuccess}
            />
          )}
        </div>
      </div>
    </section>
  );
}
