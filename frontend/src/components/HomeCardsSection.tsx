import MainCard, { type MainCardProps } from "./Cards/MainCard.tsx";
import ArrowButton from "./buttons/ArrowButton.tsx";

export interface HomeSectionProps {
    cards: MainCardProps[];
    sectionName: string;
    pageNumber: number;
    onPreviousPage: () => void;
    onNextPage: () => void;
    totalPages: number;
    totalElements: number;
    isMovie: boolean;
}

export default function HomeCardsSection(
    {cards, isMovie, totalElements, totalPages, pageNumber, sectionName, onPreviousPage, onNextPage}: HomeSectionProps) {
    return (
        <section className="flex justify-center px-[3%] items-center text-[var(--color-primary)]">
            <div className=" relative w-[93%] mt-14 rounded-3xl h-3/3 items-center ">
                <div className="flex justify-between align-middle  ">
                    <h1 className=" sm:text-[34px] text-[22px] font-bold ">{sectionName}</h1>
                    <h6 className="text-[#B22222] text-[16px] pt-2 font-semibold align-middle">See All</h6>
                </div>
                <div className="flex flex-col sm:flex-row  items-center gap-4 pt-4">
                    {cards.map((card) => (
                            <MainCard coverImageUrl={card.coverImageUrl} title={card.title} duration={card.duration}
                                      movieGenres={card.movieGenres} isMovie={isMovie} street={card.street}/>
                        )
                    )}
                </div>
                <div className="flex flex-row justify-end items-center gap-4 pt-6 font-thin mr-0 mb-10 text-[16px]">
                    <div>
                        <span> Showing </span><span
                        className="font-semibold">{pageNumber * 4 + cards.length}</span><span> out of </span><span
                        className="font-semibold">{totalElements}</span>
                    </div>
                    <ArrowButton onClick={onPreviousPage} disabled={pageNumber === 0} directionLeft={true}/>
                    <ArrowButton onClick={onNextPage} disabled={pageNumber === totalPages - 1} directionLeft={false}/>

                </div>
            </div>
        </section>
    );
}

