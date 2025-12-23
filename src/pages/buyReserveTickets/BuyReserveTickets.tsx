import { useParams } from 'react-router-dom';
import { useScrollToTop } from '../../hooks/useScrollToTop.ts';
import { useProjectionSeatLayout } from '../../hooks/projection-hooks/useProjectionSeatLayout.ts';
import { TicketsMovieInfo } from '../../components/ticketsBuyReserveComponents/TicketsMovieInfo.tsx';
import { BookingDetailsComponent } from '../../components/ticketsBuyReserveComponents/BookingDetailsComponent.tsx';
import { SeatGuideComponent } from '../../components/ticketsBuyReserveComponents/SeatGuideComponent.tsx';
import { ChosenSeatsComponent } from '../../components/ticketsBuyReserveComponents/ChosenSeatsComponent.tsx';
import { SeatsComponent } from '../../components/ticketsBuyReserveComponents/SeatsComponent.tsx';
import { CinemaScreen } from '../../components/ticketsBuyReserveComponents/CinemaScreen.tsx';

export function BuyReserveTickets() {
  useScrollToTop();
  const { projectionId } = useParams<{ projectionId: string }>();

  const { data, isLoading, error } = useProjectionSeatLayout(
    Number(projectionId)
  );

  if (isLoading) return <div>Loading seats...</div>;
  if (error || !data) return <div>Error loading projection</div>;

  const movieId = data.movie.id;
  const venue = data.venue;
  const seats = data.seats;
  const projectionDate = data.projectionDate;
  const projectionTime = data.projectionTime;

  return (
    <section className={'grid grid-cols-1 text-[var(--color-primary)] mt-8'}>
      <div className={'flex justify-between mx-[6%]'}>
        <h1 className={' text-2xl font-bold '}> Seat Options</h1>
        <div>
          <span className={'mr-2'}>Session Duration</span>
          <button className={'border border-gray-300 p-3 rounded-xl '}>
            {' '}
            5:00
          </button>
        </div>
      </div>
      <div className={' flex justify-between mt-1 mb-6'}>
        <div
          className={' w-1/2 h-px border-b border-[var(--color-secondary)]'}
        ></div>
        <div className={' w-1/2 border-b h-px border-gray-200'}></div>
      </div>
      <div className={'mx-[6%] w-full aspect-[10/2] max-h-48  2xl:max-h-60'}>
        <div className={'flex flex-row'}>
          <div className={'aspect-square w-5/12 '}>
            <TicketsMovieInfo movieId={movieId} />
          </div>
          <BookingDetailsComponent
            dateProjection={projectionDate}
            timeProjection={projectionTime}
            venueStreet={venue.street}
            venueName={venue.name}
            venueCity={venue.city}
            hallName={data.hall.name}
          />
        </div>
      </div>
      <div className={'w-full h-px border-b border-gray-200 '}></div>
      <div className={'mx-[2%] grid grid-cols-2'}>
        <div className={'cols-span-1 grid grid-cols-1'}>
          <CinemaScreen />
          <SeatsComponent seats={seats} />
        </div>
        <div className={'mt-4 pb-2 '}>
          <SeatGuideComponent />
          <div className={'mt-6   h-56'}>
            <ChosenSeatsComponent />
          </div>
        </div>
      </div>
    </section>
  );
}
