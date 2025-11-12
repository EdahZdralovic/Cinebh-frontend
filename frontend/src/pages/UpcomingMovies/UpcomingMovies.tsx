import MainCard, {type MainCardProps} from "../../components/cards/MainCard.tsx";

import { useState } from "react";
import { UpcomingFilter } from "../../components/filter-components/UpcomingFilter.tsx";
import { HomeCardsErrorMessage } from "../../components/home-components/HomeCardsErrorMessage.tsx";
import {useUpcomingMovies} from "../../hooks/useUpcomingMovies.ts";

export interface UpcomingProps {
    movies: MainCardProps[];
    totalMovies: number;
}

export default function UpcomingMovies(type:string){

    const [filters, setFilters] = useState({
        cityId: null,
        venueId: null,
        genreIds: [] as number[],
        fromDate: null as string | null,
        toDate: null as string | null,
        q: ""});
    const [size, setSize] = useState(12);
    const {upcomingCards, totalElements, loading, error} = useUpcomingMovies(filters, "movies/upcoming/filter" ,0, size);
//skeleton za upcoming nije jos gotov
    if (loading) return <MainCard coverImageUrl={"/assets/images/gray_photo_loading.avif" }
                                  title="Loading" isMovie={false} street={"Loading"} redStrip={false} projectionStart={"22-12-2012"}/>;
    if (error) return <HomeCardsErrorMessage errorMessage={error.message} errorCode={error.name}/>



    return (
            <section className="text-[var(--color-primary)] px-[6%] pt-6">
                <div>
                    <p className="text-[24px] font-bold">Upcoming Movies ({totalElements})</p>
                    <UpcomingFilter />
                </div>

                <div className="grid grid-cols-4 items-center gap-4 pt-4">
                    {upcomingCards.map((card) => (
                        <MainCard coverImageUrl={card.coverImageUrl} title={card.title} duration={card.duration}
                                  movieGenres={card.movieGenres} isMovie={true} projectionStart={card.projectionStart} redStrip={true} />))}
                </div>
                <div className="flex justify-center text-[var(--color-secondary)] ">
                    <button onClick={() => setSize(size+4)} disabled={size >= totalElements}
                    >Load more</button>
                    </div>
            </section>
    );
}