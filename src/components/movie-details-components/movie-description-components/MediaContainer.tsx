import { convertToVideo } from '../../../utils/movieFunctions.ts';

interface MediaContainerProps {
  videoUrl?: string;
  mediaPhotos?: string[];
  isSkeleton?: boolean;
}

export function MediaContainer({
  videoUrl,
  mediaPhotos,
  isSkeleton = false,
}: MediaContainerProps) {
  const imagesToRender = isSkeleton ? [0, 1, 2, 3] : (mediaPhotos ?? []);
  return (
    <section>
      <div
        className={
          'grid md:grid-cols-2 grid-cols-1 max-h-[50%] md:gap-4 gap-2 md:mt-8 mt-3 '
        }
      >
        <div className="h-full ">
          {isSkeleton ? (
            <img
              src="/assets/images/gray_photo_loading.avif"
              alt="Movie trailer"
              className="md:rounded-l-2xl md:rounded-bl-2xl md:rounded-none rounded-xl  w-full aspect-video"
            />
          ) : (
            videoUrl && (
              <iframe
                src={convertToVideo(videoUrl)}
                title="Movie trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="md:rounded-l-2xl md:rounded-bl-2xl md:rounded-none rounded-t-xl  w-full aspect-video"
              ></iframe>
            )
          )}
        </div>
        <div className={'grid grid-cols-2 w-full md:pr-4 md:gap-4  gap-2 '}>
          {imagesToRender.map((_, index) => (
            <img
              alt={'Movie picture'}
              src={
                isSkeleton
                  ? '/assets/images/gray_photo_loading.avif'
                  : mediaPhotos![index]
              }
              key={index}
              className={
                ' bg-cover aspect-video rounded-none  md:h-[100%]  object-cover ' +
                (index === 1 ? ' md:rounded-tr-2xl' : ' ') +
                (index === 2 ? ' rounded-bl-2xl md:rounded-none' : ' ') +
                (index === 3 ? ' rounded-br-2xl ' : ' ') +
                (index > 3 ? 'hidden ' : ' ')
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
