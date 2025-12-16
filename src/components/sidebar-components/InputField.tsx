import { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import type { InputFieldProps } from '../../types/AuthTypes.ts';
import { AUTH_CONST, ERRORS } from '../../utils/Constants.ts';

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
  const isEmail = type === AUTH_CONST.EMAIL_KEY_WORD;
  return (
    <div className={'flex mt-2  w-full text-lg flex-col justify-start'}>
      <h5
        className={isMatchingPasswords ? ' ' : ' text-[var(--color-error-red)]'}
      >
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
          type={
            isPassword
              ? showPassword
                ? AUTH_CONST.TEXT_KEY_WORD
                : AUTH_CONST.PASSWORD_KEY_WORD
              : isEmail
                ? AUTH_CONST.TEXT_KEY_WORD
                : type
          }
          placeholder={placeHolder}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          value={value}
          onChange={onChange}
          pattern={isEmail ? AUTH_CONST.REGEX_PATTERN : ''}
          title={isEmail ? ERRORS.INVALID_EMAIL : ''}
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
          {ERRORS.PASSWORDS_NOT_MATCHING}
        </span>
      )}
    </div>
  );
}
