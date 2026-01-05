import { TicketsMovieInfo } from '../ticketsBuyReserveComponents/TicketsMovieInfo.tsx';
import type { SeatStatus } from '../../types/ProjectionSeatLayout.ts';
import { formatDatePretty } from '../../utils/dateUtils.ts';
import { useProjectionSeatLayout } from '../../hooks/projection-hooks/useProjectionSeatLayout.ts';
import { formatSeatLabels } from '../../utils/ProjectionFunctions.ts';
import { MovieNotFoundComponent } from '../movie-details-components/movie-details-skeletons/MovieNotFoundComponent.tsx';
import { MovieDetailsInPaymentSkeleton } from './MovieDetailsInPaymentSkeleton.tsx';

interface MovieDetailsInPaymentProps {
  movieId: number;
  seatsReserved: SeatStatus[];
  price: number;
  projectionId: number;
  isSkeleton?: boolean;
}
export function MovieDetailsInPayment({
  movieId,
  seatsReserved,
  price = 0,
  projectionId,
  isSkeleton = false,
}: MovieDetailsInPaymentProps) {
  const { projectionData, loading, error } =
    useProjectionSeatLayout(projectionId);

  if (loading) {
    return <MovieDetailsInPaymentSkeleton />;
  }
  if (error || !projectionData) {
    return <MovieNotFoundComponent />;
  }

  const prettyDate = isSkeleton
    ? '--/-- '
    : formatDatePretty(projectionData.projectionDate);
  const projectionTime = isSkeleton
    ? '--/-- '
    : projectionData.projectionTime.slice(0, 5);
  const VenueStreet = isSkeleton ? 'Loading... ' : projectionData.venue.street;
  const hallName = isSkeleton ? 'Please wait...' : projectionData.hall.name;
  const venueName = isSkeleton ? 'Movie is loading' : projectionData.venue.name;
  const venueCity = isSkeleton ? '...' : projectionData.venue.city;

  return (
    <section className={'md:m-4  my-4'}>
      <span className={'font-bold text-xl text-gray-500'}>Booking Summary</span>
      <div
        className={
          'bg-[var(--color-primary)] aspect-[5/7] max-h-[600px] mt-4 rounded-2xl text-white'
        }
      >
        <div className={'p-6'}>
          <div className={'text-white '}>
            <TicketsMovieInfo movieId={movieId} isSkeleton={loading} />
          </div>
          <div className={' w-full border-b-2 my-4 h-2 border-white]'}></div>
          <div className={'grid grid-cols-1 gap-2 w-4/6 '}>
            <span className={' opacity-50'}>Date and Time </span>
            <div className={'font-bold'}>
              <span>{prettyDate}</span>
              <span> at </span>
              <span>{projectionTime}</span>
            </div>
            <span className={' mt-4 opacity-50'}>Cinema Details</span>
            <span className={'font-bold'}>
              {venueName} : {VenueStreet}, {venueCity}
            </span>
            <span className={'font-bold'}>{hallName}</span>
            <span className={' mt-4 opacity-50'}>Seat(s) Details</span>
            <div>
              <span>Seat(s): </span>
              {seatsReserved.length > 0 ? formatSeatLabels(seatsReserved) : ''}
              <span></span>
            </div>
            <span className={' mt-4 opacity-50'}>Price Details</span>
            <div>
              <span>Total Price: </span>
              <span>{price}</span>
              <span>KM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
