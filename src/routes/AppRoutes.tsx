import { Route, Routes } from 'react-router-dom';

import Home from '../pages/home/home';
import About from '../pages/about/about';
import Tickets from '../pages/tickets/tickets';
import { CurrentlyShowing } from '../pages/currentlyShowing/CurrentlyShowing.tsx';
import UpcomingMovies from '../pages/upcomingMovies/UpcomingMovies.tsx';
import { MovieDetails } from '../pages/movieDetails/MovieDetails.tsx';
import { BuyReserveTickets } from '../pages/buyReserveTickets/BuyReserveTickets.tsx';
import { PaymentTickets } from '../pages/paymentTickets/PaymentTickets.tsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/tickets" element={<Tickets />} />
      <Route path="/upcoming" element={<UpcomingMovies />} />
      <Route path="/showing" element={<CurrentlyShowing />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
      <Route path="/buy-ticket/:projectionId" element={<BuyReserveTickets />} />
      <Route
        path="/reserve-ticket/:projectionId"
        element={<BuyReserveTickets />}
      />
      <Route path="/payment-ticket/:bookingId" element={<PaymentTickets />} />
    </Routes>
  );
}
