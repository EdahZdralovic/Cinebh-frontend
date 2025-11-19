import React from 'react';
import { openingLabel } from './OpeningLabel.tsx';
import type { MainCardProps } from '../../types/Cards.ts';

export default function MainCard({
  coverImageUrl,
  duration,
  title,
  movieGenres,
  street,
  isMovie,
  redStrip = false,
  projectionStart = '',
}: MainCardProps) {
  const genre = movieGenres?.[0];
  const dateForLabel = openingLabel(projectionStart as string);

  let detailsContent: React.ReactNode = null;
  if (isMovie) {
    detailsContent = (
      <div className="">
        <span className="whitespace-nowrap pr-2">{duration} MIN</span>
        <span className="h-5 w-px bg-[var(--color-gray-text)] mx-2 inline-block align-text-bottom "></span>
        <span className="px-2">{genre}</span>
      </div>
    );
  } else {
    detailsContent = (
      <div>
        <span className="text-[var(--color-gray-text] text-wrap ">
          {street}
        </span>
      </div>
    );
  }
  return (
    <div className="text-[var(--color-primary)]  shadow-lg w-auto relative border grid sm:max-w-[24%] min-w-[300px] items-center grid-col-1   rounded-3xl">
      <div className="relative m-4  aspect-[94/100] ">
        <img
          src={coverImageUrl}
          alt={title}
          className="relative h-full z-10 w-[100%] rounded-2xl object-cover"
        />
        {redStrip ? (
          <>
            <div className="absolute inline-flex z-10 items-center top-[6.0%] sm:top-[5.7%] sm:right-[-2.3%] right-[-2.07%]  h-5 bg-[var(--color-secondary)] rounded-l rounded-se-md py-4 px-2">
              <span className="whitespace-nowrap font-medium text-[14px] p1-2 text-white">
                {dateForLabel}
              </span>
            </div>
            <div className="absolute z-90 right-[-2.1%] top-[17.3%]  sm:top-[16.3%] border-x-[14px] border-x-transparent border-t-[22px] border-t-[var(--color-secondary)]"></div>
          </>
        ) : null}
      </div>
      <div className="font-semibold pl-4 truncate text-xl pb-2 ">{title}</div>
      <div className="pl-4 text-md text-[var(--color-gray-text)] tracking-[1.25%] pb-5 font-thin inline-flex items-center gap-2">
        {detailsContent}
      </div>
    </div>
  );
}
