import { useMovieDetails } from '../../hooks/movie-hooks/useMovieDetails.ts';
import { SmallDetailsComponent } from '../movie-details-components/movie-description-components/SmallDetailsComponent.tsx';
import { HomeCardsErrorMessage } from '../home-components/HomeCardsErrorMessage.tsx';
import { IMAGE_ROUTES } from '../../utils/Constants.ts';

interface TicketsMovieInfoProps {
  movieId: number;
  isSkeleton: boolean;
}

export function TicketsMovieInfo({
  movieId,
  isSkeleton,
}: TicketsMovieInfoProps) {
  const { movie, loading, error } = useMovieDetails(movieId);
  if (error)
    return (
      <HomeCardsErrorMessage
        errorMessage={error.message}
        errorCode={error.name}
      />
    );

  return (
    <section>
      <div className={'grid grid-cols-6 text-[var(--color-primary)]'}>
        <img
          src={
            loading || isSkeleton
              ? IMAGE_ROUTES.GRAY_PHOTO
              : movie.coverImageUrl
          }
          alt={loading || isSkeleton ? 'Loading ' : movie.title}
          className="relative w-5/6 aspect-[100/94] insert-0  col-span-2 rounded-2xl object-cover"
        />
        <div className={'flex flex-col col-span-4 '}>
          <h2 className={'text-xl font-bold mb-4 '}>
            {loading || isSkeleton ? 'Loading ' : movie.title}
          </h2>
          <SmallDetailsComponent
            pgRating={loading || isSkeleton ? 'Loading ' : movie.pgRating}
            language={loading || isSkeleton ? 'Loading ' : movie.language}
            duration={loading || isSkeleton ? 0 : movie.duration}
            showDates={false}
            isSkeleton={isSkeleton || loading}
          />
        </div>
      </div>
    </section>
  );
}
