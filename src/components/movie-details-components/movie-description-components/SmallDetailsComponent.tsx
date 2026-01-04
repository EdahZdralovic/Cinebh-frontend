import { RiLoader2Fill } from 'react-icons/ri';
import type { ReactNode } from 'react';

interface SmallDetailsComponentProps {
  pgRating: string | ReactNode;
  language: string | ReactNode;
  duration: number | ReactNode;
  dateStart?: string;
  dateEnd?: string;
  showDates?: boolean;
  isSkeleton?: boolean;
}

export function SmallDetailsComponent({
  pgRating,
  duration,
  language = 'EN',
  showDates = true,
  dateStart,
  dateEnd,
  isSkeleton = false,
}: SmallDetailsComponentProps) {
  return (
    <section>
      <div className={'flex justify-start w-full'}>
        <span className="whitespace-nowrap md:pr-2">
          {isSkeleton ? (
            <RiLoader2Fill className={'size-4 ml-1 mr-2 animate-spin'} />
          ) : (
            pgRating
          )}
        </span>
        <span className="h-5 w-px bg-[var(--color-secondary)] mx-2 inline-block align-text-bottom "></span>
        <span className="md:px-2">
          {isSkeleton ? (
            <RiLoader2Fill className={'size-4 ml-1 mr-2 animate-spin'} />
          ) : (
            language
          )}
        </span>
        <span className="h-5 w-px bg-[var(--color-secondary)] mx-3 inline-block align-text-bottom "></span>
        <span className=" mx-1 md:w-auto w-[13%]  ">
          {isSkeleton ? (
            <RiLoader2Fill className={'size-4 ml-1 mr-2 animate-spin'} />
          ) : (
            <>{duration} MIN</>
          )}
        </span>
        {showDates ? (
          <>
            <span className="h-5 md:ml-2  w-px bg-[var(--color-secondary)] inline-block align-text-bottom "></span>
            <span className={'md:px-4 pl-2 '}>
              {isSkeleton ? (
                <>
                  Loading ...
                  <RiLoader2Fill className={'size-4 ml-1 mr-2 animate-spin'} />
                </>
              ) : (
                <>
                  Projection date: {dateStart} - {dateEnd}
                </>
              )}
            </span>
          </>
        ) : (
          ' '
        )}
      </div>
    </section>
  );
}
