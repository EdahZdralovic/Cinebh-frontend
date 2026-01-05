import { useScrollToTop } from '../../hooks/useScrollToTop.ts';
import { TicketsMovieInfo } from '../../components/ticketsBuyReserveComponents/TicketsMovieInfo.tsx';
import { BookingDetailsComponent } from '../../components/ticketsBuyReserveComponents/BookingDetailsComponent.tsx';
import { SeatGuideComponent } from './seatsComponent/SeatGuideComponent.tsx';
import { ChosenSeatsComponent } from '../../components/ticketsBuyReserveComponents/ChosenSeatsComponent.tsx';
import { CinemaScreen } from './seatsComponent/CinemaScreen.tsx';

import { SessionTimer } from './sessionComponents/SessionTimer.tsx';
import { SeatsSkeletonComponent } from './seatsComponent/SeatsSkeletonComponent.tsx';

export function BuyReserveTicketsSkeleton() {
  useScrollToTop();

  return (
    <section className={'grid grid-cols-1 text-[var(--color-primary)] mt-8 '}>
      <div className={'flex justify-between mx-[6%]'}>
        <h1 className={' text-2xl font-bold '}> Seat Options</h1>
        <SessionTimer remainingMs={1000 * 60 * 5} />
      </div>
      <div className={' flex justify-between mt-1 mb-6'}>
        <div
          className={' w-1/2 h-px border-b border-[var(--color-secondary)]'}
        ></div>
        <div className={' w-1/2 border-b h-px border-gray-200'}></div>
      </div>
      <div className={' w-full '}>
        <div
          className={' mx-[6%]  mb-6 flex md:flex-row flex-col animate-pulse'}
        >
          <div className={' md:w-5/12 w-full md:mb-0 mb-4  '}>
            <TicketsMovieInfo isSkeleton={true} movieId={0} />
          </div>
          <BookingDetailsComponent isSkeleton={true} />
        </div>
      </div>
      <div className={'w-full h-px border-b border-gray-200 '}></div>
      <div className={' h-full grid md:grid-cols-2 grid-cols-1 '}>
        <div className={'cols-span-1 mb-14 grid grid-cols-1'}>
          <CinemaScreen />
          <div className={'mt-6 animate-pulse'}>
            <SeatsSkeletonComponent />
          </div>
        </div>
        <div className={'md:mt-4 md:mr-[12%] pb-2 '}>
          <SeatGuideComponent />
          <div className={'mt-6 '}>
            <ChosenSeatsComponent seats={[]} />
          </div>
        </div>
      </div>
    </section>
  );
}
