import MainCard from '../cards/MainCard.tsx';
import SelectFilterSkeleton from '../filter-components/generic-select-filter/SelectFilterSkeleton.tsx';
import SearchInput from "../filter-components/search-filter/SearchInput.tsx";

export default function UpcomingMoviesSkeleton() {
  const COUNT_FILTERS = 4;
  const COUNT_CARDS = 8;
  return (
    <section className={'px-[6%] pt-6 animate-pulse'}>
      <div>
        <p className="text-[32px] h-[50px] text-gray-500 font-semibold mb-[14px]">
          Upcoming Movies ...
        </p>
      </div>
        <SearchInput />
      <div className={'grid grid-cols-4 gap-4 mt-4'}>
        {Array.from({ length: COUNT_FILTERS }).map((_, i) => (
          <SelectFilterSkeleton key={i} />
        ))}
      </div>

      <div
        className={
          ' grid lg:grid-cols-4 md:grid-cols-2 justify-center items-center  mt-2 gap-4 pt-4 '
        }
      >
        {Array.from({ length: COUNT_CARDS }).map((_, i) => (
          <MainCard
            coverImageUrl={'/assets/images/gray_photo_loading.avif'}
            title="Loading"
            isMovie={false}
            street={'Loading'}
            redStrip={false}
            projectionStart={'22-12-2012'}
            key={i}
          />
        ))}
      </div>
    </section>
  );
}
