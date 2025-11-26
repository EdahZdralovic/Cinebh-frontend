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
        <span className="h-5 w-px bg-white mx-2 inline-block align-text-bottom "></span>
      </div>
    );
  }
  return (
    <section>
      <div className="justify-center z-0 shadow-lg  w-auto relative  grid  items-center grid-col-1 rounded-3xl">
        <div className="relative m-4 min-h-full  aspect-[94/100] ">
          <img
            src={coverImageUrl}
            alt={title}
            className="relative h-full z-10 min-w-[95%] aspect-[94/100] w-full  rounded-2xl object-cover"
          />
          {redStrip ? (
            <div
              className={
                'absolute top-[6%] right-[-2%] flex flex-col items-end'
              }
            >
              <div className="inline-flex  z-10 items-center  right-[-2.07%]  h-5 bg-[var(--color-secondary)] rounded-l rounded-se-md py-4 px-2">
                <span className="whitespace-nowrap  font-medium text-[14px] pl-2 text-white">
                  {dateForLabel}
                </span>
              </div>
              <div className="z-0 right-[100%] top-[17.3%]  sm:top-[16.3%] border-x-[14px] border-x-transparent border-t-[22px] border-t-[var(--color-secondary)]"></div>
            </div>
          ) : null}
        </div>
        <div className="font-semibold pl-4 truncate text-xl pb-2 ">{title}</div>
        <div className="pl-4 text-md text-[var(--color-gray-text)] tracking-[1.25%] pb-5 font-thin inline-flex items-center gap-2">
          {detailsContent}
        </div>
      </div>
    </section>
  );
}
