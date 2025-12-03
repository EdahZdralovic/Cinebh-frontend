import MainCard from '../cards/MainCard.tsx';

export default function UpcomingMoviesSkeleton() {
  const COUNT_CARDS = 8;

  return (
    <section className="pt-8 animate-pulse">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 justify-center items-center gap-4">
        {Array.from({ length: COUNT_CARDS }).map((_, i) => (
          <MainCard
            key={i}
            coverImageUrl="/assets/images/gray_photo_loading.avif"
            title="Loading"
            isMovie={false}
            street="Loading"
            redStrip={false}
            projectionStart="22-12-2012"
          />
        ))}
      </div>
    </section>
  );
}
