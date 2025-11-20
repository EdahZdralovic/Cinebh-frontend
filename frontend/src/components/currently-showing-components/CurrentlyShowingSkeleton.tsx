import CurrentlyShowingCard from './CurrentlyShowingCard.tsx';

export function CurrentlyShowingSkeleton() {
  return (
    <section className={'items-center text-gray-500 animate-pulse pt-12'}>
      <div className={'relative px-[6%] '}>
        <p className="text-[32px] mt-[22%] font-semibold">Loading ...</p>
        <CurrentlyShowingCard
          coverImageUrl={'/assets/images/gray_photo_loading.avif'}
          title={'Loading...'}
          PGRating={'...'}
          language={'...'}
          duration={0}
        />
      </div>
    </section>
  );
}
