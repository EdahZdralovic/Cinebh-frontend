import { useEffect, useState } from 'react';

import { SignInSingUpSuccessful } from './SideBarTypes/SignInSignUpSuccessful';
import { SignInSignUpInput } from './SideBarTypes/SignInSignUpInput';
import { PasswordResetType } from './SideBarTypes/PasswordResetType';
import { NewPasswordEnterType } from './SideBarTypes/NewPasswordEnterType.tsx';

interface SignInOutSideOpenerProps {
  onClose: () => void;
}

type SideBarView =
  | 'signIn'
  | 'signUp'
  | 'successLogin'
  | 'successSignUp'
  | 'reset'
  | 'newPassword';

function SignInOutSideOpener({ onClose }: SignInOutSideOpenerProps) {
  const [view, setView] = useState<SideBarView>('signIn');

  useEffect(() => {
    if (view === 'successLogin') {
      const timer = setTimeout(onClose, 1500);
      return () => clearTimeout(timer);
    }
  }, [view]);

  return (
    <section>
      <div className="fixed h-full items-center md:w-2/6 overflow-y-auto overscroll-contain w-full sm:top-[80px] top-0 pb-14 sm:pb-0  right-0 bg-[var(--color-primary)] text-white flex flex-col">
        <div className={'  w-4/6'}>
          <div className="mt-[10%]   relative flex justify-center ">
            <img src="/assets/logos/Logo.png" width={130} />
          </div>

          {view === 'signIn' && (
            <SignInSignUpInput
              isForSignUp={false}
              onLoginSuccess={() => setView('successLogin')}
              goToSignUp={() => setView('signUp')}
              goToReset={() => setView('reset')}
              onClose={onClose}
            />
          )}

          {view === 'signUp' && (
            <SignInSignUpInput
              isForSignUp={true}
              onRegisterSuccess={() => setView('successSignUp')}
              goToSignUp={() => setView('signIn')}
              goToReset={() => setView('reset')}
              onClose={onClose}
            />
          )}

          {view === 'reset' && (
            <PasswordResetType
              onBack={() => setView('signIn')}
              onClose={onClose}
              onVerified={() => setView('newPassword')}
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
              onBack={() => setView('reset')}
              onSuccess={() => setView('successLogin')}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default SignInOutSideOpener;
