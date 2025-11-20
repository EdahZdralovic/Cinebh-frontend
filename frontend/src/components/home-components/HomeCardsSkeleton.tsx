import MainCard from '../cards/MainCard.tsx';
import ArrowButton, { ArrowDirection } from '../buttons/ArrowButton.tsx';

export function HomeCardsSkeleton() {
  return (
    <section className="flex justify-center px-[4%] mt-4 items-center text-[var(--color-primary)]">
      <div className=" relative w-full lg:mx-10 mt-8 rounded-3xl h-full items-center ">
        <div className="flex justify-between align-middle ">
          <h1 className=" sm:text-3xl text-xl font-bold  text-gray-500">
            Loading
          </h1>
          <h6 className="text-[var(--color-secondary)] text-md pt-4 font-semibold">
            Loading ...
          </h6>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center gap-4  pt-4">
          <MainCard
            coverImageUrl={'/assets/images/gray_photo_loading.avif'}
            title="Loading..."
            isMovie={false}
            street={'Loading...'}
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
            projectionStart={'22-12-2012'}
          />
        </div>
        <div className="flex flex-row justify-end items-center gap-4 pt-6 font-thin mr-0 mb-10 text-md ">
          <div>
            <span className=" text-[var(--color-gray-text)] semibold">
              Loading{' '}
            </span>
          </div>
          <ArrowButton
            disabled={true}
            direction={ArrowDirection.Left}
            onClick={() => {}}
          />
          <ArrowButton
            disabled={true}
            direction={ArrowDirection.Right}
            onClick={() => {}}
          />
        </div>
      </div>
    </section>
  );
}
