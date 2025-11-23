import { useState } from 'react';

import CurrentlyShowingFilter from '../../components/currently-showing-components/CurrentlyShowingFilter.tsx';
import DateDaysComponent from '../../components/currently-showing-components/DateDaysComponent.tsx';

import { useCurrentlyShowingMovies } from '../../hooks/useCurrentlyShowingMovies.ts';

import { HomeCardsErrorMessage } from '../../components/home-components/HomeCardsErrorMessage.tsx';

import NoMoviesToPreview from '../../components/upcoming-page-components/NoMoviesToPreview.tsx';
import { formatDate } from '../../utils/formatDate.ts';
import { LoadMoreButton } from '../../components/buttons/LoadMoreButton.tsx';
import { CurrentlyShowingSkeleton } from '../../components/currently-showing-components/CurrentlyShowingSkeleton.tsx';
import { useScrollToTop } from '../../hooks/useScrollToTop.ts';
import CurrentlyShowingCard from '../../components/currently-showing-components/CurrentlyShowingCard.tsx';
import type { CurrentlyShowingCardProps } from '../../types/Cards.ts';
import type { Filters } from '../../types/Filters.ts';

export function CurrentlyShowing() {
  useScrollToTop();
  const [filters, setFilters] = useState({
    cityId: [] as number[],
    venueId: [] as number[],
    genreIds: [] as number[],
    fromDate: null as string | null,
    toDate: null as string | null,
    selectedDate: new Date().toISOString().split('T')[0],
    projectionTimes: [] as (string | number)[],
    q: '',
  });
  const patchFilters = (patch: Partial<Filters>) =>
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
          currentlyCards.map((card: CurrentlyShowingCardProps) => (
            <CurrentlyShowingCard
              coverImageUrl={card.coverImageUrl}
              title={card.title}
              PGRating={card.PGRating}
              language={card.language}
              duration={card.duration}
              movieGenres={card.movieGenres}
              projectionEnd={
                card.projectionEnd ? formatDate(card.projectionEnd) : ''
              }
              projections={card.projections}
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
