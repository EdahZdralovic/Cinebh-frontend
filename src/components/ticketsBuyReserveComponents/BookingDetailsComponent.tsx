import { formatDatePretty } from '../../utils/dateUtils.ts';

interface BookingDetailsComponentProps {
  dateProjection: string;
  timeProjection: string;
  venueStreet: string;
  hallName: string;
  venueName: string;
  venueCity: string;
}

export function BookingDetailsComponent({
  dateProjection,
  timeProjection,
  venueStreet,
  hallName,
  venueName,
  venueCity,
}: BookingDetailsComponentProps) {
  const time = timeProjection.slice(0, 5);
  const prettyDate = formatDatePretty(dateProjection);
  return (
    <section className={' grid-cols-1 text-[var(--color-primary)]'}>
      <h1 className={'font-bold text-2xl mb-2'}>Booking Details</h1>
      <h3 className={'text-lg font-thin'}>
        {prettyDate} at {time}
      </h3>
      <h3 className={'my-1 text-lg font-thin'}>
        {venueName} : {venueStreet}, {venueCity}
      </h3>
      <h3 className={'text-lg font-thin'}> {hallName}</h3>
    </section>
  );
}
