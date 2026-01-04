import { type BRANDS_OF_BANK_CARDS } from '../../utils/Constants.ts';
import { FaCcMastercard, FaCcVisa } from 'react-icons/fa';
import { RiBankCardFill, RiLoader2Fill } from 'react-icons/ri';

interface SavedCardNumberComponentProps {
  brandOfCard: BRANDS_OF_BANK_CARDS;
  lastFourCardNumbers?: string;
  isSkeleton?: boolean;
  noCardAdded?: boolean;
}

function CardBrandIcon(brandOfCard: BRANDS_OF_BANK_CARDS) {
  if (brandOfCard === 'VISA') {
    return <FaCcVisa size={44} />;
  } else if (brandOfCard === 'MASTER') {
    return <FaCcMastercard size={44} />;
  } else {
    return <RiBankCardFill size={44} />;
  }
}

export function SavedCardNumberComponent({
  brandOfCard,
  lastFourCardNumbers,
  isSkeleton = false,
  noCardAdded = false,
}: SavedCardNumberComponentProps) {
  return (
    <section
      className={
        'border border-gray-200 rounded-xl w-full aspect-[11/1] items-center align-middle ' +
          isSkeleton && !noCardAdded
          ? ' bg-gray-200 rounded-xl animate-pulse '
          : ' '
      }
    >
      <div className={'flex flex-row justify-between p-6 items-center '}>
        <div className={'flex flex-row items-center align-middle gap-14 '}>
          <div>
            {isSkeleton
              ? CardBrandIcon(brandOfCard)
              : CardBrandIcon(brandOfCard)}
          </div>
          <div
            className={
              ' ml-4 flex flex-row gap-10 justify-center text-gray-500 text-xl'
            }
          >
            {isSkeleton ? (
              <div className={' flex flex-row items-center'}>
                <span>
                  <RiLoader2Fill className={' mr-4 animate-ping'} />
                </span>
                <span>Loading...</span>
              </div>
            ) : noCardAdded ? (
              <>
                <span> There is No Cards Added Yet</span>
              </>
            ) : (
              <>
                <span>****</span>
                <span>****</span>
                <span>****</span>
                <span>{lastFourCardNumbers}</span>
              </>
            )}
          </div>
        </div>

        <div>
          <button
            className={
              'text-[var(--color-secondary)] underline ' + isSkeleton ||
              noCardAdded
                ? ' hidden'
                : ' '
            }
          >
            Delete card
          </button>
        </div>
      </div>
    </section>
  );
}
