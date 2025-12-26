import { useNavigate, useParams } from 'react-router-dom';
import { useScrollToTop } from '../../hooks/useScrollToTop.ts';
import { useProjectionSeatLayout } from '../../hooks/projection-hooks/useProjectionSeatLayout.ts';
import { TicketsMovieInfo } from '../../components/ticketsBuyReserveComponents/TicketsMovieInfo.tsx';
import { BookingDetailsComponent } from '../../components/ticketsBuyReserveComponents/BookingDetailsComponent.tsx';
import { SeatGuideComponent } from '../../components/ticketsBuyReserveComponents/seatsComponent/SeatGuideComponent.tsx';
import { ChosenSeatsComponent } from '../../components/ticketsBuyReserveComponents/ChosenSeatsComponent.tsx';
import { SeatsComponent } from '../../components/ticketsBuyReserveComponents/seatsComponent/SeatsComponent.tsx';
import { CinemaScreen } from '../../components/ticketsBuyReserveComponents/seatsComponent/CinemaScreen.tsx';
import { useEffect, useState } from 'react';
import type { SeatStatus } from '../../types/ProjectionSeatLayout.ts';
import { MovieNotFoundComponent } from '../../components/movie-details-components/movie-details-skeletons/MovieNotFoundComponent.tsx';
import { BuyReserveTicketsSkeleton } from '../../components/ticketsBuyReserveComponents/BuyReserveTicketsSkeleton.tsx';
import { SessionTimer } from '../../components/ticketsBuyReserveComponents/sessionComponents/SessionTimer.tsx';
import { useBuyTicketSessionTimer } from '../../hooks/projection-hooks/useBuyTicketSessionTimer.ts';
import { clearSeatSession } from '../../utils/ProjectionFunctions.ts';
import { SessionBuyTicketPopUp } from '../../components/ticketsBuyReserveComponents/sessionComponents/SessionBuyTicketPopUp.tsx';

export function BuyReserveTickets() {
  useScrollToTop();
  const navigate = useNavigate();
  const { projectionId } = useParams<{ projectionId: string }>();
  const [selectedSeats, setSelectedSeats] = useState<SeatStatus[]>([]);
  const { projectionData, loading, error } = useProjectionSeatLayout(
    Number(projectionId)
  );

  const { remainingMs, isExpired } = useBuyTicketSessionTimer();
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    if (isExpired) {
      setSessionExpired(true);
    }
  }, [isExpired]);
  if (loading) return <BuyReserveTicketsSkeleton />;
  if (error?.response?.status === 404 || !projectionData)
    return <MovieNotFoundComponent />;

  const movieId = projectionData.movie.id;
  const venue = projectionData.venue;
  const seats = projectionData.seats;
  const projectionDate = projectionData.projectionDate;
  const projectionTime = projectionData.projectionTime;

  function toggleSeat(seat: SeatStatus) {
    setSelectedSeats((prev) => {
      const exists = prev.find((s) => s.id === seat.id);
      if (exists) {
        return prev.filter((s) => s.id !== seat.id);
      } else {
        return [...prev, seat];
      }
    });
  }

  function NavigateBackToPreviousPage() {
    clearSeatSession();
    navigate(-1);
  }

  /*
  function NavigateBackToHome() {
    clearSeatSession();
    navigate('/');
  }
*/

  return (
    <section className={'grid grid-cols-1 text-[var(--color-primary)] mt-8'}>
      <div className={'flex justify-between mx-[6%]'}>
        <h1 className={' text-2xl font-bold '}> Seat Options</h1>
        <SessionTimer remainingMs={remainingMs} />
      </div>
      <div className={' flex justify-between mt-1 mb-6'}>
        <div
          className={' w-1/2 h-px border-b border-[var(--color-secondary)]'}
        ></div>
        <div className={' w-1/2 border-b h-px border-gray-200'}></div>
      </div>
      <div className={' w-full '}>
        <div className={' mx-[6%]  mb-6 flex md:flex-row flex-col'}>
          <div className={' md:w-5/12 w-full md:mb-0 mb-4 '}>
            <TicketsMovieInfo movieId={movieId} />
          </div>
          <BookingDetailsComponent
            dateProjection={projectionDate}
            timeProjection={projectionTime}
            venueStreet={venue.street}
            venueName={venue.name}
            venueCity={venue.city}
            hallName={projectionData.hall.name}
          />
        </div>
      </div>
      <div className={'w-full h-px border-b border-gray-200 '}></div>
      <div className={' h-full grid md:grid-cols-2 grid-cols-1 '}>
        <div className={'cols-span-1 mb-14 grid grid-cols-1'}>
          <CinemaScreen />
          <div className={'mt-6'}>
            <SeatsComponent
              seats={seats}
              selectedSeats={selectedSeats}
              onSeatToggle={toggleSeat}
            />
          </div>
        </div>
        <div className={'md:mt-4 md:mr-[12%] pb-2 '}>
          <SeatGuideComponent />
          <div className={'mt-6 '}>
            <ChosenSeatsComponent seats={selectedSeats} />
          </div>
        </div>
      </div>
      <SessionBuyTicketPopUp
        open={sessionExpired}
        onConfirmFirst={NavigateBackToPreviousPage}
        descriptionText={
          'Your session expired and seats have been refreshed and updated.'
        }
      />
    </section>
  );
}
