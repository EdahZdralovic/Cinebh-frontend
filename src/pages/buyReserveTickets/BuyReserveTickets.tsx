import { useNavigate, useParams } from 'react-router-dom';
import { useScrollToTop } from '../../hooks/useScrollToTop.ts';
import { useProjectionSeatLayout } from '../../hooks/projection-hooks/useProjectionSeatLayout.ts';
import { TicketsMovieInfo } from '../../components/ticketsBuyReserveComponents/TicketsMovieInfo.tsx';
import { BookingDetailsComponent } from '../../components/ticketsBuyReserveComponents/BookingDetailsComponent.tsx';
import { SeatGuideComponent } from '../../components/ticketsBuyReserveComponents/seatsComponent/SeatGuideComponent.tsx';
import { ChosenSeatsComponent } from '../../components/ticketsBuyReserveComponents/ChosenSeatsComponent.tsx';
import { SeatsComponent } from '../../components/ticketsBuyReserveComponents/seatsComponent/SeatsComponent.tsx';
import { CinemaScreen } from '../../components/ticketsBuyReserveComponents/seatsComponent/CinemaScreen.tsx';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { SeatStatus } from '../../types/ProjectionSeatLayout.ts';
import { MovieNotFoundComponent } from '../../components/movie-details-components/movie-details-skeletons/MovieNotFoundComponent.tsx';
import { BuyReserveTicketsSkeleton } from '../../components/ticketsBuyReserveComponents/BuyReserveTicketsSkeleton.tsx';
import { SessionTimer } from '../../components/ticketsBuyReserveComponents/sessionComponents/SessionTimer.tsx';
import { SessionBuyTicketPopUp } from '../../components/ticketsBuyReserveComponents/sessionComponents/SessionBuyTicketPopUp.tsx';
import { useReserveSeats } from '../../hooks/projection-hooks/useReserveSeats.ts';
import {
  expireSeatSession,
  type SeatSessionDto,
  startSeatSession,
} from '../../services/seatSessionService.ts';
import { useSeatSessionCountdown } from '../../hooks/projection-hooks/useSeatSessionCountdown.ts';

interface BuyReserveTicketsProps {
  isForReservation?: boolean;
}

