import type { ReactNode } from 'react';

export type SideBarView =
  | 'signIn'
  | 'signUp'
  | 'verifySignup'
  | 'successLogin'
  | 'successSignUp'
  | 'reset'
  | 'newPassword';

export interface useEmailVerificationFlowProps {
  isForVerification: boolean;
  email: string;
  forgotPassword: (email: string) => Promise<any>;
  onVerified: (email: string) => void;
}

export interface UseResetPasswordProps {
  email: string | null;
  onSuccess: () => void;
}

export interface useAuthSubmitProps {
  email: string;
  password: string;
  rememberMe: boolean;
  confirmPassword?: string;
  onLoginSuccess?: () => void;
  onRegisterSuccess?: (email: string) => void;
}

export interface InputFieldProps {
  icon: ReactNode;
  placeHolder?: string;
  type?: string;
  onSubmit?: () => void;
  name: string;
  isPassword?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isMatchingPasswords?: boolean;
}

export interface SignInOutSideOpenerProps {
  onClose: () => void;
}

export interface EmailVerifyTypeProps {
  isForVerification: boolean;
  onBack: () => void;
  onVerified: (email: string) => void;
  presetEmail?: string;
}

export interface SignInSignUpProps {
  onClose: () => void;
  isForSignUp: boolean;
  onLoginSuccess?: () => void;
  onRegisterSuccess?: (email: string) => void;
  goToSignUp?: () => void;
  goToSignIn?: () => void;
  goToReset?: () => void;
  isForPasswordReset?: boolean;
}

export interface SignInSignUpSuccessfulProps {
  isForSignUp?: boolean;
  onClose: () => void;
}

export interface EnterCodeInputProps {
  onComplete: (code: string) => void;
}

export interface HandlePasteProps {
  e: React.ClipboardEvent<HTMLInputElement>;
  code: string[];
  setCode: React.Dispatch<React.SetStateAction<string[]>>;
  inputs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  codeLength: number;
  onComplete: (code: string) => void;
}
