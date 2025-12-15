import { useEffect, useState } from 'react';
import UpcomingFilter from '../../components/upcoming-page-components/UpcomingFilter.tsx';
import { HomeCardsErrorMessage } from '../../components/home-components/HomeCardsErrorMessage.tsx';
import { useUpcomingMovies } from '../../hooks/movie-hooks/useUpcomingMovies.ts';
import { LoadMoreButton } from '../../components/buttons/LoadMoreButton.tsx';
import NoMoviesToPreview from '../../components/upcoming-page-components/NoMoviesToPreview.tsx';
import UpcomingMoviesSkeleton from '../../components/upcoming-page-components/UpcomingMoviesSkeleton.tsx';
import type { MainCardProps } from '../../types/Cards.ts';
import MainCard from '../../components/cards/MainCard.tsx';
import type { Filters } from '../../types/Filters.ts';
import { useScrollToTop } from '../../hooks/useScrollToTop.ts';
import { Link } from 'react-router-dom';

export default function UpcomingMovies() {
  useScrollToTop();
  const [movies, setMovies] = useState<MainCardProps[]>([]);

  const [filters, setFilters] = useState<Filters>({
    cityId: [],
    venueId: [],
    genreIds: [],
    fromDate: null,
    toDate: null,
    q: '',
    selectedDate: '',
    projectionTimes: [],
  });

  const [page, setPage] = useState(0);
  const size = 6;
  useEffect(() => {
    setPage(0);
  }, [filters]);

  const { upcomingCards, totalElements, loading, error } = useUpcomingMovies(
    filters,
    'movies/upcoming/filter',
    page,
    size
  );
  useEffect(() => {
    if (!upcomingCards) return;
    if (page === 0) {
      setMovies(upcomingCards);
    } else {
      setMovies((prev) => [...prev, ...upcomingCards]);
    }
  }, [upcomingCards]);
  const patchFilters = (patch: Partial<typeof filters>) =>
    setFilters((f) => ({ ...f, ...patch }));

  if (error)
    return (
      <HomeCardsErrorMessage
        errorMessage={error.message}
        errorCode={error.name}
      />
    );

  return (
    <section className="text-[var(--color-primary)] px-[6%] pt-6">
      <div>
        <p className="text-[32px]  font-semibold">
          Upcoming Movies {!loading && `(${totalElements})`}
        </p>
        <UpcomingFilter filters={filters} onChange={patchFilters} />
      </div>
      {loading && page === 0 ? (
        <>
          <UpcomingMoviesSkeleton />
        </>
      ) : movies.length > 0 ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 justify-center items-center gap-4 pt-8">
          {movies.map((card: MainCardProps) => (
            <Link to={`/movies/${card.id}`}>
              <MainCard
                coverImageUrl={card.coverImageUrl}
                title={card.title}
                duration={card.duration}
                movieGenres={card.movieGenres}
                isMovie={true}
                projectionStart={card.projectionStart}
                redStrip={true}
                id={card.id}
              />
            </Link>
          ))}
        </div>
      ) : (
        !loading && page === 0 && <NoMoviesToPreview forUpcoming={true} />
      )}

      <div
        className={
          'flex justify-center pt-10 pb-10 text-[var(--color-secondary)] '
        }
      >
        <LoadMoreButton
          disabled={movies.length >= totalElements}
          onClick={() => setPage((p) => p + 1)}
        />
      </div>
    </section>
  );
}
