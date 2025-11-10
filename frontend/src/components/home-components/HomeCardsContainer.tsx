import { useMainCards } from "../../hooks/useMainCards.ts";
import type { MainCardProps } from "../cards/MainCard.tsx";
import HomeCardsSection from "./HomeCardsSection.tsx";
import { useState } from "react";
import { HomeCardsSkeleton } from "./HomeCardsSkeleton.tsx";
import { HomeCardsErrorMessage } from "./HomeCardsErrorMessage.tsx";

interface HomeCardsProps {
    sectionName: string;
    type: string;
    isMovie: boolean;
    seeAllLink: string;
}

export function createHomeSelecton(mainCard: MainCardProps[], sectionName: string, page: number, nextPage: () => void,
                                   previousPage: () => void, totalPages: number, totalElements: number, isMovie: boolean, seeAllLink: string) {
    return (
        <section>
            <HomeCardsSection sectionName={sectionName} cards={mainCard} pageNumber={page} totalPages={totalPages}
                              totalElements={totalElements} isMovie={isMovie} onPreviousPage={previousPage}
                              onNextPage={nextPage} seeAllLink={seeAllLink}/>
        </section>);
}

export default function HomeCardsContainer({sectionName, seeAllLink, isMovie, type}: HomeCardsProps) {
    const [page, setPage] = useState(0);
    const size = 4;
    const {mainCard, loading, error, totalPages, totalElements} = useMainCards(page, size, type);
    if (loading) return <HomeCardsSkeleton/>;
    if (error) return <HomeCardsErrorMessage errorMessage={error.message} errorCode={error.name}/>

    function nextPage() {
        setPage((p) => Math.min(p + 1, totalPages - 1))
    }
    function previousPage() {
        setPage((p) => Math.max(p - 1, 0))
    }

    return (
        createHomeSelecton(mainCard, sectionName, page, nextPage, previousPage, totalPages, totalElements, isMovie, seeAllLink)
    );
}
