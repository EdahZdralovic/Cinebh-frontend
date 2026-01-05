import { TicketsMovieInfo } from '../ticketsBuyReserveComponents/TicketsMovieInfo.tsx';

export function MovieDetailsInPaymentSkeleton() {
  return (
    <section className="md:m-4 my-4 animate-pulse">
      <span className="font-bold text-xl text-gray-400">Booking Summary</span>

      <div className="bg-[var(--color-primary)] aspect-[5/7] max-h-[600px] mt-4 rounded-2xl text-white">
        <div className="p-6">
          <div className="text-white">
            <TicketsMovieInfo movieId={0} isSkeleton />
          </div>

          <div className="w-full border-b-2 my-4 h-2 border-white/30" />
          <div className="grid grid-cols-1 gap-3 w-4/6">
            <span className="opacity-50">Date and Time</span>
            <div className="h-5 w-32 bg-white/20 rounded" />
            <span className="mt-4 opacity-50">Cinema Details</span>
            <div className="h-4 w-full bg-white/20 rounded" />
            <div className="h-4 w-2/3 bg-white/20 rounded" />
            <span className="mt-4 opacity-50">Seat(s) Details</span>
            <div className="h-4 w-1/2 bg-white/20 rounded" />
            <span className="mt-4 opacity-50">Price Details</span>
            <div className="h-4 w-24 bg-white/20 rounded" />
          </div>
        </div>
      </div>
    </section>
  );
}
