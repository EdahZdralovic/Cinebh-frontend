import { SeatButton } from '../buttons/seatButtons/SeatButton.tsx';
import type { SeatStatus } from '../../types/ProjectionSeatLayout.ts';

export function SeatGuideComponent() {
  const AVAILABLE_SEAT: SeatStatus = {
    type: 'REGULAR',
    availability: 'FREE',
  };
  const RESERVED_SEAT: SeatStatus = {
    type: 'REGULAR',
    availability: 'RESERVED',
  };
  const PAID_SEAT: SeatStatus = {
    type: 'REGULAR',
    availability: 'SOLD',
  };
  const REGULAR_SEAT: SeatStatus = {
    type: 'REGULAR',
    availability: 'FREE',
  };
  const VIP_SEAT: SeatStatus = {
    type: 'VIP',
    availability: 'FREE',
  };
  const LOVE_SEAT: SeatStatus = {
    type: 'LOVEBOX',
    availability: 'FREE',
  };

  return (
    <section className={'border-b border-gray-200 pb-8'}>
      <div className={'flex justify-center text-[var(--color-primary)] '}>
        <h4 className={'font-thin text-lg mb-4'}> Seat Guide</h4>
      </div>
      <div className={'grid grid-cols-2'}>
        <div className={'grid grid-cols-1 gap-4'}>
          <div className={'inline-flex items-center gap-2'}>
            <SeatButton info={AVAILABLE_SEAT} /> <span>Available</span>
          </div>
          <div className={'inline-flex items-center gap-2'}>
            <SeatButton info={RESERVED_SEAT} /> <span>Reserved</span>
          </div>
          <div className={'inline-flex items-center gap-2'}>
            <SeatButton info={PAID_SEAT} />
            <span>Selected</span>
          </div>
        </div>
        <div className={'grid grid-cols-1 gap-3 '}>
          <div className={'inline-flex items-center gap-2'}>
            <SeatButton info={REGULAR_SEAT} />{' '}
            <span>Regular Seats (7 BAM)</span>
          </div>
          <div className={'inline-flex items-center gap-2'}>
            <SeatButton info={VIP_SEAT} /> <span>VIP Seats (10 BAM)</span>
          </div>
          <div className={'inline-flex items-center gap-2'}>
            <SeatButton info={LOVE_SEAT} />
            <span>Love Seats (24 BAM)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
