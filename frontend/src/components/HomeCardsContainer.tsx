import { useMainCards } from "../hooks/useMainCards.ts";
import type {MainCardProps} from "./Cards/MainCard.tsx";
import HomeCardsSection from "./HomeCardsSection.tsx";
import { useState } from "react";


interface HomeCardsProps {
    sectionName: string;
    type: string;
    isMovie: boolean;
}

export function createHomeSelecton(mainCard: MainCardProps[], sectionName: string, page: number, nextPage: () => void,
                                   previousPage: () => void, totalPages: number, totalElements: number, isMovie: boolean) {
    return (<section>
        <HomeCardsSection sectionName={sectionName} cards={mainCard} pageNumber={page} totalPages={totalPages}
                          totalElements={totalElements} isMovie={isMovie} onPreviousPage={previousPage}
                          onNextPage={nextPage}/>
    </section>);
}

export default function HomeCardsContainer({sectionName, isMovie, type}: HomeCardsProps) {
    const [page, setPage] = useState(0);
    const size = 4;
    const {mainCard, loading, error, totalPages, totalElements} = useMainCards(page, size, type);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    function nextPage() {
        setPage((p) => Math.min(p + 1, totalPages - 1))
    }

    function previousPage() {
        setPage((p) => Math.max(p - 1, 0))
    }

    return (
        createHomeSelecton(mainCard, sectionName, page, nextPage, previousPage, totalPages, totalElements, isMovie)
    );
}