export function BuyReserveTickets({
  isForReservation = false,
}: BuyReserveTicketsProps) {
  useScrollToTop();
  const navigate = useNavigate();
  const { projectionId } = useParams<{ projectionId: string }>();
  const { reserveSeats } = useReserveSeats();

  const projectionIdNum = projectionId ? Number(projectionId) : undefined;

  const [selectedSeats, setSelectedSeats] = useState<SeatStatus[]>([]);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [popUpReservation, setPopUpReservation] = useState(false);
  const [session, setSession] = useState<SeatSessionDto | null>(null);

  const { projectionData, loading, error } =
    useProjectionSeatLayout(projectionIdNum);

  const sessionStartedRef = useRef(false);

  useEffect(() => {
    const id = projectionId ? Number(projectionId) : null;
    if (!id || isNaN(id)) return;
    if (sessionStartedRef.current) return;

    sessionStartedRef.current = true;

    startSeatSession(id).then(setSession).catch(console.error);
  }, [projectionId]);

  const { remainingMs, isExpired } = useSeatSessionCountdown(
    session?.expiresAt
  );
  const expiredHandledRef = useRef(false);

  useEffect(() => {
    if (!isExpired || !session) return;
    if (expiredHandledRef.current) return;

    expiredHandledRef.current = true;

    (async () => {
      try {
        await expireSeatSession(session.sessionId);
      } catch (error) {
        console.error('Failed to expire session:', error);
      }
      setSessionExpired(true);
    })();
  }, [isExpired, session]);

  const seatIds = useMemo(
    () => selectedSeats.map((s) => s.id),
    [selectedSeats]
  );

  const toggleSeat = useCallback((seat: SeatStatus) => {
    setSelectedSeats((prev) => {
      const exists = prev.find((s) => s.id === seat.id);
      if (exists) {
        return prev.filter((s) => s.id !== seat.id);
      } else {
        return [...prev, seat];
      }
    });
  }, []);

  const NavigateBackToPreviousPage = useCallback(async () => {
    if (session) {
      try {
        await expireSeatSession(session.sessionId);
      } catch (error) {
        console.error('Failed to expire session:', error);
      }
    }
    navigate(-1);
  }, [session, navigate]);

  const NavigateBackToHome = useCallback(async () => {
    if (session) {
      try {
        await expireSeatSession(session.sessionId);
      } catch (error) {
        console.error('Failed to expire session:', error);
      }
    }
    navigate('/');
  }, [session, navigate]);

  const handleReservation = useCallback(async () => {
    if (!projectionIdNum) return;
    try {
      await reserveSeats({
        projectionId: projectionIdNum,
        seatIds,
        mode: 'HOLD',
      });
      setPopUpReservation(true);
    } catch (error) {
      console.error('Reservation failed:', error);
    }
  }, [projectionIdNum, seatIds, reserveSeats]);

  const handlePayment = useCallback(async () => {
    if (!projectionIdNum) return;
    if (!session || isExpired) {
      setSessionExpired(true);
      return;
    }
    if (seatIds.length === 0) return;

    try {
      const bookingId = await reserveSeats({
        projectionId: projectionIdNum,
        seatIds,
        mode: 'PAYMENT',
        sessionId: session.sessionId,
      });

      navigate(`/payment-ticket/${bookingId}`);
    } catch (error) {
      console.error('Payment failed:', error);
    }
  }, [projectionIdNum, session, isExpired, seatIds, reserveSeats, navigate]);

  if (loading) {
    return <BuyReserveTicketsSkeleton />;
  }

  if (error?.response?.status === 404 || !projectionData || !projectionIdNum) {
    return <MovieNotFoundComponent />;
  }

  const movieId = projectionData.movie.id;
  const venue = projectionData.venue;
  const seats = projectionData.seats;
  const projectionDate = projectionData.projectionDate;
  const projectionTime = projectionData.projectionTime;

  return (
    <section className={'grid grid-cols-1 text-[var(--color-primary)] mt-8'}>
      <div className={'flex justify-between md:mx-[6%] mx-3 items-center'}>
        <h1 className={'md:text-2xl text-xl font-bold'}>Seat Options</h1>
        <SessionTimer remainingMs={remainingMs} />
      </div>
      <div className={'flex justify-between mt-1 mb-6'}>
        <div
          className={'w-1/2 h-px border-b border-[var(--color-secondary)]'}
        ></div>
        <div className={'w-1/2 border-b h-px border-gray-200'}></div>
      </div>
      <div className={'w-full'}>
        <div className={'md:mx-[6%] mx-3 mb-6 flex md:flex-row flex-col'}>
          <div className={'md:w-5/12 w-full md:mb-0 mb-4'}>
            <TicketsMovieInfo movieId={movieId} isSkeleton={false} />
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
      <div className={'w-full h-px border-b border-gray-200'}></div>
      <div className={'h-full grid md:grid-cols-2 grid-cols-1'}>
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
        <div className={'md:mt-4 md:mr-[12%] pb-2'}>
          <SeatGuideComponent />
          <div className={'mt-6'}>
            <ChosenSeatsComponent
              seats={selectedSeats}
              isForReservation={isForReservation}
              handleReservation={handleReservation}
              handlePayment={handlePayment}
              processingReservation={false}
            />
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
      <SessionBuyTicketPopUp
        open={popUpReservation}
        onConfirmFirst={NavigateBackToHome}
        headerText={'Seats Reserved!'}
        descriptionText={
          'Your reservation confirmation has been sent to your email. You can also see your reservation details on your User profile and set a reminder for ticket purchasing.'
        }
        secondButton={true}
        onConfirmSecond={NavigateBackToHome}
        secondButtonText={'Back to Home'}
        buttonText={'See Reservation'}
      />
    </section>
  );
}
