import {
  TicketsCard,
  type TicketsCardProps,
} from '../../components/cards/TicketsCard';
import { useScrollToTop } from '../../hooks/useScrollToTop';

const TICKETS: TicketsCardProps[] = [
  {
    title: 'Regular Seats',
    price: 7,
    disclaimer: '*per ticket',
    options: [
      'Comfortable seating',
      'Affordable pricing',
      'Wide selection',
      'Accessible locations',
      'Suitable for everyone',
    ],
    isMainCard: false,
  },
  {
    title: 'Love Seats',
    price: 24,
    disclaimer: '*per ticket',
    isMainCard: true,
    options: [
      'Side-by-side design',
      'Comfortable padding',
      'Adjustable armrests',
      'Cup holders',
      'Reserved for couples',
    ],
  },
  {
    title: 'VIP Seats',
    price: 10,
    disclaimer: '*per ticket',
    isMainCard: false,
    options: [
      'Enhanced comfort',
      'Priority seating',
      'Prime viewing',
      'Personal space',
      'Luxury extras',
    ],
  },
];

export default function Tickets() {
  useScrollToTop();
  return (
    <section className="realtive pt-10 leading-[24px] tracking-[0.5%] text-[var(--color-primary)] container-md ">
      <div className="grid grid-cols-1 items-center justify-center">
        <h4 className=" text-[32px] font-bold text-center tracking-[-0.25%] leading-[40px] ">
          Pricing
        </h4>
        <div className="text-center pr-6 pl-6">
          <p>
            <br />
            Welcome to our cinema ticket pricing options! We offer three tiers
            to suit everyone’s
            <br />
            preferences. Explore our pricing options below and treat yourself to
            a cinematic
            <br /> adventure like never before!
          </p>
        </div>
      </div>
      <div className="flex md:flex-row flex-col justify-center md:items-stretch items-center gap-4 md:mt-16 mt-6">
        {TICKETS.map((card) => (
          <TicketsCard
            title={card.title}
            price={card.price}
            disclaimer={card.disclaimer}
            options={card.options}
            isMainCard={card.isMainCard}
          />
        ))}
      </div>
    </section>
  );
}
