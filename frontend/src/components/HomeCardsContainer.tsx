import { useMainCards } from "../hooks/useMainCards.ts";
import HomeCardsSection from "./HomeCardsSection.tsx";
import { useState } from "react";


interface HomeCardsProps {
    cardsName: string;
    type: string;
    isMovie: boolean;
}

export default function HomeCardsContainer({cardsName, isMovie, type}: HomeCardsProps) {
    const [page, setPage] = useState(0);
    const size = 4;
    const {mainCard, loading, error, totalPages, totalElements} = useMainCards(page, size, type);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    return (
        <section>
            <HomeCardsSection
                cardsName={cardsName}
                cards={mainCard}
                totalPages={totalPages}
                isMovie={isMovie}
                totalElements={totalElements}
                pageNumber={page}
                onPreviousPage={() => setPage((p) => Math.max(p - 1, 0))}
                onNextPage={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
            />
        </section>
    );
}
