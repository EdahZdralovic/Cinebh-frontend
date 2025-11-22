import MainCard from '../cards/MainCard.tsx';
import SelectFilterSkeleton from '../filter-components/generic-select-filter/SelectFilterSkeleton.tsx';
import { RiLoader2Fill } from 'react-icons/ri';

export default function UpcomingMoviesSkeleton() {
  return (
    <section className={'px-[6%] pt-6 animate-pulse'}>
      <div>
        <p className="text-3xl h-[50px] text-gray-500 font-semibold">
          Upcoming Movies
        </p>
      </div>
      <div
        className={
          'flex w-full h-12 text-gray-500 pl-3 mt-[14px] shadow-md border rounded-md bg-white items-center drop-shadow-md justify-start mb-4'
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

      <div
        className={
          ' grid lg:grid-cols-4 md:grid-cols-2 justify-center items-center  mt-2 gap-4 pt-4 '
        }
      >
        <MainCard
          coverImageUrl={'/assets/images/gray_photo_loading.avif'}
          title="Loading"
          isMovie={false}
          street={'Loading'}
          redStrip={false}
          projectionStart={'22-12-2012'}
        />
        <MainCard
          coverImageUrl={'/assets/images/gray_photo_loading.avif'}
          title="Loading"
          isMovie={false}
          street={'Loading'}
          redStrip={false}
          projectionStart={'22-12-2012'}
        />
        <MainCard
          coverImageUrl={'/assets/images/gray_photo_loading.avif'}
          title="Loading"
          isMovie={false}
          street={'Loading'}
          redStrip={false}
          projectionStart={'22-12-2012'}
        />
        <MainCard
          coverImageUrl={'/assets/images/gray_photo_loading.avif'}
          title="Loading"
          isMovie={false}
          street={'Loading'}
          redStrip={false}
          projectionStart={'22-12-2012'}
        />
        <MainCard
          coverImageUrl={'/assets/images/gray_photo_loading.avif'}
          title="Loading"
          isMovie={false}
          street={'Loading'}
          redStrip={false}
          projectionStart={'22-12-2012'}
        />
        <MainCard
          coverImageUrl={'/assets/images/gray_photo_loading.avif'}
          title="Loading"
          isMovie={false}
          street={'Loading'}
          redStrip={false}
          projectionStart={'22-12-2012'}
        />
        <MainCard
          coverImageUrl={'/assets/images/gray_photo_loading.avif'}
          title="Loading"
          isMovie={false}
          street={'Loading'}
          redStrip={false}
          projectionStart={'22-12-2012'}
        />
        <MainCard
          coverImageUrl={'/assets/images/gray_photo_loading.avif'}
          title="Loading"
          isMovie={false}
          street={'Loading'}
          redStrip={false}
          projectionStart={'22-12-2012'}
        />
        <MainCard
          coverImageUrl={'/assets/images/gray_photo_loading.avif'}
          title="Loading"
          isMovie={false}
          street={'Loading'}
          redStrip={false}
          projectionStart={'22-12-2012'}
        />
        <MainCard
          coverImageUrl={'/assets/images/gray_photo_loading.avif'}
          title="Loading"
          isMovie={false}
          street={'Loading'}
          redStrip={false}
          projectionStart={'22-12-2012'}
        />
        <MainCard
          coverImageUrl={'/assets/images/gray_photo_loading.avif'}
          title="Loading"
          isMovie={false}
          street={'Loading'}
          redStrip={false}
          projectionStart={'22-12-2012'}
        />
        <MainCard
          coverImageUrl={'/assets/images/gray_photo_loading.avif'}
          title="Loading"
          isMovie={false}
          street={'Loading'}
          redStrip={false}
          projectionStart={'22-12-2012'}
        />
        <MainCard
          coverImageUrl={'/assets/images/gray_photo_loading.avif'}
          title="Loading"
          isMovie={false}
          street={'Loading'}
          redStrip={false}
          projectionStart={'22-12-2012'}
        />
      </div>
    </section>
  );
}
