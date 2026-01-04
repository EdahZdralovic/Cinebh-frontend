import { SeatButton } from '../../buttons/seatButtons/SeatButton.tsx';
import type { SeatStatus } from '../../../types/ProjectionSeatLayout.ts';

export function SeatGuideComponent() {
  const AVAILABLE_SEAT: SeatStatus = {
    column: 0,
    id: 0,
    row: '',
    type: 'REGULAR',
    availability: 'FREE',
  };
  const RESERVED_SEAT: SeatStatus = {
    column: 0,
    id: 0,
    row: '',
    type: 'REGULAR',
    availability: 'RESERVED',
  };
  const REGULAR_SEAT: SeatStatus = {
    column: 0,
    id: 0,
    row: '',
    type: 'REGULAR',
    availability: 'FREE',
  };
  const VIP_SEAT: SeatStatus = {
    column: 0,
    id: 0,
    row: '',
    type: 'VIP',
    availability: 'FREE',
  };
  const LOVE_SEAT: SeatStatus = {
    column: 0,
    id: 0,
    row: '',
    type: 'LOVEBOX',
    availability: 'FREE',
  };

  return (
    <section className={'border-b border-gray-200 pb-8'}>
      <div className={'flex justify-center text-[var(--color-primary)] '}>
        <h4 className={'font-thin text-lg mb-6'}> Seat Guide</h4>
      </div>
      <div className={'grid grid-cols-2  md:mx-0 mx-[6%]'}>
        <div className={'grid grid-cols-1 gap-4'}>
          <div className={'inline-flex items-center gap-2'}>
            <SeatButton info={AVAILABLE_SEAT} isSelected={false} />{' '}
            <span>Available</span>
          </div>
          <div className={'inline-flex items-center gap-2'}>
            <SeatButton info={RESERVED_SEAT} isSelected={false} />{' '}
            <span>Reserved</span>
          </div>
          <div className={'inline-flex items-center gap-2'}>
            <SeatButton
              info={AVAILABLE_SEAT}
              isSelectedForSeatGuide={true}
              isSelected={false}
            />
            <span>Selected</span>
          </div>
        </div>
        <div className={'grid grid-cols-1 gap-3 '}>
          <div className={'inline-flex items-center gap-2'}>
            <SeatButton info={REGULAR_SEAT} isSelected={false} />{' '}
            <span>Regular Seats (7 BAM)</span>
          </div>
          <div className={'inline-flex items-center gap-2'}>
            <SeatButton info={VIP_SEAT} isSelected={false} />{' '}
            <span>VIP Seats (10 BAM)</span>
          </div>
          <div className={'inline-flex items-center gap-2'}>
            <SeatButton info={LOVE_SEAT} isSelected={false} />
            <span>Love Seats (24 BAM)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
