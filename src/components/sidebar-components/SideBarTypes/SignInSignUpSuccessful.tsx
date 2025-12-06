import { LogInSideBarArrowButton } from '../../buttons/LogInSideBarArrowButton.tsx';

interface SignInSignUpSuccessfulProps {
  isForSignUp?: boolean;
  onClose: () => void;
}

export function SignInSingUpSuccessful({
  isForSignUp,
  onClose,
}: SignInSignUpSuccessfulProps) {
  return (
    <section className={''}>
      <div className={'flex justify-start mb-4 items-center mt-10 '}>
        <LogInSideBarArrowButton onClose={onClose} />
        <h1
          className={
            ' absolute left-1/2 -translate-x-1/2  text-xl text-[var(--color-second-white)] font-bold '
          }
        >
          {isForSignUp ? 'You are all set!  🎉' : 'Sign In Successful!  🎉 '}
        </h1>
      </div>
      <div className={'items-center text-center '}>
        <p className={'text-center text-[var(--color-second-white)] mt-6 '}>
          {isForSignUp
            ? 'Start exploring latest movies, venues, and ticket options! '
            : 'Please, wait. You will be directed to the homepage.'}
        </p>
      </div>

      <div className={'items-center mt-[30%] flex justify-center'}>
        <img
          src={
            isForSignUp
              ? '/assets/logos/signUpSideBarImage.png'
              : '/assets/logos/cameraSideBar.png'
          }
          alt="Movie tape"
          width={196}
          height={204}
          className="object-contain "
        />
      </div>
      {isForSignUp ? (
        <button
          className={
            'mt-[22%] h-12 w-full bg-[var(--color-secondary)] rounded-lg text-white '
          }
          onClick={onClose}
        >
          See Movies
        </button>
      ) : (
        ' '
      )}
    </section>
  );
}
