import type { Filters } from '../../../types/Filters.ts';

import { MovieDetailsProjectionsFilter } from './MovieDetailsProjectionsFilter.tsx';
import { useState } from 'react';
import { useScrollToTop } from '../../../hooks/useScrollToTop.ts';
import { useMovieProjections } from '../../../hooks/movie-hooks/useMovieDetailsProjections.ts';
import { ProjectionTimeButton } from '../../buttons/ProjectionTimeButton.tsx';
import { SignInButton } from '../../buttons/SignInButton.tsx';

interface MovieProjectionsProps {
  filters: Filters;
  onChange?: (patch: Partial<Filters>) => void;
}

export function MovieProjections({ movieId }: { movieId: number }) {
  useScrollToTop();
  const [filters, setFilters] = useState<Filters>({
    cityId: [],
    venueId: [],
    genreIds: [],
    fromDate: null,
    toDate: null,
    selectedDate: new Date().toISOString().split('T')[0],
    projectionTimes: [],
    q: '',
  });
  const { projections, loading, error } = useMovieProjections(movieId, filters);

  const patchFilters = (patch: Partial<Filters>) => {
    setFilters((f) => ({ ...f, ...patch }));
  };

  return (
    <section
      className={'text-[var(--color-primary)] bg-white shadow-lg rounded-2xl'}
    >
      <div className={''}>
        <div
          className={
            ' border-t md:mt-4 border-l border-r border-gray-200 md:p-6 p-3 rounded-t-2xl grid grid-cols-1 '
          }
        >
          <div className={'md:mb-8 mb-2'}>
            <MovieDetailsProjectionsFilter
              filters={filters}
              onChange={patchFilters}
            />
          </div>

          <div>
            <h4 className={'text-xl font-bold'}>Standard</h4>
          </div>
          <div className={'flex flex-wrap gap-4 mt-4 pb-14 '}>
            {projections.length === 0 && (
              <div className={'min-h-[54px] '}>No projections found.</div>
            )}
            {projections.map((projection) => (
              <ProjectionTimeButton time={projection.name} />
            ))}
          </div>
          <div className={'h-8'}></div>
        </div>
        <div
          className={
            ' p-8 border-gray-200 border rounded-b-2xl grid grid-cols-2 gap-6  '
          }
        >
          <SignInButton whiteBackground text={'Reserve Ticket'} />
          <SignInButton text={'Buy Ticket'} />
        </div>
      </div>
    </section>
  );
}
