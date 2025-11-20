import { useMainCards } from '../../hooks/useMainCards.ts';

interface VenuesTickerProps {
  type: string;
  size: number;
}

export default function VenuesTicker({ type, size }: VenuesTickerProps) {
  const { mainCards, loading, error } = useMainCards(0, size, type);
  if (loading) return <div className={'w-full h-[90px] '}></div>;
  if (error)
    return (
      <p className="flex justify-center text-red-500">
        {error.name} <br /> {error.message}
      </p>
    );
  const list = [...mainCards, ...mainCards, ...mainCards, ...mainCards];

  return (
    <div className="overflow-hidden whitespace-nowrap pt-[42px] w-full">
      <div className="inline-flex animate-scroll-x">
        {list.map((venue, index) => (
          <button
            key={index}
            className="p-3 text-gray-400 mx-4 font-bold border border-gray-200 rounded-md hover:bg-gray-300"
          >
            {venue.title}
          </button>
        ))}
      </div>
    </div>
  );
}
