import { CiCreditCard1 } from 'react-icons/ci';

export function InputCardNumberField() {
  return (
    <section
      className={
        'h-12 rounded-lg w-full pl-3 pr-10 items-center min-w-[30px] text-lg  focus:outline-none flex flex-row bg-white border border-gray-200'
      }
    >
      <span className={'text-[var(--color-primary)] '}>
        <CiCreditCard1 size={33} />
      </span>
      <input
        className={' items-center ml-0 text-center'}
        placeholder={'**** **** **** **** '}
      />
    </section>
  );
}
