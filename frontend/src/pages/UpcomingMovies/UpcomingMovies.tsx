import MainCard, {
  type MainCardProps,
} from '../../components/cards/MainCard.tsx';

import { useState } from 'react';
import UpcomingFilter from '../../components/upcoming-page-components/UpcomingFilter.tsx';
import { HomeCardsErrorMessage } from '../../components/home-components/HomeCardsErrorMessage.tsx';
import { useUpcomingMovies } from '../../hooks/useUpcomingMovies.ts';
import { LoadMoreButton } from '../../components/buttons/LoadMoreButton.tsx';
import NoMoviesToPreview from '../../components/upcoming-page-components/NoMoviesToPreview.tsx';

export interface UpcomingProps {
  movies: MainCardProps[];
  totalMovies: number;
}

export default function UpcomingMovies(type: string) {
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

  const [size, setSize] = useState(12);
  const { upcomingCards, totalElements, loading, error } = useUpcomingMovies(
    filters,
    'movies/upcoming/filter',
    0,
    size
  );

  //skeleton za upcoming nije jos gotov
  if (loading)
    return (
      <MainCard
        coverImageUrl={'/assets/images/gray_photo_loading.avif'}
        title="Loading"
        isMovie={false}
        street={'Loading'}
        redStrip={false}
        projectionStart={'22-12-2012'}
      />
    );
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
          Upcoming Movies ({totalElements})
        </p>
        <UpcomingFilter filters={filters} onChange={patchFilters} />
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 justify-center items-center gap-4 pt-4">
        {totalElements > 0 ? (
          upcomingCards.map((card) => (
            <MainCard
              coverImageUrl={card.coverImageUrl}
              title={card.title}
              duration={card.duration}
              movieGenres={card.movieGenres}
              isMovie={true}
              projectionStart={card.projectionStart}
              redStrip={true}
            />
          ))
        ) : (
          <NoMoviesToPreview />
        )}{' '}
      </div>

      <div
        className={
          'flex justify-center pt-10 pb-10 text-[var(--color-secondary)] ' +
          (size < totalElements ? '' : ' hidden ')
        }
      >
        <LoadMoreButton
          disabled={size >= totalElements}
          onClick={() => setSize(size + 4)}
        />
      </div>
      <div className="w-full h-[60px]"></div>
    </section>
  );
}
