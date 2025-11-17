import React from 'react';
import GenreButton from '../buttons/GenreButton.tsx';

export interface CurrentlyShowingCardProps {
  coverImageUrl: string;
  title: string;
  duration?: number;
  PGRating: string;
  language: string;
  movieGenres?: string[];
  projectionEnd?: string;

  showTimes?: string[];
}

export default function CurrentlyShowingCard({
  coverImageUrl,
  duration,
  title,
  movieGenres,
  projectionEnd = '',
  showTimes,
  language,
  PGRating,
}: CurrentlyShowingCardProps) {
  return (
    <section className={'relative'}>
      <div
        className={
          'h-3/3 w-full text-[var(--color-primary)] my-10 border border-gray-200 rounded-3xl flex sm:flex-row flex-col'
        }
      >
        <img
          src={coverImageUrl}
          alt={title}
          className="relative gap-4 m-4 h-3/3  max-w-[270px] aspect-[9/10] rounded-2xl object-cover"
        />

        <div className={'col-span-3  mt-4 ml-6 flex flex-col justify-between '}>
          <div className={''}>
            <h2 className={'text-[32px]  font-semibold'}>{title}</h2>
            <div className={'  my-4 '}>
              <span>{PGRating}</span>
              <span className="h-5 w-px bg-[var(--color-secondary)] mx-2 inline-block align-text-bottom "></span>
              <span>{language}</span>
              <span className="h-5 w-px bg-[var(--color-secondary)] mx-2 inline-block align-text-bottom "></span>
              <span>{duration} Min</span>
            </div>
            <div className={'flex flex-wrap gap-x-4 gap-y-2 w-4/6'}>
              {movieGenres?.map((genre) => (
                <GenreButton name={genre} />
              ))}
            </div>
          </div>

          <div className={'text-gray-500 mb-4 text-[14px] '}>
            <p>Playing in cinema until {projectionEnd}</p>
          </div>
        </div>
        <div className={'ml-4'}>
          <h2
            className={
              'text-[var(--color-secondary)] mt-6 font-semibold text-xl'
            }
          >
            Showtimes
          </h2>
        </div>
      </div>
    </section>
  );
}
