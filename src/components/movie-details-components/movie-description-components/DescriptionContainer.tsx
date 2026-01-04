import GenreButton from '../../buttons/GenreButton.tsx';
import type { DescriptionContainerProps } from '../../../types/MovieTypes.ts';
import { SmallDetailsComponent } from './SmallDetailsComponent.tsx';

export function DescriptionContainer({
  pgRating,
  language,
  duration = 0,
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
        <SmallDetailsComponent
          pgRating={pgRating}
          duration={duration}
          language={language}
          showDates={true}
          dateStart={dateStart}
          dateEnd={dateEnd}
        />
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
            {index < directors.length - 1 ? ', ' : ''}
          </span>
        ))}
      </div>
      <div className={'md:mt-6 mt-3 md:mb-0 mb-2 text-lg '}>
        <span className={'text-gray-500 text-md'}>Writers: </span>
        {writers.map((writer, index) => (
          <span key={index} className={'text-'}>
            {writer.fullName}
            {index < writers.length - 1 ? ', ' : ''}
          </span>
        ))}
      </div>
    </section>
  );
}
