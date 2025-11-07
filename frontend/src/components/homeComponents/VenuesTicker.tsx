import { useMainCards } from "../../hooks/useMainCards.ts";

interface VenuesTickerProps {
    type: string;
    size: number;
}

export default function VenuesTicker({type, size}: VenuesTickerProps) {
    const {mainCard, loading, error} = useMainCards(0, size, type);
    if (loading) return <p></p>; //ovo moze biti prazno jelde jer je ovo linija
    if (error) return <p className="flex justify-center text-red-500" >{error.name} <br/> {error.message}</p>;
    //a za erroe jel ok ove porukice
    return (
        <div className="overflow-hidden whitespace-nowrap pt-[42px] group">
            <div className="inline-block gap-10 animate-marquee group-hover:[animation-play-state:paused] ">
                {mainCard.map((venue) => (
                    <button
                        className=" p-2 text-gray-400 mx-5 font-bold border border-gray-200 rounded-md hover:bg-gray-300 ">
                        {venue.title}
                    </button>
                )) // 2 puta ponavljam map i buttone jer inace linija koja "hoda" zavrsi pa bude prazno
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