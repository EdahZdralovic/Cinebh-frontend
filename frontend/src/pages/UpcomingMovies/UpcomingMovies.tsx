import type {MainCardProps} from "../../components/cards/MainCard.tsx";
import {useMainCards} from "../../hooks/useMainCards.ts";
import {useState} from "react";

export interface UpcomingProps {
    movies: MainCardProps[];
    totalMovies: number;
}


export default function UpcomingMovies(){
    const {mainCard, totalElements, loading, error} = useMainCards(0, 3, "movies/upcoming");

    const [movieName, setMovieName] = useState("");

    return (
            <section className="text-[var(--color-primary)] px-[5%] pt-6">
                <div>
                    <p className="text-[24px] font-bold">Upcoming Movies ({totalElements})</p>
                    <div className="">
                        <input/>
                    </div>
                </div>
            </section>
    );
}