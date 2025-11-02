import MainCard, {type MainCardProps} from "./Cards/MainCard.tsx";

interface HomeSectionProps {
    cards: MainCardProps[];
    cardsName: string;
}

export default function HomeCardsSection({cards, cardsName}: HomeSectionProps) {

    return (
        <section className="flex justify-center items-center text-[var(--color-primary)]">
            <div className=" relative w-11/12 mt-14 rounded-3xl h-3/3  border border-black">
                <div className="flex justify-between">
                    <h1 className="text-[var(--color-primary)] text-[32px] items-center font-semibold ">{cardsName}</h1>
                    <h6 className="text-[#B22222] text-[16px] font-semibold p-4">See All</h6>
                </div>
                <div className="flex flex-col md:flex-row   gap-4 pt-4">
                    {cards.map((card) => (
                            <MainCard imageUrl={card.imageUrl} title={card.title} duration={card.duration}
                                      genre={card.genre}/>
                        )
                    )}
                </div>
                <div className="flex flex-row-reverse pt-4 mr-8 mb-10">
                    <span>Showing </span>
                    <button className="w-[44px] aspect-1/1 border border-black">Du</button>
                    <button>haha</button>
                </div>
            </div>
        </section>
    );
}