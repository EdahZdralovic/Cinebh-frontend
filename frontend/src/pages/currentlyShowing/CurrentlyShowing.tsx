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

export default function CurrentlyShowing() {
  const [filters, setFilters] = useState({
    cityId: [] as number[],
    venueId: [] as number[],
    genreIds: [] as number[],
    fromDate: null as string | null,
    toDate: null as string | null,
    q: '',
  });
  const patchFilters = (patch: Partial<typeof filters>) =>
    setFilters((f) => ({ ...f, ...patch }));

  const [size, setSize] = useState(9);
  const { currentlyCards, totalElements, loading, error } = useCurrentlyShowingMovies(
    filters,
    'movies/currently-showing/filter',
    0,
    size
  );
  //skeleton za upcoming nije jos gotov
  if (loading) return <UpcomingMoviesSkeleton />;
  if (error)
    return (
      <HomeCardsErrorMessage
        errorMessage={error.message}
        errorCode={error.name}
      />
    );

  return (
    <section className={'items-center text-[var(--color-primary)]  pt-12'}>
      <div className={'relative px-[6%]'}>
        <CurrentlyShowingFilter filters={filters} onChange={patchFilters} />
        <DateDaysComponent />
        {totalElements > 0 ? (
          currentlyCards.map((card) => (
            <CurrentlyShowingCard
              coverImageUrl={card.coverImageUrl}
              title={card.title}
              duration={card.duration}
              movieGenres={card.movieGenres}
            />
          ))
        ) : (
          <NoMoviesToPreview />
        )}{' '}
        <CurrentlyShowingCard
          title={'Hateful Eight'}
          language={'English'}
          coverImageUrl={'/assets/images/avatar.webp'}
          PGRating={'PR13'}
          duration={118}
          movieGenres={[
            'Action',
            'Western',
            'Western',
            'Adventure',
            'Western',
            'Western',
            'Western',
          ]}
          projectionEnd={'22.12.2025'}
        />
      </div>
    </section>
  );
}
