import { Route, Routes } from "react-router-dom";

import Home from '../pages/home/home';
import About from '../pages/About/about';
import Tickets from '../pages/Tickets/tickets';
import UpcomingMovies from '../pages/upcomingMovies/UpcomingMovies.tsx';
import CurrentlyShowing from '../pages/currentlyShowing/CurrentlyShowing.tsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/tickets" element={<Tickets />} />
      <Route path="/upcoming" element={<UpcomingMovies />} />
      <Route path="/showing" element={<CurrentlyShowing />} />
    </Routes>
  );
}
