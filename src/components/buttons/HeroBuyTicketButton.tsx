import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/Constants.ts';

interface HeroBuyTicketButtonProps {
  movieId: number | undefined;
}

export function HeroBuyTicketButton({ movieId }: HeroBuyTicketButtonProps) {
  return (
    <Link to={ROUTES.MOVIE_DETAILS_ROUTE(movieId)}>
      <button
        className={
          'text-white mt-4 bg-[var(--color-secondary)] px-5  py-3 text-sm font-thin rounded-lg'
        }
      >
        Buy Ticket
      </button>
    </Link>
  );
}
