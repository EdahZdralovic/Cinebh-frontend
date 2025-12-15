import GenreButton from '../../buttons/GenreButton.tsx';
import type { DescriptionContainerProps } from '../../../types/MovieTypes.ts';

export function DescriptionContainer({
  pgRating,
  language,
  duration,
  directors,
  dateEnd,
  dateStart,
  genres,
  writers,
  synopsis,
}: DescriptionContainerProps) {
  return (
    <section>
      <div
        className={
          'flex justify-start text-[var(--color-primary)] md:text-md text-sm md:mt-6 mt-3 '
        }
      >
        <span className="whitespace-nowrap md:pr-2">{pgRating}</span>
        <span className="h-5 w-px bg-[var(--color-secondary)] mx-2 inline-block align-text-bottom "></span>
        <span className="md:px-2">{language}</span>
        <span className="h-5 w-px bg-[var(--color-secondary)] mx-2 inline-block align-text-bottom "></span>
        <span className="md:px-2 flex  md:w-[9%] w-14 ">{duration} MIN</span>
        <span className="h-5 w-px bg-[var(--color-secondary)] mx-2 inline-block align-text-bottom "></span>
        <span className={'md:px-2 flex  '}>
          Projection date: {dateStart} - {dateEnd}
        </span>
      </div>
      <div className={'flex flex-wrap md:gap-4 gap-2 my-4 pr-4'}>
        {genres.map((genre, index) => (
          <GenreButton name={genre} key={index} />
        ))}
      </div>
      <div className={'md:pr-14 text-lg'}>{synopsis}</div>
      <div className={'mt-6 text-lg '}>
        <span className={'text-gray-500 text-md'}>Director: </span>
        {directors.map((director, index) => (
          <span key={index} className={'text-'}>
            {director.fullName}
          </span>
        ))}
      </div>
      <div className={'mt-6 text-lg '}>
        <span className={'text-gray-500 text-md'}>Writters: </span>
        {writers.map((writer, index) => (
          <span key={index} className={'text-'}>
            {writer.fullName}
          </span>
        ))}
      </div>
    </section>
  );
}
