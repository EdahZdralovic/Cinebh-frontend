import MainCard, {type MainCardProps} from "../../components/cards/MainCard.tsx";
import {useMainCards} from "../../hooks/useMainCards.ts";
import {useState} from "react";
import UpcomingFilter from "../../components/filters/UpcomingFilter.tsx";
import type {HomeSectionProps} from "../../components/homeComponents/HomeCardsSection.tsx";
import {HomeCardsSceleton} from "../../components/homeComponents/HomeCardsSceleton.tsx";
import {HomeCardsErrorMessage} from "../../components/homeComponents/HomeCardsErrorMessage.tsx";

export interface UpcomingProps {
    movies: MainCardProps[];
    totalMovies: number;
}


export default function UpcomingMovies(){
    const {mainCard, totalElements, loading, error} = useMainCards(0, 15, "movies/upcoming");

    const [page, setPage] = useState(0);
    if (loading) return <p>Loading</p>;
    if (error) return <HomeCardsErrorMessage errorMessage={error.message} errorCode={error.name}/>

    return (
            <section className="text-[var(--color-primary)] px-[5%] pt-6">
                <div>
                    <p className="text-[24px] font-bold">Upcoming Movies ({totalElements})</p>
                    <UpcomingFilter />
                </div>
                <div className="flex flex-col  sm:flex-row items-center gap-4 pt-4">
                    {mainCard.map((card) => (
                        <MainCard coverImageUrl={card.coverImageUrl} title={card.title} duration={card.duration}
                                  movieGenres={card.movieGenres} isMovie={true} projectionStart={card.projectionStart} redStrip={true} />))}
                </div>
                <div className="flex justify-center text-red-500 ">
                    <button onClick={() => setPage(page+1)}>Load more</button>
                    </div>
            </section>
    );
}