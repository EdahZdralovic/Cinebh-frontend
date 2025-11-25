import MainCard from '../cards/MainCard.tsx';
import ArrowButton, { ArrowDirection } from '../buttons/ArrowButton.tsx';

export function HomeCardsSkeleton() {
  return (
    <section className="flex justify-center px-[4%] items-center text-[var(--color-primary)]">
      <div className=" relative w-full lg:mx-10 mt-8 rounded-3xl h-full items-center ">
        <div className="flex justify-between  align-middle ">
          <h1 className=" sm:text-3xl text-xl pt-4 font-bold ">Loading</h1>
          <h6 className="text-[var(--color-secondary)] text-md pt-8 font-semibold">
            <div>See All</div>
          </h6>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center gap-4 pt-4">
          <MainCard
            coverImageUrl={'/assets/images/gray_photo_loading.avif'}
            title="Loading..."
            isMovie={false}
            street={'Loading...'}
            redStrip={false}
          />
          <MainCard
            coverImageUrl={'/assets/images/gray_photo_loading.avif'}
            title="Loading..."
            isMovie={false}
            street={'Loading...'}
            redStrip={false}
          />
          <MainCard
            coverImageUrl={'/assets/images/gray_photo_loading.avif'}
            title="Loading..."
            isMovie={false}
            street={'Loading...'}
            redStrip={false}
          />
          <MainCard
            coverImageUrl={'/assets/images/gray_photo_loading.avif'}
            title="Loading..."
            isMovie={false}
            street={'Loading...'}
          />
        </div>
        <div className="flex flex-row justify-end items-center text-white gap-4 pt-6 font-thin mb-6 text-md ">
          <div>
            <span className="">Loading</span>
            <span className="font-semibold text-white">Loading...</span>
            <span> out of </span>
            <span className="font-semibold"></span>
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
