import { type ReactNode, useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

interface InputFieldProps {
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

export function InputField({
  icon,
  placeHolder,
  type = '',
  name,
  isPassword = false,
  value,
  onChange,
  isMatchingPasswords = true,
}: InputFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={'flex mt-2  w-full text-lg flex-col justify-start'}>
      <h5
        className={isMatchingPasswords ? ' ' : ' text-[var(--color-error-red)]'}
      >
        {' '}
        {name}
      </h5>

      <div
        className={
          'relative bg-white items-center mb-2 rounded-lg text-[var(--color-primary)] ' +
          (isMatchingPasswords
            ? ' '
            : ' border border-[var(--color-error-red)] text-[var(--color-secondary)]')
        }
      >
        <span
          className={
            isOpen
              ? 'text-[var(--color-secondary)] '
              : 'text-[var(--color-primary)] '
          }
        >
          {icon}
        </span>
        <input
          className={
            'h-12 rounded-lg w-full pl-10 pr-10 min-w-[30px] text-lg leading-3 focus:outline-none '
          }
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeHolder}
          onFocus={() => setIsOpen(true)}
          onSubmit={() => setIsOpen(false)}
          value={value}
          onChange={onChange}
        />
        {isPassword === true ? (
          <span
            className="absolute right-3 top-1/2  -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <BsEye className={''} />
            ) : (
              <BsEyeSlash className={''} />
            )}
          </span>
        ) : (
          ' '
        )}
      </div>
      {isMatchingPasswords ? (
        ' '
      ) : (
        <span className={'text-xs text-[var(--color-error-red)]'}>
          Passwords do not match.
        </span>
      )}
    </div>
  );
}
