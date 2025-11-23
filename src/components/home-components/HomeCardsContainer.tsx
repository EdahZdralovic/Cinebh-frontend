import { useState } from "react";

import { useMainCards } from "../../hooks/useMainCards.ts";
import HomeCardsSection from "./HomeCardsSection.tsx";
import { HomeCardsSkeleton } from "./HomeCardsSkeleton.tsx";
import { HomeCardsErrorMessage } from "./HomeCardsErrorMessage.tsx";

interface HomeCardsProps {
  sectionName: string;
  type: string;
  isMovie: boolean;
  seeAllLink: string;
  isVenueContainer: boolean;
}

export default function HomeCardsContainer({ sectionName, seeAllLink, isMovie, type, isVenueContainer=false }: HomeCardsProps) {
  const [page, setPage] = useState(0);
  const size = 4;
  const { mainCards, loading, error, totalPages, totalElements } = useMainCards(page, size, type);
  if (loading) return <HomeCardsSkeleton />;
  if (error) return <HomeCardsErrorMessage errorMessage={error.message} errorCode={error.name} />;

  function nextPage() {
    setPage((p) => Math.min(p + 1, totalPages - 1));
  }
  function previousPage() {
    setPage((p) => Math.max(p - 1, 0));
  }

  return (
    <section>
      <HomeCardsSection sectionName={sectionName} cards={mainCards} pageNumber={page} totalPages={totalPages}
                        totalElements={totalElements} isMovie={isMovie} onPreviousPage={previousPage}
                        onNextPage={nextPage} seeAllLink={seeAllLink} sectionForVenues={isVenueContainer} />
    </section>);
}
