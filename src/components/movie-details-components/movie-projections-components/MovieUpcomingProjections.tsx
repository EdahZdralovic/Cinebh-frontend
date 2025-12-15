import { SignInButton } from '../../buttons/SignInButton.tsx';
import { useSignIn } from '../../../context/SignInContext.tsx';

interface MovieUpcomingProjectionsProps {
  title: string;
  startDate: string;
}
function getMonthName(dateString: string): string {
  const date = new Date(dateString);

  return date.toLocaleString('en-US', {
    month: 'long',
  });
}

export function MovieUpcomingProjections({
  title,
  startDate,
}: MovieUpcomingProjectionsProps) {
  const month = getMonthName(startDate);
  const notifyImageUrl = '/assets/logos/notifyMeLogo.png';
  const { openSignIn } = useSignIn();

  return (
    <section
      className={
        'text-[var(--color-primary)] bg-[#FCFCFD] shadow-lg rounded-2xl'
      }
    >
      <div className={''}>
        <div
          className={
            ' border-t mt-4 border-l border-r border-gray-200 p-6 rounded-t-2xl flex flex-col items-center justify-center'
          }
        >
          <h1
            className={
              'text-2xl self-center mt-4 font-bold text-[var(--color-disabled-primary)]'
            }
          >
            {title + ' is coming in ' + month + ' !'}
          </h1>
          <p
            className={
              'self-center mt-5 font-thin text-[var(--color-gray-text)]'
            }
          >
            Get notified when the movie is part of the schedule.
          </p>
          <div className="flex justify-center items-center w-full">
            <img
              src={notifyImageUrl}
              alt={title}
              className={' self-center p-10  w-1/2 mt-4 '}
            />
          </div>
        </div>
        <div
          className={
            ' p-8 border-gray-200 border rounded-b-2xl grid grid-cols-1 items-center '
          }
        >
          <SignInButton text={'Notify Me'} />
          <div className={'flex justify-center  mt-4   '}>
            <p>Only signed up users can be notified. </p>
            <button
              className={'underline ml-3 font-bold '}
              onClick={() => openSignIn('signUp')}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
