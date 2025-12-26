import { formatDatePretty } from '../../utils/dateUtils.ts';

interface BookingDetailsComponentProps {
  dateProjection?: string;
  timeProjection?: string;
  venueStreet?: string;
  hallName?: string;
  venueName?: string;
  venueCity?: string;
  isSkeleton?: boolean;
}

export function BookingDetailsComponent({
  dateProjection = '',
  timeProjection = '',
  venueStreet = '',
  venueName = '',
  venueCity = '',
  hallName = '',
  isSkeleton = false,
}: BookingDetailsComponentProps) {
  const time = timeProjection.slice(0, 5);
  const prettyDate = isSkeleton ? ' ' : formatDatePretty(dateProjection);
  return (
    <section className={' grid-cols-1 text-[var(--color-primary)]'}>
      <h1 className={'font-bold text-2xl mb-2'}>Booking Details</h1>
      <h3 className={'text-lg font-thin'}>
        {isSkeleton ? (
          'Fetching data from server.'
        ) : (
          <>
            {prettyDate} at {time}
          </>
        )}
      </h3>
      <h3 className={'my-1 text-lg font-thin'}>
        {isSkeleton ? (
          'Movie will load very soon.'
        ) : (
          <>
            {venueName} : {venueStreet}, {venueCity}
          </>
        )}
      </h3>
      <h3 className={'text-lg font-thin'}>
        {isSkeleton ? 'Thank you for your patience.' : <>{hallName}</>}{' '}
      </h3>
    </section>
  );
}
