import { FaRegStar } from 'react-icons/fa';

interface RatingBoxProps {
  name: string;
  rating?: number | null;
}
export function RatingBox({ rating = null, name }: RatingBoxProps) {
  return (
    <section>
      <div
        className={
          'border border-gray-200 rounded-xl grid min-h-[80px] grid-cols-8 aspect-[7/3] items-center '
        }
      >
        <div className={'text-[var(--color-secondary)] ml-3 col-span-2'}>
          <FaRegStar size={22} />
        </div>
        <div className={'grid grid-cols-1 col-span-6 ml-2'}>
          <h5 className={'text-lg font-semibold self-center'}>
            {rating ?? 'No rating'}
          </h5>
          <p className={'text-gray-500 text-sm'}> {name}</p>
        </div>
      </div>
    </section>
  );
}
