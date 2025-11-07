import { useMainCards } from "../../hooks/useMainCards.ts";


interface VenuesTickerProps {
    type: string;
    size: number;
}

export default function VenuesTicker({type, size}: VenuesTickerProps) {

    const {mainCard, loading, error} = useMainCards(0, size, type);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;
    return (
        <div className="overflow-hidden whitespace-nowrap pt-[42px] group">
            <div className="inline-block gap-10 animate-marquee group-hover:[animation-play-state:paused] ">
                {mainCard.map((venue) => (
                    <button
                        className=" p-2 text-gray-400 mx-5 font-bold border border-gray-200 rounded-md hover:bg-gray-300 ">
                        {venue.title}
                    </button>
                ))
                    // 2 puta povaljam map i buttone jer inace linija koja "hoda" zavrsi
                    // i bude prazno umjesto dugmadi barem 4,5 sekundi ili druga opcija je da svaki krug kad se zavrsi iskoce dugmad
                    //ali to nije smooth nikako
                }
                {mainCard.map((venue) => (
                    <button
                        className="p-2 mx-5 text-gray-400 font-bold border border-gray-200 rounded-md hover:bg-gray-300">
                        {venue.title}
                    </button>
                ))}
            </div>
        </div>
    );


}