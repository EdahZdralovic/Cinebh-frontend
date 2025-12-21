import { MediaSkeletonContainer } from './mediaSkeletonContainer.tsx';
import { DescriptionContainer } from '../movie-description-components/DescriptionContainer.tsx';
import { RatingContainer } from '../movie-description-components/RatingContainer.tsx';
import { MovieUpcomingProjections } from '../movie-projections-components/MovieUpcomingProjections.tsx';
import { SeeAlsoMovies } from '../SeeAlsoMovies.tsx';
import { ActorsContainer } from '../movie-description-components/ActorsContainer.tsx';
import { RiLoader2Fill } from 'react-icons/ri';
import { LOADING_MESSAGES } from '../../../utils/Constants.ts';

export function MovieDetailsSkeleton() {
  const genresSkeletonArray = [
    LOADING_MESSAGES.JUST_LOADING,
    LOADING_MESSAGES.JUST_LOADING,
    LOADING_MESSAGES.JUST_LOADING,
  ];
  return (
    <section>
      <div
        className={
          'flex flex-col lg:mx-[6%] mx-4 md:mt-8 mt-3 text-gray-500 animate-pulse'
        }
      >
        <div>
          <h2
            className={
              'md:text-3xl text-xl text-[var(--color-primary)] font-bold'
            }
          >
            Movie Details
          </h2>
        </div>
        <MediaSkeletonContainer />

        <div className={'mt-6 grid md:grid-cols-2 grid-cols-1'}>
          <div className={'flex flex-col md:pr-4'}>
            <h1
              className={
                'font-bold md:text-3xl text-xl text-[var(--color-primary)]'
              }
            >
              Loading...
            </h1>
            <DescriptionContainer
              pgRating={
                <RiLoader2Fill className={'size-4 ml-1 mr-2 animate-spin'} />
              }
              language={
                <RiLoader2Fill className={' size-4 ml-0 animate-spin '} />
              }
              duration={
                <RiLoader2Fill
                  className={'size-4 animate-spin mb-2 inline-flex mr-1 '}
                />
              }
              dateStart={LOADING_MESSAGES.JUST_LOADING}
              dateEnd={LOADING_MESSAGES.PLEASE_WAIT}
              genres={genresSkeletonArray}
              synopsis={LOADING_MESSAGES.LONG_LOADING_TEXT}
              directors={[]}
              writers={[]}
            />

            <div className={'md:mt-8 mt-2 flex flex-col '}>
              <ActorsContainer actors={[]} />
              <RatingContainer rottenTomatoesRating={0.0} imdbRating={0.0} />
            </div>
          </div>
          <div className={'md:mr-6 md:ml-4 '}>
            <MovieUpcomingProjections
              isSkeleton={true}
              title={''}
              startDate={''}
            />
          </div>
        </div>
        <div className={'md:mt-0 mt-5'}>
          <SeeAlsoMovies />
        </div>
      </div>
    </section>
  );
}
