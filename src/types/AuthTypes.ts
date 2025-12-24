import type { ReactNode } from 'react';

export enum SideBarView {
  SIGN_IN = 'signIn',
  SIGN_UP = 'signUp',
  VERIFY_CODE = 'verifySignup',
  SUCCESS_LOG_IN = 'successLogin',
  SUCCESS_SIGN_UP = 'successSignUp',
  RESET = 'reset',
  NEW_PASSWORD = 'newPassword',
}
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
  initialView?: 'signIn' | 'signUp';
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

export type AuthUser = {
  email: string;
  role: RoleEnum;
  exp: number;
};

export enum RoleEnum {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
}

export type AuthContextType = {
  user: AuthUser | null;
  login: (
    email: string,
    password: string,
    rememberMe: boolean
  ) => Promise<void>;

  register: (email: string, password: string) => Promise<void>;

  logout: () => Promise<void>;
};
