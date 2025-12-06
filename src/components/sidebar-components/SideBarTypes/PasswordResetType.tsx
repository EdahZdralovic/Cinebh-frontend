import { LogInSideBarArrowButton } from '../../buttons/LogInSideBarArrowButton.tsx';
import { InputField } from '../InputField.tsx';
import { useEffect, useState } from 'react';
import { LuMail } from 'react-icons/lu';
import { EnterCodeInput } from '../EnterCodeInput.tsx';

interface PasswordResetProps {
  onClose: () => void;
  onBack: () => void;
  onVerified: () => void;
}

export function PasswordResetType({ onBack, onVerified }: PasswordResetProps) {
  const [email, setEmail] = useState('');
  const [enterCode, setEnterCode] = useState(false);
  const [counter, setCounter] = useState(45);
  const mailIcon = (
    <LuMail
      className={
        ' absolute left-1 top-1/2 -translate-y-1/2 w-10 pointer-events-none'
      }
    />
  );
  const maskEmail = (email: string) => {
    const [name, domain] = email.split('@');

    if (!name) return email;

    const first = name[0];
    const last = name[name.length - 1];

    return `${first}${'*'.repeat(Math.max(name.length - 2, 2))}${last}@${domain}`;
  };
  useEffect(() => {
    if (!enterCode) return;

    setCounter(45);
    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [enterCode]);

  const handleResend = () => {
    setCounter(45);
    console.log('RESEND CODE TO:', email);
  };
  const handleContinue = () => {
    if (!enterCode) {
      setEnterCode(true);
    } else {
      onVerified();
    }
  };

  return (
    <section className={'w-12/12'}>
      <div className={'flex justify-start mb-4 items-center mt-10 '}>
        <LogInSideBarArrowButton onClose={onBack} />
        <h1
          className={
            ' absolute left-1/2 -translate-x-1/2  sm:text-3xl text-xl text-[var(--color-second-white)] font-bold '
          }
        >
          Password Reset
        </h1>
      </div>
      <div className={'items-center text-center '}>
        {!enterCode ? (
          <p className="text-[var(--color-gray-secondary)] mt-6">
            Provide your account’s email for which you want to reset your
            password.
          </p>
        ) : (
          <p className="text-[var(--color-gray-secondary)] mt-6 leading-6">
            We have sent a code to your email <br />
            <span className="">{maskEmail(email)}</span>. Please, enter the code
            below to verify.
          </p>
        )}
      </div>

      <div className={'items-center mt-[10%] flex justify-center'}>
        {enterCode ? (
          <>
            <EnterCodeInput
              onComplete={() => {
                onVerified();
              }}
            />
          </>
        ) : (
          <>
            <InputField
              placeHolder={'Email Address'}
              type={'email'}
              name={'Email'}
              value={email}
              icon={mailIcon}
              onChange={(e) => setEmail(e.target.value)}
            />
          </>
        )}
      </div>
      {enterCode && (
        <div className="mt-8  text-center text-sm text-[var(--color-gray-secondary)] space-y-1">
          <p className={'mb-4'}>Didn’t receive the email?</p>

          {counter > 0 ? (
            <p>
              You can resend email in{' '}
              <span className={'font-bold text-white'}>{counter}</span> seconds
            </p>
          ) : (
            <button
              onClick={handleResend}
              className=" text-white underline py-2 px-4 rounded-md    hover:opacity-80"
            >
              Resend email
            </button>
          )}
        </div>
      )}
      <button
        className={
          'mt-8 h-12 w-full bg-[var(--color-secondary)] rounded-lg text-white '
        }
        onClick={handleContinue}
      >
        Continue
      </button>
    </section>
  );
}
