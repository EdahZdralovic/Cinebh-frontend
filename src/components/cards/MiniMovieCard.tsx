import { IMAGE_ROUTES } from '../../utils/Constants.ts';

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
      <div className="justify-center z-0 shadow-lg border min-h-[185px] border-gray-200 min-w-full relative  grid  items-center grid-col-1 rounded-3xl">
        <img
          src={isSkeleton ? IMAGE_ROUTES.GRAY_PHOTO : coverImageUrl}
          alt={isSkeleton ? 'Loading ' : title}
          className="relative min-h-[150px] min-w-full p-3 aspect-[100/80]   rounded-3xl object-cover"
        />
        <div className=" pl-4 truncate font-bold text-sm pb-4 ">
          {isSkeleton ? ' Loading...' : title}
        </div>
      </div>
    </section>
  );
}
