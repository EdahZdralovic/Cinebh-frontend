export function MiniMovieSkeletonCard() {
  return (
    <section>
      <div className="justify-center z-0 shadow-lg border border-gray-200 w-full animate-pulse relative  grid  items-center grid-col-1 rounded-3xl">
        <div className="relative m-3  aspect-[6/5] ">
          <img
            src="/assets/images/gray_photo_loading.avif"
            alt="Loading..."
            className="relative h-full  min-w-[98%]  aspect-[94/100] insert-0 w-full  rounded-2xl object-cover"
          />
        </div>
        <div className=" pl-4 truncate font-bold text-sm pb-4 ">Loading...</div>
      </div>
    </section>
  );
}
