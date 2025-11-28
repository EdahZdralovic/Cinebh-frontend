import CurrentlyShowingCard from './CurrentlyShowingCard.tsx';
import SelectFilterSkeleton from '../filter-components/generic-select-filter/SelectFilterSkeleton.tsx';

import DateDaysComponent from './DateDaysComponent.tsx';
import SearchInput from '../filter-components/search-filter/SearchInput.tsx';

export function CurrentlyShowingSkeleton() {
    const COUNT = 4;
  return (
    <section
      className={'items-center text-[var(--color-primary)] pt-6 lg:pt-12'}
    >
      <div className={'relative sm:px-[6%] px-[4%] '}>
        <div>
          <p className="sm:text-3xl font-semibold text-gray-500 mb-4">
            Currently Showing
          </p>
          <SearchInput />
          <div className="grid grid-cols-4 mt-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SelectFilterSkeleton key={i} />
            ))}
          </div>
          <DateDaysComponent
            isSkeleton={true}
            filters={{
              cityId: [],
              venueId: [],
              genreIds: [],
              fromDate: null,
              toDate: null,
              selectedDate: '',
              projectionTimes: [],
              q: '',
            }}
          />
        </div>
        {Array.from({ length: COUNT }).map((_, i) => (
          <CurrentlyShowingCard
            key={i}
            coverImageUrl="/assets/images/gray_photo_loading.avif"
            isSkeleton={true}
          />
        ))}
      </div>
    </section>
  );
}
