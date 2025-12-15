import { createContext, useContext, useState } from 'react';
import LoginSignupSideSection from '../components/sidebar-components/LoginSignupSideSection.tsx';

interface SignInContextValue {
  openSignIn: (view?: 'signIn' | 'signUp') => void;
  closeSignIn: () => void;
}
const SignInContext = createContext<SignInContextValue | null>(null);

export function SignInProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [initialView, setInitialView] = useState<'signIn' | 'signUp'>('signIn');
  return (
    <SignInContext.Provider
      value={{
        openSignIn: (view = 'signIn') => {
          setInitialView(view);
          setOpen(true);
        },
        closeSignIn: () => setOpen(false),
      }}
    >
      {children}
      {open && (
        <div>
          <LoginSignupSideSection onClose={() => setOpen(false)} />
        </div>
      )}
    </SignInContext.Provider>
  );
}

export function useSignIn() {
  const ctx = useContext(SignInContext);
  if (!ctx) throw new Error('useSignIn must be used inside SignInProvider');
  return ctx;
}
