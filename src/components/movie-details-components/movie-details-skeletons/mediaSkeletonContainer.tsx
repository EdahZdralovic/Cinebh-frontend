export function MediaSkeletonContainer() {
  return (
    <section>
      <div
        className={
          'grid md:grid-cols-2 grid-cols-1 max-h-[50%] md:gap-4 gap-2 md:mt-8 mt-3 animate-pulse'
        }
      >
        <div>
          <img
            src="/assets/images/gray_photo_loading.avif"
            alt="Movie trailer"
            className="md:rounded-l-2xl md:rounded-bl-2xl rounded-2xl w-full aspect-video"
          />
        </div>
        <div className={'grid grid-cols-2 w-full md:pr-4 md:gap-4  gap-2 '}>
          {Array.from({ length: 4 }).map((_, i) => (
            <img
              key={i}
              alt="Movie picture"
              src="/assets/images/gray_photo_loading.avif"
              className={
                'bg-cover aspect-video md:rounded-none rounded-xl h-[100%] object-cover ' +
                (i === 3 ? 'md:rounded-br-2xl' : '')
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
