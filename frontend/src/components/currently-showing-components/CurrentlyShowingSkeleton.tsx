import CurrentlyShowingCard from './CurrentlyShowingCard.tsx';
import SelectFilterSkeleton from '../filter-components/generic-select-filter/SelectFilterSkeleton.tsx';
import { RiLoader2Fill } from 'react-icons/ri';
import DateDaysSkeletonComponent from './DateDaysSkeletonComponent.tsx';

export function CurrentlyShowingSkeleton() {
  return (
    <section
      className={'items-center text-[var(--color-primary)]  pt-6 lg:pt-12'}
    >
      <div className={'relative sm:px-[6%] px-[4%]'}>
        <p className="sm:text-3xl font-semibold  text-gray-500 ">
          Currently Showing
        </p>
        <div
          className={
            'flex w-full h-12 text-gray-500 pl-3 mt-4 shadow-sm border rounded-md bg-white items-center drop-shadow-md justify-start mb-4'
          }
        >
          <RiLoader2Fill className={'pr-2 size-7'} /> Loading...
        </div>
        <div className={'grid grid-cols-4 gap-4'}>
          <SelectFilterSkeleton />
          <SelectFilterSkeleton />
          <SelectFilterSkeleton />
          <SelectFilterSkeleton />
        </div>
        <DateDaysSkeletonComponent />
        <CurrentlyShowingCard
          coverImageUrl={'/assets/images/gray_photo_loading.avif'}
          isSkeleton={true}
        />
        <CurrentlyShowingCard
          coverImageUrl={'/assets/images/gray_photo_loading.avif'}
          isSkeleton={true}
        />
        <CurrentlyShowingCard
          coverImageUrl={'/assets/images/gray_photo_loading.avif'}
          isSkeleton={true}
        />
        <CurrentlyShowingCard
          coverImageUrl={'/assets/images/gray_photo_loading.avif'}
          isSkeleton={true}
        />
      </div>
    </section>
  );
}
