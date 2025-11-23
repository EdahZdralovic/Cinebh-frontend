import GenreButton from '../buttons/GenreButton.tsx';
import { ProjectionTimeButton } from '../buttons/ProjectionTimeButton.tsx';
import type {CurrentlyShowingCardProps} from "../../types/Cards.ts";

export default function CurrentlyShowingCard({
  coverImageUrl,
  duration,
  title,
  movieGenres,
  projectionEnd = '',
  projections,
  language,
  PGRating,
  isSkeleton = false,
}: CurrentlyShowingCardProps) {
  return (
    <section className={''}>
      <div
        className={
          ' w-full text-[var(--color-primary)] shadow-lg lg:aspect-[4/1] aspect-auto max-h-fit h-full mt-6 border border-gray-200 rounded-3xl lg:grid lg:grid-cols-9 grid-cols-3'
        }
      >
        <img
          src={coverImageUrl}
          alt={title}
          className="relative lg:self-center m-[4%] lg:m-[4%] w-[92%] lg:w-full lg:col-span-2 col-span-3 aspect-[27/28]  rounded-2xl object-cover"
        />

        <div
          className={
            'lg:col-span-3  mt-4 lg:ml-10 ml-[4%] flex flex-col justify-between '
          }
        >
          {isSkeleton ? (
            <div className={''}>
              <h2
                className={'2xl:text-3xl text-lg text-gray-500 font-semibold'}
              >
                Loading
              </h2>
              <div className={'  xl:my-4 my-1 '}>
                <span></span>
              </div>
              <div
                className={
                  'flex flex-wrap xl:gap-x-4 xl:gap-y-2 gap-x-2 gap-y-1 w-4/6'
                }
              >
                <GenreButton name={'Loading...'} />
              </div>
            </div>
          ) : (
            <div className={''}>
              <h2 className={'2xl:text-3xl text-lg font-semibold'}>{title}</h2>
              <div className={'  xl:my-4 my-1 '}>
                <span>{PGRating}</span>
                <span className="h-5 w-px bg-[var(--color-secondary)] mx-2 inline-block align-text-bottom "></span>
                <span>{language}</span>
                <span className="h-5 w-px bg-[var(--color-secondary)] mx-2 inline-block align-text-bottom "></span>
                <span>{duration} Min</span>
              </div>
              <div
                className={
                  'flex flex-wrap xl:gap-x-4 xl:gap-y-2 gap-x-2 gap-y-1 w-4/6'
                }
              >
                {movieGenres?.map((genre) => (
                  <GenreButton name={genre} />
                ))}
              </div>
            </div>
          )}

          <div className={'text-gray-500 mb-4 text-[14px] '}>
            <p>
              {isSkeleton
                ? 'Loading...'
                : ' Playing in cinema until ' + projectionEnd}
            </p>
          </div>
        </div>
        <div className={' lg:grid-cols-4  ml-4'}>
          <h2
            className={
              'text-[var(--color-secondary)] lg:mt-6 mt-2 font-semibold text-xl ' +
              (isSkeleton ? ' text-gray-400 ' : ' ')
            }
          >
            Showtimes
          </h2>
          <div className={'flex flex-row gap-4 pt-3 lg:pb-0 pb-4'}>
            {projections?.map((projection) => (
              <ProjectionTimeButton time={projection} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
