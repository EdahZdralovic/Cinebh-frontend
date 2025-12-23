import type { Filters } from '../../../types/Filters.ts';

import { MovieDetailsProjectionsFilter } from './MovieDetailsProjectionsFilter.tsx';
import { useState } from 'react';
import { useScrollToTop } from '../../../hooks/useScrollToTop.ts';
import { useMovieProjections } from '../../../hooks/movie-hooks/useMovieProjections.ts';
import { ProjectionTimeButton } from '../../buttons/ProjectionTimeButton.tsx';
import { SignInButton } from '../../buttons/SignInButton.tsx';
import type { Projection } from '../../../types/MovieTypes.ts';
import { useAuth } from '../../../context/AuthContext.tsx';
import { SignUpProjectionsButton } from '../../buttons/SignUpProjectionsButton.tsx';
import { COMPONENTS_TEXT, ROUTES } from '../../../utils/Constants.ts';
import { useNavigate } from 'react-router-dom';

export function MovieProjections({ movieId }: { movieId: number }) {
  useScrollToTop();
  const navigate = useNavigate();
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
  const { projections = [] } = useMovieProjections(movieId, filters);
  const venueSelected = (filters.venueId?.length ?? 0) > 0;
  const selectedTime = filters.projectionTimes?.[0] ?? null;
  const canBuy = venueSelected && !!selectedTime;
  const patchFilters = (patch: Partial<Filters>) => {
    setFilters((prev) => {
      const next = { ...prev, ...patch };
      if (patch.venueId) {
        next.projectionTimes = [];
      }
      return next;
    });
  };
  const { user } = useAuth();
  const isLoggedIn = !!user;

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
            <h4 className={'text-2xl font-bold'}>Standard</h4>
          </div>
          <div className={'flex flex-wrap gap-4 mt-4 pb-14 '}>
            {projections.length === 0 && (
              <div className={'min-h-[54px] '}>No projections found.</div>
            )}
            {projections.map((projection: Projection) => (
              <ProjectionTimeButton
                key={projection.id}
                time={projection.name}
                isActive={projection.name === selectedTime}
                onClick={() => {
                  patchFilters({
                    projectionTimes:
                      projection.name === selectedTime ? [] : [projection.name],
                    selectedProjectionId: projection.id,
                  });
                }}
              />
            ))}
          </div>
          <div className={'h-8'}></div>
        </div>
        <div
          className={
            ' md:px-8 px-4 border-gray-200 border rounded-b-2xl grid grid-cols-2 gap-x-6  '
          }
        >
          <div className={'mt-5 col-span-1 '}>
            <SignInButton
              whiteBackground
              text={'Reserve Ticket'}
              disabled={!canBuy || !isLoggedIn}
            />
          </div>
          <div className={'mt-5 col-span-1 '}>
            <SignInButton
              text={'Buy Ticket'}
              disabled={!canBuy || !isLoggedIn}
              onClick={() => {
                if (!filters.selectedProjectionId) return;
                navigate(ROUTES.BUY_TICKET_ROUTE(filters.selectedProjectionId));
              }}
            />
          </div>
          <div className={'col-span-2 my-3 '}>
            <SignUpProjectionsButton
              isLoggedIn={isLoggedIn}
              textBeforeButton={COMPONENTS_TEXT.ONLY_SIGN_UP_BUY_AND_RESERVE}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
