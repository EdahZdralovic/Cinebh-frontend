import React from 'react';
import GenreButton from '../buttons/GenreButton.tsx';
import { ProjectionTimeButton } from '../buttons/ProjectionTimeButton.tsx';

export interface CurrentlyShowingCardProps {
  coverImageUrl: string;
  title: string;
  duration?: number;
  PGRating: string;
  language: string;
  movieGenres?: string[];
  projectionEnd?: string;

  projections?: string[];
}

export default function CurrentlyShowingCard({
  coverImageUrl,
  duration,
  title,
  movieGenres,
  projectionEnd = '',
  projections,
  language,
  PGRating,
}: CurrentlyShowingCardProps) {
  return (
    <section className={''}>
      <div
        className={
          ' w-full text-[var(--color-primary)] shadow-lg aspect-[4/1] max-h-fit mt-6 mb-0 border border-gray-200 rounded-3xl grid grid-cols-9'
        }
      >
        <img
          src={coverImageUrl}
          alt={title}
          className="relative gap-4 m-4 col-span-2 w-full aspect-square  rounded-2xl object-cover"
        />

        <div
          className={'col-span-3  mt-4 ml-10 flex flex-col justify-between '}
        >
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
        <div className={' grid-cols-4 ml-4'}>
          <h2
            className={
              'text-[var(--color-secondary)] mt-6 font-semibold text-xl'
            }
          >
            Showtimes
          </h2>
          <div className={'flex flex-row gap-4 pt-3 '}>
            {projections?.map((projection) => (
              <ProjectionTimeButton time={projection} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
