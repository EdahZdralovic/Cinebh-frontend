import MainCard from '../cards/MainCard.tsx';

export function HomeCardsSkeleton() {
  const COUNT = 4;

  return (
    <>
      {Array.from({ length: COUNT }).map((_, i) => (
        <MainCard
          key={i}
          coverImageUrl="/assets/images/gray_photo_loading.avif"
          title="Loading..."
          isMovie={false}
          street="Loading..."
          redStrip={false}
          id={0}
        />
      ))}
    </>
  );
}
