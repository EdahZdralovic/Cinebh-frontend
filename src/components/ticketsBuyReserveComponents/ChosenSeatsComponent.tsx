export function ChosenSeatsComponent() {
  return (
    <section>
      <div className={'flex justify-center '}>
        <span className={'mt-3'}>Chosen Seats</span>
      </div>
      <div className={' mt-4 flex justify-between'}>
        <span>Seat(s)</span>
        <span>Total price</span>
      </div>
      <div className={'w-full mt-1 h-px border-b border-gray-200'}></div>
    </section>
  );
}
