
import { Link } from 'react-router-dom';

export default function NoMoviesToPreview() {
  return (
    <section
      className={
        'flex col-span-4 flex-col text-[var(--color-primary)] mt-4 gap-4 w-full justify-center items-center bg-white rounded-3xl border border-gray-200'
      }
    >
      <div className={'sm:mt-8 mt-2'}>
        <img
          src="/assets/images/cinema_tape.png"
          className={'w-[72px] mt-14 h-[64px] aspect-square '}
          alt={'Cinema Tape'}
        />
      </div>
      <span
        className={
          'font-semibold text-[16px] text-[var(--color-primary)] mt-4 px-4 text-center'
        }
      >
        No movies to preview for current date range
      </span>
      <p className={'max-w-[725px] font-normal text-center px-4'}>
        We are working on updating our schedule for upcoming movies. Stay tuned
        for amazing movie experience or explore our other exciting cinema
        features in the meantime!
      </p>
      <Link to="/upcoming">
        <button
          className="underline underline-thicknes-2 pb-4 font-bold mb-14 mt-2 text-[var(--color-secondary)]"
        >
          Explore Upcoming Movies
        </button>
      </Link>
    </section>
  );
}
