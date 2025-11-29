import CurrentlyShowingCard from './CurrentlyShowingCard.tsx';

export function CurrentlyShowingSkeleton() {
    const COUNT = 6;
  return (
    <section
      className={'items-center text-[var(--color-primary)] pt-6 lg:pt-0'}
    >
      <div className={'relative  '}>
        {Array.from({ length: COUNT }).map((_, i) => (
          <CurrentlyShowingCard
            key={i}
            coverImageUrl="/assets/images/gray_photo_loading.avif"
            isSkeleton={true}
          />
        ))}
      </div>
    </section>
  );
}
