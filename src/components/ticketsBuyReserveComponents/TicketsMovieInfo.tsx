import { useMovieDetails } from '../../hooks/movie-hooks/useMovieDetails.ts';
import { SmallDetailsComponent } from '../movie-details-components/movie-description-components/SmallDetailsComponent.tsx';
import { HomeCardsErrorMessage } from '../home-components/HomeCardsErrorMessage.tsx';
import { TicketsMovieInfoSkeleton } from './TicketsMovieInfoSkeleton.tsx';

interface TicketsMovieInfoProps {
  movieId: number;
  isSkeleton: boolean;
}

export function TicketsMovieInfo({
  movieId,
  isSkeleton,
}: TicketsMovieInfoProps) {
  if (isSkeleton) {
    return <TicketsMovieInfoSkeleton />;
  }
  const { movie, loading, error } = useMovieDetails(movieId);
  if (loading) {
    return <TicketsMovieInfoSkeleton />;
  }
  if (error) {
    return (
      <HomeCardsErrorMessage
        errorMessage={error.message}
        errorCode={error.name}
      />
    );
  }

  if (!movie) return null;

  return (
    <section>
      <div className={'grid grid-cols-6 '}>
        <img
          src={movie.coverImageUrl}
          alt={movie.title}
          className="relative w-5/6 aspect-[100/94] col-span-2 rounded-2xl object-cover"
        />
        <div className={'flex flex-col col-span-4 '}>
          <h2 className={'text-xl font-bold mb-4 '}>{movie.title}</h2>
          <SmallDetailsComponent
            pgRating={movie.pgRating}
            language={movie.language}
            duration={movie.duration}
            showDates={false}
            isSkeleton={false}
          />
        </div>
      </div>
    </section>
  );
}
