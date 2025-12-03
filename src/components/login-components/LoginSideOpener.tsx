import { SignInButton } from '../buttons/SignInButton.tsx';
import { GoLock } from 'react-icons/go';
import { LuMail } from 'react-icons/lu';
import { InputField } from './InputField.tsx';

interface SignInOutSideOpenerParams {
  isSignIn: boolean;
}

function SignInOutSideOpener({ isSignIn }: SignInOutSideOpenerParams) {
  const mailIcon = (
    <LuMail
      className={
        ' absolute left-1 top-1/2 -translate-y-1/2 w-10 pointer-events-none'
      }
    />
  );
  const passwordIcon = (
    <GoLock
      className={
        ' absolute left-1 top-1/2 -translate-y-1/2 w-10 pointer-events-none'
      }
    />
  );

  return (
    <section>
      <div className="fixed h-full w-2/6 top-[80px] right-0 items-center bg-[var(--color-primary)] text-white flex flex-col  ">
        <div className={' mt-14  items-center'}>
          <img
            src="/assets/logos/Logo.png"
            alt="CineBH Logo"
            width={130}
            height={32}
            className="object-contain"
          />
        </div>

        <h1
          className={
            ' mt-12 text-3xl text-[var(--color-second-white)] font-bold '
          }
        >
          {isSignIn ? 'Welcome Back' : 'Hello'}
        </h1>

          <div className={"w-5/6"}>
        <InputField
          placeHolder={'Email Address'}
          type={'email'}
          name={'Email'}
          icon={mailIcon}
          isOpen={false}
        />
        <InputField
          placeHolder={'Password'}
          type={'password'}
          name={'Password'}
          icon={passwordIcon}
          isOpen={false}
        />
              {isSignIn ? null : (  <InputField
                  placeHolder={'Retype Password'}
                  type={'password'}
                  name={'Confirm Password'}
                  icon={passwordIcon}
                  isOpen={false}
              />)}

        <SignInButton />
          </div>
      </div>
    </section>
  );
}

export default SignInOutSideOpener;
