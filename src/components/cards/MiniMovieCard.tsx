interface MiniMovieCardProps {
  title?: string;
  coverImageUrl?: string;
  isSkeleton?: boolean;
}

export function MiniMovieCard({
  title,
  coverImageUrl,
  isSkeleton = false,
}: MiniMovieCardProps) {
  return (
    <section>
      <div className="justify-center z-0 shadow-lg border border-gray-200 w-full relative  grid  items-center grid-col-1 rounded-3xl">
        <div className="relative m-3  min-w-[90%]  min-h-[86%] aspect-[6/5] ">
          <img
            src={isSkeleton ? '/assets/images/loading_gray.png' : coverImageUrl}
            alt={isSkeleton ? 'Loading ' : title}
            className="relative h-full  min-w-[98%] min-h-full aspect-[94/100] insert-0 w-full  rounded-2xl object-cover"
          />
        </div>
        <div className=" pl-4 truncate font-bold text-sm pb-4 ">
          {isSkeleton ? ' Loading...' : title}
        </div>
      </div>
    </section>
  );
}
