import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface TicketsCardProps {
  title: string;
  price: number;
  disclaimer: string;
  options: string[];
  isMainCard: boolean;
}

export function TicketsCard({
  title,
  price,
  disclaimer,
  options,
  isMainCard,
}: TicketsCardProps) {
  return (
    <div
      className={
        'relative text-center border rounded-3xl md:w-[29%] max-w-[408px] w-10/12 mb-8 pb-8 ' +
        (isMainCard
          ? 'shadow border-[#98A2B3] md:mt-0 md:mb-14 pt-10 md:min-h-[536px]'
          : 'border-[#E4E7EC] md:mt-10 md:mb-24 md:min-h-[520px]')
      }
    >
      <h6 className={'pt-10 font-bold text-xl'}>{title}</h6>
      <h4
        className={
          'pt-6 font-bold text-3xl ' +
          (isMainCard
            ? 'text-[var(--color-secondary)]'
            : 'text-[var(--color-primary)]')
        }
      >
        {price} KM
      </h4>
      <p className="pt-6 font-light text-md ">{disclaimer}</p>
      {options.map((option) => (
        <span className="flex pt-8 text-md text-left pl-6 gap-3">
          <Check className="text-[var(--color-secondary)] text-left " />
          {option} <br />
        </span>
      ))}
      <Link to="/showing">
        <button
          className={
            'mt-[68px] p-3 border rounded-xl border-[var(--color-secondary)] ' +
            (isMainCard
              ? ' bg-[var(--color-secondary)] text-white'
              : 'text-[var(--color-secondary)]')
          }
        >
          Explore Movies
        </button>
      </Link>
    </div>
  );
}
