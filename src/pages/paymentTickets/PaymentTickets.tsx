import { SessionTimer } from '../../components/ticketsBuyReserveComponents/sessionComponents/SessionTimer.tsx';
import { useEffect, useMemo, useRef, useState } from 'react';
import { SessionBuyTicketPopUp } from '../../components/ticketsBuyReserveComponents/sessionComponents/SessionBuyTicketPopUp.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { MovieDetailsInPayment } from '../../components/paymentComponents/MovieDetailsInPayment.tsx';
import { useScrollToTop } from '../../hooks/useScrollToTop.ts';
import { SavedCardNumberComponent } from '../../components/paymentComponents/SavedCardNumberComponent.tsx';
import { useBookingForPayment } from '../../hooks/projection-hooks/useBookingForPayment.ts';
import { useSavedCards } from '../../hooks/projection-hooks/useSavedCards.ts';
import { AddNewCardComponent } from '../../components/paymentComponents/AddNewCardComponent.tsx';
import { FromSeatToPrice } from '../../utils/ProjectionFunctions.ts';
import {expireBooking} from '../../services/ticketService.ts';
import { expireSeatSession } from '../../services/seatSessionService.ts';
import { useSeatSessionCountdown } from '../../hooks/projection-hooks/useSeatSessionCountdown.ts';
import { BRANDS_OF_BANK_CARDS } from '../../utils/Constants.ts';

export function PaymentTickets() {
  useScrollToTop();
  const navigate = useNavigate();
  const { bookingId } = useParams<{ bookingId: string }>();

  const bookingIdNum = useMemo(() => Number(bookingId), [bookingId]);
  const isValidBookingId = Number.isFinite(bookingIdNum) && bookingIdNum > 0;

  const { booking, loading, error } = useBookingForPayment(
    isValidBookingId ? bookingIdNum : (NaN as any)
  );

  const paymentSuccessRef = useRef(false);
  const { cards, loadingCards: cardsLoading } = useSavedCards();
  const [sessionExpired, setSessionExpired] = useState(false);
  const [successfulPayment, setSuccessfulPayment] = useState(false);
  const expiresAt = booking?.sessionExpiresAt ?? undefined;
  const { remainingMs, isExpired } = useSeatSessionCountdown(expiresAt);

  const expiredOnceRef = useRef(false);

  useEffect(() => {
    expiredOnceRef.current = false;
    setSessionExpired(false);
  }, [bookingIdNum]);

  useEffect(() => {
    if (successfulPayment) {
      paymentSuccessRef.current = true;
    }
  }, [successfulPayment]);

  useEffect(() => {
    if (!booking) return;
    if (!booking.sessionId || !booking.sessionExpiresAt) {
      setSessionExpired(true);
      return;
    }

    if (!isExpired) return;
    if (expiredOnceRef.current) return;

    expiredOnceRef.current = true;

    (async () => {
      try {
        await expireBooking(booking.id);
      } finally {
        setSessionExpired(true);
      }
    })();
  }, [isExpired, booking]);

  const totalPrice = useMemo(() => {
    if (!booking?.seats?.length) return 0;
    return booking.seats.reduce((sum, seat) => sum + FromSeatToPrice(seat), 0);
  }, [booking]);

  async function NavigateBackToPreviousPage() {
    try {
      if (booking?.sessionId) await expireSeatSession(booking.sessionId);
    } catch (e) {
      console.warn('expireSeatSession failed', e);
    }
    navigate(-1);
  }

  async function handleBackHome() {
    try {
      if (booking?.id && !paymentSuccessRef.current) {
        await expireBooking(booking.id);
      }
    } catch (e) {
      console.warn('expireBooking failed', e);
    }
    navigate('/');
  }

  if (!isValidBookingId) return <div>Invalid booking id</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!booking) return <div>No booking data</div>;

  return (
    <section className={'grid grid-cols-1 text-[var(--color-primary)] '}>
      <div className={'flex justify-between md:mx-[6%] mx-3 items-center mt-5'}>
        <h1 className={' md:text-2xl text-xl font-bold'}>Payment Details</h1>
        <SessionTimer remainingMs={remainingMs} />
      </div>

      <div
        className={' w-full border-b mt-4 h-px border-[var(--color-secondary)]'}
      />

      <div className={'grid md:grid-cols-3 grid-cols-1 mx-[6%]'}>
        <div className={'col-span-2 flex flex-col'}>
          <h1 className={'my-4 text-xl font-bold text-gray-500'}>
            Saved Cards
          </h1>

          {cardsLoading && (
            <SavedCardNumberComponent
              isSkeleton={true}
              brandOfCard={BRANDS_OF_BANK_CARDS.OTHER}
            />
          )}
          {!cardsLoading && cards.length === 0 && (
            <SavedCardNumberComponent
              isSkeleton={false}
              noCardAdded={true}
              brandOfCard={BRANDS_OF_BANK_CARDS.OTHER}
            />
          )}

          {cards.map((card) => (
            <SavedCardNumberComponent
              key={card.id}
              brandOfCard={card.brand}
              lastFourCardNumbers={card.maskedNumber}
              isSkeleton={false}
              noCardAdded={false}
            />
          ))}

          <div className="flex items-center w-full my-5">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-4 text-lg font-bold text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <AddNewCardComponent
            totalPrice={totalPrice}
            bookingId={Number(bookingId)}
            setPaymentSuccess={setSuccessfulPayment}
          />
        </div>

        <div className={'aspect-[7/2] z-0'}>
          <MovieDetailsInPayment
            movieId={booking.movie.id}
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

      <SessionBuyTicketPopUp
        open={successfulPayment}
        descriptionText="The receipt and ticket have been sent to your email. You may download them immediately, or retrieve them later from your User Profile."
        headerText={'Payment Successful!'}
        onConfirmFirst={handleBackHome}
        buttonText={'Back To Home'}
      />
    </section>
  );
}
