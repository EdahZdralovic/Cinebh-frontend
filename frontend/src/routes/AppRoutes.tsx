import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/home";
import About from "../pages/About/about";
import Tickets from "../pages/Tickets/tickets";
import UpcomingMovies from "../pages/UpcomingMovies/UpcomingMovies.tsx";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/tickets" element={<Tickets />}/>
            <Route path="/upcoming" element={<UpcomingMovies />}/>
        </Routes>
    );
}
