import { SessionTimer } from '../../components/ticketsBuyReserveComponents/sessionComponents/SessionTimer.tsx';
import { useBuyTicketSessionTimer } from '../../hooks/projection-hooks/useBuyTicketSessionTimer.ts';
import { useEffect, useState } from 'react';
import { SessionBuyTicketPopUp } from '../../components/ticketsBuyReserveComponents/sessionComponents/SessionBuyTicketPopUp.tsx';
import {
  clearSeatSession,
  FromSeatToPrice,
} from '../../utils/ProjectionFunctions.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { MovieDetailsInPayment } from '../../components/paymentComponents/MovieDetailsInPayment.tsx';
import { useScrollToTop } from '../../hooks/useScrollToTop.ts';
import { SavedCardNumberComponent } from '../../components/paymentComponents/SavedCardNumberComponent.tsx';
import { useBookingForPayment } from '../../hooks/projection-hooks/useBookingForPayment.ts';
import { useSavedCards } from '../../hooks/projection-hooks/useSavedCards.ts';
import { AddNewCardComponent } from '../../components/paymentComponents/AddNewCardComponent.tsx';

export function PaymentTickets() {
  useScrollToTop();
  const navigate = useNavigate();
  const { bookingId } = useParams<{ bookingId: string }>();
  const { remainingMs, isExpired } = useBuyTicketSessionTimer();
  const [sessionExpired, setSessionExpired] = useState(false);
  const {
    cards,
    loadingCards: cardsLoading,
    error: cardsError,
  } = useSavedCards();

  useEffect(() => {
    if (isExpired) {
      setSessionExpired(true);
    }
  }, [isExpired]);

  const { booking, loading, error } = useBookingForPayment(Number(bookingId));
  function NavigateBackToPreviousPage() {
    clearSeatSession();
    navigate(-1);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!booking) {
    return <div>No booking data</div>;
  }

  const totalPrice = booking.seats.reduce(
    (sum, seat) => sum + FromSeatToPrice(seat),
    0
  );

  return (
    <section className={'grid grid-cols-1 text-[var(--color-primary)] '}>
      <div className={'flex justify-between md:mx-[6%] mx-3 items-center mt-5'}>
        <h1 className={' md:text-2xl text-xl font-bold   '}>Payment Details</h1>
        <SessionTimer remainingMs={remainingMs} />
      </div>
      <div
        className={' w-full border-b mt-4 h-px border-[var(--color-secondary)]'}
      ></div>
      <div className={'grid md:grid-cols-3  grid-cols-1 mx-[6%]'}>
        <div className={'col-span-2 flex flex-col'}>
          <h1 className={'my-4 text-xl font-bold text-gray-500'}>
            Saved Cards
          </h1>

          {cardsLoading && <SavedCardNumberComponent isSkeleton={true} />}

          {!cardsLoading && cards.length === 0 && (
            <SavedCardNumberComponent isSkeleton={false} noCardAdded={true} />
          )}
          {cards.map((card) => (
            <SavedCardNumberComponent
              key={card.id}
              brandOfCard={card.brand.toUpperCase()}
              lastFourCardNumbers={card.maskedNumber}
              isSkeleton={loading}
              noCardAdded={false}
            />
          ))}
          <div className="flex items-center w-full my-5">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-4 text-lg font-bold text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          <AddNewCardComponent totalPrice={totalPrice} bookingId={bookingId} />
        </div>
        <div className={' aspect-[7/2] z-0 '}>
          <MovieDetailsInPayment
            movieId={booking.movie.id}
            loading={false}
            seatsReserved={booking.seats}
            price={totalPrice}
            projectionId={booking.projection.id}
          />
        </div>
      </div>
      {sessionExpired && (
        <SessionBuyTicketPopUp
          open
          onConfirmFirst={NavigateBackToPreviousPage}
          descriptionText="Your session expired and seats have been refreshed and updated."
        />
      )}
    </section>
  );
}

/*
https://cinebh.local:5173/payment-ticket/495*/
