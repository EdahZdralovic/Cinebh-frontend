export function CinemaScreen() {
  return (
    <section>
      <div className={'flex flex-col mb-14 mt-4 items-center justify-center'}>
        <span className={'mb-5'}>Cinema Screen</span>
        <img
          src={'/assets/images/cinema_screen_image.png'}
          alt={'cinema screen'}
          className={'w-4/6 '}
        />
      </div>
    </section>
  );
}
