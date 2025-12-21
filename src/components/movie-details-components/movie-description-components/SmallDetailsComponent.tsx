import type { ReactNode } from 'react';

interface SmallDetailsComponentProps {
  pgRating: string | ReactNode;
  language: string | ReactNode;
  duration: number | ReactNode;
  dateStart?: string;
  dateEnd?: string;
  showDates?: boolean;
}

export function SmallDetailsComponent({
  pgRating,
  duration,
  language,
  showDates = true,
  dateStart,
  dateEnd,
}: SmallDetailsComponentProps) {
  return (
    <section>
      <div className={'flex justify-start w-full'}>
        <span className="whitespace-nowrap md:pr-2">{pgRating}</span>
        <span className="h-5 w-px bg-[var(--color-secondary)] mx-2 inline-block align-text-bottom "></span>
        <span className="md:px-2">{language}</span>
        <span className="h-5 w-px bg-[var(--color-secondary)] mx-3 inline-block align-text-bottom "></span>
        <span className=" mx-2 md:w-auto w-[15%]  ">{duration} MIN</span>
        {showDates ? (
          <>
            <span className="h-5 md:ml-2 w-px bg-[var(--color-secondary)] inline-block align-text-bottom "></span>
            <span className={'md:px-4 pl-2 '}>
              Projection date: {dateStart} - {dateEnd}
            </span>
          </>
        ) : (
          ' '
        )}
      </div>
    </section>
  );
}
