import CurrentlyShowingCard from '../../components/currently-showing-components/CurrentlyShowingCard.tsx';
import { useState } from 'react';

import CurrentlyShowingFilter from '../../components/currently-showing-components/CurrentlyShowingFilter.tsx';
import DateDaysComponent from '../../components/currently-showing-components/DateDaysComponent.tsx';
import { useUpcomingMovies } from '../../hooks/useUpcomingMovies.ts';
import { useCurrentlyShowingMovies } from '../../hooks/useCurrentlyShowingMovies.ts';
import UpcomingMoviesSkeleton from '../../components/upcoming-page-components/UpcomingMoviesSkeleton.tsx';
import { HomeCardsErrorMessage } from '../../components/home-components/HomeCardsErrorMessage.tsx';
import MainCard from '../../components/cards/MainCard.tsx';
import NoMoviesToPreview from '../../components/upcoming-page-components/NoMoviesToPreview.tsx';
import { formatDate } from '../../utils/formatDate.ts';
import { LoadMoreButton } from '../../components/buttons/LoadMoreButton.tsx';
import { CurrentlyShowingSkeleton } from '../../components/currently-showing-components/CurrentlyShowingSkeleton.tsx';
import { useScrollToTop } from '../../hooks/useScrollToTop.ts';

export default function CurrentlyShowing() {
  useScrollToTop();
  const [filters, setFilters] = useState({
    cityId: [] as number[],
    venueId: [] as number[],
    genreIds: [] as number[],
    fromDate: null as string | null,
    toDate: null as string | null,
    selectedDate: new Date().toISOString().split('T')[0],
    q: '',
  });
  const patchFilters = (patch: Partial<typeof filters>) =>
    setFilters((f) => ({ ...f, ...patch }));

  const CurrentlyShowingUrl = 'movies/currently-showing';
  const [size, setSize] = useState(9);
  const { currentlyCards, totalElements, loading, error } =
    useCurrentlyShowingMovies(filters, CurrentlyShowingUrl, 0, size);

  if (loading) return <CurrentlyShowingSkeleton />;
  if (error)
    return (
      <HomeCardsErrorMessage
        errorMessage={error.message}
        errorCode={error.name}
      />
    );

  return (
    <section
      className={'items-center text-[var(--color-primary)]  pt-6 lg:pt-12'}
    >
      <div className={'relative sm:px-[6%] px-[4%]'}>
        <p className="sm:text-3xl text-2xl font-semibold">
          Currently Showing ({totalElements})
        </p>
        <CurrentlyShowingFilter filters={filters} onChange={patchFilters} />
        <DateDaysComponent filters={filters} onChange={patchFilters} />
        {totalElements > 0 ? (
          currentlyCards.map((card) => (
            <CurrentlyShowingCard
              coverImageUrl={card.coverImageUrl}
              title={card.title}
              PGRating={card.pgRating}
              language={card.language}
              duration={card.duration}
              movieGenres={card.movieGenres}
              projectionEnd={formatDate(card.projectionEnd)}
              projections={card.projectionTimes}
            />
          ))
        ) : (
          <NoMoviesToPreview />
        )}{' '}
      </div>
      <div className={'my-8 flex justify-center '}>
        <LoadMoreButton
          disabled={size >= totalElements}
          onClick={() => setSize(size + 4)}
        />
      </div>
    </section>
  );
}
