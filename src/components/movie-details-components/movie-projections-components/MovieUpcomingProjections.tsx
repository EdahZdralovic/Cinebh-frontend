import { SignInButton } from '../../buttons/SignInButton.tsx';
import type { MovieUpcomingProjectionsProps } from '../../../types/MovieTypes.ts';
import { getMonthName } from '../../../utils/movieFunctions.ts';

import { SignUpProjectionsButton } from '../../buttons/SignUpProjectionsButton.tsx';
import { COMPONENTS_TEXT } from '../../../utils/Constants.ts';
import { useAuth } from '../../../context/AuthContext.tsx';

export function MovieUpcomingProjections({
  title,
  startDate,
  isSkeleton = false,
}: MovieUpcomingProjectionsProps) {
  const month = getMonthName(startDate);
  const notifyImageUrl = '/assets/logos/notifyMeLogo.png';
  const { user } = useAuth();
  const isLoggedIn = !!user;

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
            {isSkeleton
              ? 'Movie is Loading, please wait. '
              : title + ' is coming in ' + month + ' !'}
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
              alt={'Notify Bell'}
              className={' self-center p-10  w-1/2 mt-4 '}
            />
          </div>
        </div>
        <div
          className={
            'md:px-8 px-4 mb-5 border-gray-200 border rounded-b-2xl grid grid-cols-1 items-center '
          }
        >
          <SignInButton text={'Notify Me'} />
          <div className={'col-span-2 my-3'}>
            <SignUpProjectionsButton
              isLoggedIn={false}
              textBeforeButton={COMPONENTS_TEXT.ONLY_SIGN_UP_NOTIFY}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
